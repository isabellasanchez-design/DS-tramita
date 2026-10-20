"use client";

import Image from "next/image";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { XIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";

export type PopupTone = "Default" | "Success" | "Error" | "Warning";

// Colores por Case en Figma (03_Popup): círculo del ícono, ícono y título.
const tones: Record<PopupTone, { circle: string; icon: string; title: string }> = {
  Default: { circle: "#e4e5f4", icon: "#2a32a2", title: "#2a32a2" },
  Success: { circle: "#e4f4e8", icon: "#227c3c", title: "#12331b" },
  Error: { circle: "#f6e1e2", icon: "#b4181d", title: "#b4181d" },
  Warning: { circle: "#f7efe0", icon: "#8d6011", title: "#8d6011" },
};

export type PopupAction = { label: string; onClick?: () => void; disabled?: boolean };

export type PopupProps = {
  open: boolean;
  /** Se llama al cerrar con la X, con Escape o con una acción que cierre. */
  onClose: () => void;
  title: ReactNode;
  /** Case en Figma. */
  tone?: PopupTone;
  /** Property 1 en Figma: botones en columna (vertical) o en fila (horizontal). */
  orientation?: "vertical" | "horizontal";
  /** Tipe=Con marca: franja superior con el degradado y el logotipo. */
  branded?: boolean;
  /** Ícono dentro del círculo. */
  icon?: ReactNode;
  /** Checkbox de términos (T&C), normalmente un <Checkbox />. */
  terms?: ReactNode;
  primaryAction?: PopupAction;
  secondaryAction?: PopupAction;
  /** Tercera acción con estilo Link. */
  tertiaryAction?: PopupAction;
  /** Oculta la X (Close=false). Escape sigue cerrando. */
  hideClose?: boolean;
  /** false: se muestra dentro de la página, sin bloquearla (para ejemplos). */
  modal?: boolean;
  /** Contenido (Space 1 en Figma). */
  children?: ReactNode;
};

// Popup del D.S. Tramita (03_Popup › Modal en Figma) sobre <dialog> con
// showModal(): el navegador atrapa el foco, cierra con Escape, deja inerte el
// resto de la página y devuelve el foco al elemento que lo abrió.
export function Popup({
  open,
  onClose,
  title,
  tone = "Default",
  orientation = "vertical",
  branded = false,
  icon,
  terms,
  primaryAction,
  secondaryAction,
  tertiaryAction,
  hideClose = false,
  modal = true,
  children,
}: PopupProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const bodyId = useId();
  const colors = tones[tone];
  const vertical = orientation === "vertical";

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !modal) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open, modal]);

  const actions = [
    primaryAction && { ...primaryAction, variant: "Primary" as const },
    secondaryAction && { ...secondaryAction, variant: "Outline" as const },
    tertiaryAction && { ...tertiaryAction, variant: "Link" as const },
  ].filter(Boolean) as (PopupAction & { variant: "Primary" | "Outline" | "Link" })[];

  return (
    <dialog
      ref={ref}
      open={modal ? undefined : open}
      aria-labelledby={titleId}
      aria-describedby={children ? bodyId : undefined}
      onClose={onClose}
      className={`${modal ? "m-auto" : "relative"} w-[480px] max-w-[calc(100%-32px)] overflow-visible rounded-[24px] bg-white p-0 shadow-[0_8px_32px_rgba(0,0,0,0.2)]`}
    >
      {branded ? (
        <div className="rounded-t-[24px] bg-[linear-gradient(180deg,#1a1f6b_0%,#2830a6_46%,#2830a6_100%)] p-4">
          <Image src="/brand/tramita-logotipo-blanco.png" alt="Tramita" width={117} height={36} className="h-9 w-auto" />
        </div>
      ) : null}

      <div className={`flex flex-col gap-4 px-10 ${branded ? "pb-6 pt-4" : "py-10"}`}>
        <div className={`flex gap-4 ${vertical ? "flex-col items-center text-center" : "flex-row items-center"}`}>
          {icon ? (
            <span
              aria-hidden
              className="flex size-12 shrink-0 items-center justify-center rounded-full [&>svg]:size-8"
              style={{ backgroundColor: colors.circle, color: colors.icon }}
            >
              {icon}
            </span>
          ) : null}
          <h2 id={titleId} className="text-2xl font-bold leading-[30px]" style={{ color: colors.title }}>
            {title}
          </h2>
        </div>

        {children ? (
          <div id={bodyId} className={`text-base leading-[19px] text-[#484956] ${vertical ? "text-center" : ""}`}>
            {children}
          </div>
        ) : null}

        {terms || actions.length ? (
          <div className={`flex flex-col gap-2 ${vertical ? "pt-4" : ""}`}>
            {terms ? <div className={vertical ? "flex justify-center" : ""}>{terms}</div> : null}
            {actions.length ? (
              <div className={`flex gap-3 ${vertical ? "flex-col" : "flex-row"}`}>
                {actions.map((action) => (
                  <Button
                    key={action.label}
                    variant={action.variant}
                    onClick={action.onClick}
                    disabled={action.disabled}
                    className={vertical ? "w-full" : "flex-1"}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {hideClose ? null : (
        <button
          type="button"
          // Cierra el <dialog>; su evento close avisa a onClose una sola vez.
          onClick={() => (modal ? ref.current?.close() : onClose())}
          aria-label="Cerrar"
          className={`absolute right-6 top-6 flex size-6 cursor-pointer items-center justify-center ${branded ? "text-white" : "text-[#2a32a2]"}`}
        >
          <XIcon aria-hidden weight="regular" className="size-6" />
        </button>
      )}
    </dialog>
  );
}
