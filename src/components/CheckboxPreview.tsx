import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import type { CheckboxStyle } from "@/data/checkbox";

export function CheckboxPreview({
  style,
  label,
  scale = 1,
}: {
  style: CheckboxStyle;
  /** Nombre accesible de la muestra, p. ej. "Selected, Hovered". */
  label: string;
  scale?: number;
}) {
  return (
    <span
      role="img"
      aria-label={label}
      className="inline-flex shrink-0 items-center justify-center"
      style={{
        width: 27.2 * scale,
        height: 27.5 * scale,
        padding: 3 * scale,
        borderRadius: 4 * scale,
        backgroundColor: style.pressed ? "#d8d9de" : undefined,
      }}
    >
      <span
        className="flex items-center justify-center"
        style={{
          width: 18 * scale,
          height: 18 * scale,
          borderRadius: 4 * scale,
          backgroundColor: style.bg,
          border: style.border ? `${style.borderWidth * scale}px solid ${style.border}` : undefined,
        }}
      >
        {style.checked ? (
          <CheckIcon
            weight="regular"
            color="#ffffff"
            style={{ width: 16 * scale, height: 16 * scale, flexShrink: 0 }}
          />
        ) : null}
      </span>
    </span>
  );
}
