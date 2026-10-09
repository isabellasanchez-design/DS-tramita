import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { ContentCard } from "@/components/ContentCard";
import { PendingNotice } from "@/components/PendingNotice";
import { getCategory } from "@/data/nav";

const category = getCategory("fundamentos");

export function generateStaticParams() {
  return category.items.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata(props: PageProps<"/fundamentos/[slug]">) {
  const { slug } = await props.params;
  const item = category.items.find((i) => i.slug === slug);
  return { title: item ? `${item.label} · D.S. Tramita` : "D.S. Tramita" };
}

export default async function FundamentoDetailPage(props: PageProps<"/fundamentos/[slug]">) {
  const { slug } = await props.params;
  const item = category.items.find((i) => i.slug === slug);
  if (!item) notFound();

  return (
    <div>
      <PageHeader eyebrow="Fundamentos" eyebrowHref="/fundamentos" title={item.label} />
      <ContentCard>
        <PendingNotice>
          Cuéntame qué principios o reglas debe incluir esta sección y los documentamos aquí.
        </PendingNotice>
      </ContentCard>
    </div>
  );
}
