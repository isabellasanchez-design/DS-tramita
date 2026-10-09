import { PageHeader } from "@/components/PageHeader";
import { IndexCard } from "@/components/IndexCard";
import { navCategories } from "@/data/nav";

export default function Home() {
  return (
    <div>
      <PageHeader
        eyebrow="D.S. Tramita"
        title="Design System Tramita"
        description="Documentación viva del sistema de diseño de Tramita: fundamentos, estilos y componentes de interfaz, con enlace directo al archivo de Figma donde ya existe contenido."
      />

      {navCategories.map((category) => (
        <section key={category.key} className="mb-12">
          <h2 className="mb-1 text-xl font-semibold text-zinc-900">{category.label}</h2>
          <p className="mb-4 text-sm text-zinc-600">{category.description}</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {category.items.map((item) => (
              <IndexCard
                key={item.slug}
                href={`/${category.key}/${item.slug}`}
                title={item.label}
                description={item.description}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
