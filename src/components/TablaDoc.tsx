import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { ReactCodeBlock } from "@/components/CodeBlock";
import { IndicadoresTable, TramitesTable } from "@/components/TablaExamples";
import { BulletList, Callout, DocSection, SpecsBlock } from "@/components/doc/DocBlocks";
import type { ComponentDoc } from "@/data/components";
import { tablaAccessibility, tablaDefinition, tablaNote, tablaReactUsage, tablaSpecs, tablaUsage } from "@/data/tabla";

export function TablaDoc({
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
      <PageHeader eyebrow={eyebrow} eyebrowHref={eyebrowHref} docPath={docPath} title="Tabla" description={tablaDefinition} action={<FigmaLink nodeId={component.figmaNodeId} />} />
      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  <DocSection title="Trámites asignados" description="Busca por nombre, filtra por estado u ordena con los botones del encabezado.">
                    <div className="rounded-xl bg-zinc-50 p-6">
                      <TramitesTable />
                    </div>
                    <Callout>{tablaNote}</Callout>
                  </DocSection>
                  <DocSection title="Indicador de resultado" className="" description="Tabla de solo lectura, sin ordenar ni filtrar.">
                    <div className="rounded-xl bg-zinc-50 p-6">
                      <IndicadoresTable />
                    </div>
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <DocSection title="Especificaciones" className="" description="Medidas tomadas de Figma.">
                  <SpecsBlock groups={tablaSpecs} />
                </DocSection>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Cuándo usarla">
                    <BulletList items={tablaUsage} />
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={tablaAccessibility} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Code",
              content: (
                <DocSection title="React" className="">
                  <ReactCodeBlock code={tablaReactUsage} />
                </DocSection>
              ),
            },
          ]}
        />
      </ContentCard>
    </div>
  );
}
