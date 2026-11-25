import { mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
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
  {
    id: "P90iu7e4gY",
    file: "workstation.glb",
    title: "Computer Generic 2000s",
    creator: "Charlie",
    licence: "CC-BY 3.0",
  },
];

const outDir = join(root, "public", "grove");
mkdirSync(outDir, { recursive: true });

const keep = new Set(models.map((model) => model.file));
keep.add("credits.json");

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

for (const name of readdirSync(outDir)) {
  if (!keep.has(name)) {
    unlinkSync(join(outDir, name));
    console.log(`removed ${name}`);
  }
}

writeFileSync(
  join(outDir, "credits.json"),
  JSON.stringify(
    models.map(({ id, title, creator, licence }) => ({ id, title, creator, licence })),
    null,
    2,
  ) + "\n",
);
