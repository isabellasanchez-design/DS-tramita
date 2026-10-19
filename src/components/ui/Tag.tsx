import type { ReactNode } from "react";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { getTagStyle, tagSizeSpecs, type TagCase, type TagSize, type TagType } from "@/data/tags";

export type TagProps = {
  children: ReactNode;
  tagCase?: TagCase;
  type?: TagType;
  size?: TagSize;
  iconLeft?: boolean;
  iconRight?: boolean;
  /** Ícono a usar en lugar de CheckCircle; hereda el color del texto. */
  icon?: ReactNode;
};

// Tag del D.S. Tramita: etiqueta no interactiva. El significado debe ir en el texto.
export function Tag({
  children,
  tagCase = "Success",
  type = "Filled",
  size = "XS",
  iconLeft = true,
  iconRight = false,
  icon,
}: TagProps) {
  const style = getTagStyle(tagCase, type);
  const spec = tagSizeSpecs[size];
  const glyph = icon ?? (
    <CheckCircleIcon weight="regular" style={{ width: spec.icon, height: spec.icon }} />
  );

  return (
    <span
      className="inline-flex shrink-0 items-center justify-center gap-1 whitespace-nowrap leading-none"
      style={{
        height: spec.height,
        paddingInline: spec.paddingX,
        paddingBlock: spec.paddingY,
        fontSize: spec.fontSize,
        color: style.color,
        background: style.background,
        border: style.border ? `1px solid ${style.border}` : undefined,
        borderRadius: style.pill ? 100 : undefined,
      }}
    >
      {iconLeft ? <span aria-hidden className="inline-flex">{glyph}</span> : null}
      {children}
      {iconRight ? <span aria-hidden className="inline-flex">{glyph}</span> : null}
    </span>
  );
}
