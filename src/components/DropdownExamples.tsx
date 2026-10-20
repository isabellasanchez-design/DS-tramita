"use client";

import { FileTextIcon, IdentificationCardIcon, ReceiptIcon, BuildingsIcon } from "@phosphor-icons/react/dist/ssr";
import { Dropdown, DropdownOption } from "@/components/ui/Dropdown";

const ciudades = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena", "Bucaramanga", "Pereira", "Manizales", "Santa Marta", "Cúcuta"];

export function DropdownSingle() {
  return (
    <Dropdown label="Ciudad del trámite" placeholder="Selecciona una ciudad" showRadio>
      {ciudades.map((ciudad) => (
        <DropdownOption key={ciudad} value={ciudad}>
          {ciudad}
        </DropdownOption>
      ))}
    </Dropdown>
  );
}

export function DropdownMultiple() {
  return (
    <Dropdown label="Documentos que vas a adjuntar" multiple defaultValue={["rut"]} hint="Puedes elegir varios.">
      <DropdownOption value="rut" icon={<ReceiptIcon weight="regular" />}>RUT</DropdownOption>
      <DropdownOption value="cc" icon={<IdentificationCardIcon weight="regular" />}>Cédula del representante</DropdownOption>
      <DropdownOption value="camara" icon={<BuildingsIcon weight="regular" />}>Certificado de Cámara de Comercio</DropdownOption>
      <DropdownOption value="poder" icon={<FileTextIcon weight="regular" />}>Poder notariado</DropdownOption>
    </Dropdown>
  );
}
