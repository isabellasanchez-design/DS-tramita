"use client";

import { useState } from "react";
import {
  getButtonClassName,
  getButtonCssLines,
  getButtonCssText,
  type ButtonType,
} from "@/data/buttons";
import { CopyIcon, CheckIcon } from "@/components/icons/UtilityIcons";

export function ButtonCodeBlock({ type }: { type: ButtonType }) {
  const className = getButtonClassName(type);
  const lines = getButtonCssLines(type);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(getButtonCssText(type));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — silently ignore.
    }
  }

  return (
    <div className="overflow-hidden rounded-xl bg-[#1e1e2e] shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-[11px] text-white/40">css</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copiar CSS"
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-white/50 transition-colors hover:bg-white/10 hover:text-white/80"
        >
          {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed">
        <code>
          <span className="text-[#f9c859]">{className}</span>{" "}
          <span className="text-white/60">{"{"}</span>
          {"\n"}
          {lines.map((line) => (
            <span key={line.property}>
              {"  "}
              <span className="text-[#7dd3fc]">{line.property}</span>
              <span className="text-white/60">{": "}</span>
              <span className="text-[#a5e844]">{line.value}</span>
              <span className="text-white/60">;</span>
              {"\n"}
            </span>
          ))}
          <span className="text-white/60">{"}"}</span>
        </code>
      </pre>
    </div>
  );
}
