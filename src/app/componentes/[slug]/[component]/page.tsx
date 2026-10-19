import { notFound } from "next/navigation";
import { ComponentDetail } from "@/components/ComponentDetail";
import { CheckboxDoc } from "@/components/CheckboxDoc";
import { RadioDoc } from "@/components/RadioDoc";
import { SwitchDoc } from "@/components/SwitchDoc";
import { ChipsDoc } from "@/components/ChipsDoc";
import { TagsDoc } from "@/components/TagsDoc";

// Componentes con documentación completa; el resto usa ComponentDetail.
const detailedDocs = {
  checkbox: CheckboxDoc,
  "radio-button": RadioDoc,
  switch: SwitchDoc,
  chips: ChipsDoc,
  tags: TagsDoc,
} as const;
import { components, componentGroups } from "@/data/components";
import { getCategory } from "@/data/nav";

const category = getCategory("componentes");

export function generateStaticParams() {
  return Object.entries(componentGroups)
    .filter(([, group]) => group.length > 1)
    .flatMap(([slug, group]) => group.map((component) => ({ slug, component })));
}

export async function generateMetadata(props: PageProps<"/componentes/[slug]/[component]">) {
  const { component: componentSlug } = await props.params;
  const component = components.find((c) => c.slug === componentSlug);
  return { title: component ? `${component.name} · D.S. Tramita` : "D.S. Tramita" };
}

export default async function ComponenteDetailPage(
  props: PageProps<"/componentes/[slug]/[component]">
) {
  const { slug, component: componentSlug } = await props.params;
  const item = category.items.find((i) => i.slug === slug);
  const group = componentGroups[slug];
  const component = components.find((c) => c.slug === componentSlug);

  if (!item || !group || !group.includes(componentSlug) || !component) {
    notFound();
  }

  const DetailedDoc = detailedDocs[componentSlug as keyof typeof detailedDocs];
  if (DetailedDoc) {
    return (
      <DetailedDoc
        component={component}
        eyebrow={item.label}
        eyebrowHref={`/componentes/${slug}`}
        docPath={`/componentes/${slug}/${componentSlug}`}
      />
    );
  }

  return (
    <ComponentDetail
      component={component}
      eyebrow={item.label}
      eyebrowHref={`/componentes/${slug}`}
      docPath={`/componentes/${slug}/${componentSlug}`}
    />
  );
}
