# AIRA Frontend

Browser-safe Vite + React application for the AIRA recruiting platform.

Production frontend: `https://aira-front-end.vercel.app/`  
Production backend: `https://aira-backend-delta.vercel.app/`

## Responsibilities

- Public careers pages and job listings
- Public application form submission
- Admin login entry via backend Google OAuth
- Protected admin UI for applicants, jobs, and Gmail scan actions
- Typed API client layer for the separately deployed backend

This repo must stay browser-safe. Do not put Google secrets, Gmail tokens, Supabase service-role keys, or backend business logic here.

## Stack

- Vite
- React
- TypeScript
- React Router
- Vitest for basic frontend tests

## Environment

Copy `.env.example` to `.env`.

### Required variable

- `VITE_API_BASE_URL`
  Local development: `http://localhost:8787`
  Production: `https://aira-backend-delta.vercel.app`

If `VITE_API_BASE_URL` is omitted, the app falls back to `http://localhost:8787` on localhost and `https://aira-backend-delta.vercel.app` elsewhere. Set the variable explicitly in Vercel anyway.

## Scripts

- `npm run dev` starts the Vite dev server
- `npm run typecheck` runs TypeScript checks
- `npm run test` runs frontend tests
- `npm run build` creates the production build
- `npm run preview` serves the built app locally

## Local Development

1. Install dependencies with `npm install`
2. Copy `.env.example` to `.env`
3. Set `VITE_API_BASE_URL=http://localhost:8787`
4. Start the backend locally from the separate `backend/` repo
5. Run `npm run dev`
6. Open `http://localhost:5173`

Expected local flow:

- Public pages call the local backend
- Clicking `Continue with Google` redirects the browser to the backend OAuth start route
- After Google login, the backend sets the session cookie and redirects back to the frontend
- Protected admin routes then load data from the backend with `credentials: include`

## Vercel Deployment

Deploy `frontend/` as its own Vercel project.

### Recommended Vercel settings

- Framework preset: `Vite`
- Root directory: `frontend`
- Build command: `npm run build`
- Output directory: `dist`

### Required Vercel environment variable

- `VITE_API_BASE_URL=https://aira-backend-delta.vercel.app`

### Current route behavior

- `vercel.json` includes SPA rewrites so client-side routes like `/admin/applicants/:id` resolve correctly
- Static assets under `/assets/*` are cacheable
- The frontend never stores admin session tokens itself; cookies remain on the backend origin

## Connected Route Surface

Public routes:

- `/`
- `/jobs`
- `/jobs/:jobId`
- `/apply/:jobId`
- `/login`

Admin routes:

- `/admin`
- `/admin/applicants`
- `/admin/applicants/:applicantId`
- `/admin/jobs`
- `/admin/jobs/:jobId`

Backend API integrations already connected:

- `GET /auth/session`
- `GET /auth/google/start`
- `POST /auth/logout`
- `GET /jobs`
- `GET /jobs/:jobId`
- `POST /applications`
- `GET /admin/applicants`
- `GET /admin/applicants/:applicantId`
- `PATCH /admin/applicants/:applicantId/status`
- `GET /admin/jobs`
- `GET /admin/jobs/:jobId`
- `PATCH /admin/jobs/:jobId`
- `POST /gmail/scan`

## Security Notes

- The frontend only knows the backend base URL
- All authenticated requests use `credentials: include`
- No OAuth client secret, refresh token, Gmail token, or Supabase service-role key belongs in this repo
- Google sign-in is initiated from the browser, but the OAuth code exchange and token storage happen only in the backend

## What This Repo Does Not Handle

- Gmail token storage
- Session signing
- Supabase admin access
- Gmail scanning logic
- Resume attachment processing
- Cron execution

Those stay in `backend/`.

## Tests

Current frontend tests cover:

- API base URL resolution
- Google sign-in URL generation

Run them with `npm run test`.
