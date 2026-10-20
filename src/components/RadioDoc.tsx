import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { RadioPreview } from "@/components/RadioPreview";
import { Radio } from "@/components/ui/Radio";
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
import { radioReactUsage } from "@/data/code/react-usage";
import type { ComponentDoc } from "@/data/components";
import {
  getRadioStyle,
  radioAccessibility,
  radioAnatomy,
  radioCssRules,
  radioDefinition,
  radioHtml,
  radioSelectedInfo,
  radioSelectedNames,
  radioSelectedNote,
  radioSpecs,
  radioStateInfo,
  radioStateNames,
  radioUsage,
} from "@/data/radio";

const MARKER = "#c54600";

function RadioAnatomyDiagram() {
  return (
    <div className="flex items-center justify-center rounded-lg bg-white px-24 pb-12 pt-20" aria-hidden>
      <div className="relative">
        <RadioPreview style={getRadioStyle("True", "Enabled")} label="Radio Button" scale={3} />
        <div className="absolute right-full top-1/2 mr-2 flex -translate-y-1/2 items-center gap-2">
          <MarkerBadge n={1} />
          <span className="h-px w-8" style={{ backgroundColor: MARKER }} />
        </div>
        <div className="absolute bottom-full left-1/2 -mb-3 flex -translate-x-1/2 flex-col items-center gap-1">
          <MarkerBadge n={2} />
          <span className="h-8 w-px" style={{ backgroundColor: MARKER }} />
        </div>
      </div>
    </div>
  );
}

function RadioDemo() {
  const options = [
    { value: "cc", label: "Cédula de ciudadanía", defaultChecked: true },
    { value: "ce", label: "Cédula de extranjería" },
    { value: "pa", label: "Pasaporte" },
    { value: "ti", label: "Tarjeta de identidad (no aplica para este trámite)", disabled: true },
  ];
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-sm font-medium text-zinc-900">Tipo de documento</legend>
      {options.map((option) => (
        <Radio key={option.value} name="demo-tipo-documento" {...option} />
      ))}
    </fieldset>
  );
}

export function RadioDoc({
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
        title="Radio Button"
        description={radioDefinition}
        action={<FigmaLink nodeId={component.figmaNodeId} />}
      />

      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  <DocSection title="Selected: True vs. False">
                    <InfoTable
                      columns={["Selected", "Muestra", "Descripción visual", "Cuándo aparece"]}
                      minWidth={640}
                      rows={radioSelectedNames.map((selected) => [
                        selected,
                        <RadioPreview
                          key="preview"
                          style={getRadioStyle(selected, "Enabled")}
                          label={`Selected ${selected}, Enabled`}
                          scale={1.5}
                        />,
                        radioSelectedInfo[selected].visual,
                        radioSelectedInfo[selected].when,
                      ])}
                    />
                    <Callout>{radioSelectedNote}</Callout>
                  </DocSection>

                  <DocSection title="Estados" description="Selected (True/False) × State.">
                    <PreviewMatrix
                      columns={[...radioStateNames]}
                      rows={radioSelectedNames.map((selected) => ({
                        label: `Selected ${selected}`,
                        cells: radioStateNames.map((state) => (
                          <RadioPreview
                            key={state}
                            style={getRadioStyle(selected, state)}
                            label={`Selected ${selected}, ${state}`}
                            scale={1.5}
                          />
                        )),
                      }))}
                    />
                  </DocSection>

                  <DocSection title="Cuándo aparece cada estado" level={3}>
                    <InfoTable
                      columns={["Estado", "Cuándo aparece"]}
                      rows={radioStateInfo.map((row) => [row.status, row.when])}
                    />
                  </DocSection>

                  <DocSection
                    title="Pruébalo"
                    className=""
                    description="Grupo de radios funcional. Usa Tab para entrar al grupo y las flechas para cambiar de opción."
                  >
                    <div className="rounded-xl bg-zinc-50 p-6">
                      <RadioDemo />
                    </div>
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <>
                  <DocSection title="Anatomía" description="Elementos que componen un radio button.">
                    <AnatomyBlock diagram={<RadioAnatomyDiagram />} items={radioAnatomy} />
                  </DocSection>
                  <DocSection
                    title="Especificaciones"
                    className=""
                    description="Medidas del layout interno, tomadas de Figma."
                  >
                    <SpecsBlock groups={radioSpecs} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title={radioUsage.title}>
                    <p className="rounded-xl bg-zinc-50 p-6 text-sm leading-relaxed text-zinc-700">
                      {radioUsage.detail}
                    </p>
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={radioAccessibility} />
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
                    <ReactCodeBlock code={radioReactUsage} />
                  </section>
                  <DocSection
                    title="HTML"
                    description="Todas las opciones del grupo comparten name y van dentro de un fieldset."
                  >
                    <HtmlCodeBlock code={radioHtml} />
                  </DocSection>
                  <DocSection title="CSS" className="" description="Estilos de todos los estados.">
                    <CssCodeBlock rules={radioCssRules} />
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
