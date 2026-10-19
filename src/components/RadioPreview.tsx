import type { RadioStyle } from "@/data/radio";

// Dibujo del Fill_RadioButton de Figma (aro de 19.5px + punto de 12px) en un lienzo de 24px.
export function RadioPreview({
  style,
  label,
  scale = 1,
}: {
  style: RadioStyle;
  label: string;
  scale?: number;
}) {
  const ringRadius = 9.75 - style.ringWidth / 2;
  return (
    <span
      role="img"
      aria-label={label}
      className="inline-flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: 24.4 * scale,
        height: 24 * scale,
        backgroundColor: style.pressed ? "#d8d9de" : undefined,
      }}
    >
      <svg width={24 * scale} height={24 * scale} viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r={ringRadius} fill="none" stroke={style.ring} strokeWidth={style.ringWidth} />
        {style.dot ? (
          <circle
            cx="12"
            cy="12"
            r={style.dot.stroke ? 5 : 6}
            fill={style.dot.fill ?? "none"}
            stroke={style.dot.stroke}
            strokeWidth={style.dot.stroke ? 2 : undefined}
          />
        ) : null}
      </svg>
    </span>
  );
}
