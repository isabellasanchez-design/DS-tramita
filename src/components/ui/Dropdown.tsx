"use client";

import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react/dist/ssr";
import { CheckboxPreview } from "@/components/CheckboxPreview";
import { RadioPreview } from "@/components/RadioPreview";
import { Field, FieldIcon, fieldBoxClasses, type FieldProps } from "@/components/ui/Field";
import { getCheckboxStyle } from "@/data/checkbox";
import { getRadioStyle } from "@/data/radio";

export type DropdownOptionProps = {
  value: string;
  /** Ícono antes del texto (Mostrar Icon en Figma). */
  icon?: ReactNode;
  /** Texto de la opción (Slot en Figma). */
  children: ReactNode;
};

/** Una opción. Solo se usa dentro de Dropdown, que lee sus props. */
export function DropdownOption(props: DropdownOptionProps) {
  void props;
  return null;
}

type Common = Omit<FieldProps, "message" | "messageEnd" | "hint"> & {
  message?: ReactNode;
  hint?: ReactNode;
  placeholder?: string;
  /** Ícono antes del valor en el campo. */
  iconLeft?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  children: ReactNode;
};

export type DropdownProps = Common &
  (
    | {
        multiple?: false;
        value?: string | null;
        defaultValue?: string | null;
        onChange?: (value: string) => void;
        /** Muestra un radio en cada opción (Mostrar Radio Button). */
        showRadio?: boolean;
      }
    | {
        /** Selección múltiple: cada opción lleva checkbox y la lista sigue abierta. */
        multiple: true;
        value?: string[];
        defaultValue?: string[];
        onChange?: (value: string[]) => void;
        showRadio?: never;
      }
  );

// Dropdown del D.S. Tramita (03_Dropdown en Figma) con el patrón "select-only
// combobox" de WAI-ARIA: el foco se queda en el campo y aria-activedescendant
// marca la opción activa. Teclado: flechas, Inicio, Fin, Enter, Escape y
// búsqueda escribiendo la primera letra.
export function Dropdown(props: DropdownProps) {
  const { label, hideLabel, optional, message, hint, status, placeholder, iconLeft, disabled, required, children } = props;
  const id = useId();
  const options = Children.toArray(children).filter(
    (child): child is ReactElement<DropdownOptionProps> => isValidElement(child) && child.type === DropdownOption
  );

  const initial = props.multiple ? (props.defaultValue ?? []) : props.defaultValue ? [props.defaultValue] : [];
  const [internal, setInternal] = useState<string[]>(initial);
  const controlled = props.value !== undefined;
  const selected = controlled
    ? props.multiple
      ? (props.value ?? [])
      : props.value
        ? [props.value]
        : []
    : internal;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Cierra al hacer clic fuera.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Mantiene visible la opción activa al moverse con el teclado.
  useEffect(() => {
    if (open) listRef.current?.querySelector(`#${CSS.escape(`${id}-opt-${active}`)}`)?.scrollIntoView({ block: "nearest" });
  }, [active, open, id]);

  function choose(index: number) {
    const value = options[index]?.props.value;
    if (value === undefined) return;
    if (props.multiple) {
      const next = selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value];
      if (!controlled) setInternal(next);
      props.onChange?.(next);
    } else {
      if (!controlled) setInternal([value]);
      props.onChange?.(value);
      setOpen(false);
    }
  }

  function openAt(index: number) {
    setActive(Math.max(0, Math.min(index, options.length - 1)));
    setOpen(true);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = options.length - 1;
    const firstSelected = Math.max(0, options.findIndex((o) => selected.includes(o.props.value)));
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) openAt(firstSelected);
        else setActive((a) => Math.min(a + 1, last));
        return;
      case "ArrowUp":
        event.preventDefault();
        if (!open) openAt(firstSelected);
        else setActive((a) => Math.max(a - 1, 0));
        return;
      case "Home":
        if (open) {
          event.preventDefault();
          setActive(0);
        }
        return;
      case "End":
        if (open) {
          event.preventDefault();
          setActive(last);
        }
        return;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) choose(active);
        else openAt(firstSelected);
        return;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        return;
      case "Tab":
        setOpen(false);
        return;
    }
    // Búsqueda por la primera letra.
    if (event.key.length === 1 && /\S/.test(event.key)) {
      const letter = event.key.toLowerCase();
      const start = open ? active + 1 : 0;
      const order = [...options.keys()].map((i) => (start + i) % options.length);
      const match = order.find((i) => String(textOf(options[i].props.children)).toLowerCase().startsWith(letter));
      if (match !== undefined) openAt(match);
    }
  }

  const selectedLabels = options.filter((o) => selected.includes(o.props.value)).map((o) => o.props.children);
  const display =
    selectedLabels.length === 0 ? null : props.multiple && selectedLabels.length > 1 ? `${selectedLabels.length} seleccionadas` : selectedLabels[0];
  const describedBy = [message && `${id}-message`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;
  const showRadio = !props.multiple && props.showRadio;

  return (
    <Field
      id={`${id}-combo`}
      label={label}
      hideLabel={hideLabel}
      optional={optional}
      required={required}
      message={message}
      hint={hint}
      status={status}
    >
      <div ref={rootRef} className="relative">
        <div className={fieldBoxClasses(status)}>
          {iconLeft ? <FieldIcon>{iconLeft}</FieldIcon> : null}
          <button
            id={`${id}-combo`}
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={`${id}-list`}
            aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
            aria-invalid={status === "error" || undefined}
            aria-required={required || undefined}
            aria-describedby={describedBy}
            disabled={disabled}
            onClick={() => (open ? setOpen(false) : openAt(0))}
            onKeyDown={onKeyDown}
            className={`flex h-full min-w-0 flex-1 cursor-pointer items-center bg-transparent px-1 text-left text-base outline-none disabled:cursor-not-allowed ${
              display ? "text-[#202025] disabled:text-[#484956]" : "text-[#9496a8]"
            } ${open ? "text-[#2a32a2]" : ""}`}
          >
            <span className="truncate">{display ?? placeholder ?? "Selecciona una opción"}</span>
          </button>
          <FieldIcon className="pointer-events-none">
            {open ? <CaretUpIcon weight="regular" /> : <CaretDownIcon weight="regular" />}
          </FieldIcon>
        </div>

        <ul
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          aria-labelledby={`${id}-combo`}
          aria-multiselectable={props.multiple || undefined}
          hidden={!open}
          className="absolute inset-x-0 top-full z-40 mt-1 max-h-[344px] overflow-y-auto rounded-[8px] bg-white"
        >
          {options.map((option, i) => {
            const isSelected = selected.includes(option.props.value);
            const isActive = open && i === active;
            return (
              <li
                key={option.props.value}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={isSelected}
                onPointerDown={(event) => event.preventDefault()}
                onClick={() => {
                  setActive(i);
                  choose(i);
                }}
                onPointerMove={() => setActive(i)}
                // Medidas y colores de Master option: Mobile 16px/43px, Desk 14px/40px.
                className={`flex cursor-pointer items-center gap-2 px-2 py-3 text-base leading-[19px] text-[#202025] sm:text-sm sm:leading-4 ${
                  isActive
                    ? "bg-[#e4e5f4] shadow-[inset_0_0_0_2px_#2a32a2]"
                    : "bg-white shadow-[inset_0_1px_0_#d8d9de] hover:bg-[#e4e5f4]"
                } ${isSelected ? "font-bold" : ""}`}
              >
                {props.multiple ? (
                  <span aria-hidden className="inline-flex">
                    <CheckboxPreview style={getCheckboxStyle(isSelected ? "Selected" : "Unselected", "Enabled")} label="" />
                  </span>
                ) : null}
                {showRadio ? (
                  <span aria-hidden className="inline-flex">
                    <RadioPreview style={getRadioStyle(isSelected ? "True" : "False", "Enabled")} label="" />
                  </span>
                ) : null}
                {option.props.icon ? (
                  <span aria-hidden className="inline-flex size-4 shrink-0 [&>svg]:size-full">
                    {option.props.icon}
                  </span>
                ) : null}
                <span className="min-w-0 flex-1">{option.props.children}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </Field>
  );
}

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}
