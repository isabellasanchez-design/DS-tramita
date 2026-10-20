"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { LightningIcon, XIcon } from "@phosphor-icons/react/dist/ssr";

export type InformationBarProps = HTMLAttributes<HTMLDivElement> & {
  /** Ícono antes del texto. Por defecto Lightning, como en Figma. */
  icon?: ReactNode;
  /** Muestra el botón X; recibe el clic. */
  onClose?: () => void;
  children: ReactNode;
};

// Information bar del D.S. Tramita (02_Information_bar en Figma): barra de
// ancho completo con el degradado de marca. Desktop y Mobile solo cambian el
// padding horizontal (32px y 16px), así que es responsive en vez de una prop.
export function InformationBar({ icon, onClose, className = "", children, ...divProps }: InformationBarProps) {
  return (
    <div
      {...divProps}
      className={`flex w-full items-start gap-4 bg-[linear-gradient(90deg,#4ad16f_0%,#1a1f6b_100%)] px-4 py-3 text-white sm:px-8 ${className}`}
    >
      <div className="flex flex-1 items-start gap-2">
        <span aria-hidden className="mt-px inline-flex size-4 shrink-0 [&>svg]:size-full">
          {icon ?? <LightningIcon weight="regular" />}
        </span>
        <div className="flex-1 text-base leading-[19px]">{children}</div>
      </div>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="-m-1 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-[4px] focus-visible:outline-2 focus-visible:outline-white"
        >
          <XIcon aria-hidden weight="regular" className="size-4" />
        </button>
      ) : null}
    </div>
  );
}
