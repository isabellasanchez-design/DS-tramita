import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { SwitchPreview } from "@/components/SwitchPreview";
import { Switch } from "@/components/ui/Switch";
import { CssCodeBlock, HtmlCodeBlock, ReactCodeBlock } from "@/components/CodeBlock";
import {
  AnatomyBlock,
  BulletList,
  Callout,
  DocSection,
  InfoTable,
  MarkerBadge,
  PreviewMatrix,
  SpecsBlock,
} from "@/components/doc/DocBlocks";
import { switchReactUsage } from "@/data/code/react-usage";
import type { ComponentDoc } from "@/data/components";
import {
  getSwitchStyle,
  switchAccessibility,
  switchAnatomy,
  switchCssRules,
  switchDefinition,
  switchHtml,
  switchSelectedNames,
  switchSpecs,
  switchStateInfo,
  switchStateNames,
  switchVsCheckbox,
} from "@/data/switch";

const MARKER = "#c54600";

function SwitchAnatomyDiagram() {
  return (
    <div className="flex items-center justify-center rounded-lg bg-white px-24 py-24" aria-hidden>
      <div className="relative">
        <SwitchPreview style={getSwitchStyle("Yes", "Enabled")} label="Switch" scale={3} />
        <div className="absolute right-full top-1/2 mr-2 flex -translate-y-1/2 items-center gap-2">
          <MarkerBadge n={1} />
          <span className="h-px w-8" style={{ backgroundColor: MARKER }} />
        </div>
        <div className="absolute bottom-full right-[36px] mb-1 flex translate-x-1/2 flex-col items-center gap-1">
          <MarkerBadge n={2} />
          <span className="h-6 w-px" style={{ backgroundColor: MARKER }} />
        </div>
        <div className="absolute left-full top-1/2 ml-1 flex -translate-y-1/2 items-center gap-2">
          <span className="h-px w-8" style={{ backgroundColor: MARKER }} />
          <MarkerBadge n={3} />
        </div>
        <div className="absolute right-[36px] top-[62px] flex translate-x-1/2 flex-col items-center gap-1">
          <span className="h-10 w-px" style={{ backgroundColor: MARKER }} />
          <MarkerBadge n={4} />
        </div>
      </div>
    </div>
  );
}

function SwitchDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Switch name="demo-correo" label="Notificaciones por correo" defaultChecked />
      <Switch name="demo-sms" label="Notificaciones por SMS" />
      <Switch name="demo-firma" label="Firma digital (requiere certificado)" disabled />
    </div>
  );
}

export function SwitchDoc({
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
        title="Switch"
        description={switchDefinition}
        action={<FigmaLink nodeId={component.figmaNodeId} />}
      />

      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  <DocSection title="Estados" description="Selected (Yes/No) × State (Enabled, Hovered, Keyboardtab, Pressed, Disabled).">
                    <PreviewMatrix
                      columns={[...switchStateNames]}
                      minWidth={640}
                      rows={switchSelectedNames.map((selected) => ({
                        label: `Selected ${selected}`,
                        cells: switchStateNames.map((state) => (
                          <SwitchPreview
                            key={state}
                            style={getSwitchStyle(selected, state)}
                            label={`Selected ${selected}, ${state}`}
                            scale={1.25}
                          />
                        )),
                      }))}
                    />
                  </DocSection>

                  <DocSection title="Cuándo aparece cada estado" level={3}>
                    <InfoTable
                      columns={["Estado", "Cuándo aparece"]}
                      rows={switchStateInfo.map((row) => [row.status, row.when])}
                    />
                  </DocSection>

                  <DocSection
                    title="Pruébalo"
                    className=""
                    description="Switches funcionales. Con el teclado: Tab para moverte y barra espaciadora para cambiar."
                  >
                    <div className="rounded-xl bg-zinc-50 p-6">
                      <SwitchDemo />
                    </div>
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <>
                  <DocSection title="Anatomía" description="Elementos que componen un switch.">
                    <AnatomyBlock diagram={<SwitchAnatomyDiagram />} items={switchAnatomy} />
                  </DocSection>
                  <DocSection title="Especificaciones" className="" description="Medidas tomadas de Figma.">
                    <SpecsBlock groups={switchSpecs} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Switch vs. Checkbox — no confundir">
                    <InfoTable columns={switchVsCheckbox.columns} rows={switchVsCheckbox.rows} minWidth={640} />
                    <Callout>{switchVsCheckbox.rule}</Callout>
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={switchAccessibility} />
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
                    <ReactCodeBlock code={switchReactUsage} />
                  </section>
                  <DocSection title="HTML" description='Checkbox nativo con role="switch".'>
                    <HtmlCodeBlock code={switchHtml} />
                  </DocSection>
                  <DocSection
                    title="CSS"
                    className=""
                    description="Pista y handle. Los íconos Check/X (Phosphor, Bold, 18px) van como elementos aparte sobre el handle."
                  >
                    <CssCodeBlock rules={switchCssRules} />
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
