"use client";

import { useEffect, useId, useRef, useState, type DragEvent, type ReactNode } from "react";
import { ArrowsCounterClockwiseIcon, EyeIcon, FileTextIcon, TrashIcon } from "@phosphor-icons/react/dist/ssr";
import { Tooltip } from "@/components/ui/Tooltip";

/** Estado en Figma: Default, Progress bar, Loaded, Review, Charged, Error. */
export type UploaderStatus = "empty" | "uploading" | "loaded" | "review" | "charged" | "error";

export type UploaderProps = {
  status: UploaderStatus;
  /** Nombre accesible de la zona de carga, p. ej. "RUT actualizado". */
  label: string;
  /** Texto principal de la zona vacía. */
  prompt?: string;
  /** Formatos y peso, bajo el texto principal. */
  formats?: string;
  maxSize?: string;
  /** Tipos aceptados por el input, p. ej. ".pdf,.jpg,.png". */
  accept?: string;
  multiple?: boolean;
  onSelect?: (files: FileList) => void;
  /** Nombre del documento cuando ya hay uno. */
  fileName?: string;
  /** Progreso de 0 a 100 en "uploading". */
  progress?: number;
  /** Línea bajo el nombre ("Cargado el 12/11/2025", "En revisión"…). */
  detail?: ReactNode;
  /** Descripción del error (Descripción en Figma). */
  error?: { title: string; description?: string };
  onView?: () => void;
  onReplace?: () => void;
  onDelete?: () => void;
  /** Quita el bloque de carga completo (Eliminar adjunto). */
  onRemove?: () => void;
  className?: string;
};

// Colores de Figma (03_Uploader) por estado: borde, caja del ícono e ícono.
const looks: Record<Exclude<UploaderStatus, "empty">, { border: string; box: string; icon: string; fill?: boolean }> = {
  uploading: { border: "#c5c1d1", box: "#e4e5f4", icon: "#2a32a2" },
  loaded: { border: "#c5c1d1", box: "#e4e5f4", icon: "#2a32a2", fill: true },
  review: { border: "#1e5cae", box: "#e2ebf6", icon: "#2a32a2" },
  charged: { border: "#28a44b", box: "#e4f4e8", icon: "#227c3c" },
  error: { border: "#bb7d11", box: "#f7efe0", icon: "#8d6011" },
};

const defaultDetail: Partial<Record<UploaderStatus, string>> = {
  loaded: "Documento cargado.",
  review: "En revisión",
};

/** Acción con ícono y tooltip (Accinoes de uploader en Figma). */
function Action({ label, icon, onClick }: { label: string; icon: ReactNode; onClick: () => void }) {
  return (
    <Tooltip content={label} tipPosition="rightBottom">
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className="relative z-10 inline-flex h-6 w-4 cursor-pointer items-center justify-center text-[#52565c] [&>svg]:size-4"
      >
        {icon}
      </button>
    </Tooltip>
  );
}

// Uploader del D.S. Tramita. Vacío es una zona para elegir o soltar archivos
// sobre un <input type="file"> nativo (enfocable y operable con teclado);
// con documento muestra su estado y las acciones que apliquen.
export function Uploader({
  status,
  label,
  prompt = "Seleccione un archivo o arrástrelo aquí",
  formats = "Archivos en formato JPG, PNG o PDF.",
  maxSize = "Peso máximo 10 MB",
  accept,
  multiple,
  onSelect,
  fileName,
  progress = 0,
  detail,
  error,
  onView,
  onReplace,
  onDelete,
  onRemove,
  className = "",
}: UploaderProps) {
  const id = useId();
  const [dragging, setDragging] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const hadFocus = useRef(false);

  // Si el foco estaba en una acción que desaparece (p. ej. Eliminar y el
  // Uploader vuelve a vacío), se pasa al campo para elegir archivo.
  useEffect(() => {
    if (hadFocus.current && !rootRef.current?.contains(document.activeElement)) {
      rootRef.current?.querySelector<HTMLElement>("input, button")?.focus();
    }
  }, [status]);
  const trackFocus = {
    onFocus: () => (hadFocus.current = true),
    onBlur: (event: React.FocusEvent) => {
      hadFocus.current = rootRef.current?.contains(event.relatedTarget as Node) ?? false;
    },
  };

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files.length) onSelect?.(event.dataTransfer.files);
  }

  const shell = `rounded-[8px] bg-white p-2 shadow-[4px_4px_4px_rgba(0,0,0,0.04)] ${className}`;

  if (status === "empty") {
    return (
      <div ref={rootRef} {...trackFocus} className={shell}>
        <div
          className={`flex items-center gap-4 rounded-[4px] border border-dashed border-[#c5c1d1] bg-[#f3f4f9] p-4 has-[:focus-visible]:[outline-style:auto] ${
            dragging ? "border-[#2a32a2]" : ""
          }`}
        >
          {/* El input está oculto: Figma no define foco, así que la zona muestra el
              anillo por defecto del navegador cuando el input tiene el foco. */}
          <label
            htmlFor={id}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className="flex min-w-0 flex-1 cursor-pointer items-center gap-3"
          >
            <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-[4px] bg-[#e4e5f4] p-1 text-[#2a32a2]">
              <FileTextIcon weight="duotone" className="size-8" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="text-base leading-[19px] text-[#202025]">{prompt}</span>
              <span className="text-xs leading-[14px] text-[#5c5d70]">{formats}</span>
              <span className="text-xs leading-[14px] text-[#5c5d70]">{maxSize}</span>
            </span>
            <input
              id={id}
              type="file"
              accept={accept}
              multiple={multiple}
              aria-label={`${label}: ${prompt}`}
              onChange={(event) => event.target.files?.length && onSelect?.(event.target.files)}
              className="sr-only"
            />
          </label>
          {onRemove ? <Action label="Eliminar adjunto" icon={<TrashIcon weight="regular" />} onClick={onRemove} /> : null}
        </div>
      </div>
    );
  }

  const look = looks[status];
  const line = detail ?? defaultDetail[status];

  return (
    <div ref={rootRef} {...trackFocus} className={shell}>
      <div className="flex flex-col gap-3 rounded-[4px] border bg-white p-4" style={{ borderColor: look.border }}>
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex size-8 shrink-0 items-center justify-center rounded-[4px]"
            style={{ backgroundColor: look.box, color: look.icon }}
          >
            <FileTextIcon weight={look.fill ? "fill" : "duotone"} className="size-6" />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="truncate text-sm font-bold leading-4 text-[#202025]">{fileName}</span>
            {status === "uploading" ? (
              <span
                role="progressbar"
                aria-label={`Cargando ${fileName ?? label}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                className="block h-1 w-full overflow-hidden rounded-full bg-[#dedce5]"
              >
                <span className="block h-full bg-[#2dd07a] transition-[width]" style={{ width: `${progress}%` }} />
              </span>
            ) : null}
            {/* role=status: el cambio de estado se anuncia sin mover el foco. */}
            <span role="status" className="text-xs leading-[14px] text-[#484956]">
              {status === "uploading" ? null : line}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {onView ? <Action label="Ver documento" icon={<EyeIcon weight="regular" />} onClick={onView} /> : null}
            {onReplace && status !== "uploading" && status !== "review" ? (
              <Action label="Reemplazar documento" icon={<ArrowsCounterClockwiseIcon weight="regular" />} onClick={onReplace} />
            ) : null}
            {onDelete && (status === "loaded" || status === "error") ? (
              <Action label="Eliminar documento" icon={<TrashIcon weight="regular" />} onClick={onDelete} />
            ) : null}
          </div>
        </div>
        {status === "error" && error ? (
          <div className="flex flex-col border-t border-[#d6c2fd] pt-3 text-xs leading-4 text-[#9a3412]">
            <span className="font-semibold">{error.title}</span>
            {error.description ? <span>{error.description}</span> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
