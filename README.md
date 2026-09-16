# Ojuloge's Beauty

Marketing site for Ojuloge's Beauty — bridal makeup, Gele, microblading & locs, Burnley + Manchester.

Built with **TanStack Start** (React + Vite) and **Lovable Cloud** (Supabase) for the contact-form inbox, admin dashboard, and click analytics.

---

## Edit in Lovable

The canonical project lives in Lovable. Open the project, chat your changes, and every commit is pushed to this GitHub repo automatically. Pulls from GitHub → Lovable also sync in real time, so editing locally or on any host is safe.

---

## Run locally

```bash
bun install
bun run dev
```

App runs on `http://localhost:8080`.

## Deploy to Netlify (zero config)

`netlify.toml` is already in the repo, so Netlify picks everything up automatically:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
  NITRO_PRESET = "netlify"
```

Steps: Netlify → **Add new site → Import an existing project** → pick this repo → Deploy.
Then **Site configuration → Environment variables** and paste the 6 variables listed below.

## Deploy to Vercel

`vercel.json` is included:

```json
{
  "buildCommand": "NITRO_PRESET=vercel npm run build",
  "outputDirectory": ".vercel/output",
  "framework": null
}
```

## Build locally

```bash
bun run build
```


The deploy target is chosen by the `NITRO_PRESET` environment variable:

| Host | `NITRO_PRESET` | Publish directory |
|---|---|---|
| Netlify | `netlify` | `dist` |
| Vercel | `vercel` | `.vercel/output` |
| Cloudflare Pages / Workers | *(unset — default)* | `dist/client` |

---

## Environment variables (REQUIRED on the host)

Copy these from `.env` (or from Lovable → Cloud → API) into your host's dashboard. **Without them the contact form and analytics no-op** (the site still renders fine).

| Variable | Where it's used |
|---|---|
| `VITE_SUPABASE_URL` | Browser — Supabase client |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Browser — Supabase client |
| `VITE_SUPABASE_PROJECT_ID` | Browser — Supabase client |
| `SUPABASE_URL` | Server — SSR fallback + server functions |
| `SUPABASE_PUBLISHABLE_KEY` | Server — SSR fallback + server functions |
| `SUPABASE_PROJECT_ID` | Server — SSR fallback |

Open the `.env` file in this repo and copy each value across — the `SUPABASE_*` values are identical to the `VITE_SUPABASE_*` ones.


Set them in:
- **Vercel:** Project → Settings → Environment Variables
- **Netlify:** Site → Site configuration → Environment variables
- **Cloudflare Pages:** Project → Settings → Environment variables

All keys above are **publishable** (safe in the browser). No secret keys are needed for the public site.

---

## Sync between Lovable & your host

1. Connect this repo to your host (Vercel/Netlify/Cloudflare) — they auto-deploy on every `git push`.
2. Continue editing in Lovable. Each Lovable change → commits to GitHub → triggers a new deploy on your host.
3. Pushes from your laptop also flow back into Lovable, so nothing falls out of sync.

That's it — one source of truth (this repo), one set of env vars on the host, deploys handled automatically.
