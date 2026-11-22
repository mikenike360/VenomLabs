import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const env = readFileSync(join(root, ".env.local"), "utf8");
const key = env.match(/^POLY_PIZZA_API_KEY=(.*)$/m)?.[1]?.trim().replace(/^["']|["']$/g, "");

if (!key) {
  throw new Error("POLY_PIZZA_API_KEY is missing from .env.local");
}

// Pinned so a later run does not swap the scene.
const models = [
  { id: "QN3Ru02ayU", file: "tree-kenney.glb", title: "Tree", creator: "Kenney", licence: "CC0 1.0" },
  { id: "i4QMw4L64D", file: "tree-quaternius.glb", title: "Tree", creator: "Quaternius", licence: "CC0 1.0" },
  { id: "YDGLLT0emC", file: "cottage.glb", title: "Cottage", creator: "CreativeTrio", licence: "CC0 1.0" },
  { id: "RtLRqYjfMs", file: "rock.glb", title: "Rock", creator: "Quaternius", licence: "CC0 1.0" },
];

const outDir = join(root, "public", "grove");
mkdirSync(outDir, { recursive: true });

for (const model of models) {
  const metaRes = await fetch(`https://api.poly.pizza/v1/model/${model.id}`, {
    headers: { "X-Auth-Token": key, "User-Agent": "venomlabs-grove" },
  });
  if (!metaRes.ok) {
    throw new Error(`Model ${model.id} failed: ${metaRes.status}`);
  }
  const meta = await metaRes.json();
  const download = meta.Download || meta.download;
  if (!download) {
    throw new Error(`Model ${model.id} has no download URL`);
  }
  const fileRes = await fetch(download, { headers: { "User-Agent": "venomlabs-grove" } });
  if (!fileRes.ok) {
    throw new Error(`Download ${model.file} failed: ${fileRes.status}`);
  }
  const bytes = Buffer.from(await fileRes.arrayBuffer());
  writeFileSync(join(outDir, model.file), bytes);
  console.log(`${model.file} ${bytes.length} bytes`);
}

writeFileSync(
  join(outDir, "credits.json"),
  JSON.stringify(
    models.map(({ id, title, creator, licence }) => ({ id, title, creator, licence })),
    null,
    2,
  ) + "\n",
);
