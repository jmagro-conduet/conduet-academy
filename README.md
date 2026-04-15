# Conduet Academy

A session-gated web application and permanent knowledge hub for Conduet's internal AI training programme. Built with Next.js 14, Supabase, and Tailwind CSS. Deployed at `academy.conduet.com`.

## Tech stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v3 + inline styles
- **Database + Auth:** Supabase (PostgreSQL, email + password)
- **Deployment:** Vercel

---

## Local setup

### 1. Clone and install

```bash
git clone git@github.com:conduet/conduet-academy.git
cd conduet-academy
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

```
NEXT_PUBLIC_SUPABASE_URL=           # from Supabase project dashboard
NEXT_PUBLIC_SUPABASE_ANON_KEY=      # from Supabase project dashboard
SUPABASE_SERVICE_ROLE_KEY=          # server-side operations only
NEXT_PUBLIC_APP_URL=https://academy.conduet.com
NEXT_PUBLIC_APP_NAME=Conduet Academy
```

### 3. Run locally

```bash
npm run dev
```

App runs at `http://localhost:3000`.

---

## Supabase setup

### Run the schema

Open your Supabase project → **SQL Editor** → paste and run the full schema from section 4 of the SOW.

The schema creates:
- `profiles` — extends `auth.users`, auto-created on signup
- `user_sessions` — which sessions each user has unlocked
- `saved_prompts` — prompts a user has saved

The database trigger `on_auth_user_created` auto-unlocks session 101 for every new user.

### Auth settings

In Supabase Dashboard → **Authentication → Settings**:
- **Email confirmations:** OFF (internal use, reduces friction)
- **Email + password:** enabled
- **Magic links / OAuth:** disabled

---

## How to add 201 and 301 content

When content is ready after each session:

1. Open `lib/content/session-201.ts` (or `session-301.ts`)
2. Replace the `tabs201` placeholder objects with real content — follow the structure in `lib/content/session-101.ts` as a reference
3. Update `app/session/201/page.tsx` to render real tab components instead of `<PlaceholderTab />`

No schema changes needed — content lives entirely in TypeScript files.

---

## How to update session codes

Session unlock codes are in `lib/unlock.ts`:

```typescript
const SESSION_CODES: Record<string, string> = {
  '101': 'CRAWL-101',
  '201': 'WALK-201',
  '301': 'RUN-301',
}
```

Change the values here. Codes are case-insensitive on entry (trimmed + uppercased before comparison).

> v2: move codes to a Supabase table so they can be changed without a deploy.

---

## Deploying to Vercel

```bash
# 1. Push to GitHub
git push origin main

# 2. Import in Vercel
# vercel.com → New Project → Import from GitHub → conduet-academy

# 3. Add environment variables in Vercel project dashboard
# (same as .env.local — never commit .env.local)
```

Vercel auto-deploys on every push to `main`.

### Custom domain

Vercel project → **Domains** → add `academy.conduet.com` → add a CNAME record pointing to `cname.vercel-dns.com` at your DNS registrar.

---

## How to add a new session track

The app is designed to grow. To add a new session (e.g. `401`):

1. **Content:** Create `lib/content/session-401.ts` following the pattern of `session-101.ts`
2. **Page:** Create `app/session/401/page.tsx`
3. **Registry:** Add the session to the `sessions` array in `lib/content/shared.ts`
4. **Code:** Add `'401': 'YOUR-CODE'` to `SESSION_CODES` in `lib/unlock.ts`
5. **Database:** The `user_sessions` table stores `session_id` as a plain string — no schema change needed
6. **Nav:** Add an entry to the `nav` array in `lib/content/shared.ts`

No rebuild required for content-only changes — redeploy and it's live.

---

## Project structure

```
app/
  layout.tsx              Root layout, nav, footer, auth provider
  page.tsx                Landing page
  auth/login/             Login page
  auth/signup/            Signup page
  auth/callback/          Supabase auth callback
  session/101/            101 content hub (5 tabs, full content)
  session/201/            201 hub (placeholder tabs)
  session/301/            301 hub (placeholder tabs)
  prompts/                Full prompt library with search + filter
  glossary/               15-term glossary (public)
components/
  auth/AuthProvider.tsx   Supabase session context + unlock state
  auth/AuthForm.tsx       Shared login/signup form
  academy/SessionCard.tsx Session card (locked/unlocked states)
  academy/UnlockModal.tsx Code entry modal with session-colour CTA
  academy/PromptCard.tsx  Prompt card with copy + save to Supabase
  ui/Nav.tsx              Navigation with lock indicators
  ui/Footer.tsx           Footer
lib/
  supabase/client.ts      Browser Supabase client
  supabase/server.ts      Server Supabase client
  content/shared.ts       Sessions, glossary, resources, nav config
  content/session-101.ts  All 101 content (field guide, prompts, etc.)
  content/session-201.ts  201 structure + placeholder blocks
  content/session-301.ts  301 structure + placeholder blocks
  unlock.ts               Validates codes, writes to user_sessions
middleware.ts             Protects /session and /prompts routes
```
