"use client";

import { useState } from "react";
import { CopyIcon, CheckIcon } from "@/components/icons/UtilityIcons";

function textColorFor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#1a1a1a" : "#ffffff";
}

export function ColorSwatch({
  label,
  hex,
  className = "h-24 w-28",
}: {
  label: string;
  hex: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const color = textColorFor(hex);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(hex.toUpperCase());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — silently ignore.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copiar ${hex.toUpperCase()}`}
      className={`group relative flex shrink-0 flex-col justify-between rounded-lg border border-black/5 px-3 py-2 text-left ${className}`}
      style={{ backgroundColor: hex, color }}
    >
      <span className="flex items-start justify-between gap-2">
        <span className="text-xs font-medium opacity-80">{label}</span>
        <span className="opacity-60 transition-opacity group-hover:opacity-100">
          {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
        </span>
      </span>
      <span className="text-xs font-mono uppercase">{copied ? "Copiado" : hex}</span>
    </button>
  );
}
