import type { InputHTMLAttributes, ReactNode } from "react";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  /** Texto visible asociado al checkbox; hacer clic en él también lo marca. */
  label: ReactNode;
};

// Checkbox del D.S. Tramita sobre el input nativo: los estados Hovered,
// Pressed y Keyboardtab de Figma salen de :hover, :active y :focus-visible.
export function Checkbox({ label, className = "", ...inputProps }: CheckboxProps) {
  return (
    <label
      className={`flex w-fit cursor-pointer items-center gap-2 text-base text-zinc-800 has-[:disabled]:cursor-not-allowed has-[:disabled]:text-zinc-500 ${className}`}
    >
      <span className="relative grid place-items-center rounded-[4px] p-[3px] has-[:enabled:active]:bg-[#d8d9de]">
        <input
          {...inputProps}
          type="checkbox"
          className="peer size-[18px] cursor-pointer appearance-none rounded-[4px] border border-[#2a32a2] bg-transparent hover:border-[#121433] checked:border-[#1c2057] checked:bg-[#1c2057] checked:hover:border-[#121433] checked:hover:bg-[#121433] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#bb7d11] disabled:cursor-not-allowed disabled:border-[#d8d9de] checked:disabled:bg-[#d8d9de]"
        />
        <CheckIcon
          weight="regular"
          aria-hidden
          className="pointer-events-none absolute size-4 text-white opacity-0 peer-checked:opacity-100"
        />
      </span>
      {label}
    </label>
  );
}
