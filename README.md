# FunFinder732

A family activity guide for Monmouth County, NJ. FunFinder732 is a project by [Navesink Humans](https://navesinkhumans.com).

## What it does

- **Home** — Landing page with quick links to sections
- **Family Fitness** — Gyms with childcare, summer camps, and membership pricing comparisons (Life Time, The Atlantic Club, Red Bank YMCA)
- **Submit Event** — Form for community members to submit local events
- **About** — Project info and contact

## Tech Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite 6](https://vitejs.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [React Router v7](https://reactrouter.com)
- [Lucide React](https://lucide.dev) for icons
- Deployed on [Vercel](https://vercel.com)

## Local Development

```bash
cd client
npm install
npm run dev
```

App runs at `http://localhost:5173`

## Build

```bash
cd client
npm run build
```

Output is in `client/dist/`.

## Deployment

The project is configured for Vercel. The `client/vercel.json` handles SPA routing rewrites. To deploy:

1. Import the repo into Vercel
2. Set the **Root Directory** to `client`
3. Vercel auto-detects Vite — no further config needed
