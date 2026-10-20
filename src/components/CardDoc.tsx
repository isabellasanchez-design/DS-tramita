import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { ReactCodeBlock } from "@/components/CodeBlock";
import { CardSample, IconButtonSizes, TestimonialSample } from "@/components/CardExamples";
import { BulletList, Callout, DocSection, InfoTable, SpecsBlock, HtmlCssSections } from "@/components/doc/DocBlocks";
import { cardHtml, cardCss } from "@/data/code/organisms";
import type { ComponentDoc } from "@/data/components";
import {
  cardAccessibility,
  cardDefinition,
  cardFocusNote,
  cardReactUsage,
  cardSpecs,
  cardStateInfo,
  cardUsage,
} from "@/data/card";

export function CardDoc({
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
        title="Card"
        description={cardDefinition}
        action={<FigmaLink nodeId={component.figmaNodeId} />}
      />
      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  <DocSection title="Vertical Card" description="Pasa el cursor para ver Hover; haz clic sostenido para Press. Con Tab llegas al título y luego al botón.">
                    <div className="grid grid-cols-1 gap-6 rounded-xl bg-zinc-50 p-6 md:grid-cols-2">
                      <CardSample />
                      <CardSample disabled />
                    </div>
                  </DocSection>
                  <DocSection title="Horizontal Card">
                    <div className="overflow-x-auto rounded-xl bg-zinc-50 p-6">
                      <div className="w-[599px]">
                        <CardSample orientation="horizontal" />
                      </div>
                    </div>
                  </DocSection>
                  <DocSection title="Testimonial card">
                    <div className="rounded-xl bg-zinc-50 p-6">
                      <div className="max-w-[488px]">
                        <TestimonialSample />
                      </div>
                    </div>
                  </DocSection>
                  <DocSection title="Icon Button" description="Círculo con ícono que acompaña a las Cards, en tres tamaños.">
                    <IconButtonSizes />
                  </DocSection>
                  <DocSection title="Estados" className="" level={3}>
                    <InfoTable
                      columns={["Estado", "Cómo se ve", "Cuándo"]}
                      minWidth={640}
                      rows={cardStateInfo.map((row) => [row.status, row.visual, row.when])}
                    />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Specs",
              content: (
                <DocSection title="Especificaciones" className="" description="Medidas tomadas de Figma.">
                  <SpecsBlock groups={cardSpecs} />
                  <Callout>{cardFocusNote}</Callout>
                </DocSection>
              ),
            },
            {
              label: "Lineamientos",
              content: (
                <>
                  <DocSection title="Cuándo usarla">
                    <BulletList items={cardUsage} />
                  </DocSection>
                  <DocSection title="Accesibilidad" className="">
                    <BulletList items={cardAccessibility} />
                  </DocSection>
                </>
              ),
            },
            {
              label: "Code",
              content: (
                <>
                <DocSection title="React" >
                  <ReactCodeBlock code={cardReactUsage} />
                </DocSection>
                  <HtmlCssSections html={cardHtml} css={cardCss} />
                </>
              ),
            },
          ]}
        />
      </ContentCard>
    </div>
  );
}
