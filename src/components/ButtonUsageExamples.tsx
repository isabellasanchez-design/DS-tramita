import { PaperclipIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import type { ButtonType } from "@/data/buttons";

function IconCircle() {
  return (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#e4e5f4]">
      <PaperclipIcon className="size-3.5 text-[#2a32a2]" weight="regular" />
    </span>
  );
}

function CloseIcon() {
  return <XIcon className="absolute right-3 top-3 size-3 text-zinc-400" weight="bold" />;
}

function MockupFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center rounded-xl bg-[#fafafa] p-4">
      {children}
    </div>
  );
}

function PrimaryExample() {
  return (
    <MockupFrame>
      <div className="w-[200px] rounded-2xl bg-white p-3.5 shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
        <div className="mb-3 h-20 w-full rounded-lg bg-gradient-to-br from-[#c9ccee] to-[#23297b]" />
        <div className="mb-2.5">
          <IconCircle />
        </div>
        <div className="mb-2 flex flex-wrap gap-1">
          {["Contrato", "PDF", "2024"].map((label) => (
            <span
              key={label}
              className="rounded-full px-2 py-0.5 text-[9px] font-medium text-[#2a32a2]"
              style={{
                backgroundImage:
                  "linear-gradient(77deg, rgba(74,209,111,0.35) 0%, rgba(26,31,107,0.35) 92%)",
              }}
            >
              {label}
            </span>
          ))}
        </div>
        <p className="mb-1 text-[11px] font-bold text-[#2a32a2]">Adjuntar documento</p>
        <p className="mb-3 text-[9.5px] leading-snug text-[#5c5d70]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <button className="w-full rounded-[20px] bg-[#23297b] px-3 py-2 text-[10px] font-medium text-white">
          Seleccionar
        </button>
      </div>
    </MockupFrame>
  );
}

function SecondaryExample() {
  return (
    <MockupFrame>
      <div className="relative w-[210px] rounded-3xl bg-white p-3.5 shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
        <CloseIcon />
        <div className="mb-2 flex items-center gap-2">
          <IconCircle />
          <p
            className="text-[11px] font-bold text-[#2a32a2]"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Enviar trámite
          </p>
        </div>
        <p className="mb-3 text-[9.5px] leading-snug text-[#5c5d70]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <label className="mb-3 flex items-center gap-1.5 text-[9px] text-zinc-500">
          <span className="size-3 shrink-0 rounded border border-[#2a32a2]" />
          Acepto términos y condiciones
        </label>
        <div className="flex gap-1.5">
          <button className="flex-1 rounded-[20px] bg-[#c9ccee] px-3 py-1.5 text-[10px] font-medium text-[#2a32a2]">
            Cancelar
          </button>
          <button className="flex-1 rounded-[20px] bg-[#23297b] px-3 py-1.5 text-[10px] font-medium text-white">
            Enviar
          </button>
        </div>
      </div>
    </MockupFrame>
  );
}

function OutlineExample() {
  return (
    <MockupFrame>
      <div className="relative w-[210px] rounded-3xl bg-white p-3.5 text-center shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
        <CloseIcon />
        <div className="mb-2 flex flex-col items-center gap-1.5">
          <IconCircle />
          <p
            className="text-[11px] font-bold text-[#2a32a2]"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Enviar trámite
          </p>
        </div>
        <p className="mb-3 text-[9.5px] leading-snug text-[#5c5d70]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <label className="mb-3 flex items-center justify-center gap-1.5 text-[9px] text-zinc-500">
          <span className="size-3 shrink-0 rounded border border-[#2a32a2]" />
          Acepto términos y condiciones
        </label>
        <div className="flex flex-col gap-1.5">
          <button className="rounded-[20px] bg-[#23297b] px-3 py-1.5 text-[10px] font-medium text-white">
            Enviar
          </button>
          <button className="rounded-[20px] border border-[#2a32a2] bg-white px-3 py-1.5 text-[10px] font-medium text-[#2a32a2]">
            Cancelar
          </button>
        </div>
      </div>
    </MockupFrame>
  );
}

function TertiaryExample() {
  return (
    <MockupFrame>
      <div className="w-[210px] rounded-2xl bg-white p-3.5 shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
        {["contrato_final.pdf", "anexo_1.pdf"].map((file, i) => (
          <div
            key={file}
            className={`flex items-center justify-between py-2 ${i === 0 ? "border-b border-zinc-100" : ""}`}
          >
            <div>
              <p className="text-[10px] font-semibold text-zinc-800">Documento adjunto</p>
              <p className="text-[9px] text-zinc-500">{file}</p>
            </div>
            <button className="rounded-xl px-2.5 py-1 text-[9.5px] font-medium text-[#2a32a2]">
              Ver
            </button>
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}

function LinkExample() {
  return (
    <MockupFrame>
      <div className="w-[210px] rounded-2xl bg-white p-4 text-center shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
        <p
          className="mb-2 text-[11px] font-bold text-[#23297b]"
          style={{ fontFamily: "var(--font-sora)" }}
        >
          Solicitud enviada
        </p>
        <p className="mb-3 text-[9.5px] leading-snug text-[#5c5d70]">
          Te avisaremos por correo cuando tengamos una respuesta.
        </p>
        <button className="text-[10.5px] font-semibold text-[#2a32a2]">
          Volver al inicio
        </button>
      </div>
    </MockupFrame>
  );
}

function DestructiveExample() {
  return (
    <MockupFrame>
      <div className="w-[210px] rounded-3xl bg-white p-3.5 text-center shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
        <p className="mb-1 text-[11px] font-bold text-[#b4181d]">Eliminar cuenta</p>
        <p className="mb-3 text-[9.5px] leading-snug text-[#5c5d70]">
          Esta acción no se puede deshacer. Se eliminarán todos tus datos y trámites.
        </p>
        <div className="flex flex-col gap-1.5">
          <button className="rounded-[20px] bg-[#23297b] px-3 py-1.5 text-[10px] font-medium text-white">
            Cancelar
          </button>
          <button className="rounded-xl px-3 py-1.5 text-[10px] font-medium text-[#b4181d]">
            Eliminar cuenta
          </button>
        </div>
      </div>
    </MockupFrame>
  );
}

const examplesByType: Record<ButtonType, () => React.JSX.Element> = {
  Primary: PrimaryExample,
  Secondary: SecondaryExample,
  Tertiary: TertiaryExample,
  Link: LinkExample,
  Destructive: DestructiveExample,
  Outline: OutlineExample,
};

export function ButtonUsageExample({ type }: { type: ButtonType }) {
  const Example = examplesByType[type];
  return <Example />;
}
