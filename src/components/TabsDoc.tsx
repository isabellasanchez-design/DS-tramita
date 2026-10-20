import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs as DocTabs } from "@/components/Tabs";
import { ReactCodeBlock } from "@/components/CodeBlock";
import { TabsDemo, TabsPreview } from "@/components/TabsExamples";
import { BulletList, Callout, DocSection, InfoTable, SpecsBlock, HtmlCssSections } from "@/components/doc/DocBlocks";
import { tabsHtml, tabsCss } from "@/data/code/molecules";
import type { ComponentDoc } from "@/data/components";
import { tabsAccessibility, tabsDefinition, tabsFocusNote, tabsReactUsage, tabsSpecs, tabsStates, tabsUsage } from "@/data/tabs";

export function TabsDoc({
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
        title="Tabs"
        description={tabsDefinition}
        action={<FigmaLink nodeId={component.figmaNodeId} />}
      />
      <ContentCard>
        <DocTabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  {/* Vista estática (inert): los controles no se repiten en el orden de Tab; se usan en Pruébalo. */}
                  <DocSection title="Componente" description="Pestaña seleccionada y pestañas por defecto.">
                    <div inert className="overflow-x-auto rounded-xl bg-zinc-50 p-6">
                      <div className="rounded-lg bg-white p-4">
                        <TabsPreview />
                      </div>
                    </div>
                  </DocSection>
                  <DocSection title="Estados" level={3}>
                    <InfoTable columns={["State en Figma", "Cuándo"]} rows={tabsStates.map((row) => [row.figma, row.when])} />
                  </DocSection>
                  <DocSection title="Pruébalo" className="" description="Con teclado: Tab para entrar, flechas para cambiar de pestaña, Tab de nuevo para ir al contenido.">
                    <div className="rounded-xl bg-zinc-50 p-6">
                      <div className="rounded-lg bg-white p-4">
                        <TabsDemo />
                      </div>
                    </div>
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <DocSection title="Especificaciones" className="" description="Medidas tomadas de Figma.">
                  <SpecsBlock groups={tabsSpecs} />
                  <Callout>{tabsFocusNote}</Callout>
                </DocSection>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Cuándo usarlas">
                    <BulletList items={tabsUsage} />
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={tabsAccessibility} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Code",
              content: (
                <>
                <DocSection title="React" >
                  <ReactCodeBlock code={tabsReactUsage} />
                </DocSection>
                  <HtmlCssSections html={tabsHtml} css={tabsCss} />
                </>
              ),
            },
          ]}
        />
      </ContentCard>
    </div>
  );
}
