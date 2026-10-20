import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { ReactCodeBlock } from "@/components/CodeBlock";
import { ComunicacionesDemo } from "@/components/ComunicacionesExamples";
import { BulletList, Callout, DocSection, InfoTable, SpecsBlock, HtmlCssSections } from "@/components/doc/DocBlocks";
import { comunicacionesHtml, comunicacionesCss } from "@/data/code/organisms";
import type { ComponentDoc } from "@/data/components";
import {
  comunicacionesAccessibility,
  comunicacionesDefinition,
  comunicacionesNote,
  comunicacionesParts,
  comunicacionesReactUsage,
  comunicacionesSpecs,
  comunicacionesUsage,
} from "@/data/comunicaciones";

export function ComunicacionesDoc({
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
      <PageHeader eyebrow={eyebrow} eyebrowHref={eyebrowHref} docPath={docPath} title="Comunicaciones" description={comunicacionesDefinition} action={<FigmaLink nodeId={component.figmaNodeId} />} />
      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  <DocSection title="Pruébalo" description="Escribe el asunto y el contenido, usa la barra o inserta una variable: la vista previa se actualiza.">
                    <div className="rounded-xl bg-zinc-50 p-6">
                      <ComunicacionesDemo />
                    </div>
                    <Callout>{comunicacionesNote}</Callout>
                  </DocSection>
                  <DocSection title="Piezas" className="" level={3}>
                    <InfoTable
                      columns={["Figma", "Código", "Qué es"]}
                      minWidth={640}
                      rows={comunicacionesParts.map((row) => [row.name, <code key="c" className="font-mono text-xs">{row.component}</code>, row.detail])}
                    />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <DocSection title="Especificaciones" className="" description="Medidas tomadas de Figma.">
                  <SpecsBlock groups={comunicacionesSpecs} />
                </DocSection>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Cuándo usarlo">
                    <BulletList items={comunicacionesUsage} />
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={comunicacionesAccessibility} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Code",
              content: (
                <>
                <DocSection title="React" >
                  <ReactCodeBlock code={comunicacionesReactUsage} />
                </DocSection>
                  <HtmlCssSections html={comunicacionesHtml} css={comunicacionesCss} />
                </>
              ),
            },
          ]}
        />
      </ContentCard>
    </div>
  );
}
