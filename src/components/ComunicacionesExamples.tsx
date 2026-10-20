"use client";

import { useState } from "react";
import { ComposeEmail } from "@/components/ui/ComposeEmail";
import { EmailPreview } from "@/components/ui/EmailPreview";

const initialBody =
  "Estimado(a) {{nombre_prestador}}<br><br>Le recordamos que el Registro Nacional de Turismo de su establecimiento vence en {{fecha_vencimiento}}. Para evitar la suspensión del registro, radique su renovación antes de esa fecha.";

export function ComunicacionesDemo() {
  const [subject, setSubject] = useState("Recordatorio: renueve su Registro Nacional de Turismo");
  const [html, setHtml] = useState(initialBody);
  const text = html
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<\/(p|div|li)>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replaceAll("{{nombre_prestador}}", "María Rojas,")
    .replaceAll("{{fecha_vencimiento}}", "marzo de 2027");

  return (
    <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
      <ComposeEmail
        step="Paso 2 de 3"
        criteria={["Tipo de trámite: Renovación", "Estado: Activo", "Actividad: Alojamiento turístico", "Vencimiento: Marzo 2027"]}
        recipients="711 destinatarios"
        onEditRecipients={() => {}}
        subject={subject}
        onSubjectChange={setSubject}
        subjectError={subject.trim() ? undefined : "Escribe el asunto del correo."}
        content={initialBody}
        onContentChange={setHtml}
        variables={[
          { label: "Prestador", token: "{{nombre_prestador}}" },
          { label: "Vencimiento", token: "{{fecha_vencimiento}}" },
        ]}
        onSaveDraft={() => {}}
        onSend={() => {}}
      />
      <EmailPreview
        from="rnt@mincomercio.gov.co"
        to="711 destinatarios"
        subject={subject || "(Sin asunto)"}
        note="Registro Nacional de Turismo · Este envío queda registrado en la trazabilidad del sistema"
      >
        {text}
      </EmailPreview>
    </div>
  );
}

/** Vista del componente. */
export function ComunicacionesPreview() {
  return <ComunicacionesDemo />;
}
