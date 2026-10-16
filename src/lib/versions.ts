import generated from "@/data/versions.generated.json";

export type ChangelogEntry = {
  version: string;
  date: string;
  type: string | null;
  message: string;
  hash: string;
};

export type DocVersion = {
  version: string;
  date: string;
  changelog: ChangelogEntry[];
};

// Generado por scripts/versions.mjs. La clave es la ruta del documento;
// "/" es la versión del D.S. completo.
const versions = generated as unknown as Record<string, DocVersion | undefined>;

export function getDocVersion(path: string): DocVersion | null {
  return versions[path] ?? null;
}

const dateFormat = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatVersionDate(date: string) {
  return dateFormat.format(new Date(`${date}T00:00:00Z`));
}
