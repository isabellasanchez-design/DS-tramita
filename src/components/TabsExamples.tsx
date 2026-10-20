"use client";

import { Tab, Tabs } from "@/components/ui/Tabs";

export function TabsDemo() {
  return (
    <Tabs aria-label="Detalle de la solicitud">
      <Tab label="Datos">
        <p className="text-sm text-zinc-700">Solicitud 0042 · Registro de marca · Radicada el 14 de octubre.</p>
      </Tab>
      <Tab label="Documentos">
        <p className="text-sm text-zinc-700">RUT, cédula del representante legal y certificado de existencia.</p>
      </Tab>
      <Tab label="Historial">
        <p className="text-sm text-zinc-700">14 oct · Radicada. 16 oct · En revisión.</p>
      </Tab>
    </Tabs>
  );
}

/** Vista del componente. */
export function TabsPreview() {
  return <TabsDemo />;
}
