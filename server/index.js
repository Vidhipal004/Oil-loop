import express from 'express';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

const { Pool } = pg;
const app = express();
const PORT = Number(process.env.API_PORT || 4000);
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-development-secret-before-deploying';
const pool = DATABASE_URL ? new Pool({ connectionString: DATABASE_URL, ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : undefined }) : null;
app.disable('x-powered-by');
app.use(express.json({ limit: '4mb' }));

const emptyState = { restaurants: [], pickups: [], batches: [], routes: [], audit: [] };
async function initDb() {
  if (!pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS app_state (
      id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
      data JSONB NOT NULL DEFAULT '{"restaurants":[],"pickups":[],"batches":[],"routes":[],"audit":[]}'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('admin','restaurant','collector')),
      active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS restaurants (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      contact_name TEXT,
      phone TEXT,
      email TEXT,
      address TEXT,
      status TEXT NOT NULL DEFAULT 'Pending',
      payload JSONB NOT NULL DEFAULT '{}'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS pickups (
      id TEXT PRIMARY KEY,
      restaurant_id TEXT,
      status TEXT NOT NULL DEFAULT 'Requested',
      scheduled_at TIMESTAMPTZ,
      litres NUMERIC(12,2),
      collector_id TEXT,
      payload JSONB NOT NULL DEFAULT '{}'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS batches (
      id TEXT PRIMARY KEY,
      pickup_id TEXT,
      status TEXT NOT NULL DEFAULT 'Collected',
      litres NUMERIC(12,2),
      grade TEXT,
      payload JSONB NOT NULL DEFAULT '{}'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS audit_events (
      id BIGSERIAL PRIMARY KEY,
      actor_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
      action TEXT NOT NULL,
      entity_type TEXT,
      entity_id TEXT,
      details JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  await pool.query('INSERT INTO app_state (id, data) VALUES (1, $1::jsonb) ON CONFLICT (id) DO NOTHING', [JSON.stringify(emptyState)]);
}
function authRequired(req, res, next) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Sign in required.' });
  try { req.user = jwt.verify(token, JWT_SECRET); next(); }
  catch { return res.status(401).json({ error: 'Invalid or expired token.' }); }
}
function requireRole(...roles) { return (req, res, next) => roles.includes(req.user?.role) ? next() : res.status(403).json({ error: 'You do not have permission for this action.' }); }
app.get('/api/health', async (_req, res) => {
  try {
    if (!pool) return res.status(503).json({ ok: false, service: 'oilloop-api', database: 'not-configured', hint: 'Set DATABASE_URL in .env and start PostgreSQL.' });
    await pool.query('SELECT 1');
    res.json({ ok: true, service: 'oilloop-api', database: 'postgresql', timestamp: new Date().toISOString() });
  } catch { res.status(503).json({ ok: false, service: 'oilloop-api', database: 'unavailable' }); }
});

app.post('/api/auth/register', async (req, res, next) => {
  try {
    if (!pool) return res.status(503).json({ error: 'Database is not configured.' });
    const { name, email, password, role } = req.body || {};
    if (!name?.trim() || !email?.trim() || typeof password !== 'string' || password.length < 10) return res.status(400).json({ error: 'Name, email and password (minimum 10 characters) are required.' });
    if (!['restaurant','collector'].includes(role)) return res.status(400).json({ error: 'Public registration is only available for restaurant and collector accounts.' });
    const count = await pool.query('SELECT COUNT(*)::int AS n FROM users');
    const hash = await bcrypt.hash(password, 12);
    const result = await pool.query('INSERT INTO users(name,email,password_hash,role,active) VALUES($1,$2,$3,$4,$5) RETURNING id,name,email,role,active,created_at', [name.trim(), email.trim().toLowerCase(), hash, role, Number(count.rows[0].n) === 0]);
    const user = result.rows[0];
    res.status(201).json({ user, token: jwt.sign({ sub: user.id, name: user.name, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '8h' }) });
  } catch (e) { if (e.code === '23505') return res.status(409).json({ error: 'An account with this email already exists.' }); next(e); }
});
app.post('/api/auth/login', async (req, res, next) => {
  try {
    if (!pool) return res.status(503).json({ error: 'Database is not configured.' });
    const { email, password } = req.body || {};
    const result = await pool.query('SELECT id,name,email,password_hash,role,active FROM users WHERE email=$1', [String(email || '').trim().toLowerCase()]);
    const user = result.rows[0];
    if (!user || !user.active || !(await bcrypt.compare(String(password || ''), user.password_hash))) return res.status(401).json({ error: 'Email or password is incorrect, or account is inactive.' });
    const token = jwt.sign({ sub: user.id, name: user.name, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '8h' });
    delete user.password_hash;
    res.json({ user, token });
  } catch (e) { next(e); }
});
app.get('/api/auth/me', authRequired, (req, res) => res.json({ user: req.user }));

app.get('/api/state', async (_req, res, next) => {
  try {
    if (!pool) return res.status(503).json({ error: 'Database is not configured. Start PostgreSQL and set DATABASE_URL.' });
    const result = await pool.query('SELECT data, updated_at FROM app_state WHERE id=1');
    res.json({ data: result.rows[0]?.data || emptyState, updatedAt: result.rows[0]?.updated_at || null });
  } catch (e) { next(e); }
});
app.put('/api/state', async (req, res, next) => {
  try {
    if (!pool) return res.status(503).json({ error: 'Database is not configured. Start PostgreSQL and set DATABASE_URL.' });
    const data = req.body?.data;
    if (!data || typeof data !== 'object' || Array.isArray(data)) return res.status(400).json({ error: 'Body must contain a data object.' });
    for (const key of ['restaurants', 'pickups', 'batches', 'routes', 'audit']) if (data[key] !== undefined && !Array.isArray(data[key])) return res.status(400).json({ error: `${key} must be an array.` });
    const clean = { ...emptyState, ...data };
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('INSERT INTO app_state(id,data,updated_at) VALUES(1,$1::jsonb,NOW()) ON CONFLICT(id) DO UPDATE SET data=EXCLUDED.data, updated_at=NOW()', [JSON.stringify(clean)]);
      for (const r of clean.restaurants) {
        if (!r?.id || !r?.name) continue;
        await client.query(`INSERT INTO restaurants(id,name,contact_name,phone,email,address,status,payload,updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8::jsonb,NOW()) ON CONFLICT(id) DO UPDATE SET name=EXCLUDED.name,contact_name=EXCLUDED.contact_name,phone=EXCLUDED.phone,email=EXCLUDED.email,address=EXCLUDED.address,status=EXCLUDED.status,payload=EXCLUDED.payload,updated_at=NOW()`, [String(r.id), String(r.name), r.contact || r.contactName || null, r.phone || null, r.email || null, r.address || null, r.status || 'Pending', JSON.stringify(r)]);
      }
      for (const p of clean.pickups) {
        if (!p?.id) continue;
        await client.query(`INSERT INTO pickups(id,restaurant_id,status,scheduled_at,litres,collector_id,payload,updated_at) VALUES($1,$2,$3,$4,$5,$6,$7::jsonb,NOW()) ON CONFLICT(id) DO UPDATE SET restaurant_id=EXCLUDED.restaurant_id,status=EXCLUDED.status,scheduled_at=EXCLUDED.scheduled_at,litres=EXCLUDED.litres,collector_id=EXCLUDED.collector_id,payload=EXCLUDED.payload,updated_at=NOW()`, [String(p.id), p.restaurantId ? String(p.restaurantId) : null, p.status || 'Requested', p.scheduledAt || p.date || null, Number.isFinite(Number(p.litres)) ? Number(p.litres) : null, p.collectorId ? String(p.collectorId) : null, JSON.stringify(p)]);
      }
      for (const b of clean.batches) {
        if (!b?.id) continue;
        await client.query(`INSERT INTO batches(id,pickup_id,status,litres,grade,payload,updated_at) VALUES($1,$2,$3,$4,$5,$6::jsonb,NOW()) ON CONFLICT(id) DO UPDATE SET pickup_id=EXCLUDED.pickup_id,status=EXCLUDED.status,litres=EXCLUDED.litres,grade=EXCLUDED.grade,payload=EXCLUDED.payload,updated_at=NOW()`, [String(b.id), b.pickupId ? String(b.pickupId) : null, b.status || 'Collected', Number.isFinite(Number(b.litres)) ? Number(b.litres) : null, b.grade || null, JSON.stringify(b)]);
      }
      await client.query('COMMIT');
    } catch (e) { await client.query('ROLLBACK'); throw e; } finally { client.release(); }
    res.json({ ok: true, savedAt: new Date().toISOString(), database: 'postgresql' });
  } catch (e) { next(e); }
});
app.get('/api/restaurants', authRequired, requireRole('admin'), async (_req, res, next) => {
  try { const r = await pool.query('SELECT id,name,contact_name,phone,email,address,status,payload,updated_at FROM restaurants ORDER BY updated_at DESC'); res.json({ data: r.rows }); } catch(e) { next(e); }
});
app.get('/api/pickups', authRequired, requireRole('admin','collector'), async (_req, res, next) => {
  try { const r = await pool.query('SELECT id,restaurant_id,status,scheduled_at,litres,collector_id,payload,updated_at FROM pickups ORDER BY updated_at DESC'); res.json({ data: r.rows }); } catch(e) { next(e); }
});
app.get('/api/batches', authRequired, requireRole('admin','collector'), async (_req, res, next) => {
  try { const r = await pool.query('SELECT id,pickup_id,status,litres,grade,payload,updated_at FROM batches ORDER BY updated_at DESC'); res.json({ data: r.rows }); } catch(e) { next(e); }
});
app.get('/api/admin/users', authRequired, requireRole('admin'), async (_req, res, next) => {
  try { const r = await pool.query('SELECT id,name,email,role,active,created_at FROM users ORDER BY created_at DESC'); res.json({ data: r.rows }); } catch(e) { next(e); }
});
app.patch('/api/admin/users/:id/active', authRequired, requireRole('admin'), async (req, res, next) => {
  try { const active = Boolean(req.body?.active); const r = await pool.query('UPDATE users SET active=$1 WHERE id=$2 RETURNING id,name,email,role,active', [active, req.params.id]); if (!r.rowCount) return res.status(404).json({ error: 'User not found.' }); res.json({ user: r.rows[0] }); } catch(e) { next(e); }
});
app.use((err, _req, res, _next) => { console.error(err); res.status(500).json({ error: 'Internal server error.' }); });
initDb().then(() => app.listen(PORT, () => console.log(`OilLoop API running at http://localhost:${PORT}`))).catch(err => { console.error('Database initialization failed:', err.message); process.exit(1); });
