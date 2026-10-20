import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { ReactCodeBlock } from "@/components/CodeBlock";
import { TreeDemo } from "@/components/TreeExamples";
import { BulletList, Callout, DocSection, InfoTable, SpecsBlock, HtmlCssSections } from "@/components/doc/DocBlocks";
import { treeHtml, treeCss } from "@/data/code/organisms";
import type { ComponentDoc } from "@/data/components";
import { treeAccessibility, treeDefinition, treeLevels, treeNote, treeReactUsage, treeSpecs, treeUsage } from "@/data/tree";

export function TreeDoc({
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
      <PageHeader eyebrow={eyebrow} eyebrowHref={eyebrowHref} docPath={docPath} title="Expandable tree item" description={treeDefinition} action={<FigmaLink nodeId={component.figmaNodeId} />} />
      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  <DocSection title="Niveles" level={3}>
                    <InfoTable columns={["Figma", "Ícono", "Sangría", "Fondo"]} minWidth={560} rows={treeLevels.map((row) => [row.figma, row.icon, row.indent, row.bg])} />
                  </DocSection>
                  <DocSection title="Pruébalo" className="" description="Con clic o con teclado: Tab para entrar y flechas para recorrer y abrir.">
                    <div className="rounded-xl bg-zinc-50 p-6">
                      <TreeDemo />
                    </div>
                    <Callout>{treeNote}</Callout>
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <DocSection title="Especificaciones" className="" description="Medidas tomadas de Figma.">
                  <SpecsBlock groups={treeSpecs} />
                </DocSection>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Cuándo usarlo">
                    <BulletList items={treeUsage} />
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={treeAccessibility} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Code",
              content: (
                <>
                <DocSection title="React" >
                  <ReactCodeBlock code={treeReactUsage} />
                </DocSection>
                  <HtmlCssSections html={treeHtml} css={treeCss} />
                </>
              ),
            },
          ]}
        />
      </ContentCard>
    </div>
  );
}
