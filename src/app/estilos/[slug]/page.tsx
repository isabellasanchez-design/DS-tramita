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
import { Callout, DocSection, InfoTable, SpecsBlock } from "@/components/doc/DocBlocks";
import {
  borderColorOutliers,
  borderColors,
  borderRules,
  borderWeights,
  bordersContrastNote,
  bordersDefinition,
  radiusOutliers,
  radiusScale,
} from "@/data/borders";
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

  if (slug === "bordes") {
    return (
      <div>
        <PageHeader
          eyebrow="Estilos"
          eyebrowHref="/estilos"
          docPath={`/estilos/${slug}`}
          title="Bordes"
          description={bordersDefinition}
          action={<FigmaLink nodeId={figmaPages.colorUsage} />}
        />
        <ContentCard>
          <DocSection title="Radios" description="Escala de radios de esquina. Los marcados como variable están ligados a una variable local en Figma.">
            <div className="grid grid-cols-2 gap-4 rounded-xl bg-zinc-50 p-6 sm:grid-cols-4 lg:grid-cols-7">
              {radiusScale.map((step) => (
                <figure key={step.label} className="flex flex-col items-center gap-2">
                  <span
                    aria-hidden
                    className="block size-16 border-2 border-[var(--brand-primary)] bg-white"
                    style={{ borderRadius: step.value === "full" ? 9999 : step.value }}
                  />
                  <figcaption className="text-sm font-medium text-zinc-900">{step.label}</figcaption>
                </figure>
              ))}
            </div>
          </DocSection>

          <DocSection title="Dónde se usa cada radio" level={3}>
            <InfoTable
              columns={["Radio", "Variable en Figma", "Dónde se usa"]}
              rows={radiusScale.map((step) => [step.label, step.variable ? "Sí" : "No, valor fijo", step.use])}
            />
          </DocSection>

          <DocSection
            title="Radios fuera de la escala"
            level={3}
            description="Aparecen en un solo componente. Se documentan tal cual para revisarlos en Figma."
          >
            <InfoTable columns={["Radio", "Dónde"]} rows={radiusOutliers.map((row) => [row.value, row.where])} />
          </DocSection>

          <DocSection title="Grosor">
            <div className="mb-4 grid grid-cols-1 gap-4 rounded-xl bg-zinc-50 p-6 sm:grid-cols-3">
              {borderWeights.map((weight) => (
                <figure key={weight.value} className="flex flex-col items-center gap-2">
                  <span aria-hidden className="block w-full max-w-[160px] bg-[var(--brand-primary)]" style={{ height: weight.value }} />
                  <figcaption className="text-sm font-medium text-zinc-900">{weight.label}</figcaption>
                </figure>
              ))}
            </div>
            <InfoTable columns={["Grosor", "Dónde se usa"]} rows={borderWeights.map((weight) => [weight.label, weight.use])} />
          </DocSection>

          <DocSection title="Posición y estilo">
            <SpecsBlock groups={borderRules} />
          </DocSection>

          <DocSection title="Colores" description="Variables de uso › Border en Figma. El contraste es contra blanco.">
            <div className="grid grid-cols-2 gap-4 rounded-xl bg-zinc-50 p-6 sm:grid-cols-3 lg:grid-cols-5">
              {borderColors.map((color) => (
                <figure key={color.name} className="flex flex-col gap-2">
                  <span aria-hidden className="block h-14 rounded-[8px] border-2 bg-white" style={{ borderColor: color.hex }} />
                  <figcaption className="flex flex-col text-sm">
                    <span className="font-medium text-zinc-900">{color.name}</span>
                    <span className="font-mono text-xs text-zinc-600">{color.hex}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </DocSection>

          <DocSection title="Dónde se usa cada color" level={3}>
            <InfoTable
              columns={["Variable", "Hex", "Contraste", "Dónde se usa"]}
              minWidth={640}
              rows={borderColors.map((color) => [
                `Border/${color.name}`,
                <code key="h" className="font-mono text-xs">{color.hex}</code>,
                `${color.contrast.toLocaleString("es-CO")}:1`,
                color.use,
              ])}
            />
            <Callout>{bordersContrastNote}</Callout>
          </DocSection>

          <DocSection
            title="Colores fuera de las variables"
            className=""
            level={3}
            description="Bordes de componentes que no usan una variable Border. Se documentan tal cual para revisarlos en Figma."
          >
            <InfoTable
              columns={["Color", "Dónde"]}
              rows={borderColorOutliers.map((row) => [
                <span key="c" className="flex items-center gap-2">
                  <span aria-hidden className="inline-block size-4 rounded-[4px] border-2 bg-white" style={{ borderColor: row.hex }} />
                  <code className="font-mono text-xs">{row.hex}</code>
                </span>,
                row.where,
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
