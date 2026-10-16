import type { InputHTMLAttributes, ReactNode } from "react";
import { CheckIcon, XIcon } from "@phosphor-icons/react/dist/ssr";

export type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "role"> & {
  /** Nombre de la configuración que controla (p. ej. "Notificaciones por correo"). */
  label: ReactNode;
};

// Switch del D.S. Tramita: checkbox nativo con role="switch", así funciona con
// teclado (barra espaciadora) y los lectores anuncian "activado/desactivado".
export function Switch({ label, className = "", ...inputProps }: SwitchProps) {
  return (
    <label
      className={`flex w-fit cursor-pointer items-center gap-3 text-base text-zinc-800 has-[:disabled]:cursor-not-allowed has-[:disabled]:text-zinc-500 ${className}`}
    >
      <span className="relative inline-flex h-6 w-12 shrink-0">
        <input
          {...inputProps}
          type="checkbox"
          role="switch"
          className="peer absolute inset-0 cursor-pointer appearance-none rounded-full bg-[#9496a8] hover:bg-[#73748c] active:bg-[#5c5d70] checked:bg-[#30cf5d] checked:hover:bg-[#28a44b] checked:active:bg-[#227c3c] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#bb7d11] disabled:cursor-not-allowed disabled:bg-[#d8d9de]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 grid size-6 place-items-center transition-transform peer-checked:translate-x-6"
        >
          <span className="absolute size-[18px] rounded-full bg-[#f6f6f7] transition-[width,height] [.peer:checked~*_&]:bg-[#f3f9f5] [.peer:enabled:active~*_&]:size-6 [.peer:disabled~*_&]:bg-white" />
          <XIcon
            weight="bold"
            className="relative size-[18px] text-[#9496a8] [.peer:checked~*_&]:hidden [.peer:disabled~*_&]:text-[#d8d9de] [.peer:enabled:active~*_&]:text-[#5c5d70] [.peer:hover~*_&]:text-[#73748c]"
          />
          <CheckIcon
            weight="bold"
            className="relative hidden size-[18px] text-[#28a44b] [.peer:checked~*_&]:block [.peer:checked:disabled~*_&]:text-[#d8d9de] [.peer:checked:enabled:active~*_&]:text-[#227c3c] [.peer:checked:hover~*_&]:text-[#227c3c]"
          />
        </span>
      </span>
      {label}
    </label>
  );
}
