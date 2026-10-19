import { CircleIcon } from "@phosphor-icons/react/dist/ssr";
import { chipIconColor, type ChipStyle } from "@/data/chips";

export function ChipPreview({
  style,
  label = "Chip name",
  showIcon = true,
}: {
  style: ChipStyle;
  label?: string;
  showIcon?: boolean;
}) {
  return (
    <span
      className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[20px] px-5 py-2 text-sm"
      style={{
        backgroundColor: style.bg,
        border: `1px solid ${style.border ?? style.bg}`,
        color: style.text,
        fontWeight: style.bold ? 700 : 400,
      }}
    >
      {showIcon ? <CircleIcon weight="fill" color={chipIconColor} className="size-4 shrink-0" aria-hidden /> : null}
      {label}
    </span>
  );
}
