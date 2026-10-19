import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { IndexCard } from "@/components/IndexCard";
import { ComponentDetail } from "@/components/ComponentDetail";
import { renderDetailedDoc } from "@/components/detailedDocs";
import { ButtonPreview } from "@/components/ButtonPreview";
import { FigmaLink } from "@/components/FigmaLink";
import { PendingNotice } from "@/components/PendingNotice";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { ButtonAnatomyDiagram, ButtonSpecsDiagram } from "@/components/ButtonDiagrams";
import { ButtonUsageExample } from "@/components/ButtonUsageExamples";
import { ButtonSizePreview } from "@/components/ButtonSizePreview";
import { ButtonSizeSpecCard } from "@/components/ButtonSizeSpecCard";
import { ButtonCodeBlock } from "@/components/ButtonCodeBlock";
import { ButtonDemo } from "@/components/ButtonDemo";
import { ReactCodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/doc/DocBlocks";
import { findComponent, componentGroups } from "@/data/components";
import {
  buttonTypeNames,
  buttonStateNames,
  getButtonStyle,
  buttonAnatomy,
  buttonSpecs,
  buttonDefinition,
  buttonStateInfo,
  buttonUsageIntro,
  buttonUsageByType,
  buttonUsageOutro,
  buttonBestPractices,
  buttonSizeNames,
  buttonSizeSpecs,
  buttonReactUsage,
  buttonFocusNote,
} from "@/data/buttons";
import { getCategory } from "@/data/nav";

const category = getCategory("componentes");

export function generateStaticParams() {
  return category.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata(props: PageProps<"/componentes/[slug]">) {
  const { slug } = await props.params;
  const item = category.items.find((i) => i.slug === slug);
  return { title: item ? `${item.label} · D.S. Tramita` : "D.S. Tramita" };
}

export default async function ComponenteCategoryPage(props: PageProps<"/componentes/[slug]">) {
  const { slug } = await props.params;
  const item = category.items.find((i) => i.slug === slug);
  if (!item) notFound();

  const group = componentGroups[slug];

  if (slug === "botones") {
    const botones = findComponent("buttons");
    return (
      <div>
        <PageHeader
          eyebrow="Componentes"
          eyebrowHref="/componentes"
          docPath={`/componentes/${slug}`}
          title="Botones"
          description={buttonDefinition}
          action={<FigmaLink nodeId={botones.figmaNodeId} />}
        />

        <ContentCard>
          <Tabs
            tabs={[
              {
                label: "Resumen",
                content: (
                  <>
                    <section className="mb-8">
                      <h2 className="mb-1 text-lg font-semibold text-zinc-900">Variantes</h2>
                      <p className="mb-4 text-sm text-zinc-600">
                        Seis tipos de botón según su jerarquía dentro de la interfaz.
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-6 rounded-xl bg-zinc-50 p-6">
                        {buttonTypeNames.map((type) => (
                          <div key={type} className="flex flex-col items-center gap-2">
                            <ButtonPreview style={getButtonStyle(type, "Default")} />
                            <span className="text-xs font-medium text-zinc-500">{type}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="mb-8">
                      <h2 className="mb-1 text-lg font-semibold text-zinc-900">Tamaños</h2>
                      <p className="mb-4 text-sm text-zinc-600">
                        Tres tamaños de botón según el espacio y la densidad de la interfaz.
                        Ilustrados sobre el tipo Primary; el radio y el color dependen del tipo.
                      </p>
                      <div className="grid grid-cols-1 gap-6 rounded-xl bg-zinc-50 p-6 sm:grid-cols-3">
                        {buttonSizeNames.map((sizeName) => {
                          const spec = buttonSizeSpecs[sizeName];
                          return (
                            <div key={sizeName} className="flex flex-col items-center gap-4">
                              <div
                                className="flex items-center"
                                style={{ height: buttonSizeSpecs.Large.height }}
                              >
                                <ButtonSizePreview size={sizeName} />
                              </div>
                              <ButtonSizeSpecCard size={sizeName} spec={spec} />
                            </div>
                          );
                        })}
                      </div>
                    </section>

                    <section>
                      <h2 className="mb-1 text-lg font-semibold text-zinc-900">Estados</h2>
                      <p className="mb-4 text-sm text-zinc-600">
                        Los cinco estados de cada uno de los seis tipos de botón.
                      </p>
                      <div className="overflow-x-auto rounded-xl bg-zinc-50 p-6">
                        <table className="w-full min-w-[720px] border-separate border-spacing-4">
                          <thead>
                            <tr>
                              <th />
                              {buttonStateNames.map((state) => (
                                <th
                                  key={state}
                                  className="text-center text-xs font-semibold uppercase tracking-wide text-zinc-500"
                                >
                                  {state}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {buttonTypeNames.map((type) => (
                              <tr key={type}>
                                <th className="pr-2 text-left text-sm font-medium text-zinc-700">
                                  {type}
                                </th>
                                {buttonStateNames.map((state) => (
                                  <td key={state} className="text-center">
                                    <ButtonPreview style={getButtonStyle(type, state)} />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>

                    <section className="mt-8">
                      <h3 className="mb-1 text-base font-semibold text-zinc-900">
                        Cuándo aparece cada estado
                      </h3>
                      <div className="overflow-x-auto rounded-xl bg-zinc-50 p-6">
                        <table className="w-full min-w-[640px] border-separate border-spacing-y-2">
                          <thead>
                            <tr>
                              <th className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Status
                              </th>
                              <th className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Cuándo aparece
                              </th>
                              <th className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                                Comportamiento
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {buttonStateInfo.map((row) => (
                              <tr key={row.status} className="align-top">
                                <td className="w-32 rounded-l-lg bg-white px-4 py-3 text-sm font-medium text-zinc-900">
                                  {row.status}
                                </td>
                                <td className="bg-white px-4 py-3 text-sm text-zinc-600">
                                  {row.when}
                                </td>
                                <td className="rounded-r-lg bg-white px-4 py-3 text-sm text-zinc-600">
                                  {row.behavior}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <Callout>{buttonFocusNote}</Callout>
                    </section>
                  </>
                ),
              },
              {
                label: "Specs",
                content: (
                  <>
                    <section className="mb-8">
                      <h2 className="mb-1 text-lg font-semibold text-zinc-900">Anatomía</h2>
                      <p className="mb-4 text-sm text-zinc-600">
                        Elementos que componen un botón, de izquierda a derecha.
                      </p>
                      <div className="flex flex-col gap-6 rounded-xl bg-zinc-50 p-6 sm:flex-row sm:items-center">
                        <div className="shrink-0">
                          <ButtonAnatomyDiagram />
                        </div>
                        <ol className="flex flex-1 flex-col gap-4">
                          {buttonAnatomy.map((item) => (
                            <li key={item.number} className="flex gap-3">
                              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#c54600] text-xs font-bold text-white">
                                {item.number}
                              </span>
                              <div>
                                <p className="font-semibold text-zinc-900">{item.name}</p>
                                <p className="text-sm text-zinc-600">{item.detail}</p>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </section>

                    <section>
                      <h2 className="mb-1 text-lg font-semibold text-zinc-900">
                        Especificaciones
                      </h2>
                      <p className="mb-4 text-sm text-zinc-600">
                        Medidas del layout interno del botón, tomadas de Figma.
                      </p>
                      <div className="flex flex-col gap-6 rounded-xl bg-zinc-50 p-6 lg:flex-row lg:items-center">
                        <div className="shrink-0">
                          <ButtonSpecsDiagram />
                        </div>
                        <dl className="flex-1 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white">
                          {buttonSpecs.map((spec) => (
                            <div
                              key={spec.name}
                              className="flex items-center justify-between gap-4 px-5 py-3"
                            >
                              <dt className="text-sm text-zinc-600">{spec.name}</dt>
                              <dd className="font-mono text-sm text-zinc-900">{spec.value}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </section>
                  </>
                ),
              },
              {
                label: "Lineamientos",
                content: (
                  <>
                    <section className="mb-8">
                      <h2 className="mb-1 text-lg font-semibold text-zinc-900">
                        Uso de botones
                      </h2>
                      <p className="mb-4 text-sm leading-relaxed text-zinc-600">
                        {buttonUsageIntro}
                      </p>
                      <div className="mb-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {buttonUsageByType.map((item) => (
                          <div
                            key={item.type}
                            className="flex flex-col gap-3 rounded-xl bg-zinc-50 p-4"
                          >
                            <ButtonUsageExample type={item.type} />
                            <p className="text-sm leading-relaxed text-zinc-700">
                              <span className="font-semibold text-zinc-900">{item.type}:</span>{" "}
                              {item.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed text-zinc-600">{buttonUsageOutro}</p>
                    </section>

                    <section>
                      <h2 className="mb-1 text-lg font-semibold text-zinc-900">
                        Buenas prácticas
                      </h2>
                      <ul className="flex list-disc flex-col gap-2 rounded-xl bg-zinc-50 p-6 pl-10">
                        {buttonBestPractices.map((practice) => (
                          <li key={practice} className="text-sm leading-relaxed text-zinc-700">
                            {practice}
                          </li>
                        ))}
                      </ul>
                    </section>
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
                        Componente <code className="font-mono">Button</code> sobre el botón
                        nativo. Pruébalo con mouse y con teclado (Tab, Enter, Espacio).
                      </p>
                      <div className="mb-4 rounded-xl bg-zinc-50 p-6">
                        <ButtonDemo />
                      </div>
                      <ReactCodeBlock code={buttonReactUsage} />
                    </section>

                    <section>
                      <h2 className="mb-1 text-lg font-semibold text-zinc-900">
                        Código de cada variante
                      </h2>
                      <p className="mb-4 text-sm text-zinc-600">
                        CSS correspondiente al estado Default de cada tipo de botón, tamaño
                        Medium.
                      </p>
                      <div className="flex flex-col gap-6">
                        {buttonTypeNames.map((type) => (
                          <div
                            key={type}
                            className="flex flex-col gap-4 rounded-xl bg-zinc-50 p-6 lg:flex-row lg:items-center"
                          >
                            <div className="flex shrink-0 items-center justify-center lg:w-[220px]">
                              <ButtonPreview style={getButtonStyle(type, "Default")} />
                            </div>
                            <div className="flex-1">
                              <ButtonCodeBlock type={type} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </>
                ),
              },
            ]}
          />
        </ContentCard>
      </div>
    );
  }

  if (group && group.length === 1) {
    const detailedDoc = renderDetailedDoc({
      component: findComponent(group[0]),
      eyebrow: "Componentes",
      eyebrowHref: "/componentes",
      docPath: `/componentes/${slug}`,
    });
    if (detailedDoc) return detailedDoc;
    return (
      <ComponentDetail
        component={findComponent(group[0])}
        eyebrow="Componentes"
        eyebrowHref="/componentes"
        docPath={`/componentes/${slug}`}
      />
    );
  }

  if (group && group.length > 1) {
    return (
      <div>
        <PageHeader
          eyebrow="Componentes"
          eyebrowHref="/componentes"
          docPath={`/componentes/${slug}`}
          title={item.label}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {group.map((componentSlug) => {
            const component = findComponent(componentSlug);
            return (
              <IndexCard
                key={componentSlug}
                href={`/componentes/${slug}/${componentSlug}`}
                title={component.name}
                description={component.summary}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Componentes"
        eyebrowHref="/componentes"
        docPath={`/componentes/${slug}`}
        title={item.label}
      />
      <ContentCard>
        <PendingNotice>
          Cuéntame qué variantes, estados y reglas de uso debe incluir {item.label} y lo
          documentamos aquí. Si ya existe en el archivo de Figma, pásame el link de su página.
        </PendingNotice>
      </ContentCard>
    </div>
  );
}
