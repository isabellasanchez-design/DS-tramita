import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { Tag } from "@/components/ui/Tag";
import { CssCodeBlock, HtmlCodeBlock, ReactCodeBlock } from "@/components/CodeBlock";
import {
  AnatomyBlock,
  BulletList,
  Callout,
  DocSection,
  InfoTable,
  MarkerBadge,
  PreviewMatrix,
  SpecsBlock,
} from "@/components/doc/DocBlocks";
import { tagReactUsage } from "@/data/code/react-usage";
import type { ComponentDoc } from "@/data/components";
import {
  tagAccessibility,
  tagAnatomy,
  tagBestPractices,
  tagCaseInfo,
  tagCaseNames,
  tagCssRules,
  tagDefinition,
  tagHtml,
  tagIconInfo,
  tagMarcaNote,
  tagSizeNames,
  tagSizeNote,
  tagSizeSpecs,
  tagSpecs,
  tagTypeInfo,
  tagTypeNames,
} from "@/data/tags";

const MARKER = "#c54600";

function TagAnatomyDiagram() {
  return (
    <div className="flex items-center justify-center rounded-lg bg-white px-20 py-20" aria-hidden>
      <div className="relative origin-center scale-150">
        <Tag iconLeft iconRight>Label</Tag>
        <div className="absolute right-full top-1/2 mr-1.5 flex -translate-y-1/2 items-center gap-1">
          <MarkerBadge n={1} />
          <span className="h-px w-4" style={{ backgroundColor: MARKER }} />
        </div>
        {[
          { n: 2, left: "16px" },
          { n: 3, left: "50%" },
          { n: 4, left: "calc(100% - 16px)" },
        ].map((marker) => (
          <div
            key={marker.n}
            className="absolute bottom-full mb-0.5 flex -translate-x-1/2 flex-col items-center gap-0.5"
            style={{ left: marker.left }}
          >
            <MarkerBadge n={marker.n} />
            <span className="h-3 w-px" style={{ backgroundColor: MARKER }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TagsDoc({
  component,
  eyebrow,
  eyebrowHref,
  docPath,
}: {
  component: ComponentDoc;
  eyebrow: string;
  eyebrowHref: string;
  docPath: string;
}) {
  return (
    <div>
      <PageHeader
        eyebrow={eyebrow}
        eyebrowHref={eyebrowHref}
        docPath={docPath}
        title="Tags"
        description={tagDefinition}
        action={<FigmaLink nodeId={component.figmaNodeId} />}
      />

      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  {tagSizeNames.map((size) => (
                    <DocSection
                      key={size}
                      title={`Variantes · Size ${size}`}
                      description={`Case × Type en tamaño ${size} (${tagSizeSpecs[size].height}px de alto, texto de ${tagSizeSpecs[size].fontSize}px).`}
                    >
                      <PreviewMatrix
                        columns={[...tagTypeNames]}
                        minWidth={640}
                        rows={tagCaseNames.map((tagCase) => ({
                          label: tagCase,
                          cells: tagTypeNames.map((type) => (
                            <Tag key={type} tagCase={tagCase} type={type} size={size}>
                              Label
                            </Tag>
                          )),
                        }))}
                      />
                    </DocSection>
                  ))}

                  <DocSection title="Case: los casos semánticos">
                    <InfoTable
                      columns={["Case", "Muestra", "Color", "Cuándo usarlo"]}
                      minWidth={720}
                      rows={tagCaseInfo.map((row) => [
                        row.tagCase,
                        <Tag key="tag" tagCase={row.tagCase}>Label</Tag>,
                        row.color,
                        row.when,
                      ])}
                    />
                    <Callout>{tagMarcaNote}</Callout>
                  </DocSection>

                  <DocSection title="Type: el estilo visual" className="">
                    <InfoTable
                      columns={["Type", "Muestra", "Descripción visual", "Cuándo usarlo"]}
                      minWidth={720}
                      rows={tagTypeInfo.map((row) => [
                        row.type,
                        <Tag key="tag" type={row.type}>Label</Tag>,
                        row.visual,
                        row.when,
                      ])}
                    />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <>
                  <DocSection title="Anatomía" description="Elementos que componen un tag.">
                    <AnatomyBlock diagram={<TagAnatomyDiagram />} items={tagAnatomy} />
                  </DocSection>
                  <DocSection title="Tamaños">
                    <InfoTable
                      columns={["Size", "Muestra", "Alto", "Texto e íconos"]}
                      rows={tagSizeNames.map((size) => [
                        size,
                        <Tag key="tag" size={size}>Label</Tag>,
                        `${tagSizeSpecs[size].height}px`,
                        `${tagSizeSpecs[size].fontSize}px`,
                      ])}
                    />
                    <Callout>{tagSizeNote}</Callout>
                  </DocSection>
                  <DocSection title="Especificaciones" className="" description="Medidas tomadas de Figma.">
                    <SpecsBlock groups={tagSpecs} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Iconos: icon-left e icon-right" description={tagIconInfo.intro}>
                    <InfoTable columns={["Ubicación", "Uso recomendado"]} rows={tagIconInfo.rows} />
                    <Callout>{tagIconInfo.rule}</Callout>
                  </DocSection>
                  <DocSection title="Buenas prácticas">
                    <BulletList items={tagBestPractices} />
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={tagAccessibility} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Code",
              content: (
                <>
                  <section className="mb-8">
                    <h2 className="mb-1 text-lg font-semibold text-zinc-900">React</h2>
                    <p className="mb-4 text-sm text-zinc-600">
                      Componente del D.S.; el texto va como children.
                    </p>
                    <ReactCodeBlock code={tagReactUsage} />
                  </section>
                  <DocSection title="HTML" description="El Tag es un span: no recibe foco ni es interactivo.">
                    <HtmlCodeBlock code={tagHtml} />
                  </DocSection>
                  <DocSection
                    title="CSS"
                    className=""
                    description="Base, tamaño S y los cuatro tipos de Success. Los demás casos cambian solo los colores (ver tabla de Case)."
                  >
                    <CssCodeBlock rules={tagCssRules} />
                  </DocSection>
                </>
              ),
            },
          ]}
        />
      </ContentCard>
    </div>
  );
}
