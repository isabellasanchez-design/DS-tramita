import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { ReactCodeBlock } from "@/components/CodeBlock";
import { StepperDemo, StepperPreview } from "@/components/StepperExamples";
import { BulletList, Callout, DocSection, InfoTable, SpecsBlock, HtmlCssSections } from "@/components/doc/DocBlocks";
import { stepperHtml, stepperCss } from "@/data/code/organisms";
import type { ComponentDoc } from "@/data/components";
import { stepperAccessibility, stepperContrastNote, stepperDefinition, stepperReactUsage, stepperSpecs, stepperStates, stepperUsage } from "@/data/stepper";

export function StepperDoc({
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
      <PageHeader eyebrow={eyebrow} eyebrowHref={eyebrowHref} docPath={docPath} title="Stepper" description={stepperDefinition} action={<FigmaLink nodeId={component.figmaNodeId} />} />
      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  {/* Vista estática (inert): los controles no se repiten en el orden de Tab; se usan en Pruébalo. */}
                  <DocSection title="Componente" description="Un paso completado, el actual y los pendientes.">
                    <div inert className="overflow-x-auto rounded-xl bg-zinc-50 p-6">
                      <div className="rounded-lg bg-white p-6">
                        <StepperPreview />
                      </div>
                    </div>
                  </DocSection>
                  <DocSection title="Estados de un paso" level={3}>
                    <InfoTable columns={["Figma", "Significa", "Cómo se ve"]} minWidth={560} rows={stepperStates.map((row) => [row.figma, row.meaning, row.visual])} />
                  </DocSection>
                  <DocSection title="Pruébalo" className="" description="Avanza y retrocede para ver los tres estados.">
                    <div className="rounded-xl bg-zinc-50 p-6">
                      <div className="rounded-lg bg-white p-6">
                        <StepperDemo />
                      </div>
                    </div>
                    <Callout>{stepperContrastNote}</Callout>
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <DocSection title="Especificaciones" className="" description="Medidas tomadas de Figma.">
                  <SpecsBlock groups={stepperSpecs} />
                </DocSection>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Cuándo usarlo">
                    <BulletList items={stepperUsage} />
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={stepperAccessibility} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Code",
              content: (
                <>
                <DocSection title="React" >
                  <ReactCodeBlock code={stepperReactUsage} />
                </DocSection>
                  <HtmlCssSections html={stepperHtml} css={stepperCss} />
                </>
              ),
            },
          ]}
        />
      </ContentCard>
    </div>
  );
}
