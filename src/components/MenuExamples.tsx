"use client";

import { DiamondsFourIcon, DoorOpenIcon, HouseIcon, QueueIcon, ShieldCheckIcon, UsersIcon } from "@phosphor-icons/react/dist/ssr";
import { SidebarMenu, SidebarMenuItem, SidebarMenuSection } from "@/components/ui/SidebarMenu";

function Items() {
  return (
    <>
      <SidebarMenuSection label="Parametrización">
        <SidebarMenuItem href="#" icon={<HouseIcon weight="regular" />} current>Inicio</SidebarMenuItem>
        <SidebarMenuItem href="#" icon={<DoorOpenIcon weight="regular" />}>Servicios de atención</SidebarMenuItem>
        <SidebarMenuItem href="#" icon={<QueueIcon weight="regular" />}>Ventanillas y colas</SidebarMenuItem>
        <SidebarMenuItem href="#" icon={<DiamondsFourIcon weight="regular" />}>Reglas de prioridad</SidebarMenuItem>
      </SidebarMenuSection>
      <SidebarMenuSection label="Accesos">
        <SidebarMenuItem href="#" icon={<UsersIcon weight="regular" />}>Usuarios</SidebarMenuItem>
        <SidebarMenuItem href="#" icon={<ShieldCheckIcon weight="regular" />}>Roles y permisos</SidebarMenuItem>
      </SidebarMenuSection>
    </>
  );
}

const profile = { name: "Administrador", email: "admin@tramita.com.co", onClick: () => {} };

export function MenuDemo() {
  return (
    <div className="flex gap-12 overflow-x-auto">
      <div className="h-[560px]">
        <SidebarMenu profile={profile} aria-label="Menú de ejemplo abierto">
          <Items />
        </SidebarMenu>
      </div>
      <div className="h-[560px]">
        <SidebarMenu profile={profile} defaultOpen={false} aria-label="Menú de ejemplo cerrado">
          <Items />
        </SidebarMenu>
      </div>
    </div>
  );
}

/** Vista del componente: abierta y cerrada. */
export function MenuPreview() {
  return <MenuDemo />;
}
