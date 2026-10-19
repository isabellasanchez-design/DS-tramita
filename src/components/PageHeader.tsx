import Link from "next/link";
import type { ReactNode } from "react";
import { VersionInfo } from "@/components/VersionTag";

export function PageHeader({
  eyebrow,
  eyebrowHref,
  title,
  description,
  action,
  docPath,
}: {
  eyebrow?: string;
  eyebrowHref?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  /** Ruta del documento para mostrar su versión; "/" muestra la del D.S. */
  docPath?: string;
}) {
  return (
    <header className="mb-10">
      {eyebrow ? (
        eyebrowHref ? (
          <Link
            href={eyebrowHref}
            className="mb-3 inline-block text-sm font-medium text-[var(--brand-primary)] hover:underline"
          >
            ← {eyebrow}
          </Link>
        ) : (
          <p className="mb-3 text-sm font-medium text-[var(--brand-primary)]">{eyebrow}</p>
        )
      ) : null}

      <div className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-[0px_4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1
            className="text-[32px] font-bold leading-tight text-[#23297b] sm:text-[40px] lg:text-[48px]"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            {title}
          </h1>
          {action}
        </div>
        {description ? (
          <p className="max-w-3xl text-base leading-relaxed text-[#3d4568]">
            {description}
          </p>
        ) : null}
        {docPath ? <VersionInfo path={docPath} /> : null}
      </div>
    </header>
  );
}
