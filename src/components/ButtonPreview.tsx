import { CaretCircleLeftIcon, CaretCircleRightIcon } from "@phosphor-icons/react/dist/ssr";
import type { ButtonStyle } from "@/data/buttons";

export function ButtonPreview({
  style,
  label = "Label",
}: {
  style: ButtonStyle;
  label?: string;
}) {
  const boxShadow = style.ring
    ? `0 0 0 2px ${style.ring}`
    : style.shadow
      ? "-4px 4px 6px rgba(0,0,0,0.2)"
      : undefined;

  return (
    <div
      className="inline-flex items-center justify-center gap-2 py-3 text-base whitespace-nowrap"
      style={{
        backgroundColor: style.bg,
        color: style.text,
        border: style.border ? `1px solid ${style.border}` : undefined,
        borderRadius: style.radius,
        paddingInline: style.paddingX,
        boxShadow,
      }}
    >
      {style.loading ? (
        <span
          className="size-5 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      ) : (
        <>
          <CaretCircleLeftIcon className="size-5" weight="regular" />
          <span>{label}</span>
          <CaretCircleRightIcon className="size-5" weight="regular" />
        </>
      )}
    </div>
  );
}
