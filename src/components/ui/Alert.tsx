"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { CheckCircleIcon, SealCheckIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { alertTones, type AlertAppearance, type AlertTone } from "@/data/alerts";

export type AlertAction = { label: string; onClick?: () => void };

type CommonProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  /** Case en Figma. */
  tone?: AlertTone;
  /** subtle = Normal/Subtle en Figma; solid = Contrast/colored/solid. */
  appearance?: AlertAppearance;
  /** Ícono a la izquierda. Por defecto el de Figma. */
  icon?: ReactNode;
  primaryAction?: AlertAction;
  /** Muestra el botón X; recibe el clic. */
  onClose?: () => void;
};

function ActionButton({
  action,
  kind,
  tone,
  appearance,
}: {
  action: AlertAction;
  kind: "primary" | "secondary";
  tone: AlertTone;
  appearance: AlertAppearance;
}) {
  const colors = alertTones[tone];
  const style =
    kind === "primary"
      ? { backgroundColor: colors.action, color: "#ffffff" }
      : appearance === "subtle"
        ? { backgroundColor: "#ffffff", color: colors.action, border: `1px solid ${colors.action}` }
        : { backgroundColor: "transparent", color: colors.solidOutline, border: `1px solid ${colors.solidOutline}` };
  return (
    <button
      type="button"
      onClick={action.onClick}
      className="inline-flex h-11 shrink-0 cursor-pointer items-center justify-center whitespace-nowrap rounded-[20px] px-4 text-base leading-none transition-shadow hover:shadow-[-4px_4px_6px_rgba(0,0,0,0.2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
      style={style}
    >
      {action.label}
    </button>
  );
}

function CloseButton({ onClose, color, size }: { onClose: () => void; color: string; size: number }) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label="Cerrar"
      className="inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[4px] focus-visible:outline-2 focus-visible:outline-current"
      style={{ color }}
    >
      <XIcon aria-hidden weight="regular" style={{ width: size, height: size }} />
    </button>
  );
}

function surface(tone: AlertTone, appearance: AlertAppearance) {
  const colors = alertTones[tone];
  const bg = appearance === "subtle" ? colors.subtleBg : colors.solidBg;
  return { background: bg, color: appearance === "subtle" ? "#202025" : "#ffffff" };
}

export type AlertProps = CommonProps & {
  secondaryAction?: AlertAction;
  children: ReactNode;
};

// Alert del D.S. Tramita (02_Alert & Toast en Figma). Va dentro del contenido.
// Si aparece después de una acción, pasar role="alert" o role="status".
export function Alert({
  tone = "Waiting",
  appearance = "subtle",
  icon,
  primaryAction,
  secondaryAction,
  onClose,
  className = "",
  style,
  children,
  ...divProps
}: AlertProps) {
  const subtle = appearance === "subtle";
  const accent = subtle ? alertTones[tone].accent : "#ffffff";
  return (
    <div
      {...divProps}
      className={`flex flex-col gap-4 rounded-[8px] px-3 py-5 ${className}`}
      style={{ ...surface(tone, appearance), ...style }}
    >
      <div className="flex items-start gap-2">
        <span aria-hidden className="inline-flex size-5 shrink-0 [&>svg]:size-full" style={{ color: accent }}>
          {icon ?? <CheckCircleIcon weight="regular" />}
        </span>
        <div className="flex-1 text-base leading-[19px]">{children}</div>
        {onClose ? <CloseButton onClose={onClose} color={subtle ? "#202025" : "#ffffff"} size={16} /> : null}
      </div>
      {primaryAction || secondaryAction ? (
        <div className="flex flex-wrap gap-4 pl-6">
          {primaryAction ? <ActionButton action={primaryAction} kind="primary" tone={tone} appearance={appearance} /> : null}
          {secondaryAction ? (
            <ActionButton action={secondaryAction} kind="secondary" tone={tone} appearance={appearance} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export type ToastProps = CommonProps & {
  title: ReactNode;
  /** Descripción opcional (Content en Figma). */
  children?: ReactNode;
};

// Toast del D.S. Tramita. Se anuncia al aparecer (status, o alert si es Error)
// y no se cierra solo: la persona lo cierra cuando termina de leerlo.
export function Toast({
  tone = "Waiting",
  appearance = "subtle",
  icon,
  title,
  primaryAction,
  onClose,
  className = "",
  style,
  children,
  ...divProps
}: ToastProps) {
  const subtle = appearance === "subtle";
  const muted = subtle ? "#5c5d70" : "#ffffff";
  return (
    <div
      role={tone === "Error" ? "alert" : "status"}
      {...divProps}
      className={`flex flex-col gap-4 rounded-[8px] px-3 py-5 ${className}`}
      style={{ ...surface(tone, appearance), ...style }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-2">
          <span aria-hidden className="inline-flex size-6 shrink-0 [&>svg]:size-full" style={{ color: muted }}>
            {icon ?? (subtle ? <SealCheckIcon weight="regular" /> : <CheckCircleIcon weight="regular" />)}
          </span>
          <p className="flex-1 text-lg font-bold leading-[21px]">{title}</p>
          {onClose ? <CloseButton onClose={onClose} color={muted} size={24} /> : null}
        </div>
        {children ? (
          <div className="pl-8 text-base leading-[19px]" style={{ color: subtle ? "#484956" : "#ffffff" }}>
            {children}
          </div>
        ) : null}
      </div>
      {primaryAction ? (
        <div className="flex flex-wrap gap-4 pl-8">
          <ActionButton action={primaryAction} kind="primary" tone={tone} appearance={appearance} />
        </div>
      ) : null}
    </div>
  );
}
