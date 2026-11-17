# Prime Axis

The Prime Axis studio site: a multi-page React site for a remote-first engineering studio that builds scalable web systems and business automation.

The design is built from stacked white, violet and black panels, with iridescent 3D objects, count-up figures and restrained motion. The content covers the studio, services, selected work, team, careers and a three-step project brief.

## Stack

- React 19 + React Router 8
- Vite 8 + TypeScript
- Tailwind CSS 4
- Motion for animation
- Cloudflare Workers for the API and static hosting
- Bun for the local workflow

## Run it

```sh
bun install
bun run dev        # http://localhost:5305
bun run build      # dist/client + dist/creative_agency
bun run typecheck
```

## Edit it

- **`src/data.ts` holds every string, figure and piece of seed data.** Start there.
  - `SITE`, `NAV`, `MENU`: name, contact details, socials and navigation.
  - `HOME`, `SERVICES`, `APPROACH`, `PROCESS`, `CONTACT`: the main site copy.
  - `STUDIO`: the about section, team members, skills and stats.
  - `PROJECTS`, `TESTIMONIALS`, `CLIENTS`: the work section.
  - `CAREERS`, `ROLES`, `FAQ`, `ENGAGEMENTS`: careers, pricing and FAQs.
- **Images** are in `public/images/`. Team portraits are in `public/images/team/`; the iridescent objects are in `public/images/holo/` and are rendered by `<Holo kind="…">`.
- **Pages** live in `src/pages/` and routes are declared in `src/App.tsx`.
- **The API** is `src/worker/index.ts`. It handles `POST /api/briefs`, `POST /api/applications`, `POST /api/subscribe` and `GET /api/health`. Validation is shared with the forms through `src/shared/validation.ts`.
- **Browser storage** (`src/lib/storage.ts`) keeps brief drafts, sent briefs and sent applications in `localStorage`.

## Routes

- `/` — home
- `/services` — services, process, engagements and FAQ
- `/studio` — about, stats, values and team
- `/work` and `/work/:slug` — project index and case studies
- `/careers` and `/careers/:slug` — open roles and applications
- `/contact` — three-step project brief
- `/styleguide` — live design tokens and components

## Deploy

The project builds for Cloudflare with Wrangler. `wrangler.jsonc` defines the Worker and static asset binding; `deploy.json` describes the built entrypoint and SPA fallback.
