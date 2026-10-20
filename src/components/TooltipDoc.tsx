import { DownloadSimpleIcon, InfoIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { ReactCodeBlock } from "@/components/CodeBlock";
import { Button } from "@/components/ui/Button";
import { Tooltip, TooltipBubble } from "@/components/ui/Tooltip";
import {
  AnatomyBlock,
  BulletList,
  Callout,
  DocSection,
  InfoTable,
  MarkerBadge,
  SpecsBlock,
} from "@/components/doc/DocBlocks";
import type { ComponentDoc } from "@/data/components";
import {
  tooltipAccessibility,
  tooltipAnatomy,
  tooltipDefinition,
  tooltipPositionNote,
  tooltipPositions,
  tooltipReactUsage,
  tooltipSpecs,
  tooltipUsage,
} from "@/data/tooltip";

const SAMPLE = "Tool tip large text to fill the space in maximum two lines";

function TooltipAnatomyDiagram() {
  return (
    <div className="relative rounded-lg bg-white px-12 py-12" aria-hidden>
      <TooltipBubble tipPosition="leftBottom">{SAMPLE}</TooltipBubble>
      <div className="absolute left-4 top-[58px]"><MarkerBadge n={1} /></div>
      <div className="absolute right-4 top-[58px]"><MarkerBadge n={2} /></div>
      <div className="absolute left-[60px] top-[100px]"><MarkerBadge n={3} /></div>
    </div>
  );
}

export function TooltipDoc({
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
        title="Tooltip"
        description={tooltipDefinition}
        action={<FigmaLink nodeId={component.figmaNodeId} />}
      />

      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  <DocSection title="Posiciones" description="Las ocho tip-position de Figma.">
                    <div className="grid grid-cols-1 gap-8 rounded-xl bg-zinc-50 p-6 sm:grid-cols-2 lg:grid-cols-4">
                      {tooltipPositions.map((position) => (
                        <div key={position.code} className="flex flex-col items-start gap-3">
                          <div className="flex min-h-[64px] items-center px-2">
                            <TooltipBubble tipPosition={position.code}>Texto del tooltip</TooltipBubble>
                          </div>
                          <span className="text-xs font-medium text-zinc-600">{position.figma}</span>
                        </div>
                      ))}
                    </div>
                    <Callout>{tooltipPositionNote}</Callout>
                  </DocSection>

                  <DocSection title="Equivalencia con el código" level={3}>
                    <InfoTable
                      columns={["Figma (tip-position)", "Código (tipPosition)", "Dónde aparece"]}
                      minWidth={560}
                      rows={tooltipPositions.map((row) => [
                        row.figma,
                        <code key="c" className="font-mono text-xs">{row.code}</code>,
                        row.placement,
                      ])}
                    />
                  </DocSection>

                  <DocSection
                    title="Pruébalo"
                    className=""
                    description="Pasa el cursor o llega con Tab. Escape lo cierra sin mover el foco."
                  >
                    <div className="flex flex-wrap items-center gap-6 rounded-xl bg-zinc-50 px-6 pb-6 pt-20">
                      <Tooltip content="Descarga el comprobante en PDF">
                        <Button variant="Tertiary" aria-label="Descargar" iconLeft={<DownloadSimpleIcon weight="regular" />} />
                      </Tooltip>
                      <Tooltip content="El NIT es el número de identificación tributaria de la empresa" tipPosition="leftBottom">
                        <Button variant="Link" iconRight={<InfoIcon weight="regular" />}>
                          ¿Qué es el NIT?
                        </Button>
                      </Tooltip>
                      <Tooltip content="Eliminar el borrador de la solicitud" tipPosition="right">
                        <Button variant="Destructive" aria-label="Eliminar" iconLeft={<TrashIcon weight="regular" />} />
                      </Tooltip>
                    </div>
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <>
                  <DocSection title="Anatomía" description="Elementos que componen un tooltip.">
                    <AnatomyBlock diagram={<TooltipAnatomyDiagram />} items={tooltipAnatomy} />
                  </DocSection>
                  <DocSection title="Especificaciones" className="" description="Medidas tomadas de Figma.">
                    <SpecsBlock groups={tooltipSpecs} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Cuándo usarlo">
                    <BulletList items={tooltipUsage} />
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={tooltipAccessibility} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Code",
              content: (
                <DocSection title="React" className="" description="Envuelve el elemento que activa el tooltip.">
                  <ReactCodeBlock code={tooltipReactUsage} />
                </DocSection>
              ),
            },
          ]}
        />
      </ContentCard>
    </div>
  );
}
