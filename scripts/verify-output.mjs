import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "out");
const PUBLIC_DIR = path.join(ROOT, "public");
const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://elhussainy.pages.dev").replace(/\/+$/, "");
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function readUtf8(filePath) {
  return fs.readFile(filePath, "utf8");
}

async function main() {
  const sitemapPath = path.join(OUT_DIR, "sitemap.xml");
  const robotsPath = path.join(OUT_DIR, "robots.txt");
  const routesPath = path.join(PUBLIC_DIR, "_routes.json");

  const sitemap = await readUtf8(sitemapPath);
  const robots = await readUtf8(robotsPath);
  const routes = JSON.parse(await readUtf8(routesPath));

  assert(sitemap.includes('<?xml version="1.0" encoding="UTF-8"?>'), "out/sitemap.xml is missing the XML declaration");
  assert(sitemap.includes("<urlset"), "out/sitemap.xml is missing <urlset>");
  assert(sitemap.includes(`<loc>${SITE_ORIGIN}`), "out/sitemap.xml does not contain the configured site origin");

  assert(robots.includes("User-agent: *"), "out/robots.txt is missing User-agent: *");
  assert(robots.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`), "out/robots.txt does not point to the configured sitemap URL");

  const publicEntries = await fs.readdir(PUBLIC_DIR);
  const verificationFiles = publicEntries.filter((name) => /^google[a-z0-9]+\.html$/i.test(name));

  for (const fileName of verificationFiles) {
    const publicFile = await readUtf8(path.join(PUBLIC_DIR, fileName));
    const outFile = await readUtf8(path.join(OUT_DIR, fileName));
    assert(publicFile === outFile, `${fileName} differs between public/ and out/`);
    assert(Array.isArray(routes.exclude) && routes.exclude.includes(`/${fileName}`), `_routes.json must exclude /${fileName} from Functions`);
  }

  if (GOOGLE_SITE_VERIFICATION) {
    const homeHtml = await readUtf8(path.join(OUT_DIR, "index.html"));
    assert(homeHtml.includes('name="google-site-verification"'), "out/index.html is missing the google-site-verification meta tag");
    assert(homeHtml.includes(GOOGLE_SITE_VERIFICATION), "out/index.html does not contain NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION");
  }

  console.log("[verify-output] OK");
}

main().catch((error) => {
  console.error("[verify-output] failed:", error.message);
  process.exit(1);
});
