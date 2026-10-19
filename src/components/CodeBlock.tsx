"use client";

import { useState, type ReactNode } from "react";
import { CopyIcon, CheckIcon } from "@/components/icons/UtilityIcons";
import { getCssText, type CssRule } from "@/lib/css";

function CodeShell({
  language,
  copyText,
  children,
}: {
  language: string;
  copyText: string;
  children: ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — silently ignore.
    }
  }

  return (
    <div className="overflow-hidden rounded-xl bg-[#1e1e2e] shadow-[0_4px_10px_rgba(0,0,0,0.15)]">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-[11px] text-white/60">{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copiar ${language.toUpperCase()}`}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
          <span aria-live="polite">{copied ? "Copiado" : "Copiar"}</span>
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed text-white/90">
        <code>{children}</code>
      </pre>
    </div>
  );
}

export function CssCodeBlock({ rules }: { rules: CssRule[] }) {
  return (
    <CodeShell language="css" copyText={getCssText(rules)}>
      {rules.map((rule, index) => (
        <span key={rule.selector}>
          {index > 0 ? "\n" : null}
          <span className="text-[#f9c859]">{rule.selector}</span>{" "}
          <span className="text-white/60">{"{"}</span>
          {"\n"}
          {rule.lines.map((line) => (
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
          {"\n"}
        </span>
      ))}
    </CodeShell>
  );
}

export function HtmlCodeBlock({ code }: { code: string }) {
  return (
    <CodeShell language="html" copyText={code}>
      {code}
    </CodeShell>
  );
}
