Backend for CRUD app (Express + Postgres/Supabase)

Setup:

1. Copy `.env.example` to `.env` and set `DATABASE_URL` (Supabase connection string).
2. Install deps: `npm install`.
3. Run migration SQL against your Supabase DB (use psql or Supabase SQL editor):
   - `backend/migrations/create_empresas.sql`
4. Run locally: `npm run start` (or `npm run dev` if you have nodemon).

Deploy:

- Push to a repo and deploy on Render (create a Web Service, set `DATABASE_URL` in env settings).
- Ensure the `DATABASE_URL` env var is set in Render and the service exposes the HTTP port.
