import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { ReactCodeBlock } from "@/components/CodeBlock";
import { UploaderDemo, UploaderStates } from "@/components/UploaderExamples";
import { BulletList, Callout, DocSection, InfoTable, SpecsBlock, HtmlCssSections } from "@/components/doc/DocBlocks";
import { uploaderHtml, uploaderCss } from "@/data/code/organisms";
import type { ComponentDoc } from "@/data/components";
import { uploaderAccessibility, uploaderContrastNote, uploaderDefinition, uploaderReactUsage, uploaderSpecs, uploaderStates, uploaderUsage } from "@/data/uploader";

export function UploaderDoc({
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
      <PageHeader eyebrow={eyebrow} eyebrowHref={eyebrowHref} docPath={docPath} title="Uploader" description={uploaderDefinition} action={<FigmaLink nodeId={component.figmaNodeId} />} />
      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  <DocSection title="Pruébalo" description="Elige un archivo (con Tab y Enter) o arrástralo; la carga es simulada.">
                    <div className="max-w-[690px] rounded-xl bg-zinc-50 p-6">
                      <UploaderDemo />
                    </div>
                  </DocSection>
                  <DocSection title="Estados" description="Los seis estados de Figma.">
                    <div className="max-w-[722px] rounded-xl bg-zinc-50 p-6">
                      <UploaderStates />
                    </div>
                    <Callout>{uploaderContrastNote}</Callout>
                  </DocSection>
                  <DocSection title="Cuándo aparece cada estado" className="" level={3}>
                    <InfoTable
                      columns={["Figma", "Código (status)", "Cuándo", "Cómo se ve"]}
                      minWidth={720}
                      rows={uploaderStates.map((row) => [row.figma, <code key="c" className="font-mono text-xs">{row.code}</code>, row.when, row.look])}
                    />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <DocSection title="Especificaciones" className="" description="Medidas tomadas de Figma.">
                  <SpecsBlock groups={uploaderSpecs} />
                </DocSection>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Cuándo usarlo">
                    <BulletList items={uploaderUsage} />
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={uploaderAccessibility} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Code",
              content: (
                <>
                <DocSection title="React" >
                  <ReactCodeBlock code={uploaderReactUsage} />
                </DocSection>
                  <HtmlCssSections html={uploaderHtml} css={uploaderCss} />
                </>
              ),
            },
          ]}
        />
      </ContentCard>
    </div>
  );
}
