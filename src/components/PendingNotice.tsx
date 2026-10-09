export function PendingNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-6">
      <h2 className="mb-2 font-semibold text-zinc-900">Contenido pendiente</h2>
      <p className="text-sm leading-relaxed text-zinc-600">{children}</p>
    </div>
  );
}
