import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve(process.cwd(), "out");

try {
  fs.rmSync(outDir, { recursive: true, force: true });
  // eslint-disable-next-line no-console
  console.log(`[clean] Removed: ${outDir}`);
} catch (e) {
  // eslint-disable-next-line no-console
  console.warn(`[clean] Could not remove ${outDir}`, e);
}
