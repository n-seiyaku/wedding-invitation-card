This repository is a Next.js 15 (app router) project for a wedding invitation site. Use these focused guidelines to be immediately productive.

- Project entrypoints
    - `package.json` scripts: use `npm run dev` for local development, `npm run build` and `npm run start` for production. The app is Next.js 15.
    - Pages and components live under the `app/` folder (app router). Key files: `app/layout.jsx`, `app/providers.jsx`, `app/page.jsx` and subfolders under `app/(main)` and `app/(admin)`.

- Authentication & API
    - Supabase client is constructed at `app/api/supabaseConfig.js`. It expects environment variables `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
    - Server endpoints use Next.js route handlers in `app/api/*/route.js` (examples: `login`, `logout`, `refresh-token`, `images`). Review these when changing auth flows.
    - Client auth helper is `app/lib/AuthProvider.jsx`. It exposes `login`, `logout`, `refresh` and `authFetch` and stores an access token in React state. Use `useAuth()` in client components that need auth.

- UI & styling
    - Uses Tailwind + MUI components. Styling often mixes Tailwind classes with MUI `sx` props (see `app/components/Invite.jsx` and `app/components/Album.jsx`). Prefer keeping layout in Tailwind and visual controls in MUI where already used.
    - Fonts are configured in `app/layout.jsx` via `next/font/google` and applied using CSS variables like `--font-roboto` and `--font-dancing-script`.

- Data flows and conventions
    - Database calls use the shared `supabase` client and `.from(...).select/insert` patterns (see `Invite.jsx` inserting to `information` table). Handle Supabase errors using the `{ data, error }` response shape.
    - API route handlers sometimes call `app/lib/auth` utilities (see `app/api/login/route.js` and `app/api/refresh-token/route.js`). When editing those, keep cookie and credential handling consistent with `AuthProvider` which relies on `credentials: 'include'`.

- Patterns to follow
    - Client components that call protected endpoints should use `useAuth().authFetch(...)` so token-refresh is applied automatically.
    - Server code should import `supabase` from `app/api/supabaseConfig.js` (do not recreate clients). Environment variables are authoritative; if a variable is missing, `supabaseConfig` throws.
    - Prefer small, focused commits for UI behavior changes; this repo mixes server routes and client code closely, so keep changes local to a route/component pair when possible.

- Dev/debugging tips
    - Start dev server with `npm run dev` and open http://localhost:3000.
    - If Supabase returns storage/listing or auth errors, inspect `app/api/images/route.js` and the server console; API routes log Supabase errors in-place.
    - Linting and formatting: use `npm run lint` (ESLint) and `npm run pretty` (Prettier + Tailwind plugin).

- Files to inspect first for most tasks
    - `app/lib/AuthProvider.jsx` — token refresh & authFetch logic
    - `app/api/supabaseConfig.js` — Supabase client and env variables
    - `app/providers.jsx` and `app/layout.jsx` — global providers and font setup
    - `app/components/Invite.jsx`, `app/components/Album.jsx` — examples of UI + Supabase usage
    - `app/api/*/route.js` — server-side handlers (login, refresh-token, logout, images)

- When you cannot find behavior in code
    - Search for `refresh-token`, `login`, or `supabase` in `app/` to locate related flows. Prefer reading the API routes before changing any client-side expectation.

If anything here is unclear or you'd like additional examples (tests, sample API edits, or a short walkthrough modifying `Invite.jsx`), tell me which area to expand.
