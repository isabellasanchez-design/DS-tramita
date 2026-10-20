import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { ReactCodeBlock } from "@/components/CodeBlock";
import { AlertToastDemo } from "@/components/AlertToastDemo";
import { AlertActionsExamples, AlertAnatomySample, AlertToneGrid, ToastExamples } from "@/components/AlertToastExamples";
import { AnatomyBlock, BulletList, Callout, DocSection, InfoTable, MarkerBadge, SpecsBlock, HtmlCssSections } from "@/components/doc/DocBlocks";
import { alertHtml, alertCss } from "@/data/code/molecules";
import type { ComponentDoc } from "@/data/components";
import {
  alertAccessibility,
  alertAnatomy,
  alertContrastNote,
  alertDefinition,
  alertReactUsage,
  alertSpecs,
  alertToneInfo,
  alertVsToast,
} from "@/data/alerts";

function AlertAnatomyDiagram() {
  return (
    <div className="relative w-[340px] rounded-lg bg-white p-8" aria-hidden>
      <AlertAnatomySample />
      <div className="absolute left-1 top-4"><MarkerBadge n={1} /></div>
      <div className="absolute left-[34px] top-[30px]"><MarkerBadge n={2} /></div>
      <div className="absolute left-[150px] top-[30px]"><MarkerBadge n={3} /></div>
      <div className="absolute right-3 top-[30px]"><MarkerBadge n={4} /></div>
      <div className="absolute left-[34px] top-[92px]"><MarkerBadge n={5} /></div>
    </div>
  );
}

export function AlertToastDoc({
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
        title="Alert & Toast"
        description={alertDefinition}
        action={<FigmaLink nodeId={component.figmaNodeId} />}
      />
      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  <DocSection title="Alert" description="Seis casos en dos estilos: subtle y solid.">
                    <AlertToneGrid />
                    <Callout>{alertContrastNote}</Callout>
                  </DocSection>

                  <DocSection title="Con acciones" level={3}>
                    <AlertActionsExamples />
                  </DocSection>

                  <DocSection title="Toast" description="Título, descripción opcional y una acción.">
                    <ToastExamples />
                  </DocSection>

                  <DocSection title="Cuándo usar cada caso" level={3}>
                    <InfoTable columns={["Caso", "Cuándo usarlo"]} rows={alertToneInfo.map((row) => [row.tone, row.when])} />
                  </DocSection>

                  <DocSection title="Pruébalo" className="" description="El Toast se anuncia al aparecer y se queda hasta que lo cierras.">
                    <div className="rounded-xl bg-zinc-50 p-6">
                      <AlertToastDemo />
                    </div>
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <>
                  <DocSection title="Anatomía" description="Elementos que componen un Alert.">
                    <AnatomyBlock diagram={<AlertAnatomyDiagram />} items={alertAnatomy} />
                  </DocSection>
                  <DocSection title="Especificaciones" className="" description="Medidas tomadas de Figma.">
                    <SpecsBlock groups={alertSpecs} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Alert vs. Toast">
                    <InfoTable columns={alertVsToast.columns} rows={alertVsToast.rows} minWidth={560} />
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={alertAccessibility} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Code",
              content: (
                <>
                <DocSection title="React"  description="Alert y Toast comparten los casos y estilos.">
                  <ReactCodeBlock code={alertReactUsage} />
                </DocSection>
                  <HtmlCssSections html={alertHtml} css={alertCss} />
                </>
              ),
            },
          ]}
        />
      </ContentCard>
    </div>
  );
}
