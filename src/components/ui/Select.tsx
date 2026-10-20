"use client";

import { useId, type ReactNode, type SelectHTMLAttributes } from "react";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";
import {
  describedBy,
  Field,
  FieldIcon,
  fieldBoxClasses,
  fieldControlClasses,
  type FieldProps,
} from "@/components/ui/Field";

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> &
  FieldProps & {
    /** Ícono decorativo al inicio del campo. */
    iconLeft?: ReactNode;
    /** Texto de la opción vacía inicial (el "placeholder" del Dropdown en Figma). */
    placeholder?: string;
  };

// Caso Dropdown de 02_Input en Figma, sobre el <select> nativo: funciona con
// teclado y lectores de pantalla sin ARIA extra. Para listas con búsqueda o
// selección múltiple está el organismo Dropdown.
export function Select({
  label,
  hideLabel,
  optional,
  message,
  messageEnd,
  hint,
  status,
  iconLeft,
  placeholder,
  id,
  className,
  children,
  ...selectProps
}: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <Field
      id={selectId}
      label={label}
      hideLabel={hideLabel}
      optional={optional}
      required={selectProps.required}
      message={message}
      messageEnd={messageEnd}
      hint={hint}
      status={status}
      className={className}
    >
      <div className={fieldBoxClasses(status)}>
        {iconLeft ? <FieldIcon>{iconLeft}</FieldIcon> : null}
        <select
          {...selectProps}
          id={selectId}
          aria-invalid={status === "error" || undefined}
          aria-describedby={describedBy(selectId, { message, messageEnd, hint })}
          // pr-8 deja espacio al caret; la opción vacía se ve como placeholder.
          className={`${fieldControlClasses} h-full cursor-pointer appearance-none pr-8 invalid:text-[#9496a8] [&:has(option[value='']:checked)]:text-[#9496a8]`}
        >
          {placeholder !== undefined ? (
            <option value="" disabled={selectProps.required}>
              {placeholder}
            </option>
          ) : null}
          {children}
        </select>
        <FieldIcon className="pointer-events-none absolute right-2">
          <CaretDownIcon weight="regular" />
        </FieldIcon>
      </div>
    </Field>
  );
}
