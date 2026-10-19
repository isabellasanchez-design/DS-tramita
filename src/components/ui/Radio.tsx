import type { InputHTMLAttributes, ReactNode } from "react";

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  /** Texto visible asociado al radio; hacer clic en él también lo selecciona. */
  label: ReactNode;
};

// Radio Button del D.S. Tramita sobre el input nativo. Las opciones de un mismo
// grupo deben compartir `name` y estar dentro de un <fieldset> con <legend>.
export function Radio({ label, className = "", ...inputProps }: RadioProps) {
  return (
    <label
      className={`flex w-fit cursor-pointer items-center gap-2 text-base text-zinc-800 has-[:disabled]:cursor-not-allowed has-[:disabled]:text-zinc-500 ${className}`}
    >
      <span className="grid size-[24px] place-items-center rounded-full has-[:checked:enabled:active]:bg-[#d8d9de]">
        <input
          {...inputProps}
          type="radio"
          className="size-[19.5px] cursor-pointer appearance-none rounded-full border border-[#1c2057] text-[#1c2057] hover:border-[1.5px] hover:border-[#121433] hover:text-[#121433] checked:border-[1.5px] checked:bg-[radial-gradient(circle,currentColor_0_6px,transparent_6.5px)] focus-visible:border-[1.5px] focus-visible:border-[#bb7d11] focus-visible:shadow-[inset_0_0_0_2px_#bb7d11] focus-visible:outline-none disabled:cursor-not-allowed disabled:border-[#d8d9de] disabled:text-[#d8d9de]"
        />
      </span>
      {label}
    </label>
  );
}
