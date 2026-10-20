"use client";

import type { ReactNode } from "react";
import { ChipPreview } from "@/components/ChipPreview";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { RichTextEditor, type EditorVariable } from "@/components/ui/RichTextEditor";
import { Tag } from "@/components/ui/Tag";
import { chipStyles } from "@/data/chips";

export type ComposeEmailProps = {
  title?: string;
  /** Paso del proceso, p. ej. "Paso 2 de 3". */
  step?: string;
  /** Criterios con los que se eligieron los destinatarios (Chips). */
  criteria?: string[];
  /** Resumen de destinatarios, p. ej. "711 destinatarios". */
  recipients: string;
  onEditRecipients?: () => void;
  subject?: string;
  onSubjectChange?: (subject: string) => void;
  /** HTML inicial del contenido. */
  content?: string;
  onContentChange?: (html: string) => void;
  variables?: EditorVariable[];
  onSaveDraft?: () => void;
  onSend?: () => void;
  /** Mensaje de error del asunto, si aplica. */
  subjectError?: ReactNode;
};

// Compose Email del D.S. Tramita (03_Comunicaciones): formulario para redactar
// una comunicación masiva, hecho con Input, Tag, Button y el RichTextEditor.
// Los criterios se muestran con el estilo de Chip, pero son solo informativos.
export function ComposeEmail({
  title = "Redactar correo",
  step,
  criteria = [],
  recipients,
  onEditRecipients,
  subject,
  onSubjectChange,
  content,
  onContentChange,
  variables,
  onSaveDraft,
  onSend,
  subjectError,
}: ComposeEmailProps) {
  return (
    <section aria-label={title} className="flex flex-col gap-4 rounded-[16px] border border-[#d8d9de] bg-white p-6">
      <header className="flex items-baseline justify-between gap-4">
        <h2 className="text-sm font-bold leading-4 text-[#1b2159]">{title}</h2>
        {step ? <span className="text-xs leading-[14px] text-[#6b7094]">{step}</span> : null}
      </header>

      {criteria.length ? (
        <ul aria-label="Criterios de los destinatarios" className="flex flex-wrap gap-x-3 gap-y-2">
          {criteria.map((criterion) => (
            <li key={criterion}>
              <ChipPreview style={chipStyles.Default} label={criterion} showIcon={false} />
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex items-center gap-3">
        <Tag tagCase="Pending Info" type="Filled">
          {recipients}
        </Tag>
        {onEditRecipients ? (
          <Button variant="Link" onClick={onEditRecipients}>
            Editar
          </Button>
        ) : null}
      </div>

      <hr className="border-[#73748c]" />

      <Input
        label="Asunto del correo"
        required
        value={subject}
        onChange={(event) => onSubjectChange?.(event.target.value)}
        status={subjectError ? "error" : undefined}
        message={subjectError}
      />

      <RichTextEditor label="Contenido de la comunicación" required defaultValue={content} onChange={onContentChange} variables={variables} />

      <div className="flex flex-wrap gap-4">
        {onSaveDraft ? (
          <Button variant="Outline" onClick={onSaveDraft}>
            Guardar borrador
          </Button>
        ) : null}
        {onSend ? <Button onClick={onSend}>Confirmar y enviar</Button> : null}
      </div>
    </section>
  );
}
