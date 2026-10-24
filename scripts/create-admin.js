import 'dotenv/config';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import { stdin } from 'node:process';
const { Pool } = pg;
const [emailArg, nameArg] = process.argv.slice(2);
const email = (emailArg || process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const name = (nameArg || process.env.ADMIN_NAME || 'OilLoop Administrator').trim();
const password = process.env.ADMIN_PASSWORD;
if (!process.env.DATABASE_URL) { console.error('Set DATABASE_URL in .env first.'); process.exit(1); }
if (!email || !password || password.length < 12) { console.error('Usage: ADMIN_PASSWORD="12+ character password" npm run create-admin -- admin@example.com "Admin Name"'); process.exit(1); }
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : undefined });
try {
  const hash = await bcrypt.hash(password, 12);
  const result = await pool.query(`INSERT INTO users(name,email,password_hash,role,active) VALUES($1,$2,$3,'admin',true) ON CONFLICT(email) DO UPDATE SET name=EXCLUDED.name,password_hash=EXCLUDED.password_hash,role='admin',active=true RETURNING id,name,email,role,active`, [name,email,hash]);
  console.log('Admin account ready:', result.rows[0]);
} catch (e) { console.error(e.message); process.exitCode = 1; }
finally { await pool.end(); }
