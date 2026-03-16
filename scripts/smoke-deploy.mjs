import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const DEFAULT_ORIGIN = (process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "https://elhussainy.pages.dev").replace(/\/+$/, "");
const origin = (process.argv[2] ?? DEFAULT_ORIGIN).replace(/\/+$/, "");

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function fetchManual(url) {
  const response = await fetch(url, { redirect: "manual" });
  const body = await response.text();
  return { response, body };
}

async function main() {
  const publicEntries = await fs.readdir(PUBLIC_DIR);
  const verificationFiles = publicEntries.filter((name) => /^google[a-z0-9]+\.html$/i.test(name));
  const verificationFile = verificationFiles[0];

  const checks = [];

  const robots = await fetchManual(`${origin}/robots.txt`);
  assert(robots.response.status === 200, `robots.txt returned ${robots.response.status}`);
  assert((robots.response.headers.get("content-type") ?? "").includes("text/plain"), "robots.txt content-type is not text/plain");
  assert(robots.body.includes(`Sitemap: ${origin}/sitemap.xml`), "robots.txt does not point to the expected sitemap URL");
  checks.push("robots.txt 200 text/plain");

  const sitemap = await fetchManual(`${origin}/sitemap.xml`);
  assert(sitemap.response.status === 200, `sitemap.xml returned ${sitemap.response.status}`);
  assert((sitemap.response.headers.get("content-type") ?? "").includes("xml"), "sitemap.xml content-type is not XML");
  assert(sitemap.body.includes("<urlset"), "sitemap.xml does not contain <urlset>");
  checks.push("sitemap.xml 200 xml");

  if (verificationFile) {
    const expectedVerificationBody = await fs.readFile(path.join(PUBLIC_DIR, verificationFile), "utf8");
    const verification = await fetchManual(`${origin}/${verificationFile}`);
    assert(verification.response.status === 200, `${verificationFile} returned ${verification.response.status}`);
    assert(!verification.response.headers.get("location"), `${verificationFile} redirected unexpectedly`);
    assert(verification.body.trim() === expectedVerificationBody.trim(), `${verificationFile} body does not match public/${verificationFile}`);
    checks.push(`${verificationFile} 200 no-redirect`);
  }

  const enRedirect = await fetchManual(`${origin}/en`);
  assert(enRedirect.response.status >= 300 && enRedirect.response.status < 400, `/en did not redirect (got ${enRedirect.response.status})`);
  assert((enRedirect.response.headers.get("location") ?? "").endsWith("/"), `/en redirect target is unexpected: ${enRedirect.response.headers.get("location")}`);
  checks.push("/en redirects to /");

  const aboutHtmlRedirect = await fetchManual(`${origin}/about.html`);
  assert(aboutHtmlRedirect.response.status >= 300 && aboutHtmlRedirect.response.status < 400, `/about.html did not redirect (got ${aboutHtmlRedirect.response.status})`);
  const aboutLocation = aboutHtmlRedirect.response.headers.get("location") ?? "";
  assert(aboutLocation.endsWith("/about"), `/about.html redirect target is unexpected: ${aboutLocation}`);
  checks.push("/about.html redirects to /about");

  console.log(`[smoke-deploy] OK for ${origin}`);
  for (const check of checks) {
    console.log(`- ${check}`);
  }
}

main().catch((error) => {
  console.error("[smoke-deploy] failed:", error.message);
  process.exit(1);
});
