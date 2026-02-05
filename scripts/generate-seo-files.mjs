import fs from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve(process.cwd(), "out");
const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://elhussainy.pages.dev").replace(/\/+$/, "");

function toPosix(p) {
  return p.split(path.sep).join("/");
}

function normalizePath(p) {
  if (!p.startsWith("/")) p = `/${p}`;
  p = p.replace(/\/{2,}/g, "/");
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

function stripHtml(fileRel) {
  if (fileRel.toLowerCase().endsWith(".html")) {
    return fileRel.slice(0, -".html".length);
  }
  return fileRel;
}

function toCanonicalPath(fileRelPosix) {
  const rel = fileRelPosix;

  const baseName = rel.split("/").pop() || "";
  if (/^google[a-z0-9]+\.html$/i.test(baseName)) return null;
  if (baseName === "404.html") return null;

  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) {
    const dir = rel.slice(0, -"/index.html".length);
    return normalizePath(dir);
  }

  const noExt = stripHtml(rel);
  return normalizePath(noExt);
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function makeUrl(pathname) {
  const p = pathname === "/" ? "" : pathname;
  return `${SITE_ORIGIN}${p}`;
}

function isoDate() {
  return new Date().toISOString();
}

function makeSitemap(urls) {
  const now = isoDate();
  const body = urls
    .map((u) => {
      return `
  <url>
    <loc>${u}</loc>
    <lastmod>${now}</lastmod>
  </url>`.trim();
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

function makeRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;
}

async function main() {
  const htmlFiles = (await walk(OUT_DIR)).filter((f) => f.toLowerCase().endsWith(".html"));

  const paths = new Set();

  for (const f of htmlFiles) {
    const rel = toPosix(path.relative(OUT_DIR, f));

    // forbid legacy /en outputs
    if (rel === "en.html" || rel.startsWith("en/")) continue;

    const canonicalPath = toCanonicalPath(rel);
    if (!canonicalPath) continue;

    paths.add(canonicalPath);
  }

  // Ensure both homes exist
  paths.add("/");
  paths.add("/ar");

  const sorted = Array.from(paths).sort((a, b) => {
    if (a === "/") return -1;
    if (b === "/") return 1;
    return a.localeCompare(b);
  });

  const urls = sorted.map(makeUrl);

  await fs.writeFile(path.join(OUT_DIR, "sitemap.xml"), makeSitemap(urls), "utf8");
  await fs.writeFile(path.join(OUT_DIR, "robots.txt"), makeRobots(), "utf8");

  console.log(`[seo] sitemap: ${urls.length} urls`);
  console.log("[seo] wrote out/sitemap.xml and out/robots.txt");
}

main().catch((e) => {
  console.error("[seo] failed:", e);
  process.exit(1);
});
