import type { ButtonHTMLAttributes, ReactNode } from "react";

export type IconButtonSize = "Small" | "Medium" | "Large";

// Tamaños de Figma (03_Card › Icon Button): círculo e ícono.
const sizes: Record<IconButtonSize, { box: number; icon: number }> = {
  Small: { box: 32, icon: 20 },
  Medium: { box: 48, icon: 32 },
  Large: { box: 64, icon: 48 },
};

export type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  icon: ReactNode;
  size?: IconButtonSize;
};

// Icon Button del D.S. Tramita: círculo #e4e5f4 con ícono #2a32a2. En las Cards
// es decorativo (un <span>); con onClick es un <button> y necesita aria-label.
export function IconButton({ icon, size = "Medium", onClick, className = "", ...buttonProps }: IconButtonProps) {
  const { box, icon: iconSize } = sizes[size];
  const glyph = (
    <span aria-hidden className="inline-flex [&>svg]:size-full" style={{ width: iconSize, height: iconSize }}>
      {icon}
    </span>
  );
  const classes = `inline-flex shrink-0 items-center justify-center rounded-full bg-[#e4e5f4] text-[#2a32a2] ${className}`;
  const style = { width: box, height: box };

  if (!onClick) {
    return (
      <span aria-hidden className={classes} style={style}>
        {glyph}
      </span>
    );
  }
  return (
    <button {...buttonProps} type="button" onClick={onClick} className={`${classes} cursor-pointer`} style={style}>
      {glyph}
    </button>
  );
}
