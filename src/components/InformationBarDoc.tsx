import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { ReactCodeBlock } from "@/components/CodeBlock";
import { InformationBarDemo, InformationBarSizes } from "@/components/InformationBarExamples";
import { BulletList, Callout, DocSection, SpecsBlock } from "@/components/doc/DocBlocks";
import type { ComponentDoc } from "@/data/components";
import {
  informationBarAccessibility,
  informationBarContrastNote,
  informationBarDefinition,
  informationBarReactUsage,
  informationBarSpecs,
  informationBarUsage,
} from "@/data/informationBar";

export function InformationBarDoc({
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
        title="Information bar"
        description={informationBarDefinition}
        action={<FigmaLink nodeId={component.figmaNodeId} />}
      />
      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  <DocSection title="Versiones" description="Desktop y Mobile: el componente se adapta solo al ancho de la pantalla.">
                    <InformationBarSizes />
                    <Callout>{informationBarContrastNote}</Callout>
                  </DocSection>
                  <DocSection title="Pruébalo" className="" description="Ciérrala con el mouse o con Tab y Enter.">
                    <div className="rounded-xl bg-zinc-50 p-6">
                      <InformationBarDemo />
                    </div>
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <DocSection title="Especificaciones" className="" description="Medidas tomadas de Figma.">
                  <SpecsBlock groups={informationBarSpecs} />
                </DocSection>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Cuándo usarla">
                    <BulletList items={informationBarUsage} />
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={informationBarAccessibility} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Code",
              content: (
                <DocSection title="React" className="">
                  <ReactCodeBlock code={informationBarReactUsage} />
                </DocSection>
              ),
            },
          ]}
        />
      </ContentCard>
    </div>
  );
}
