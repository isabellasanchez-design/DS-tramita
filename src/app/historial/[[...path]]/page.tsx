import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { ContentCard } from "@/components/ContentCard";
import { PendingNotice } from "@/components/PendingNotice";
import { VersionBadge } from "@/components/VersionTag";
import { findDoc, listDocs } from "@/lib/docs";
import { formatVersionDate, getDocVersion } from "@/lib/versions";

const typeLabels: Record<string, string> = {
  feat: "Nuevo",
  fix: "Corrección",
  perf: "Rendimiento",
  refactor: "Ajuste",
  style: "Estilo",
  docs: "Contenido",
  revert: "Reversión",
};

function docPathFromParams(path: string[] | undefined) {
  return path?.length ? `/${path.join("/")}` : "/";
}

export function generateStaticParams() {
  return listDocs().map((doc) => ({
    path: doc.path === "/" ? [] : doc.path.slice(1).split("/"),
  }));
}

export async function generateMetadata(props: PageProps<"/historial/[[...path]]">) {
  const { path } = await props.params;
  const doc = findDoc(docPathFromParams(path));
  if (!doc) return { title: "D.S. Tramita" };
  return {
    title: doc.path === "/" ? "Historial · D.S. Tramita" : `Historial · ${doc.title} · D.S. Tramita`,
  };
}

export default async function HistorialPage(props: PageProps<"/historial/[[...path]]">) {
  const { path } = await props.params;
  const docPath = docPathFromParams(path);
  const doc = findDoc(docPath);
  if (!doc) notFound();

  const version = getDocVersion(docPath);

  return (
    <div>
      <PageHeader
        eyebrow={doc.title}
        eyebrowHref={docPath}
        title="Historial de versiones"
        description={
          docPath === "/"
            ? "Todos los cambios publicados en el D.S. Tramita, del más reciente al más antiguo."
            : `Cambios publicados en ${doc.title} (${doc.section}), del más reciente al más antiguo.`
        }
        action={<VersionBadge version={version} />}
      />

      <ContentCard>
        {version ? (
          <ol className="flex flex-col">
            {version.changelog.map((entry, index) => (
              <li
                key={`${entry.version}-${entry.hash}`}
                className="relative flex gap-5 pb-8 last:pb-0"
              >
                {index < version.changelog.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute left-[7px] top-5 bottom-0 w-px bg-zinc-200"
                  />
                ) : null}
                <span
                  aria-hidden
                  className={`relative mt-1.5 size-[15px] shrink-0 rounded-full border-2 ${
                    index === 0
                      ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]"
                      : "border-zinc-300 bg-white"
                  }`}
                />
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h2 className="font-mono text-base font-semibold text-[#23297b]">
                      v{entry.version}
                    </h2>
                    {index === 0 ? (
                      <span className="rounded-full bg-[var(--brand-primary-soft)] px-2 py-0.5 text-xs font-medium text-[#23297b]">
                        Actual
                      </span>
                    ) : null}
                    {entry.type && typeLabels[entry.type] ? (
                      <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-700">
                        {typeLabels[entry.type]}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-base text-zinc-800">{entry.message}</p>
                  <p className="text-sm text-zinc-600">
                    <time dateTime={entry.date}>{formatVersionDate(entry.date)}</time>
                    <span aria-hidden> · </span>
                    <span className="font-mono">
                      <span className="sr-only">commit </span>
                      {entry.hash}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <PendingNotice>
            Este documento todavía no tiene versiones publicadas. La primera aparecerá aquí
            en cuanto se haga commit de su contenido.
          </PendingNotice>
        )}
      </ContentCard>
    </div>
  );
}
