"use client";

import { Alert, Toast } from "@/components/ui/Alert";
import { alertToneNames } from "@/data/alerts";

// Ejemplos estáticos de la documentación. Son de cliente porque los botones
// de cerrar y de acción reciben funciones.
const noop = () => {};

export function AlertToneGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-xl bg-zinc-50 p-6 lg:grid-cols-2">
      {alertToneNames.flatMap((tone) =>
        (["subtle", "solid"] as const).map((appearance) => (
          <Alert key={`${tone}-${appearance}`} tone={tone} appearance={appearance} onClose={noop}>
            {tone} · {appearance}
          </Alert>
        ))
      )}
    </div>
  );
}

export function AlertActionsExamples() {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-xl bg-zinc-50 p-6 lg:grid-cols-2">
      <Alert tone="Warning" onClose={noop} primaryAction={{ label: "Revisar" }} secondaryAction={{ label: "Más tarde" }}>
        Tu solicitud vence en 3 días.
      </Alert>
      <Alert tone="Error" appearance="solid" onClose={noop} primaryAction={{ label: "Reintentar" }} secondaryAction={{ label: "Cancelar" }}>
        No pudimos cargar el documento.
      </Alert>
    </div>
  );
}

export function ToastExamples() {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-xl bg-zinc-50 p-6 lg:grid-cols-2">
      <Toast tone="Success" title="Solicitud enviada" onClose={noop} primaryAction={{ label: "Ver solicitud" }}>
        Te avisaremos por correo cuando cambie de estado.
      </Toast>
      <Toast tone="Pending info" appearance="solid" title="Falta un documento" onClose={noop}>
        Adjunta el RUT para continuar.
      </Toast>
    </div>
  );
}

export function AlertAnatomySample() {
  return (
    <div inert>
      <Alert tone="Pending info" onClose={noop} primaryAction={{ label: "Completar" }}>
        Falta adjuntar el RUT.
      </Alert>
    </div>
  );
}
