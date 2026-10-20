"use client";

import { useState } from "react";
import { CheckCircleIcon, PaperclipIcon, TrashIcon, WarningIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Popup, type PopupTone } from "@/components/ui/Popup";

const noop = () => {};
const iconByTone: Record<PopupTone, React.ReactNode> = {
  Default: <PaperclipIcon weight="regular" />,
  Success: <CheckCircleIcon weight="regular" />,
  Warning: <WarningIcon weight="regular" />,
  Error: <TrashIcon weight="regular" />,
};

export function PopupGallery() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-center gap-6">
        {(["Default", "Success", "Warning", "Error"] as const).map((tone) => (
          <Popup
            key={tone}
            modal={false}
            open
            onClose={noop}
            tone={tone}
            icon={iconByTone[tone]}
            title={tone}
            primaryAction={{ label: "Continuar" }}
            secondaryAction={{ label: "Cancelar" }}
          >
            Texto que explica el mensaje en una o dos líneas.
          </Popup>
        ))}
      </div>
      <div className="flex flex-wrap items-start justify-center gap-6">
        <Popup modal={false} open onClose={noop} orientation="horizontal" icon={iconByTone.Default} title="Horizontal" primaryAction={{ label: "Continuar" }} secondaryAction={{ label: "Cancelar" }} tertiaryAction={{ label: "Más tarde" }}>
          En horizontal el ícono va junto al título y los botones en fila.
        </Popup>
        <Popup modal={false} open onClose={noop} branded icon={iconByTone.Default} title="Con marca" primaryAction={{ label: "Empezar" }}>
          Franja superior con el degradado y el logotipo de Tramita.
        </Popup>
      </div>
    </div>
  );
}

export function PopupDemo() {
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const close = () => {
    setOpen(false);
    setAccepted(false);
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>Radicar solicitud</Button>
      <Popup
        open={open}
        onClose={close}
        icon={<PaperclipIcon weight="regular" />}
        title="Radicar solicitud"
        terms={
          <Checkbox
            label={<span className="text-sm text-[#5c5d70]">Acepto términos y condiciones</span>}
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
          />
        }
        primaryAction={{ label: "Radicar", onClick: close, disabled: !accepted }}
        secondaryAction={{ label: "Revisar de nuevo", onClick: close }}
      >
        Una vez radicada no podrás modificar los documentos.
      </Popup>
    </>
  );
}
