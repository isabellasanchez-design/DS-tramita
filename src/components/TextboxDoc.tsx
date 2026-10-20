import { CalendarDotsIcon, ClockIcon, UserIcon } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { TextboxDemo } from "@/components/TextboxDemo";
import { ReactCodeBlock } from "@/components/CodeBlock";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  AnatomyBlock,
  BulletList,
  Callout,
  DocSection,
  InfoTable,
  MarkerBadge,
  SpecsBlock,
  HtmlCssSections,
} from "@/components/doc/DocBlocks";
import { textboxHtml, textboxCss } from "@/data/code/molecules";
import type { ComponentDoc } from "@/data/components";
import {
  textboxAccessibility,
  textboxAnatomy,
  textboxBestPractices,
  textboxContrastNote,
  textboxDefinition,
  textboxReactUsage,
  textboxSpecs,
  textboxStateInfo,
  textboxUseCases,
} from "@/data/textbox";

function Sample({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">{title}</span>
      {children}
    </div>
  );
}

function TextboxAnatomyDiagram() {
  return (
    <div className="relative w-[320px] rounded-lg bg-white px-10 py-8" aria-hidden>
      <div className="pointer-events-none" inert>
        <Input
          label="Label"
          defaultValue="Texto"
          iconLeft={<UserIcon weight="regular" />}
          iconRight={<ClockIcon weight="regular" />}
          message="Mensaje"
          hint="Ayuda"
        />
      </div>
      <div className="absolute left-2 top-8"><MarkerBadge n={1} /></div>
      <div className="absolute left-2 top-[60px]"><MarkerBadge n={2} /></div>
      <div className="absolute right-2 top-[60px]"><MarkerBadge n={3} /></div>
      <div className="absolute left-2 top-[92px]"><MarkerBadge n={4} /></div>
      <div className="absolute left-2 top-[116px]"><MarkerBadge n={5} /></div>
    </div>
  );
}

export function TextboxDoc({
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
        title="Textbox"
        description={textboxDefinition}
        action={<FigmaLink nodeId={component.figmaNodeId} />}
      />

      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  <DocSection title="Casos de uso" description="Los cuatro use-case de Figma y el componente que corresponde a cada uno.">
                    <div className="grid grid-cols-1 gap-6 rounded-xl bg-zinc-50 p-6 md:grid-cols-2">
                      <Input label="Text field" placeholder="Escribe tu nombre" iconLeft={<UserIcon weight="regular" />} />
                      <Input label="Date" type="date" />
                      <Input label="Password" type="password" defaultValue="contraseña" />
                      <Select label="Dropdown" placeholder="Selecciona una hora" defaultValue="" iconLeft={<ClockIcon weight="regular" />}>
                        <option value="8">8:00 a. m.</option>
                        <option value="10">10:00 a. m.</option>
                      </Select>
                    </div>
                    <div className="mt-4">
                      <InfoTable
                        columns={["Caso", "Componente", "Cuándo usarlo"]}
                        minWidth={640}
                        rows={textboxUseCases.map((row) => [
                          row.name,
                          <code key="c" className="font-mono text-xs">{row.component}</code>,
                          row.detail,
                        ])}
                      />
                    </div>
                  </DocSection>

                  <DocSection title="Estados" description="Active es el foco: haz clic en cualquier campo para verlo.">
                    <div className="grid grid-cols-1 gap-6 rounded-xl bg-zinc-50 p-6 md:grid-cols-2">
                      <Sample title="Default">
                        <Input label="Nombre" placeholder="Escribe tu nombre" message="Como aparece en tu documento." />
                      </Sample>
                      <Sample title="Filled">
                        <Input label="Nombre" defaultValue="Ana María Restrepo" message="Como aparece en tu documento." />
                      </Sample>
                      <Sample title="Error">
                        <Input label="Correo" defaultValue="ana.correo.com" status="error" message="Escribe un correo con @." />
                      </Sample>
                      <Sample title="Success">
                        <Input label="NIT" defaultValue="900123456-7" status="success" message="NIT verificado." />
                      </Sample>
                      <Sample title="Disabled">
                        <Input label="País" defaultValue="Colombia" disabled iconRight={<CalendarDotsIcon weight="regular" />} />
                      </Sample>
                    </div>
                  </DocSection>

                  <DocSection title="Cuándo aparece cada estado" level={3}>
                    <InfoTable
                      columns={["Estado", "Cuándo aparece", "Cómo se activa"]}
                      minWidth={640}
                      rows={textboxStateInfo.map((row) => [row.status, row.when, row.how])}
                    />
                  </DocSection>

                  <DocSection
                    title="Pruébalo"
                    className=""
                    description="Formulario con validación al salir del campo y al enviar. Pruébalo también con teclado."
                  >
                    <div className="rounded-xl bg-zinc-50 p-6">
                      <TextboxDemo />
                    </div>
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <>
                  <DocSection title="Anatomía" description="Elementos que componen un textbox.">
                    <AnatomyBlock diagram={<TextboxAnatomyDiagram />} items={textboxAnatomy} />
                  </DocSection>
                  <DocSection title="Especificaciones" className="" description="Medidas tomadas de Figma (Desktop; entre paréntesis, Mobile).">
                    <SpecsBlock groups={textboxSpecs} />
                    <Callout>{textboxContrastNote}</Callout>
                  </DocSection>
                </>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Buenas prácticas">
                    <BulletList items={textboxBestPractices} />
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={textboxAccessibility} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Code",
              content: (
                <>
                <DocSection
                  title="React"
                  
                  description="Input cubre Text field, Date y Password; Select cubre Dropdown. Ambos aceptan todos los atributos nativos."
                >
                  <ReactCodeBlock code={textboxReactUsage} />
                </DocSection>
                  <HtmlCssSections html={textboxHtml} css={textboxCss} />
                </>
              ),
            },
          ]}
        />
      </ContentCard>
    </div>
  );
}
