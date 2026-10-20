import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { ReactCodeBlock } from "@/components/CodeBlock";
import { MenuDemo } from "@/components/MenuExamples";
import { BulletList, Callout, DocSection, InfoTable, SpecsBlock } from "@/components/doc/DocBlocks";
import type { ComponentDoc } from "@/data/components";
import { menuAccessibility, menuDefinition, menuNote, menuReactUsage, menuSpecs, menuStateInfo, menuUsage } from "@/data/menu";

export function MenuDoc({
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
        title="Menu"
        description={menuDefinition}
        action={<FigmaLink nodeId={component.figmaNodeId} />}
      />
      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  <DocSection title="Pruébalo" description="Abierta y cerrada. El botón circular del borde la abre y la cierra.">
                    <div className="rounded-xl bg-zinc-50 p-6">
                      <MenuDemo />
                    </div>
                  </DocSection>
                  <DocSection title="Estados" className="" level={3}>
                    <InfoTable columns={["Estado", "Cómo se ve"]} rows={menuStateInfo.map((row) => [row.status, row.visual])} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <DocSection title="Especificaciones" className="" description="Medidas tomadas de Figma.">
                  <SpecsBlock groups={menuSpecs} />
                  <Callout>{menuNote}</Callout>
                </DocSection>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Cuándo usarlo">
                    <BulletList items={menuUsage} />
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={menuAccessibility} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Code",
              content: (
                <DocSection title="React" className="">
                  <ReactCodeBlock code={menuReactUsage} />
                </DocSection>
              ),
            },
          ]}
        />
      </ContentCard>
    </div>
  );
}
