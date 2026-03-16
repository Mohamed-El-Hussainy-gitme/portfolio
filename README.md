# Elhussainy Portfolio (Next.js App Router + Cloudflare Pages Static Export)

Canonical origin:
- `https://elhussainy.pages.dev`

## Requirements
- Node.js >= 20.9
- npm

## Install
```bash
npm install
```

## Environment
Create `.env.local` from `.env.example` and fill what you need:

```bash
cp .env.example .env.local
```

Supported variables:
- `NEXT_PUBLIC_SITE_ORIGIN` → canonical origin used for metadata, robots, and sitemap generation.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` → optional Google Search Console HTML meta verification token.
- `NEXT_PUBLIC_GA_ID` → optional Google Analytics ID.

## Search Console strategy
Primary verification method for the current Pages URL:
- **URL-prefix property**: `https://elhussainy.pages.dev/`
- **Primary verification**: HTML file in `public/google*.html`
- **Secondary fallback**: HTML meta tag via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`

Notes:
- The verification file must stay in `public/` unchanged.
- `robots.txt`, `sitemap.xml`, and `google*.html` are served as static assets and are excluded from Pages Functions.
- Canonical redirects are owned only by `functions/_middleware.ts`.

## Local development
```bash
npm run dev
```

## Build static output
```bash
npm run build
npm run verify:output
```

What `verify:output` checks:
- `out/sitemap.xml` exists and contains valid XML markers.
- `out/robots.txt` points to the configured sitemap URL.
- any `public/google*.html` verification file is copied to `out/` unchanged.

## Preview locally with Pages
```bash
npm run preview
```

## Deploy
```bash
npm run deploy
```

## Post-deploy smoke test
Run against production (or any deployed preview URL):

```bash
npm run smoke:deploy -- https://elhussainy.pages.dev
```

Smoke checks:
- `GET /robots.txt` → `200 text/plain`
- `GET /sitemap.xml` → `200 xml`
- `GET /google*.html` → `200` with no redirect and exact file body
- `GET /en` → redirects to `/`
- `GET /about.html` → redirects to `/about`

## Search Console flow after a successful deploy
1. Open the property `https://elhussainy.pages.dev/` in Search Console.
2. Verify ownership using the current HTML file or the meta token.
3. Confirm the verification URL opens publicly without auth and without redirects.
4. Submit `https://elhussainy.pages.dev/sitemap.xml`.
5. Re-check the Sitemaps report after Google fetches the file.

## Current routing ownership
- Static SEO files:
  - `public/google*.html`
  - generated `out/robots.txt`
  - generated `out/sitemap.xml`
- Canonical app redirects:
  - `functions/_middleware.ts`
- Pages Functions exclusions:
  - `public/_routes.json`

## Maintenance notes
- If Google gives you a new HTML verification file, replace the old one in `public/` with the new exact file name and body.
- If you prefer the meta-tag path, set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and redeploy.
- Keep `NEXT_PUBLIC_SITE_ORIGIN` aligned with the real production host before every deploy.


## Search Console verification (required deployment checklist)

Use a **URL-prefix property** for `https://elhussainy.pages.dev/` when verifying this Pages hostname. Google's HTML file and HTML meta-tag methods work for URL-prefix properties, while Domain properties require DNS verification instead.

1. Keep the HTML verification file in `public/` exactly as provided by Google.
2. Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Cloudflare Pages **build environment variables** if you also want the meta-tag fallback.
3. Trigger a fresh deploy after changing either the verification file or the environment variable.
4. Run `npm run smoke:deploy https://elhussainy.pages.dev` after deployment.
5. Verify in Search Console only after the smoke test passes.

The project now enforces these conditions during `npm run verify:output` and checks the live site during `npm run smoke:deploy`.
