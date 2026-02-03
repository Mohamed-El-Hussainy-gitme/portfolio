import fs from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve(process.cwd(), "out");
const ORIGIN =
  (process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://elhussainy.pages.dev").replace(/\/+$/, "");

// لو عندك لغات إضافية ضيفها هنا
const LOCALES = new Set(["en", "ar"]);

// ملفات لازم تتجاهلها من السايت ماب
const IGNORE_HTML = new Set(["404.html"]);
const IGNORE_PREFIXES = ["_next/", "assets/", "brand/", "skills/", "reviews/"];

function toPosix(p) {
  return p.split(path.sep).join("/");
}

function escapeXml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

function isLocaleHtml(relPosix) {
  // يقبل: en.html / ar.html / en/about.html / ar/blog/slug.html
  const first = relPosix.split("/")[0] || "";
  const maybeLocale = first.replace(/\.html$/i, "");
  return LOCALES.has(maybeLocale) || LOCALES.has(first);
}

function htmlToCleanPath(relPosix) {
  // en.html -> /en
  // en/about.html -> /en/about
  let p = "/" + relPosix.replace(/\.html$/i, "");

  // index.html -> /
  if (p === "/index") p = "/";
  if (p.endsWith("/index")) p = p.slice(0, -"/index".length) || "/";

  return p;
}

async function main() {
  // 1) اجمع كل ملفات html من out
  const all = await walk(OUT_DIR);
  const htmlFiles = all.filter((f) => f.toLowerCase().endsWith(".html"));

  const urls = new Set();

  for (const file of htmlFiles) {
    const rel = toPosix(path.relative(OUT_DIR, file));

    // تجاهل مسارات داخلية/أصول
    if (IGNORE_PREFIXES.some((p) => rel.startsWith(p))) continue;

    // تجاهل صفحات معينة
    if (IGNORE_HTML.has(rel)) continue;

    // تجاهل ملفات تحقق جوجل googlexxxx.html
    if (/^google[a-z0-9]+\.html$/i.test(rel)) continue;

    // نضيف فقط صفحات اللغات (en/ar)
    if (!isLocaleHtml(rel)) continue;

    const cleanPath = htmlToCleanPath(rel);

    // لا نضيف "/" لأنه عندك ريديركت إلى /en (تجنب دوبلكيت)
    if (cleanPath === "/") continue;

    urls.add(`${ORIGIN}${cleanPath}`);
  }

  const sorted = [...urls].sort((a, b) => a.localeCompare(b));

  // 2) اكتب sitemap.xml
  const lastmod = new Date().toISOString();
  const xmlLines = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...sorted.map(
      (u) => `  <url><loc>${escapeXml(u)}</loc><lastmod>${lastmod}</lastmod></url>`
    ),
    `</urlset>`,
    ``,
  ];

  await fs.writeFile(path.join(OUT_DIR, "sitemap.xml"), xmlLines.join("\n"), "utf8");

  // 3) اكتب robots.txt (بدون Host نهائيًا)
  const robots = [
    `User-agent: *`,
    `Allow: /`,
    ``,
    `Sitemap: ${ORIGIN}/sitemap.xml`,
    ``,
  ].join("\n");

  await fs.writeFile(path.join(OUT_DIR, "robots.txt"), robots, "utf8");

  console.log(`[seo] wrote: out/sitemap.xml (${sorted.length} urls)`);
  console.log(`[seo] wrote: out/robots.txt`);
}

main().catch((err) => {
  console.error("[seo] failed:", err);
  process.exit(1);
});
