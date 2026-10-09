import { redirect, notFound } from "next/navigation";

const legacySlugMap: Record<string, string> = {
  buttons: "botones",
  checkbox: "inputs",
  "radio-button": "inputs",
  switch: "inputs",
  chips: "badges",
  tags: "badges",
};

export default async function LegacyComponentPage(
  props: PageProps<"/components/[slug]">
) {
  const { slug } = await props.params;
  const target = legacySlugMap[slug];
  if (!target) notFound();
  redirect(`/componentes/${target}`);
}
