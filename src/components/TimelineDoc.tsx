import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { ReactCodeBlock } from "@/components/CodeBlock";
import { ActivityTimeline, ActivityTimelineItem } from "@/components/ui/ActivityTimeline";
import { BulletList, Callout, DocSection, InfoTable, SpecsBlock } from "@/components/doc/DocBlocks";
import type { ComponentDoc } from "@/data/components";
import { timelineAccessibility, timelineContrastNote, timelineDefinition, timelineEmphasis, timelineReactUsage, timelineSpecs, timelineUsage } from "@/data/timeline";

const events = [
  { emphasis: "L", title: "Trámite cerrado", meta: "09:52 AM  •  Funcionaria: María López", body: "Trámite de radicación finalizado exitosamente" },
  { emphasis: "M", title: "Documentos adjuntados", meta: "09:48 AM  •  Funcionaria: María López", body: "Se adjuntaron 3 documentos" },
  { emphasis: "S", title: "Inicio de atención", meta: "09:47 AM  •  Funcionaria: María López" },
  { emphasis: "none", title: "Rellamado 1", meta: "09:46 AM  •  Funcionaria: María López" },
  { emphasis: "none", title: "Turno llamado a Ventanilla 3", meta: "09:45 AM  •  Funcionaria: María López" },
  { emphasis: "none", title: "Turno generado", meta: "09:12 AM  •  Sistema (Autoservicio)" },
] as const;

export function TimelineDoc({
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
      <PageHeader eyebrow={eyebrow} eyebrowHref={eyebrowHref} docPath={docPath} title="Activity Timeline" description={timelineDefinition} action={<FigmaLink nodeId={component.figmaNodeId} />} />
      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  <DocSection title="Ejemplo" description="Historial de un turno de atención, como en Figma.">
                    <div className="rounded-xl bg-zinc-50 p-6">
                      <div className="max-w-[318px] rounded-lg bg-white p-4">
                        <ActivityTimeline aria-label="Historial del turno">
                          {events.map((event) => (
                            <ActivityTimelineItem key={event.title} emphasis={event.emphasis} title={event.title} meta={event.meta}>
                              {"body" in event ? event.body : null}
                            </ActivityTimelineItem>
                          ))}
                        </ActivityTimeline>
                      </div>
                    </div>
                    <Callout>{timelineContrastNote}</Callout>
                  </DocSection>
                  <DocSection title="Énfasis del punto" className="" level={3}>
                    <InfoTable columns={["Status en Figma", "emphasis", "Cuándo"]} rows={timelineEmphasis.map((row) => [row.figma, <code key="c" className="font-mono text-xs">{row.code}</code>, row.when])} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <DocSection title="Especificaciones" className="" description="Medidas tomadas de Figma.">
                  <SpecsBlock groups={timelineSpecs} />
                </DocSection>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Cuándo usarlo">
                    <BulletList items={timelineUsage} />
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={timelineAccessibility} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Code",
              content: (
                <DocSection title="React" className="">
                  <ReactCodeBlock code={timelineReactUsage} />
                </DocSection>
              ),
            },
          ]}
        />
      </ContentCard>
    </div>
  );
}
