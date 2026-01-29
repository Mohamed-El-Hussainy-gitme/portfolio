# Elhussainy Portfolio (Next.js App Router)

Canonical origin (do not change):
- https://elhussainy-portfolio.pages.dev

## Requirements
- Node.js >= 18 (recommended: 20)
- npm

## Install
```bash
npm install
```

## Local development
```bash
npm run dev
```

## Production build (Next)
```bash
npm run build
```

## Cloudflare Pages build (recommended)
This project is configured for Cloudflare Pages via **@cloudflare/next-on-pages**.

### Cloudflare Pages settings
- Build command: `npm run pages:build`
- Build output directory: `.vercel/output/static`

### Build locally (optional)
```bash
npm run pages:build
```

## Deploy with Wrangler (optional)
```bash
npm run deploy
```

## Verification checklist
- `GET /sitemap.xml` returns valid XML
- `GET /robots.txt` contains:
  - `Sitemap: https://elhussainy-portfolio.pages.dev/sitemap.xml`
- All canonical URLs use: `https://elhussainy-portfolio.pages.dev`
- hreflang alternates exist for `en`, `ar`, and `x-default`
- Unknown slugs return 404
- Lighthouse SEO score check
- Search Console: submit sitemap + request indexing
