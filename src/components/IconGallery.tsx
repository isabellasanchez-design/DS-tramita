"use client";

import { useMemo, useState } from "react";
import * as PhosphorIcons from "@phosphor-icons/react";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import { phosphorIconNames } from "@/data/phosphor-icons";

const icons = PhosphorIcons as unknown as Record<string, PhosphorIcon>;

const INITIAL_LIMIT = 150;

function splitPascalCase(name: string) {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
}

export function IconGallery() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return phosphorIconNames;
    return phosphorIconNames.filter((name) => name.toLowerCase().includes(trimmed));
  }, [query]);

  const visible = query.trim() ? filtered : filtered.slice(0, INITIAL_LIMIT);

  return (
    <div>
      <div className="relative mb-6">
        <PhosphorIcons.MagnifyingGlassIcon
          className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-zinc-400"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Buscar entre ${phosphorIconNames.length.toLocaleString("es")} iconos…`}
          className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-2.5 pl-10 pr-4 text-sm text-zinc-900 outline-none focus:border-[var(--brand-primary)] focus:bg-white focus:ring-2 focus:ring-[var(--brand-primary-soft)]"
        />
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-zinc-500">No encontré iconos que coincidan con &quot;{query}&quot;.</p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            {visible.map((name) => {
              const IconComponent = icons[`${name}Icon`];
              if (!IconComponent) return null;
              return (
                <div
                  key={name}
                  title={splitPascalCase(name)}
                  className="flex flex-col items-center gap-1.5 rounded-lg border border-zinc-100 px-2 py-3 text-center transition-colors hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary-soft)]"
                >
                  <IconComponent className="size-6 text-zinc-700" />
                  <span className="w-full truncate text-[11px] text-zinc-500">
                    {splitPascalCase(name)}
                  </span>
                </div>
              );
            })}
          </div>
          {!query.trim() && phosphorIconNames.length > INITIAL_LIMIT && (
            <p className="mt-4 text-center text-xs text-zinc-500">
              Mostrando {INITIAL_LIMIT} de {phosphorIconNames.length.toLocaleString("es")} iconos —
              escribe arriba para buscar en toda la librería.
            </p>
          )}
        </>
      )}
    </div>
  );
}
