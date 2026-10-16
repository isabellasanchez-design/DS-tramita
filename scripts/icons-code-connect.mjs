// Genera las plantillas de Code Connect de los íconos (src/figma/icons/) a
// partir de la página 01_Icons de Figma. Cada set de Figma se conecta con el
// ícono de Phosphor del mismo nombre: Clover → CloverIcon.
//
//   FIGMA_ACCESS_TOKEN=… npm run icons:code-connect
//
// El token necesita el permiso File content: Read. Vuelve a escribir todas las
// plantillas, así que sirve también cuando se agregan o renombran íconos.

import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";

const FILE_KEY = "SC8TToMduSMVIUatN8VZY1";
const FILE_NAME = "D.S.-Tramita";
const PAGE_ID = "10:801";
const OUT_DIR = new URL("../src/figma/icons/", import.meta.url);
const PHOSPHOR_SSR = new URL("../node_modules/@phosphor-icons/react/dist/ssr/", import.meta.url);

const WEIGHTS = ["Bold", "Duotone", "Fill", "Light", "Regular", "Thin"];

const token = process.env.FIGMA_ACCESS_TOKEN;
if (!token) {
  console.error("Falta FIGMA_ACCESS_TOKEN (con permiso File content: Read).");
  process.exit(1);
}

const res = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${PAGE_ID}`, {
  headers: { "X-Figma-Token": token },
});
if (!res.ok) {
  console.error(`Figma respondió ${res.status}: ${await res.text()}`);
  process.exit(1);
}
const page = (await res.json()).nodes[PAGE_ID].document;

const sets = [];
(function walk(node) {
  if (node.type === "COMPONENT_SET") return void sets.push(node);
  node.children?.forEach(walk);
})(page);

const kebab = (name) => name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z][a-z])/g, "$1-$2").toLowerCase();

const template = ({ id, nodeId, component, codeId }) => `// url=https://www.figma.com/design/${FILE_KEY}/${FILE_NAME}?node-id=${nodeId.replace(":", "-")}
// source=node_modules/@phosphor-icons/react/dist/ssr/${component.replace(/Icon$/, "")}.d.ts
// component=${component}
// Generado por scripts/icons-code-connect.mjs — no editar a mano.
import figma from 'figma'
const instance = figma.selectedInstance

// Format solo tiene el valor Outline en Figma; Phosphor no tiene prop equivalente.
const weight = instance.getEnum('Weight', {
${WEIGHTS.map((w) => `  '${w}': '${w.toLowerCase()}',`).join("\n")}
})

export default {
  example: figma.code\`<${component} weight="\${weight}" />\`,
  imports: ['import { ${component} } from "@phosphor-icons/react/dist/ssr"'],
  id: '${codeId}',
  metadata: { nestable: true },
}
`;

const skipped = [];
const seen = new Map();
const files = [];

for (const set of sets) {
  const name = set.name;
  if (!existsSync(new URL(`${name}.d.ts`, PHOSPHOR_SSR))) {
    skipped.push(`${name} (${set.id}): no existe en Phosphor`);
    continue;
  }
  const weights = set.componentPropertyDefinitions?.Weight?.variantOptions ?? [];
  const extra = weights.filter((w) => !WEIGHTS.includes(w));
  if (extra.length) {
    skipped.push(`${name} (${set.id}): Weight desconocido ${extra.join(", ")}`);
    continue;
  }

  // Un mismo nombre puede estar duplicado en Figma (p. ej. Files); cada set
  // necesita su propio archivo e id.
  const n = (seen.get(name) ?? 0) + 1;
  seen.set(name, n);
  const suffix = n > 1 ? `-${n}` : "";
  files.push({
    file: `${name}Icon${suffix}.figma.ts`,
    nodeId: set.id,
    component: `${name}Icon`,
    codeId: `${kebab(name)}-icon${suffix}`,
  });
}

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });
for (const f of files) writeFileSync(new URL(f.file, OUT_DIR), template(f));

console.log(`${files.length} plantillas en src/figma/icons/ (${sets.length} sets en Figma).`);
if (skipped.length) console.warn(`Omitidos:\n  ${skipped.join("\n  ")}`);
console.log(`Archivos: ${readdirSync(OUT_DIR).length}`);
