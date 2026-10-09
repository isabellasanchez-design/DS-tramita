import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { PendingNotice } from "@/components/PendingNotice";
import type { ComponentDoc } from "@/data/components";

export function ComponentDetail({
  component,
  eyebrow,
  eyebrowHref,
}: {
  component: ComponentDoc;
  eyebrow: string;
  eyebrowHref: string;
}) {
  return (
    <div>
      <PageHeader
        eyebrow={eyebrow}
        eyebrowHref={eyebrowHref}
        title={component.name}
        description={component.summary}
        action={<FigmaLink nodeId={component.figmaNodeId} />}
      />

      <ContentCard>
        {component.variantAxes?.map((axis) => (
          <section key={axis.name}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Variante: {axis.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {axis.values.map((value) => (
                <span
                  key={value}
                  className="rounded-full border border-[var(--brand-primary-soft)] bg-[var(--brand-primary-soft)] px-3 py-1 text-sm text-[var(--brand-navy)]"
                >
                  {value}
                </span>
              ))}
            </div>
          </section>
        ))}

        {component.states && (
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Estados
            </h2>
            <div className="flex flex-wrap gap-2">
              {component.states.map((state) => (
                <span
                  key={state}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 ring-1 ring-inset ring-zinc-200"
                >
                  {state}
                </span>
              ))}
            </div>
          </section>
        )}

        {!component.detailed && (
          <PendingNotice>
            Esta página de Figma es demasiado grande para extraer aquí todas sus variantes
            automáticamente. Usa el enlace de arriba para verla completa; si me dices qué
            variantes documentar primero, las agrego aquí.
          </PendingNotice>
        )}
      </ContentCard>
    </div>
  );
}
