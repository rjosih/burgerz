import sharp from "sharp";
import { mkdirSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(__dirname, "..", "public", "photos", "restaurants");

const RENDITIONS = [
  { suffix: "thumb",  width: 300,  height: 200 },
  { suffix: "medium", width: 600,  height: 400 },
  { suffix: "large",  width: 1200, height: 800 },
];

const RESTAURANTS = [
  { slug: "smash-station-halmstad" },
  { slug: "brioche-brothers" },
  { slug: "patty-corner" },
  { slug: "northern-bun-umea" },
];

function slugToBase(slug) {
  return slug.replaceAll("-", "");
}

function findOriginal(slug) {
  const dir = join(PUBLIC, slug, "original");
  const files = readdirSync(dir);
  const file = files.find((f) => /\.(avif|webp|jpg|jpeg|png)$/i.test(f));
  if (!file) throw new Error(`No original image found in ${dir}`);
  return join(dir, file);
}

function clearFolder(dir) {
  for (const f of readdirSync(dir)) {
    rmSync(join(dir, f));
  }
}

async function processRestaurant({ slug }) {
  const base = slugToBase(slug);
  const originalPath = findOriginal(slug);
  console.log(`\n${slug}  →  base: "${base}"`);
  console.log(`  original: ${originalPath.split("/").pop()}`);

  const cleanDir = join(PUBLIC, slug, "clean");
  const renditionsDir = join(PUBLIC, slug, "renditions");
  mkdirSync(cleanDir, { recursive: true });
  mkdirSync(renditionsDir, { recursive: true });
  clearFolder(cleanDir);
  clearFolder(renditionsDir);

  // clean = full-resolution AVIF (EXIF stripped by sharp by default)
  const cleanFile = `${base}-clean.avif`;
  await sharp(originalPath).avif({ quality: 80 }).toFile(join(cleanDir, cleanFile));
  console.log(`  ✓ clean/${cleanFile}`);

  // renditions
  for (const { suffix, width, height } of RENDITIONS) {
    const outFile = `${base}-${suffix}.avif`;
    await sharp(originalPath)
      .resize(width, height, { fit: "cover", position: "centre" })
      .avif({ quality: 75 })
      .toFile(join(renditionsDir, outFile));
    console.log(`  ✓ renditions/${outFile}  (${width}×${height})`);
  }
}

console.log("\nGenerating AVIF renditions from originals…");
for (const restaurant of RESTAURANTS) {
  await processRestaurant(restaurant);
}
console.log("\nDone.\n");
