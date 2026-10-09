import { PageHeader } from "@/components/PageHeader";
import { IndexCard } from "@/components/IndexCard";
import { getCategory } from "@/data/nav";

export const metadata = { title: "Fundamentos · D.S. Tramita" };

const category = getCategory("fundamentos");

export default function FundamentosIndexPage() {
  return (
    <div>
      <PageHeader eyebrow="D.S. Tramita" title={category.label} description={category.description} />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {category.items.map((item) => (
          <IndexCard
            key={item.slug}
            href={`/fundamentos/${item.slug}`}
            title={item.label}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
