import { CaretDownIcon, ClockIcon } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import { ButtonPreview } from "@/components/ButtonPreview";
import { CheckboxPreview } from "@/components/CheckboxPreview";
import { ChipPreview } from "@/components/ChipPreview";
import { RadioPreview } from "@/components/RadioPreview";
import { SwitchPreview } from "@/components/SwitchPreview";
import { Alert } from "@/components/ui/Alert";
import { InformationBar } from "@/components/ui/InformationBar";
import { Tag } from "@/components/ui/Tag";
import { TooltipBubble } from "@/components/ui/Tooltip";
import { getButtonStyle } from "@/data/buttons";
import { getCheckboxStyle } from "@/data/checkbox";
import { chipStyles } from "@/data/chips";
import { getRadioStyle } from "@/data/radio";
import { getSwitchStyle } from "@/data/switch";

// Miniaturas estáticas para las tarjetas de componentes (/componentes y las
// páginas de grupo). Son decorativas y no usan
// controles reales, porque la tarjeta completa ya es un enlace.

function FieldSample({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex w-full max-w-[220px] flex-col gap-1">
      <span className="text-xs text-[#202025]">{label}</span>
      <div className="flex h-8 items-center gap-1.5 rounded-[4px] border border-[#e4e5f4] bg-white px-2 text-xs text-[#9496a8]">
        {children}
      </div>
    </div>
  );
}

const previews: Record<string, () => ReactNode> = {
  buttons: () => (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <ButtonPreview style={getButtonStyle("Primary", "Default")} label="Continuar" />
      <ButtonPreview style={getButtonStyle("Outline", "Default")} label="Volver" />
    </div>
  ),
  textbox: () => (
    <div className="flex w-full flex-col items-center gap-2">
      <FieldSample label="Nombre completo">Escribe tu nombre</FieldSample>
      <FieldSample label="Hora de la cita">
        <ClockIcon className="size-3.5 text-[#0e0d12]" />
        <span className="flex-1">Selecciona una hora</span>
        <CaretDownIcon className="size-3.5 text-[#0e0d12]" />
      </FieldSample>
    </div>
  ),
  checkbox: () => (
    <div className="flex items-center gap-4">
      <CheckboxPreview style={getCheckboxStyle("Selected", "Enabled")} label="" scale={1.5} />
      <CheckboxPreview style={getCheckboxStyle("Unselected", "Enabled")} label="" scale={1.5} />
      <CheckboxPreview style={getCheckboxStyle("Selected", "Disabled")} label="" scale={1.5} />
    </div>
  ),
  "radio-button": () => (
    <div className="flex items-center gap-4">
      <RadioPreview style={getRadioStyle("True", "Enabled")} label="" scale={1.5} />
      <RadioPreview style={getRadioStyle("False", "Enabled")} label="" scale={1.5} />
      <RadioPreview style={getRadioStyle("True", "Disabled")} label="" scale={1.5} />
    </div>
  ),
  switch: () => (
    <div className="flex items-center gap-4">
      <SwitchPreview style={getSwitchStyle("Yes", "Enabled")} label="" scale={1.25} />
      <SwitchPreview style={getSwitchStyle("No", "Enabled")} label="" scale={1.25} />
    </div>
  ),
  chips: () => (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <ChipPreview style={chipStyles.Select} label="Aprobado" />
      <ChipPreview style={chipStyles.Default} label="En revisión" showIcon={false} />
    </div>
  ),
  tags: () => (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Tag tagCase="Success">Aprobado</Tag>
      <Tag tagCase="Warning" type="Contrast">Pendiente</Tag>
      <Tag tagCase="Error" type="Edge">Rechazado</Tag>
    </div>
  ),
  "alert-toast": () => (
    <div className="flex w-full max-w-[260px] flex-col gap-2 text-left">
      <Alert tone="Success">Enviada</Alert>
      <Alert tone="Error" appearance="solid">Error</Alert>
    </div>
  ),
  "information-bar": () => (
    <div className="w-full overflow-hidden rounded-md text-left">
      <InformationBar className="sm:px-4">Aviso general</InformationBar>
    </div>
  ),
  pagination: () => (
    <div className="flex items-center gap-1 text-base leading-none text-[#2a32a2]">
      {["1", "2", "3"].map((n) => (
        <span
          key={n}
          className={`flex h-11 items-center rounded-[20px] ${n === "2" ? "border border-[#2a32a2] bg-white px-4" : "px-3"}`}
        >
          {n}
        </span>
      ))}
    </div>
  ),
  tabs: () => (
    <div className="flex w-full max-w-[260px] text-sm leading-none">
      <span className="flex-1 py-3 text-center font-bold text-[#2a32a2] shadow-[inset_0_-4px_0_#2a32a2]">Datos</span>
      <span className="flex-1 py-3 text-center text-[#5c5d70] shadow-[inset_0_-1px_0_#d8d9de]">Documentos</span>
    </div>
  ),
  card: () => (
    <div className="flex w-[180px] flex-col gap-2 rounded-[10px] bg-white p-3 text-left shadow-[0_4px_16px_rgba(0,0,0,0.07)]">
      <div className="h-12 rounded-md bg-[#ebebed]" />
      <span className="text-xs font-bold text-[#2a32a2]">Registro de marca</span>
      <span className="text-[10px] leading-3 text-[#484956]">Protege el nombre de tu empresa.</span>
    </div>
  ),
  tooltip: () => <TooltipBubble tipPosition="centerBottom">Texto de ayuda breve</TooltipBubble>,
};

/** Miniatura del componente por su slug de components.ts, o undefined si aún no tiene. */
export function componentCardPreview(slug: string) {
  return previews[slug]?.();
}
