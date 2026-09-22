# Tide Adesanya's portfolio

Next.js (App Router), Tailwind CSS v4, TypeScript. Builds to a static site.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

## Edit your content

- `src/data/site.ts`: email, GitHub, Twitter, LinkedIn, CV file name
- `src/data/projects.ts`: every project shown on the home page and its own page
- `src/app/page.tsx`: hero text, background, timeline and tools
- `src/app/globals.css`: colours (chart palette) and animation

To add a project, add one entry to `projects.ts`. Its page is created automatically.

## Before you publish

1. `public/Tide-Adesanya-CV.pdf` is the public copy of your CV (referees
   listed as "available on request"). Replace it whenever you update your CV.
2. Add your LinkedIn URL in `src/data/site.ts` if you want it shown.

## Deploy

**GitHub Pages (current site):** push to `main`. In the repo, go to
Settings > Pages and set Source to "GitHub Actions". The workflow in
`.github/workflows/deploy.yml` builds and publishes it at
`/<repo-name>`.

**Netlify or Vercel:** connect the repo. Build command `npm run build`,
publish directory `out`. No `BASE_PATH` needed.
