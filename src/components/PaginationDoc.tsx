import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { ReactCodeBlock } from "@/components/CodeBlock";
import { PaginationDemo, PaginationStates } from "@/components/PaginationExamples";
import { BulletList, DocSection, InfoTable, SpecsBlock, HtmlCssSections } from "@/components/doc/DocBlocks";
import { paginationHtml, paginationCss } from "@/data/code/molecules";
import type { ComponentDoc } from "@/data/components";
import {
  paginationAccessibility,
  paginationDefinition,
  paginationReactUsage,
  paginationSpecs,
  paginationStates,
  paginationUsage,
} from "@/data/pagination";

export function PaginationDoc({
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
        title="Pagination"
        description={paginationDefinition}
        action={<FigmaLink nodeId={component.figmaNodeId} />}
      />
      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  <DocSection title="Estados" description="Los tres State de Figma; el código los elige solo según la página actual.">
                    <PaginationStates />
                  </DocSection>
                  <DocSection title="Cuándo aparece cada estado" level={3}>
                    <InfoTable columns={["State en Figma", "Cuándo"]} rows={paginationStates.map((row) => [row.figma, row.when])} />
                  </DocSection>
                  <DocSection title="Pruébalo" className="" description="23 solicitudes, 5 por página. Con teclado: Tab y Enter.">
                    <div className="rounded-xl bg-zinc-50 p-6">
                      <PaginationDemo />
                    </div>
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <DocSection title="Especificaciones" className="" description="Pagination usa el componente Button; sus medidas están en Botones.">
                  <SpecsBlock groups={paginationSpecs} />
                </DocSection>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Cuándo usarla">
                    <BulletList items={paginationUsage} />
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={paginationAccessibility} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Code",
              content: (
                <>
                <DocSection title="React" >
                  <ReactCodeBlock code={paginationReactUsage} />
                </DocSection>
                  <HtmlCssSections html={paginationHtml} css={paginationCss} />
                </>
              ),
            },
          ]}
        />
      </ContentCard>
    </div>
  );
}
