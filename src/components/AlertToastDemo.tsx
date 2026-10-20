"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Alert";

// Simula el envío de una solicitud: el Toast aparece, se anuncia (role="status")
// y se queda hasta que la persona lo cierra.
export function AlertToastDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-start gap-4">
      <Button onClick={() => setOpen(true)}>Enviar solicitud</Button>
      <div className="w-full max-w-[637px]">
        {open ? (
          <Toast
            tone="Success"
            title="Solicitud enviada"
            primaryAction={{ label: "Ver solicitud", onClick: () => setOpen(false) }}
            onClose={() => setOpen(false)}
          >
            Te avisaremos por correo cuando cambie de estado.
          </Toast>
        ) : null}
      </div>
    </div>
  );
}
