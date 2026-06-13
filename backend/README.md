Backend for CRUD app (Express + Postgres/Supabase)

Setup:

1. Copy `.env.example` to `.env` and set `DATABASE_URL` (Supabase connection string).
2. Install deps: `npm install`.
3. Run migrations against your Supabase DB:
   - `cd backend && npm run migrate`
4. Run locally: `npm run start` (or `npm run dev` if you have nodemon).

The API now supports the following empresa fields:
- `nombre` (required)
- `ruc` (required, unique)
- `direccion`
- `rubro`
- `esactivo` (boolean)

Deploy:

- Push to a repo and deploy on Render (create a Web Service, set `DATABASE_URL` in env settings).
- Ensure the `DATABASE_URL` env var is set in Render and the service exposes the HTTP port.

Quick Render steps:

1. Create a Web Service on https://render.com and connect the GitHub repo `cristianzavaletab-lgtm/Flutter03`.
2. Set the **Root Directory** to `backend`.
3. Build Command: `npm install`  
   Start Command: `npm start`
4. Add environment variables in Render:
   - `DATABASE_URL` = your Supabase connection string
   - optionally `NODE_ENV=production`
5. Create the service and watch the deploy logs. The public URL will be provided by Render (e.g. `https://your-backend.onrender.com`).

After deploy, test the API:

```bash
curl https://your-backend.onrender.com/api/empresas
```

If you see JSON (e.g., `[]`), the backend is running and connected.
