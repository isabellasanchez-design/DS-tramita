import { CheckIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import type { SwitchStyle } from "@/data/switch";

export function SwitchPreview({
  style,
  label,
  scale = 1,
}: {
  style: SwitchStyle;
  label: string;
  scale?: number;
}) {
  const Icon = style.on ? CheckIcon : XIcon;
  return (
    <span
      role="img"
      aria-label={label}
      className={`inline-flex shrink-0 items-center rounded-full ${style.on ? "justify-end" : "justify-start"}`}
      style={{
        width: 48 * scale,
        height: 24 * scale,
        backgroundColor: style.track,
        boxShadow: style.focus ? `inset 0 0 0 ${2 * scale}px #bb7d11` : undefined,
      }}
    >
      <span
        className="relative grid place-items-center"
        style={{ width: 24 * scale, height: 24 * scale }}
      >
        <span
          className="absolute rounded-full"
          style={{
            width: style.handleSize * scale,
            height: style.handleSize * scale,
            backgroundColor: style.handle,
          }}
        />
        <Icon
          weight="bold"
          color={style.icon}
          className="relative"
          style={{ width: 18 * scale, height: 18 * scale }}
        />
      </span>
    </span>
  );
}
