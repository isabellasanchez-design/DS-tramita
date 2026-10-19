import Link from "next/link";
import type { ReactNode } from "react";
import { VersionBadge } from "@/components/VersionTag";
import { getDocVersion } from "@/lib/versions";

export function IndexCard({
  href,
  title,
  description,
  preview,
}: {
  href: string;
  title: string;
  description?: string;
  /** Miniatura del componente; decorativa, el nombre ya está en el título. */
  preview?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-3 rounded-2xl bg-white p-8 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] transition-colors hover:bg-[var(--brand-primary-soft)]"
    >
      {preview ? (
        <div
          aria-hidden
          className="mb-2 flex h-36 items-center justify-center overflow-hidden rounded-xl bg-[#fafafa] p-4"
        >
          {preview}
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-bold text-[#23297b]">{title}</h3>
        <VersionBadge version={getDocVersion(href)} />
      </div>
      {description ? <p className="text-sm text-[#3d4568]">{description}</p> : null}
    </Link>
  );
}
