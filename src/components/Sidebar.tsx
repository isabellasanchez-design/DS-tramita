"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import {
  HomeIcon,
  FoundationsIcon,
  ComponentsIcon,
  ColorIcon,
} from "@/components/icons/NavIcons";
import { navCategories, type NavCategory } from "@/data/nav";

const categoryIcons: Record<NavCategory["key"], ComponentType<{ className?: string }>> = {
  fundamentos: FoundationsIcon,
  estilos: ColorIcon,
  componentes: ComponentsIcon,
};

function NavIconButton({
  label,
  Icon,
  active,
  expanded,
  onClick,
  buttonRef,
  panelId,
}: {
  label: string;
  Icon: ComponentType<{ className?: string }>;
  active: boolean;
  expanded: boolean;
  onClick: () => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
  panelId: string;
}) {
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-haspopup="true"
      aria-expanded={expanded}
      aria-controls={panelId}
      className={`group relative flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
        active || expanded ? "bg-[#e4e5f4]" : "hover:bg-white/10"
      }`}
    >
      <Icon
        className={`size-6 ${active || expanded ? "text-[#2a32a2]" : "text-white/80 group-hover:text-white"}`}
      />
      {!expanded && (
        <span
          role="tooltip"
          className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-[var(--brand-navy)] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {label}
        </span>
      )}
    </button>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [openKey, setOpenKey] = useState<NavCategory["key"] | null>(null);
  const [lastPathname, setLastPathname] = useState(pathname);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const panelRef = useRef<HTMLDivElement | null>(null);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpenKey(null);
  }

  useEffect(() => {
    if (!openKey) return;

    function handlePointerDown(event: MouseEvent) {
      const panel = panelRef.current;
      const button = buttonRefs.current[openKey as string];
      const target = event.target as Node;
      if (panel?.contains(target) || button?.contains(target)) return;
      setOpenKey(null);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        buttonRefs.current[openKey as string]?.focus();
        setOpenKey(null);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openKey]);

  function toggleCategory(key: NavCategory["key"]) {
    setOpenKey((current) => (current === key ? null : key));
  }

  const openCategory = navCategories.find((c) => c.key === openKey) ?? null;

  return (
    <>
      <nav
        aria-label="Navegación principal"
        className="fixed inset-y-0 left-0 z-20 flex w-[93px] flex-col items-center gap-8 rounded-tr-[10px] rounded-br-[10px] border-r border-[#3d48aa] bg-gradient-to-b from-[#1a1f6b] via-[#2830a6] to-[#2830a6] py-6"
      >
        <Link
          href="/"
          aria-label="D.S. Tramita — inicio"
          className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[var(--brand-primary-soft)]"
        >
          <span className="relative block size-6 overflow-hidden">
            <Image
              src="/brand/logo.png"
              alt=""
              width={78}
              height={25}
              className="absolute -left-[1.6px] -top-[1.3px] h-[25.3px] w-[78.4px] max-w-none"
              priority
            />
          </span>
        </Link>

        <div className="flex flex-col items-center gap-4">
          <Link
            href="/"
            aria-label="Inicio"
            aria-current={pathname === "/" ? "page" : undefined}
            className={`group relative flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              pathname === "/" ? "bg-[#e4e5f4]" : "hover:bg-white/10"
            }`}
          >
            <HomeIcon
              className={`size-6 ${pathname === "/" ? "text-[#2a32a2]" : "text-white/80 group-hover:text-white"}`}
            />
            <span
              role="tooltip"
              className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-[var(--brand-navy)] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            >
              Inicio
            </span>
          </Link>

          {navCategories.map((category) => (
            <NavIconButton
              key={category.key}
              label={category.label}
              Icon={categoryIcons[category.key]}
              active={pathname.startsWith(`/${category.key}`)}
              expanded={openKey === category.key}
              onClick={() => toggleCategory(category.key)}
              buttonRef={(el) => {
                buttonRefs.current[category.key] = el;
              }}
              panelId={`nav-panel-${category.key}`}
            />
          ))}
        </div>
      </nav>

      {openCategory && (
        <div
          ref={panelRef}
          id={`nav-panel-${openCategory.key}`}
          className="fixed inset-y-0 left-[93px] z-20 w-[255px] overflow-y-auto rounded-tr-2xl rounded-br-2xl bg-[var(--brand-navy)]"
        >
          <Link
            href={openCategory.href}
            className="block px-4 py-4 text-lg font-bold text-white hover:bg-white/10"
          >
            {openCategory.label}
          </Link>
          <ul className="flex flex-col gap-0.5 px-2 pb-2">
            {openCategory.items.map((item) => {
              const href = `/${openCategory.key}/${item.slug}`;
              const active = pathname === href;
              return (
                <li key={item.slug}>
                  <Link
                    href={href}
                    className={`block rounded-lg py-2 pl-2 pr-8 text-base transition-colors ${
                      active ? "bg-white/15 text-white" : "text-white/90 hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
