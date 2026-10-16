import type { InputHTMLAttributes, ReactNode } from "react";

export type ChipProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: ReactNode;
  /** Ícono opcional antes del texto (Show icon en Figma). */
  icon?: ReactNode;
  /** "multiple" usa checkbox; "single" usa radio (comparte name con el grupo). */
  selection?: "multiple" | "single";
};

// Chip del D.S. Tramita: un input nativo oculto dentro de su label, así el
// estado seleccionado se anuncia sin ARIA y funciona con teclado.
export function Chip({ label, icon, selection = "multiple", className = "", ...inputProps }: ChipProps) {
  return (
    <label
      className={`inline-flex cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-[20px] border border-[#ebebed] bg-white px-5 py-2 text-sm text-[#484956] hover:border-[#c9ccee] hover:bg-[#c9ccee] has-[:checked]:border-[#1a1f6b] has-[:checked]:bg-[#1a1f6b] has-[:checked]:font-bold has-[:checked]:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#bb7d11] has-[:disabled]:cursor-not-allowed has-[:disabled]:border-[#f6f6f7] has-[:disabled]:bg-[#ebebed] has-[:disabled]:text-[#b9bac5] ${className}`}
    >
      <input {...inputProps} type={selection === "single" ? "radio" : "checkbox"} className="sr-only" />
      {icon}
      {label}
    </label>
  );
}
