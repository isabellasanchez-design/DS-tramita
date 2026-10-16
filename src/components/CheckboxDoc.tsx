import { PageHeader } from "@/components/PageHeader";
import { FigmaLink } from "@/components/FigmaLink";
import { ContentCard } from "@/components/ContentCard";
import { Tabs } from "@/components/Tabs";
import { CheckboxPreview } from "@/components/CheckboxPreview";
import { CheckboxDemo } from "@/components/CheckboxDemo";
import { CheckboxAnatomyDiagram, CheckboxSpecsDiagram } from "@/components/CheckboxDiagrams";
import { CssCodeBlock, HtmlCodeBlock } from "@/components/CodeBlock";
import type { ComponentDoc } from "@/data/components";
import {
  checkboxTypeNames,
  checkboxStateNames,
  getCheckboxStyle,
  checkboxDefinition,
  checkboxTypeInfo,
  checkboxStateInfo,
  checkboxUsage,
  checkboxAccessibility,
  checkboxAnatomy,
  checkboxSpecs,
  checkboxCssRules,
  checkboxHtml,
} from "@/data/checkbox";

export function CheckboxDoc({
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
        title="Checkbox"
        description={checkboxDefinition}
        action={<FigmaLink nodeId={component.figmaNodeId} />}
      />

      <ContentCard>
        <Tabs
          tabs={[
            {
              label: "Resumen",
              content: (
                <>
                  <section className="mb-8">
                    <h2 className="mb-1 text-lg font-semibold text-zinc-900">Tipos</h2>
                    <p className="mb-4 text-sm text-zinc-600">
                      Dos tipos según si la opción está marcada o no.
                    </p>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {checkboxTypeNames.map((type) => (
                        <div
                          key={type}
                          className="flex items-center gap-5 rounded-xl bg-zinc-50 p-6"
                        >
                          <CheckboxPreview
                            style={getCheckboxStyle(type, "Enabled")}
                            label={`${type}, Enabled`}
                            scale={2}
                          />
                          <div>
                            <p className="font-semibold text-zinc-900">{type}</p>
                            <p className="text-sm text-zinc-600">{checkboxTypeInfo[type]}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h2 className="mb-1 text-lg font-semibold text-zinc-900">Estados</h2>
                    <p className="mb-4 text-sm text-zinc-600">
                      Los cinco estados de cada tipo de checkbox.
                    </p>
                    <div className="overflow-x-auto rounded-xl bg-zinc-50 p-6">
                      <table className="w-full min-w-[560px] border-separate border-spacing-4">
                        <thead>
                          <tr>
                            <td />
                            {checkboxStateNames.map((state) => (
                              <th
                                key={state}
                                scope="col"
                                className="text-center text-xs font-semibold uppercase tracking-wide text-zinc-600"
                              >
                                {state}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {checkboxTypeNames.map((type) => (
                            <tr key={type}>
                              <th
                                scope="row"
                                className="pr-2 text-left text-sm font-medium text-zinc-700"
                              >
                                {type}
                              </th>
                              {checkboxStateNames.map((state) => (
                                <td key={state} className="text-center">
                                  <CheckboxPreview
                                    style={getCheckboxStyle(type, state)}
                                    label={`${type}, ${state}`}
                                    scale={1.5}
                                  />
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
                      <table className="w-full min-w-[480px] border-separate border-spacing-y-2">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-600"
                            >
                              Estado
                            </th>
                            <th
                              scope="col"
                              className="text-left text-xs font-semibold uppercase tracking-wide text-zinc-600"
                            >
                              Cuándo aparece
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {checkboxStateInfo.map((row) => (
                            <tr key={row.status} className="align-top">
                              <td className="w-36 rounded-l-lg bg-white px-4 py-3 text-sm font-medium text-zinc-900">
                                {row.status}
                              </td>
                              <td className="rounded-r-lg bg-white px-4 py-3 text-sm text-zinc-600">
                                {row.when}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="mt-8">
                    <h2 className="mb-1 text-lg font-semibold text-zinc-900">Pruébalo</h2>
                    <p className="mb-4 text-sm text-zinc-600">
                      Checkbox funcional con los estilos del D.S. Úsalo con el mouse o con el
                      teclado (Tab para moverte, barra espaciadora para marcar).
                    </p>
                    <div className="rounded-xl bg-zinc-50 p-6">
                      <CheckboxDemo />
                    </div>
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
                      Elementos que componen un checkbox, de afuera hacia adentro.
                    </p>
                    <div className="flex flex-col gap-6 rounded-xl bg-zinc-50 p-6 sm:flex-row sm:items-center">
                      <div className="shrink-0">
                        <CheckboxAnatomyDiagram />
                      </div>
                      <ol className="flex flex-1 flex-col gap-4">
                        {checkboxAnatomy.map((item) => (
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
                    <h2 className="mb-1 text-lg font-semibold text-zinc-900">Especificaciones</h2>
                    <p className="mb-4 text-sm text-zinc-600">
                      Medidas del layout interno del checkbox, tomadas de Figma.
                    </p>
                    <div className="flex flex-col gap-6 rounded-xl bg-zinc-50 p-6 lg:flex-row lg:items-center">
                      <div className="shrink-0">
                        <CheckboxSpecsDiagram />
                      </div>
                      <div className="flex flex-1 flex-col gap-4">
                        {checkboxSpecs.map((group) => (
                          <div key={group.element}>
                            <h3 className="mb-2 text-sm font-semibold text-zinc-900">
                              {group.element}
                            </h3>
                            <dl className="divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white">
                              {group.rows.map((spec) => (
                                <div
                                  key={spec.name}
                                  className="flex items-center justify-between gap-4 px-5 py-3"
                                >
                                  <dt className="text-sm text-zinc-600">{spec.name}</dt>
                                  <dd className="font-mono text-sm text-zinc-900">
                                    {spec.value}
                                  </dd>
                                </div>
                              ))}
                            </dl>
                          </div>
                        ))}
                      </div>
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
                      {checkboxUsage.title}
                    </h2>
                    <p className="rounded-xl bg-zinc-50 p-6 text-sm leading-relaxed text-zinc-700">
                      {checkboxUsage.detail}
                    </p>
                  </section>

                  <section>
                    <h2 className="mb-1 text-lg font-semibold text-zinc-900">Accesibilidad</h2>
                    <ul className="flex list-disc flex-col gap-2 rounded-xl bg-zinc-50 p-6 pl-10">
                      {checkboxAccessibility.map((item) => (
                        <li key={item} className="text-sm leading-relaxed text-zinc-700">
                          {item}
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
                    <h2 className="mb-1 text-lg font-semibold text-zinc-900">HTML</h2>
                    <p className="mb-4 text-sm text-zinc-600">
                      Usa el input nativo dentro de su label para que el clic en el texto también
                      marque la opción.
                    </p>
                    <HtmlCodeBlock code={checkboxHtml} />
                  </section>

                  <section>
                    <h2 className="mb-1 text-lg font-semibold text-zinc-900">CSS</h2>
                    <p className="mb-4 text-sm text-zinc-600">
                      Estilos de todos los estados. <code className="font-mono">check.svg</code>{" "}
                      es el ícono Check de Phosphor (peso Regular) en blanco.
                    </p>
                    <CssCodeBlock rules={checkboxCssRules} />
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
