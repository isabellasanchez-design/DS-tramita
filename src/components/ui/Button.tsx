"use client";

import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { buttonSizeSpecs, type ButtonSize, type ButtonType } from "@/data/buttons";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Jerarquía de la acción (Type en Figma). */
  variant?: ButtonType;
  size?: ButtonSize;
  /** Ícono antes del texto. Hereda el color y toma el tamaño del botón. */
  iconLeft?: ReactNode;
  /** Ícono después del texto. */
  iconRight?: ReactNode;
  /** Muestra el indicador de progreso y bloquea nuevos clics sin perder el foco. */
  loading?: boolean;
};

// Colores por tipo tomados de Figma (src/data/buttons.ts). Primary y Secondary
// no tienen indicador de foco suficiente en Figma; aquí usan el mismo anillo que
// Tertiary y Outline para cumplir WCAG 2.4.7.
const variantClasses: Record<ButtonType, string> = {
  Primary:
    "bg-[#23297b] text-white focus-visible:bg-[#1c2057] focus-visible:shadow-[0_0_0_2px_#beb7e6]",
  Secondary: "bg-[#c9ccee] text-[#2a32a2] focus-visible:shadow-[0_0_0_2px_#beb7e6]",
  Tertiary: "bg-transparent text-[#2a32a2] focus-visible:shadow-[0_0_0_2px_#beb7e6]",
  Link: "bg-transparent text-[#2a32a2] focus-visible:shadow-[0_0_0_2px_#beb7e6]",
  Destructive: "bg-transparent text-[#b4181d] focus-visible:shadow-[0_0_0_2px_#e6b7b8]",
  Outline:
    "border border-[#2a32a2] bg-white text-[#2a32a2] hover:bg-[#d8e0fc] focus-visible:border-[#476fee] focus-visible:shadow-[0_0_0_2px_#beb7e6] aria-busy:border-[#476fee]",
};

const filledDisabled = "disabled:bg-[#ebebed] disabled:text-[#9496a8]";
const disabledClasses: Record<ButtonType, string> = {
  Primary: filledDisabled,
  Secondary: filledDisabled,
  Tertiary: "disabled:text-[#9496a8]",
  Link: "disabled:text-[#9496a8]",
  Destructive: "disabled:text-[#9496a8]",
  Outline: `${filledDisabled} disabled:border-[#d8d9de]`,
};

const radiusByType: Record<ButtonType, number> = {
  Primary: 20,
  Secondary: 20,
  Tertiary: 12,
  Link: 8,
  Destructive: 12,
  Outline: 20,
};

// Figma solo define el padding horizontal en Medium: 16px para los tipos
// redondeados, 12px para Tertiary y Destructive, 0 para Link. En los demás
// tamaños se conserva esa diferencia de 4px.
function paddingX(variant: ButtonType, size: ButtonSize) {
  if (variant === "Link") return 0;
  const base = buttonSizeSpecs[size].paddingX;
  return variant === "Tertiary" || variant === "Destructive" ? base - 4 : base;
}

// Botón del D.S. Tramita sobre el <button> nativo. Sin texto visible (solo
// ícono) necesita aria-label.
export function Button({
  variant = "Primary",
  size = "Medium",
  iconLeft,
  iconRight,
  loading = false,
  type = "button",
  className = "",
  style,
  children,
  onClick,
  ...buttonProps
}: ButtonProps) {
  const spec = buttonSizeSpecs[size];
  const icon = (node: ReactNode) => (
    <span
      aria-hidden
      className="inline-flex shrink-0 [&>svg]:size-full"
      style={{ width: spec.iconSize, height: spec.iconSize }}
    >
      {node}
    </span>
  );

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    // También evita el envío del formulario mientras se procesa la acción.
    if (loading) return event.preventDefault();
    onClick?.(event);
  }

  return (
    <button
      {...buttonProps}
      type={type}
      onClick={handleClick}
      aria-busy={loading || undefined}
      aria-disabled={loading || buttonProps["aria-disabled"]}
      className={`relative inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap leading-none outline-none transition-shadow hover:shadow-[-4px_4px_6px_rgba(0,0,0,0.2)] disabled:cursor-not-allowed disabled:shadow-none aria-busy:cursor-progress ${variantClasses[variant]} ${disabledClasses[variant]} ${className}`}
      style={{
        height: spec.height,
        paddingInline: paddingX(variant, size),
        paddingBlock: spec.paddingY,
        gap: spec.gap,
        fontSize: spec.fontSize,
        borderRadius: radiusByType[variant],
        ...style,
      }}
    >
      {loading ? (
        <>
          <span
            aria-hidden
            className="animate-spin rounded-full border-2 border-current border-t-transparent"
            style={{ width: spec.iconSize, height: spec.iconSize }}
          />
          {/* El texto sigue disponible para lectores de pantalla. */}
          <span className="sr-only">{children}</span>
        </>
      ) : (
        <>
          {iconLeft ? icon(iconLeft) : null}
          {children}
          {iconRight ? icon(iconRight) : null}
        </>
      )}
    </button>
  );
}
