import { navCategories } from "@/data/nav";
import { components, componentGroups } from "@/data/components";

export type DocEntry = { path: string; title: string; section: string };

// Todos los documentos del D.S. con su ruta. "/" representa el D.S. completo.
// Mantener en sincronía con listDocs() de scripts/versions.mjs.
export function listDocs(): DocEntry[] {
  const docs: DocEntry[] = [{ path: "/", title: "D.S. Tramita", section: "D.S. Tramita" }];

  for (const category of navCategories) {
    for (const item of category.items) {
      docs.push({ path: `/${category.key}/${item.slug}`, title: item.label, section: category.label });
    }
  }

  for (const [slug, group] of Object.entries(componentGroups)) {
    if (group.length < 2) continue;
    const parent = navCategories.find((c) => c.key === "componentes")?.items.find((i) => i.slug === slug);
    for (const componentSlug of group) {
      const component = components.find((c) => c.slug === componentSlug);
      docs.push({
        path: `/componentes/${slug}/${componentSlug}`,
        title: component?.name ?? componentSlug,
        section: parent?.label ?? "Componentes",
      });
    }
  }

  return docs;
}

export function findDoc(path: string): DocEntry | null {
  return listDocs().find((doc) => doc.path === path) ?? null;
}

export function historyHref(path: string) {
  return path === "/" ? "/historial" : `/historial${path}`;
}
