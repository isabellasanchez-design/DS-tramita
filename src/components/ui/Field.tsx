import type { ReactNode } from "react";
import { InfoIcon } from "@phosphor-icons/react/dist/ssr";

export type FieldStatus = "error" | "success";

export type FieldProps = {
  /** Texto del label. Siempre es obligatorio; con hideLabel solo lo oyen los lectores. */
  label: ReactNode;
  /** Oculta el label visualmente (Title=false en Figma). */
  hideLabel?: boolean;
  /** Muestra "(Opcional)" junto al label. */
  optional?: boolean;
  /** Mensaje bajo el campo; toma el color de status (hint 1 en Figma). */
  message?: ReactNode;
  /** Texto al final de la línea del mensaje, p. ej. un contador (hint 1.1). */
  messageEnd?: ReactNode;
  /** Segunda línea de ayuda, siempre neutra (hint 2). */
  hint?: ReactNode;
  status?: FieldStatus;
};

// Colores de Figma (02_Input). El borde y el placeholder usan #73748c en vez de
// #e4e5f4 y #9496a8, que no cumplen el contraste de WCAG 1.4.11 y 1.4.3.
const statusBox: Record<FieldStatus | "default", string> = {
  default: "border-[#73748c]",
  error: "border-[#b4181d]",
  success: "border-[#28a44b]",
};

/** Clases de la caja del campo (borde, foco y Disabled) compartidas por Input y Select. */
export function fieldBoxClasses(status: FieldStatus | undefined) {
  return `relative flex h-10 w-full items-center gap-1.5 rounded-[4px] border bg-white px-2 text-[#0e0d12] sm:h-9 ${
    statusBox[status ?? "default"]
  } has-[:focus-visible]:border-[#2a32a2] has-[:focus-visible]:shadow-[0_0_0_1px_#2a32a2] has-[:is(input,select):disabled]:border-transparent has-[:is(input,select):disabled]:bg-[#ebebed] has-[:is(input,select):disabled]:text-[#9496a8]`;
}

/** Clases del control nativo dentro de la caja. */
export const fieldControlClasses =
  "min-w-0 flex-1 bg-transparent px-1 text-base text-[#202025] outline-none placeholder:text-[#73748c] focus-visible:text-[#2a32a2] disabled:cursor-not-allowed disabled:text-[#484956]";

/** Ícono dentro de la caja: 24px en móvil y 16px desde sm, como en Figma. */
export function FieldIcon({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span aria-hidden className={`inline-flex size-6 shrink-0 sm:size-4 [&>svg]:size-full ${className}`}>
      {children}
    </span>
  );
}

const messageColor: Record<FieldStatus | "default", string> = {
  default: "text-[#484956]",
  error: "text-[#b4181d]",
  success: "text-[#12331b]",
};
const messageIconColor: Record<FieldStatus | "default", string> = {
  default: "text-[#0e0d12]",
  error: "text-[#b4181d]",
  success: "text-[#227c3c]",
};

/** Ids de los textos de ayuda, para el aria-describedby del control. */
export function describedBy(
  id: string,
  { message, messageEnd, hint }: Pick<FieldProps, "message" | "messageEnd" | "hint">
) {
  return (
    [message && `${id}-message`, messageEnd && `${id}-message-end`, hint && `${id}-hint`]
      .filter(Boolean)
      .join(" ") || undefined
  );
}

// Estructura común de Input y Select: label, campo y mensajes de ayuda.
export function Field({
  id,
  label,
  hideLabel,
  optional,
  required,
  message,
  messageEnd,
  hint,
  status,
  className = "",
  children,
}: FieldProps & { id: string; required?: boolean; className?: string; children: ReactNode }) {
  const tone = status ?? "default";
  return (
    <div className={`flex w-full flex-col gap-1 ${className}`}>
      <label
        htmlFor={id}
        className={`flex items-baseline gap-1 text-sm text-[#202025] sm:text-base ${hideLabel ? "sr-only" : ""}`}
      >
        {label}
        {/* El atributo required ya lo anuncia; el asterisco es solo visual. */}
        {required ? (
          <span aria-hidden className="font-bold text-[#b4181d]">
            *
          </span>
        ) : null}
        {optional ? <span className="text-[#5c5d70]">(Opcional)</span> : null}
      </label>

      {children}

      {message || messageEnd ? (
        <div className={`flex justify-between gap-4 text-xs sm:text-sm ${messageColor[tone]}`}>
          {message ? (
            <p id={`${id}-message`} className="flex items-start gap-1">
              <InfoIcon aria-hidden className={`size-4 shrink-0 ${messageIconColor[tone]}`} />
              {message}
            </p>
          ) : (
            <span />
          )}
          {messageEnd ? (
            <p id={`${id}-message-end`} className="shrink-0">
              {messageEnd}
            </p>
          ) : null}
        </div>
      ) : null}

      {hint ? (
        <p id={`${id}-hint`} className="flex items-start gap-1 text-xs text-[#484956] sm:text-sm">
          <InfoIcon aria-hidden className="size-4 shrink-0 text-[#0e0d12]" />
          {hint}
        </p>
      ) : null}
    </div>
  );
}
