"use client";

import { useEffect, useState } from "react";
import { Uploader, type UploaderStatus } from "@/components/ui/Uploader";

const noop = () => {};

export function UploaderStates() {
  const common = { label: "RUT actualizado", fileName: "RUT_2025.pdf", onView: noop, onReplace: noop, onDelete: noop };
  const states: { status: UploaderStatus; extra?: object }[] = [
    { status: "empty", extra: { onRemove: noop } },
    { status: "uploading", extra: { progress: 50 } },
    { status: "loaded" },
    { status: "review" },
    { status: "charged", extra: { detail: "Cargado el 12/11/2025" } },
    {
      status: "error",
      extra: {
        detail: "Cargado el 12/11/2025",
        error: { title: "Documento rechazado", description: "El RUT debe tener una fecha de expedición menor a 30 días." },
      },
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      {states.map(({ status, extra }) => (
        <div key={status} className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">{status}</span>
          <Uploader status={status} {...common} {...extra} />
        </div>
      ))}
    </div>
  );
}

// Simula la subida: elige o arrastra un archivo y avanza hasta "loaded".
export function UploaderDemo() {
  const [file, setFile] = useState<string>();
  const [progress, setProgress] = useState(0);
  const status: UploaderStatus = !file ? "empty" : progress < 100 ? "uploading" : "loaded";

  useEffect(() => {
    if (!file || progress >= 100) return;
    const timer = setTimeout(() => setProgress((p) => Math.min(p + 20, 100)), 300);
    return () => clearTimeout(timer);
  }, [file, progress]);

  return (
    <Uploader
      label="RUT actualizado"
      status={status}
      fileName={file}
      progress={progress}
      onSelect={(files) => {
        setFile(files[0].name);
        setProgress(0);
      }}
      onView={noop}
      onReplace={() => setFile(undefined)}
      onDelete={() => setFile(undefined)}
    />
  );
}
