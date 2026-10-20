"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";
import {
  CalendarDotsIcon,
  CheckCircleIcon,
  EyeClosedIcon,
  EyeIcon,
  XCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  describedBy,
  Field,
  FieldIcon,
  fieldBoxClasses,
  fieldControlClasses,
  type FieldProps,
} from "@/components/ui/Field";

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  FieldProps & {
    /** Ícono decorativo al inicio del campo (left-icon en Figma). */
    iconLeft?: ReactNode;
    /** Ícono decorativo al final; Error y Success lo reemplazan por su ícono de estado. */
    iconRight?: ReactNode;
  };

const statusIcon = {
  error: <XCircleIcon weight="regular" className="text-[#b4181d]" />,
  success: <CheckCircleIcon weight="regular" className="text-[#12331b]" />,
};

// Textbox del D.S. Tramita (02_Input en Figma). Cubre los casos Text field,
// Date (type="date") y Password (type="password", con botón para mostrarla).
// El caso Dropdown es el componente Select.
export function Input({
  label,
  hideLabel,
  optional,
  message,
  messageEnd,
  hint,
  status,
  iconLeft,
  iconRight,
  type = "text",
  id,
  className,
  ...inputProps
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const isDate = type === "date";

  const trailing = status ? statusIcon[status] : isDate ? <CalendarDotsIcon weight="regular" /> : iconRight;

  return (
    <Field
      id={inputId}
      label={label}
      hideLabel={hideLabel}
      optional={optional}
      required={inputProps.required}
      message={message}
      messageEnd={messageEnd}
      hint={hint}
      status={status}
      className={className}
    >
      <div className={fieldBoxClasses(status)}>
        {iconLeft ? <FieldIcon>{iconLeft}</FieldIcon> : null}
        <input
          {...inputProps}
          id={inputId}
          type={isPassword && showPassword ? "text" : type}
          aria-invalid={status === "error" || undefined}
          aria-describedby={describedBy(inputId, { message, messageEnd, hint })}
          // En fechas, el selector nativo queda invisible encima del ícono de
          // calendario: el clic en el ícono abre el calendario del navegador.
          className={`${fieldControlClasses} ${
            isDate
              ? "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-2 [&::-webkit-calendar-picker-indicator]:size-6 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0 sm:[&::-webkit-calendar-picker-indicator]:size-4"
              : ""
          }`}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((shown) => !shown)}
            aria-pressed={showPassword}
            aria-controls={inputId}
            disabled={inputProps.disabled}
            className="inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[4px] text-[#0e0d12] focus-visible:outline-2 focus-visible:outline-[#2a32a2] disabled:cursor-not-allowed disabled:text-[#9496a8] sm:size-5"
          >
            {showPassword ? (
              <EyeIcon aria-hidden weight="regular" className="size-6 sm:size-4" />
            ) : (
              <EyeClosedIcon aria-hidden weight="regular" className="size-6 sm:size-4" />
            )}
            <span className="sr-only">Mostrar contraseña</span>
          </button>
        ) : null}
        {!isPassword && trailing ? <FieldIcon>{trailing}</FieldIcon> : null}
      </div>
    </Field>
  );
}
