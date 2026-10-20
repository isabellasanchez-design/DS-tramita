import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { ReactCodeBlock } from "@/components/CodeBlock";
import { PopupDemo, PopupGallery } from "@/components/PopupExamples";
import { BulletList, DocSection, InfoTable, SpecsBlock, HtmlCssSections } from "@/components/doc/DocBlocks";
import { popupHtml, popupCss } from "@/data/code/organisms";
import type { ComponentDoc } from "@/data/components";
import { popupAccessibility, popupCaseInfo, popupDefinition, popupReactUsage, popupSpecs, popupUsage } from "@/data/popup";

export function PopupDoc({
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
        title="Popup"
        description={popupDefinition}
        action={<FigmaLink nodeId={component.figmaNodeId} />}
      />
      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  <DocSection title="Variantes" description="Case, orientación y Con marca, mostrados dentro de la página.">
                    <div className="overflow-x-auto rounded-xl bg-zinc-50 p-6">
                      <PopupGallery />
                    </div>
                  </DocSection>
                  <DocSection title="Cuándo usar cada caso" level={3}>
                    <InfoTable columns={["Case", "Cuándo usarlo"]} rows={popupCaseInfo.map((row) => [row.tone, row.when])} />
                  </DocSection>
                  <DocSection title="Pruébalo" className="" description="Ábrelo y prueba con teclado: el foco queda dentro, Escape cierra y el foco vuelve al botón.">
                    <div className="rounded-xl bg-zinc-50 p-6">
                      <PopupDemo />
                    </div>
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <DocSection title="Especificaciones" className="" description="Medidas tomadas de Figma.">
                  <SpecsBlock groups={popupSpecs} />
                </DocSection>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Cuándo usarlo">
                    <BulletList items={popupUsage} />
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={popupAccessibility} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Code",
              content: (
                <>
                <DocSection title="React" >
                  <ReactCodeBlock code={popupReactUsage} />
                </DocSection>
                  <HtmlCssSections html={popupHtml} css={popupCss} />
                </>
              ),
            },
          ]}
        />
      </ContentCard>
    </div>
  );
}
