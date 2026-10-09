import { figmaLink } from "@/data/figma";
import { ArrowUpRightIcon } from "@/components/icons/NavIcons";

export function FigmaLink({ nodeId, label = "Abrir en Figma" }: { nodeId: string; label?: string }) {
  return (
    <a
      href={figmaLink(nodeId)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#23297b] px-4 py-3 text-base font-normal text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
      style={{ fontFamily: "var(--font-roboto)" }}
    >
      {label}
      <ArrowUpRightIcon className="size-5" />
    </a>
  );
}
