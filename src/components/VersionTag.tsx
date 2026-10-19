import Link from "next/link";
import { historyHref } from "@/lib/docs";
import { formatVersionDate, getDocVersion, type DocVersion } from "@/lib/versions";

export function VersionBadge({ version }: { version: DocVersion | null }) {
  if (!version) {
    return (
      <span className="inline-flex shrink-0 items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600">
        Borrador
      </span>
    );
  }

  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-[var(--brand-primary-soft)] px-2.5 py-0.5 font-mono text-xs font-medium text-[#23297b]">
      <span className="sr-only">Versión </span>v{version.version}
    </span>
  );
}

export function VersionInfo({ path }: { path: string }) {
  const version = getDocVersion(path);

  if (!version) {
    return (
      <div className="flex flex-wrap items-center gap-3 text-sm text-[#3d4568]">
        <VersionBadge version={null} />
        <span>Aún no tiene una versión publicada.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#3d4568]">
      <VersionBadge version={version} />
      <span>
        Actualizado el <time dateTime={version.date}>{formatVersionDate(version.date)}</time>
      </span>
      <span aria-hidden className="text-zinc-300">
        |
      </span>
      <Link
        href={historyHref(path)}
        className="rounded font-medium text-[var(--brand-primary)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
      >
        Ver historial de versiones ({version.changelog.length})
      </Link>
    </div>
  );
}
