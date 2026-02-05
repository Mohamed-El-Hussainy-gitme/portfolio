import fs from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve(process.cwd(), "out");

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function rmSafe(p) {
  if (await exists(p)) {
    await fs.rm(p, { recursive: true, force: true });
    console.log(`[strip-en] removed: ${p}`);
  }
}

async function main() {
  // Remove legacy /en directory if it exists
  await rmSafe(path.join(OUT_DIR, "en"));

  // Remove legacy en.html if it exists
  await rmSafe(path.join(OUT_DIR, "en.html"));

  // Defensive: remove any nested /en occurrences
  const walk = async (dir) => {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (e.name === "en") {
          await rmSafe(full);
          continue;
        }
        await walk(full);
      } else if (e.isFile()) {
        if (e.name.toLowerCase() === "en.html") {
          await rmSafe(full);
        }
      }
    }
  };

  if (await exists(OUT_DIR)) {
    await walk(OUT_DIR);
  }

  console.log("[strip-en] done");
}

main().catch((e) => {
  console.error("[strip-en] failed:", e);
  process.exit(1);
});
