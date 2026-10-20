import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { ReactCodeBlock } from "@/components/CodeBlock";
import { DropdownMultiple, DropdownSingle, DropdownPreview } from "@/components/DropdownExamples";
import { BulletList, DocSection, InfoTable, SpecsBlock, HtmlCssSections } from "@/components/doc/DocBlocks";
import { dropdownHtml, dropdownCss } from "@/data/code/organisms";
import type { ComponentDoc } from "@/data/components";
import { dropdownAccessibility, dropdownDefinition, dropdownReactUsage, dropdownSpecs, dropdownStateInfo, dropdownUsage } from "@/data/dropdown";

export function DropdownDoc({
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
        title="Dropdown"
        description={dropdownDefinition}
        action={<FigmaLink nodeId={component.figmaNodeId} />}
      />
      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  {/* Vista estática (inert): los controles no se repiten en el orden de Tab; se usan en Pruébalo. */}
                  <DocSection title="Componente" description="Vacío, con una opción elegida y con selección múltiple.">
                    <div inert className="overflow-x-auto rounded-xl bg-zinc-50 p-6">
                      <DropdownPreview />
                    </div>
                  </DocSection>
                  <DocSection title="Estados de una opción" level={3}>
                    <InfoTable columns={["Estado", "Cómo se ve"]} rows={dropdownStateInfo.map((row) => [row.status, row.visual])} />
                  </DocSection>
                  <DocSection title="Pruébalo" className="" description="Ábrelo con clic o con flechas; Enter elige, Escape cierra. Escribe una letra para saltar a una opción.">
                    <div className="grid min-h-[420px] grid-cols-1 items-start gap-6 rounded-xl bg-zinc-50 p-6 md:grid-cols-2">
                      <DropdownSingle />
                      <DropdownMultiple />
                    </div>
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <DocSection title="Especificaciones" className="" description="Medidas tomadas de Figma. El campo es el del Textbox (caso Dropdown).">
                  <SpecsBlock groups={dropdownSpecs} />
                </DocSection>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Cuándo usarlo">
                    <BulletList items={dropdownUsage} />
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={dropdownAccessibility} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Code",
              content: (
                <>
                <DocSection title="React" >
                  <ReactCodeBlock code={dropdownReactUsage} />
                </DocSection>
                  <HtmlCssSections html={dropdownHtml} css={dropdownCss} />
                </>
              ),
            },
          ]}
        />
      </ContentCard>
    </div>
  );
}
