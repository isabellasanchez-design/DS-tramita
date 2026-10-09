"use client";

import { useState, type ReactNode } from "react";

export function Tabs({
  tabs,
}: {
  tabs: { label: string; content: ReactNode }[];
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="mb-8 flex justify-center">
        <div
          role="tablist"
          aria-label="Secciones"
          className="inline-flex gap-3 rounded-full bg-zinc-100 p-2.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]"
        >
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              type="button"
              role="tab"
              aria-selected={active === index}
              onClick={() => setActive(index)}
              className={`rounded-full px-9 py-3.5 text-sm font-semibold transition-all ${
                active === index
                  ? "bg-[var(--brand-navy)] text-white shadow-[0_2px_6px_rgba(26,31,107,0.35)]"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {tabs[active]?.content}
    </div>
  );
}
