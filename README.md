# AIRA Frontend

Browser-facing application for the AIRA recruiting platform.

## Responsibilities

- Public careers pages and job listings
- Public application flow
- Admin-facing UI shells and routing
- Google sign-in entrypoints that redirect to the backend
- API client layer for calling protected backend endpoints

This repository must remain browser-safe. It should not contain secrets, Gmail tokens, service-role credentials, or backend-only business logic.

## Tech Stack

- Vite
- React
- TypeScript
- React Router

## Scripts

- `npm run dev` starts the Vite development server
- `npm run typecheck` validates TypeScript
- `npm run build` creates a production build
- `npm run preview` serves the built app locally

## Environment

Copy `.env.example` to `.env` and update values as needed.

Required variables:

- `VITE_API_BASE_URL` backend base URL

## Vercel Deployment

- Deploy this repository as its own Vercel project
- Use a static frontend domain such as `app.example.com`
- Set `VITE_API_BASE_URL` to the separately deployed backend API domain
- `vercel.json` includes an SPA rewrite so client-side routes resolve correctly

## Structure

```text
src/
  components/      shared UI
  config/          browser-safe env access
  data/            temporary local placeholder data
  features/
    auth/          Google sign-in entrypoints and auth types
  lib/             generic browser utilities
  pages/
    admin/         admin page scaffolding
  styles/          global styling
```
