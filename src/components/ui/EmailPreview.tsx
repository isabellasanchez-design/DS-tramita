import type { ReactNode } from "react";

export type EmailPreviewProps = {
  from: string;
  to: string;
  subject: string;
  /** Cuerpo del correo; respeta los saltos de línea. */
  children: ReactNode;
  /** Nota de trazabilidad al pie (Traceability note). */
  note?: ReactNode;
  className?: string;
};

// Email Preview del D.S. Tramita (03_Comunicaciones en Figma): cómo verá el
// correo quien lo recibe, antes de enviarlo.
export function EmailPreview({ from, to, subject, children, note, className = "" }: EmailPreviewProps) {
  return (
    <article aria-label={`Vista previa: ${subject}`} className={`flex flex-col ${className}`}>
      <header className="flex flex-col gap-2 border border-b-0 border-[#d8d9de] bg-[#e4e5f4] px-6 py-3">
        <dl className="flex flex-col gap-2 text-xs leading-[14px] text-[#484956]">
          <div className="flex gap-[17px]">
            <dt className="w-8 shrink-0">De</dt>
            <dd>{from}</dd>
          </div>
          <div className="flex gap-[17px]">
            <dt className="w-8 shrink-0">Para</dt>
            <dd>{to}</dd>
          </div>
        </dl>
        <h3 className="text-sm font-bold leading-4 text-[#2a32a2]">{subject}</h3>
      </header>
      <div className="flex flex-col gap-2.5 border border-[#d8d9de] bg-white px-6 py-8">
        <div className="whitespace-pre-line text-xs leading-[14px] text-[#484956]">{children}</div>
        {note ? (
          <>
            <hr className="border-[#73748c]" />
            <p className="text-xs leading-[14px] text-[#9496a8]">{note}</p>
          </>
        ) : null}
      </div>
    </article>
  );
}
