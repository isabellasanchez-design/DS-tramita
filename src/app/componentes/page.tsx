import { PageHeader } from "@/components/PageHeader";
import { IndexCard } from "@/components/IndexCard";
import { componentCardPreview } from "@/components/ComponentCardPreview";
import { componentGroups, findComponent } from "@/data/components";
import { getCategory } from "@/data/nav";

export const metadata = { title: "Componentes · D.S. Tramita" };

const category = getCategory("componentes");

export default function ComponentesIndexPage() {
  return (
    <div>
      <PageHeader eyebrow="D.S. Tramita" title={category.label} description={category.description} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {category.items.map((item) => {
          // Cada entrada del menú es un componente; las que aún no tienen
          // documentación (Cards, Modales…) no traen resumen ni miniatura.
          const [slug] = componentGroups[item.slug] ?? [];
          const component = slug ? findComponent(slug) : undefined;
          return (
            <IndexCard
              key={item.slug}
              href={`/componentes/${item.slug}`}
              title={item.label}
              description={item.description ?? component?.summary}
              preview={component ? componentCardPreview(component.slug) : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}
