import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { ReactCodeBlock } from "@/components/CodeBlock";
import { BarListCard } from "@/components/ui/BarListCard";
import { KpiCard } from "@/components/ui/KpiCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { BulletList, Callout, DocSection, InfoTable, SpecsBlock } from "@/components/doc/DocBlocks";
import type { ComponentDoc } from "@/data/components";
import {
  indicatorsAccessibility,
  indicatorsDefinition,
  indicatorsNote,
  indicatorsReactUsage,
  indicatorsSpecs,
  indicatorsUsage,
  kpiStatusInfo,
} from "@/data/indicators";

const kpis = [
  { value: "1.284", title: "Trámites radicados", description: "Último mes", status: "Neutral", badge: { status: "Neutral", label: "Info" } },
  { value: "92%", title: "Atendidos a tiempo", description: "Meta: 90%", status: "Success", badge: { status: "Success", label: "Cumplido" } },
  { value: "47", title: "Pendientes de revisión", description: "Más de 10 días", status: "Warning", badge: { status: "Warning", label: "En espera" } },
  { value: "12", title: "Vencidos", description: "Requieren acción hoy", status: "Critical", badge: { status: "Critical", label: "Crítico" } },
] as const;

export function IndicatorsDoc({
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
      <PageHeader eyebrow={eyebrow} eyebrowHref={eyebrowHref} docPath={docPath} title="Indicators and graph" description={indicatorsDefinition} action={<FigmaLink nodeId={component.figmaNodeId} />} />
      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  <DocSection title="KPI Card" description="Una por estado (Status) con su badge.">
                    <div className="grid grid-cols-1 gap-6 rounded-xl bg-zinc-50 p-6 sm:grid-cols-2 xl:grid-cols-4">
                      {kpis.map((kpi) => (
                        <KpiCard key={kpi.title} {...kpi} />
                      ))}
                    </div>
                  </DocSection>
                  <DocSection title="Bar List Card">
                    <div className="rounded-xl bg-zinc-50 p-6">
                      <BarListCard
                        title="Nuevos prestadores por actividad turística"
                        subtitle="156 inscripciones este mes"
                        columns={["Actividad", "Inscripciones"]}
                        items={[
                          { label: "Alojamiento turístico", value: 62 },
                          { label: "Agencias de viajes", value: 34 },
                          { label: "Transporte turístico", value: 28 },
                          { label: "Guías de turismo", value: 19 },
                          { label: "Otras actividades", value: 13 },
                        ]}
                        summary="Actividad con mayor crecimiento: Alojamiento turístico"
                        total="Total: 156"
                      />
                    </div>
                    <Callout>{indicatorsNote}</Callout>
                  </DocSection>
                  <DocSection title="Progress bar" description="Tamaños S y XS.">
                    <div className="flex max-w-[320px] flex-col gap-4 rounded-xl bg-zinc-50 p-6">
                      {[100, 66, 33, 5].map((value) => (
                        <div key={value} className="flex items-center gap-3">
                          <ProgressBar value={value} label={`Ejemplo ${value}%`} />
                          <span className="w-10 text-right text-xs font-bold text-[#5c5d70]">{value}%</span>
                        </div>
                      ))}
                      <ProgressBar value={50} size="XS" label="Ejemplo tamaño XS" />
                    </div>
                  </DocSection>
                  <DocSection title="Estados de la KPI Card" className="" level={3}>
                    <InfoTable columns={["Status", "Barra", "Badge"]} rows={kpiStatusInfo.map((row) => [row.status, row.bar, row.badge])} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <DocSection title="Especificaciones" className="" description="Medidas tomadas de Figma.">
                  <SpecsBlock groups={indicatorsSpecs} />
                </DocSection>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Cuándo usarlos">
                    <BulletList items={indicatorsUsage} />
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={indicatorsAccessibility} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Code",
              content: (
                <DocSection title="React" className="">
                  <ReactCodeBlock code={indicatorsReactUsage} />
                </DocSection>
              ),
            },
          ]}
        />
      </ContentCard>
    </div>
  );
}
