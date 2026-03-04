# FunFinder732

A family activity guide for Monmouth County, NJ. FunFinder732 is a project by [Navesink Humans](https://navesinkhumans.com).

## Pages

- **Home** — Landing page with quick links
- **Family Fitness** — Gyms with childcare, summer camps, and membership pricing (Life Time, Atlantic Club, Red Bank YMCA)
- **Pools** — Public pools, YMCAs, private clubs & free spraygrounds, with a free/day-pass/membership filter
- **Park Events** — Monmouth County Park System Spring 2026 programs, searchable with month/category filters
- **Submit Event** — Community event submission form
- **About** — Project info

## Tech Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite 6](https://vitejs.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [React Router v7](https://reactrouter.com)
- [Lucide React](https://lucide.dev) for icons
- [Vercel Analytics](https://vercel.com/analytics)
- Deployed on [Vercel](https://vercel.com)

## Local Development

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`

## Build

```bash
npm run build
```

Output is in `dist/`.

## Deployment

Configured for Vercel via `vercel.json` at the repo root. No special root directory setting needed — point Vercel at the repo root and it picks up `npm run build` → `dist/` automatically. SPA routing is handled via rewrites.
