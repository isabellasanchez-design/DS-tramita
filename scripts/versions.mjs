// Calcula la versión semver del D.S. y de cada documento a partir del
// historial de git (Conventional Commits) y escribe
// src/data/versions.generated.json. Se ejecuta antes de `dev` y `build`.
//
//   feat(botones): …          → minor de Botones y del D.S.
//   fix(colores,tipografia): … → patch de ambos documentos y del D.S.
//   feat(botones)!: …         → major (también "BREAKING CHANGE" en el cuerpo)
//   chore/ci/build/test: …    → no cambian la versión
//   commit sin prefijo        → patch
//
// El scope es el slug del documento (botones, colores, checkbox…) o `ds`
// para cambios solo del D.S. Los archivos listados en src/data/doc-sources.ts
// también marcan su documento aunque el commit no traiga scope.

import { execFileSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";
import { navCategories } from "../src/data/nav.ts";
import { componentGroups } from "../src/data/components.ts";
import { docSources } from "../src/data/doc-sources.ts";

const OUT = new URL("../src/data/versions.generated.json", import.meta.url);
const DS_PATH = "/";
const DS_INITIAL = "0.1.0";
const DOC_INITIAL = "1.0.0";

const BUMP_BY_TYPE = {
  feat: "minor",
  fix: "patch",
  perf: "patch",
  refactor: "patch",
  style: "patch",
  docs: "patch",
  revert: "patch",
  chore: null,
  ci: null,
  build: null,
  test: null,
};

function git(...args) {
  return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
}

function listDocs() {
  const docs = new Map();
  for (const category of navCategories) {
    for (const item of category.items) {
      docs.set(`/${category.key}/${item.slug}`, { parent: null });
    }
  }
  for (const [slug, group] of Object.entries(componentGroups)) {
    if (group.length < 2) continue;
    for (const component of group) {
      docs.set(`/componentes/${slug}/${component}`, { parent: `/componentes/${slug}` });
    }
  }
  return docs;
}

function readCommits() {
  if (git("rev-parse", "--is-shallow-repository").trim() === "true") {
    try {
      git("fetch", "--unshallow", "--quiet");
    } catch {
      console.warn("[versions] Clon superficial: las versiones pueden quedar incompletas.");
    }
  }

  const log = git(
    "log",
    "--reverse",
    "--date=short",
    "--name-only",
    "--format=%x1e%h%x1f%ad%x1f%s%x1f%b%x1f"
  );

  return log
    .split("\x1e")
    .filter(Boolean)
    .map((record) => {
      const [hash, date, subject, body, rest] = record.split("\x1f");
      const files = rest.split("\n").map((f) => f.trim()).filter(Boolean);
      return { hash, date, subject, body, files };
    });
}

function parseSubject(subject, body) {
  const match = subject.match(/^(\w+)(?:\(([^)]*)\))?(!)?:\s*(.+)$/);
  if (!match) return { type: null, scopes: [], bump: "patch", message: subject };

  const [, rawType, scope = "", bang, message] = match;
  const type = rawType.toLowerCase();
  const breaking = Boolean(bang) || /BREAKING[ -]CHANGE/.test(body);
  const bump = breaking ? "major" : type in BUMP_BY_TYPE ? BUMP_BY_TYPE[type] : "patch";
  const scopes = scope.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  return { type, scopes, bump, message };
}

function bumpVersion(version, bump) {
  const [major, minor, patch] = version.split(".").map(Number);
  if (bump === "major") return `${major + 1}.0.0`;
  if (bump === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

function affectedDocs(docs, scopes, files) {
  const affected = new Set();
  for (const path of docs.keys()) {
    const slug = path.split("/").pop();
    const inScope = scopes.some((s) => s === slug || `/${s}` === path);
    const inFiles = (docSources[path] ?? []).some((prefix) =>
      files.some((file) => file.startsWith(prefix))
    );
    if (inScope || inFiles) affected.add(path);
  }
  for (const path of [...affected]) {
    const parent = docs.get(path)?.parent;
    if (parent) affected.add(parent);
  }
  return affected;
}

function computeVersions() {
  const docs = listDocs();
  const state = {};

  function record(path, initial, bump, entry) {
    const current = state[path];
    const version = current ? bumpVersion(current.version, bump) : initial;
    state[path] = {
      version,
      date: entry.date,
      changelog: [{ version, ...entry }, ...(current?.changelog ?? [])],
    };
  }

  for (const commit of readCommits()) {
    const { type, scopes, bump, message } = parseSubject(commit.subject, commit.body);
    if (!bump) continue;

    const entry = { date: commit.date, type, message, hash: commit.hash };
    record(DS_PATH, DS_INITIAL, bump, entry);

    for (const path of affectedDocs(docs, scopes, commit.files)) {
      record(path, DOC_INITIAL, bump, entry);
    }
  }

  return state;
}

function main() {
  let versions;
  try {
    versions = computeVersions();
  } catch (error) {
    if (existsSync(OUT)) {
      console.warn("[versions] No se pudo leer git; se conserva el archivo existente.");
      return;
    }
    console.warn(`[versions] No se pudo leer git (${error.message}); se generan versiones vacías.`);
    versions = {};
  }

  writeFileSync(OUT, `${JSON.stringify(versions, null, 2)}\n`);
  const ds = versions[DS_PATH]?.version ?? "sin versión";
  const count = Object.keys(versions).length - (versions[DS_PATH] ? 1 : 0);
  console.log(`[versions] D.S. v${ds} · ${count} documentos versionados`);
}

main();
