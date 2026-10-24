# OilLoop — Hackathon Demo (Fake Login + Three Workspaces)

This version is designed for a hackathon presentation: demonstrate the idea and workflow without real account creation or production-grade authentication. It keeps the Stitch-inspired company dashboard and includes restaurant and collector workspaces.

## Start on Mac / Windows

Requirements: Node.js 20+ and VS Code. Docker and PostgreSQL are **not included and not required** for the demo.

1. Extract the ZIP.
2. Open the `oilloop-working-prototype` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:
   ```bash
   npm install
   npm run dev
   ```
5. Open the local URL Vite prints, usually `http://localhost:5173`.
6. Choose a role on the OilLoop demo start page:
   - Company Admin — partner onboarding, pickups, quality intake, batch traceability
   - Restaurant Portal — request a pickup and see its status
   - Collector App — see tasks, mark arrival, complete collection and create a batch

## Fake login

No email/password is required. The start page is a role selector for the demo. It does not verify identity.

## Data behaviour

The demo stores workflow state in browser `localStorage`, so it persists in the same browser. If you use multiple roles, open them in the same browser profile. After making a change in one tab, refresh another already-open tab to see the latest state. An optional Express API is included, but PostgreSQL is not needed for the hackathon demo.

## Demo flow for judges

1. Open **Company Admin** and show the seeded partner network and operations dashboard.
2. Open **Restaurant Portal**, request a pickup for a demo partner and choose a date/slot/estimated litres.
3. Open **Company Admin** or **Admin booking queue** in the portal and confirm the booking, then assign a collector.
4. Open **Collector App**, mark arrival and complete the collection.
5. Show the created pickup and traceable batch in the company dashboard / batch trace page.

## Honest limitations

This is a demo prototype. Fake login is not authentication, and browser storage is not a shared database across devices. GPS, payment, official RUCO/CPCB integration, legally valid manifests/certificates and processor integrations are not connected. All seed data and compliance examples are illustrative.


## Separate demo portals
- Company Admin Dashboard: `/`
- Restaurant Portal: `/restaurant.html`
- Collector App: `/collector.html`

These are separate demo entry points with role-specific screens. Demo state is stored in browser localStorage; this is a hackathon prototype, not production authentication. There is no Docker configuration in this ZIP.
