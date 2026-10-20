import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { ChipPreview } from "@/components/ChipPreview";
import { Chip } from "@/components/ui/Chip";
import { CssCodeBlock, HtmlCodeBlock, ReactCodeBlock } from "@/components/CodeBlock";
import {
  AnatomyBlock,
  BulletList,
  Callout,
  DocSection,
  InfoTable,
  MarkerBadge,
  SpecsBlock,
} from "@/components/doc/DocBlocks";
import { chipReactUsage } from "@/data/code/react-usage";
import type { ComponentDoc } from "@/data/components";
import {
  chipAccessibility,
  chipAnatomy,
  chipBestPractices,
  chipCssRules,
  chipDefinition,
  chipHtml,
  chipSpecs,
  chipStateInfo,
  chipStateNames,
  chipStateRule,
  chipStyles,
  chipTypicalUse,
  chipVsButton,
} from "@/data/chips";

const MARKER = "#c54600";

function ChipAnatomyDiagram() {
  return (
    <div className="flex items-center justify-center rounded-lg bg-white px-20 py-20" aria-hidden>
      <div className="relative origin-center scale-150">
        <ChipPreview style={chipStyles.Default} />
        <div className="absolute right-full top-1/2 mr-1.5 flex -translate-y-1/2 items-center gap-1">
          <MarkerBadge n={1} />
          <span className="h-px w-4" style={{ backgroundColor: MARKER }} />
        </div>
        <div className="absolute bottom-full left-[28px] mb-0.5 flex -translate-x-1/2 flex-col items-center gap-0.5">
          <MarkerBadge n={2} />
          <span className="h-3 w-px" style={{ backgroundColor: MARKER }} />
        </div>
        <div className="absolute left-[72px] top-full mt-0.5 flex -translate-x-1/2 flex-col items-center gap-0.5">
          <span className="h-3 w-px" style={{ backgroundColor: MARKER }} />
          <MarkerBadge n={3} />
        </div>
      </div>
    </div>
  );
}

function ChipsDemo() {
  const options = [
    { value: "en-revision", label: "En revisión", defaultChecked: true },
    { value: "aprobado", label: "Aprobado" },
    { value: "rechazado", label: "Rechazado" },
    { value: "archivado", label: "Archivado", disabled: true },
  ];
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-zinc-900">Filtrar trámites por estado</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Chip key={option.value} name="demo-estado" {...option} />
        ))}
      </div>
    </fieldset>
  );
}

export function ChipsDoc({
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
        title="Chips"
        description={chipDefinition}
        action={<FigmaLink nodeId={component.figmaNodeId} />}
      />

      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  <DocSection title="Estados" description="Cuatro estados, con y sin ícono (Show icon).">
                    <div className="grid grid-cols-2 gap-4 rounded-xl bg-zinc-50 p-6 sm:grid-cols-4">
                      {chipStateNames.map((state) => (
                        <div key={state} className="flex flex-col items-center gap-3">
                          <ChipPreview style={chipStyles[state]} />
                          <ChipPreview style={chipStyles[state]} showIcon={false} />
                          <span className="text-xs font-medium text-zinc-600">{state}</span>
                        </div>
                      ))}
                    </div>
                  </DocSection>

                  <DocSection title="Cuándo usar cada estado" level={3}>
                    <InfoTable
                      columns={["Estado", "Descripción visual", "Cuándo usarlo"]}
                      minWidth={640}
                      rows={chipStateInfo.map((row) => [row.status, row.visual, row.when])}
                    />
                    <Callout>{chipStateRule}</Callout>
                  </DocSection>

                  <DocSection
                    title="Pruébalo"
                    className=""
                    description="Chips de selección múltiple. Con el teclado: Tab para moverte y barra espaciadora para marcar."
                  >
                    <div className="rounded-xl bg-zinc-50 p-6">
                      <ChipsDemo />
                    </div>
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <>
                  <DocSection title="Anatomía" description="Elementos que componen un chip.">
                    <AnatomyBlock diagram={<ChipAnatomyDiagram />} items={chipAnatomy} />
                  </DocSection>
                  <DocSection title="Especificaciones" className="" description="Medidas tomadas de Figma.">
                    <SpecsBlock groups={chipSpecs} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Uso típico">
                    <BulletList items={chipTypicalUse} />
                  </DocSection>
                  <DocSection title="Chip vs. Button — no confundir">
                    <InfoTable columns={chipVsButton.columns} rows={chipVsButton.rows} minWidth={640} />
                  </DocSection>
                  <DocSection title="Buenas prácticas">
                    <BulletList items={chipBestPractices} />
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={chipAccessibility} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Code",
              content: (
                <>
                  <section className="mb-8">
                    <h2 className="mb-1 text-lg font-semibold text-zinc-900">React</h2>
                    <p className="mb-4 text-sm text-zinc-600">
                      Componente del D.S. sobre el input nativo; acepta todos sus atributos.
                    </p>
                    <ReactCodeBlock code={chipReactUsage} />
                  </section>
                  <DocSection
                    title="HTML"
                    description="Cada chip envuelve un input nativo oculto visualmente (checkbox o radio)."
                  >
                    <HtmlCodeBlock code={chipHtml} />
                  </DocSection>
                  <DocSection title="CSS" className="" description="Estilos de todos los estados.">
                    <CssCodeBlock rules={chipCssRules} />
                  </DocSection>
                </>
              ),
            },
          ]}
        />
      </ContentCard>
    </div>
  );
}
