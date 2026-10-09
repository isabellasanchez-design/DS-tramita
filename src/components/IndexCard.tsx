import Link from "next/link";

export function IndexCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description?: string;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-3 rounded-2xl bg-white p-8 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] transition-colors hover:bg-[var(--brand-primary-soft)]"
    >
      <h3 className="font-bold text-[#23297b]">{title}</h3>
      {description ? <p className="text-sm text-[#3d4568]">{description}</p> : null}
    </Link>
  );
}
