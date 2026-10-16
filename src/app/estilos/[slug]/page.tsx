import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ColorScaleRow } from "@/components/ColorScaleRow";
import { ColorSwatch } from "@/components/ColorSwatch";
import { PendingNotice } from "@/components/PendingNotice";
import { ContentCard } from "@/components/ContentCard";
import { IconGallery } from "@/components/IconGallery";
import { colorScales, brandColors } from "@/data/colors";
import { headings, body, bodyUsage } from "@/data/typography";
import { figmaPages } from "@/data/figma";
import { getCategory } from "@/data/nav";
import { SpacingLayoutDiagram } from "@/components/SpacingLayoutDiagram";
import { DocSection, InfoTable, SpecsBlock } from "@/components/doc/DocBlocks";
import { spacingDefinition, spacingLayouts, spacingRules, spacingScale } from "@/data/spacing";

const category = getCategory("estilos");

export function generateStaticParams() {
  return category.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata(props: PageProps<"/estilos/[slug]">) {
  const { slug } = await props.params;
  const item = category.items.find((i) => i.slug === slug);
  return { title: item ? `${item.label} · D.S. Tramita` : "D.S. Tramita" };
}

export default async function EstiloDetailPage(props: PageProps<"/estilos/[slug]">) {
  const { slug } = await props.params;
  const item = category.items.find((i) => i.slug === slug);
  if (!item) notFound();

  if (slug === "colores") {
    return (
      <div>
        <PageHeader
          eyebrow="Estilos"
          eyebrowHref="/estilos"
          docPath={`/estilos/${slug}`}
          title="Colores"
          description="Cada escala va de 00 (más claro) a 09 (más oscuro). Úsalas de forma consistente: los tonos 00–02 funcionan como fondos, 04–06 como color de acción, y 07–09 como texto sobre fondos claros."
          action={<FigmaLink nodeId={figmaPages.color} />}
        />

        <ContentCard>
          <section>
            <h2 className="mb-1 text-lg font-semibold text-zinc-900">Marca</h2>
            <p className="mb-3 text-sm text-zinc-600">Colores base de identidad de Tramita.</p>
            <div className="flex flex-wrap gap-2">
              {brandColors.map((c) => (
                <ColorSwatch key={c.step} label={c.step} hex={c.hex} className="h-24 w-32" />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-1 text-lg font-semibold text-zinc-900">Escalas completas</h2>
            <p className="mb-6 text-sm text-zinc-600">
              Referencia completa de cada rango, de 00 (más claro) a 09 (más oscuro).
            </p>
            {colorScales.map((scale) => (
              <ColorScaleRow key={scale.name} scale={scale} />
            ))}
          </section>
        </ContentCard>
      </div>
    );
  }

  if (slug === "tipografia") {
    return (
      <div>
        <PageHeader
          eyebrow="Estilos"
          eyebrowHref="/estilos"
          docPath={`/estilos/${slug}`}
          title="Tipografía"
          description="Sora se usa para títulos y encabezados; Roboto para texto de cuerpo e interfaz."
          action={<FigmaLink nodeId={figmaPages.typography} />}
        />

        <ContentCard>
          <section>
            <h2 className="mb-4 text-lg font-semibold text-zinc-900">Títulos — Sora</h2>
            <div className="divide-y divide-zinc-200 rounded-xl border border-zinc-200">
              {headings.map((spec) => (
                <div key={spec.token} className="flex flex-wrap items-baseline justify-between gap-4 px-5 py-4">
                  <span
                    style={{
                      fontFamily: "var(--font-sora)",
                      fontWeight: spec.weight === "Bold" ? 700 : 400,
                      fontSize: spec.size,
                    }}
                    className="text-zinc-900"
                  >
                    Aa Bb Cc
                  </span>
                  <span className="font-mono text-xs text-zinc-500">
                    {spec.label} · {spec.weight} · {spec.size}px
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-1 text-lg font-semibold text-zinc-900">Cuerpo — Roboto</h2>
            <p className="mb-4 text-sm text-zinc-600">Se usa en: {bodyUsage.join(", ")}.</p>
            <div className="divide-y divide-zinc-200 rounded-xl border border-zinc-200">
              {body.map((spec) => (
                <div key={spec.token} className="flex flex-wrap items-baseline justify-between gap-4 px-5 py-4">
                  <span
                    style={{
                      fontFamily: "var(--font-roboto)",
                      fontWeight: spec.weight === "Bold" ? 700 : 400,
                      fontSize: spec.size,
                    }}
                    className="text-zinc-900"
                  >
                    Aa Bb Cc
                  </span>
                  <span className="font-mono text-xs text-zinc-500">
                    {spec.label} · {spec.weight} · {spec.size}px
                  </span>
                </div>
              ))}
            </div>
          </section>
        </ContentCard>
      </div>
    );
  }

  if (slug === "espaciado") {
    return (
      <div>
        <PageHeader
          eyebrow="Estilos"
          eyebrowHref="/estilos"
          docPath={`/estilos/${slug}`}
          title="Espaciado"
          description={spacingDefinition}
          action={<FigmaLink nodeId={figmaPages.margin} />}
        />
        <ContentCard>
          <DocSection
            title="Layout de pantalla"
            description="Pantalla de 1440 × 1024. El área de contenido llena el espacio que deja el sidebar y mantiene los mismos márgenes con el sidebar expandido o colapsado."
          >
            <div className="grid grid-cols-1 gap-6 rounded-xl bg-zinc-50 p-6 xl:grid-cols-2">
              {spacingLayouts.map((layout) => (
                <figure key={layout.name} className="flex flex-col items-center gap-3">
                  <SpacingLayoutDiagram sidebar={layout.sidebar} content={layout.content} />
                  <figcaption className="text-sm text-zinc-600">
                    {layout.name}: sidebar de {layout.sidebar}px · contenido de {layout.content}px
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-3 text-sm text-zinc-600">
              <span className="font-semibold text-[#007d00]">Verde</span>: padding.{" "}
              <span className="font-semibold text-[#c54600]">Naranja</span>: separación entre
              bloques.
            </p>
          </DocSection>

          <DocSection title="Márgenes por contenedor" description="Valores de auto layout tomados de Figma.">
            <SpecsBlock groups={spacingRules} />
          </DocSection>

          <DocSection
            title="Valores en uso"
            className=""
            description="Espaciados que aparecen en las pantallas y componentes de Figma. Úsalos como escala de referencia."
          >
            <InfoTable
              columns={["Valor", "Variable en Figma", "Dónde se usa"]}
              rows={spacingScale.map((step) => [
                <span key="v" className="flex items-center gap-3">
                  <span className="inline-block h-3 rounded-sm bg-[var(--brand-primary)]" style={{ width: step.value }} />
                  {step.value}px
                </span>,
                step.token,
                step.use,
              ])}
            />
          </DocSection>
        </ContentCard>
      </div>
    );
  }

  if (slug === "iconografia") {
    return (
      <div>
        <PageHeader
          eyebrow="Estilos"
          eyebrowHref="/estilos"
          docPath={`/estilos/${slug}`}
          title="Iconografía"
          description="Librería de iconografía Phosphor Icons usada dentro de los componentes: navegación, estados, acciones y objetos del dominio de trámites."
          action={<FigmaLink nodeId={figmaPages.icons} />}
        />
        <ContentCard>
          <IconGallery />
        </ContentCard>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Estilos"
        eyebrowHref="/estilos"
        docPath={`/estilos/${slug}`}
        title={item.label}
      />
      <ContentCard>
        <PendingNotice>
          Cuéntame qué debe incluir la sección de {item.label.toLowerCase()} (valores, ejemplos,
          reglas de uso) y la documentamos aquí.
        </PendingNotice>
      </ContentCard>
    </div>
  );
}
