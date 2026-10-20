"use client";

import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useId, useState, type ReactNode } from "react";
import { CaretCircleLeftIcon, CaretCircleRightIcon, CaretUpDownIcon } from "@phosphor-icons/react/dist/ssr";

const OpenContext = createContext(true);

export type SidebarMenuProps = {
  /** Abierta (255px) o cerrada (48px, solo íconos). Sin control externo. */
  defaultOpen?: boolean;
  /** Con control externo. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Perfil al pie. Con onClick es un botón (p. ej. para abrir el menú de cuenta). */
  profile?: { name: string; email?: string; avatarSrc?: string; onClick?: () => void };
  /** Nombre del <nav>. */
  "aria-label"?: string;
  className?: string;
  children: ReactNode;
};

// Menu del D.S. Tramita (03_Menu › Sidebar en Figma): barra lateral con el
// degradado de marca, que se abre (255px) o se cierra (48px). Cerrada solo
// muestra íconos; el texto sigue disponible para lectores de pantalla.
export function SidebarMenu({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  profile,
  "aria-label": ariaLabel = "Menú principal",
  className = "",
  children,
}: SidebarMenuProps) {
  const [internal, setInternal] = useState(defaultOpen);
  const open = openProp ?? internal;
  const listId = useId();

  function toggle() {
    if (openProp === undefined) setInternal(!open);
    onOpenChange?.(!open);
  }

  const profileContent = profile ? (
    <>
      {profile.avatarSrc ? (
        <Image src={profile.avatarSrc} alt="" width={32} height={32} className="size-8 shrink-0 rounded-[8px] object-cover" />
      ) : (
        <span aria-hidden className="size-8 shrink-0 rounded-[8px] bg-[#e4e5f4]" />
      )}
      <span className={`min-w-0 flex-1 text-left ${open ? "" : "sr-only"}`}>
        <span className="block truncate text-sm font-bold leading-4 text-white">{profile.name}</span>
        {profile.email ? <span className="block truncate text-xs leading-[14px] text-[#d8d9de]">{profile.email}</span> : null}
      </span>
      {open && profile.onClick ? <CaretUpDownIcon aria-hidden className="size-4 shrink-0 text-white" /> : null}
    </>
  ) : null;

  return (
    <OpenContext.Provider value={open}>
      <aside
        className={`relative flex h-full shrink-0 flex-col bg-[linear-gradient(180deg,#1a1f6b_0%,#2830a6_46%,#2830a6_100%)] transition-[width] ${
          open ? "w-[255px]" : "w-12"
        } ${className}`}
      >
        <div className={open ? "p-4" : "p-2"}>
          {open ? (
            <Image src="/brand/tramita-logotipo-blanco.png" alt="Tramita" width={117} height={36} className="h-9 w-auto" />
          ) : (
            <span className="flex size-8 items-center justify-center rounded-[10px] bg-[#f3f4f9]">
              <Image src="/brand/tramita-isotipo.png" alt="Tramita" width={24} height={24} />
            </span>
          )}
        </div>

        <nav id={listId} aria-label={ariaLabel} className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
          {children}
        </nav>

        {profile ? (
          <div className="p-2">
            {profile.onClick ? (
              <button
                type="button"
                onClick={profile.onClick}
                className={`flex w-full cursor-pointer items-center gap-2 rounded-[8px] ${open ? "p-2" : "p-0"}`}
              >
                {profileContent}
              </button>
            ) : (
              <div className={`flex items-center gap-2 ${open ? "p-2" : ""}`}>{profileContent}</div>
            )}
          </div>
        ) : null}

        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls={listId}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className={`absolute top-2 flex size-6 cursor-pointer items-center justify-center rounded-full bg-[#23297b] text-white ${
            open ? "-right-3.5" : "-right-4"
          }`}
        >
          {open ? <CaretCircleLeftIcon aria-hidden className="size-4" /> : <CaretCircleRightIcon aria-hidden className="size-4" />}
        </button>
      </aside>
    </OpenContext.Provider>
  );
}

/** Grupo de ítems con título (Section Label en Figma). */
export function SidebarMenuSection({ label, children }: { label?: string; children: ReactNode }) {
  const open = useContext(OpenContext);
  const headingId = useId();
  return (
    <div role="group" aria-labelledby={label ? headingId : undefined}>
      {label ? (
        <p id={headingId} className={`flex h-8 items-center px-2 text-xs leading-[14px] text-white ${open ? "" : "sr-only"}`}>
          {label}
        </p>
      ) : null}
      <ul className="flex flex-col">{children}</ul>
    </div>
  );
}

export type SidebarMenuItemProps = {
  href: string;
  /** Ícono del ítem (Icon en Figma). */
  icon: ReactNode;
  /** Página actual: estado Select en Figma. */
  current?: boolean;
  children: ReactNode;
};

/** Ítem del menú (Component 1 en Figma). */
export function SidebarMenuItem({ href, icon, current = false, children }: SidebarMenuItemProps) {
  const open = useContext(OpenContext);
  return (
    <li>
      <Link
        href={href}
        aria-current={current ? "page" : undefined}
        className={`flex items-center gap-2 rounded-[8px] p-2 text-base leading-[19px] ${open ? "pr-8" : "size-8"} ${
          current ? "bg-[#e4e5f4] font-bold text-[#2a32a2]" : "font-normal text-white"
        }`}
      >
        <span aria-hidden className="inline-flex size-4 shrink-0 [&>svg]:size-full">
          {icon}
        </span>
        <span className={open ? "min-w-0 flex-1 truncate" : "sr-only"}>{children}</span>
      </Link>
    </li>
  );
}
