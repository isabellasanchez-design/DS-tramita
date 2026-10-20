import { CheckIcon } from "@phosphor-icons/react/dist/ssr";

export type StepperProps = {
  /** Nombres de los pasos (Step name en Figma). */
  steps: string[];
  /** Índice del paso actual, empezando en 0. Los anteriores quedan completados. */
  current: number;
  /** Nombre de la lista; por defecto "Progreso del trámite". */
  "aria-label"?: string;
  className?: string;
};

// Colores de Figma (03_Stepper › Stepper Item). "Active" en Figma es un paso
// pendiente; "Current", el actual; "Completed", uno terminado.
const styles = {
  completed: { line: "bg-[#28a44b]", circle: "bg-[#28a44b] text-white", label: "font-normal text-[#12331b]" },
  current: { line: "bg-[#23297b]", circle: "bg-[#23297b] text-white", label: "font-bold text-[#1c2057]" },
  pending: { line: "bg-[#e4e5f4]", circle: "bg-[#e4e5f4] text-[#5c5d70]", label: "font-normal text-[#5c5d70]" },
};

// Stepper del D.S. Tramita: una lista ordenada de pasos con el actual marcado
// con aria-current="step". Cada paso se reparte el ancho disponible.
export function Stepper({ steps, current, "aria-label": ariaLabel = "Progreso del trámite", className = "" }: StepperProps) {
  return (
    <ol aria-label={ariaLabel} className={`flex w-full ${className}`}>
      {steps.map((step, i) => {
        const state = i < current ? "completed" : i === current ? "current" : "pending";
        const s = styles[state];
        return (
          <li key={step} aria-current={state === "current" ? "step" : undefined} className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center">
              {/* Las líneas de los extremos no se ven, pero ocupan su lugar para centrar el círculo. */}
              <span aria-hidden className={`h-0.5 flex-1 ${i === 0 ? "invisible" : s.line}`} />
              <span
                aria-hidden
                className={`flex size-[34px] shrink-0 items-center justify-center rounded-full text-xs font-bold leading-[14px] ${s.circle}`}
              >
                {state === "completed" ? <CheckIcon weight="regular" className="size-5" /> : i + 1}
              </span>
              <span aria-hidden className={`h-0.5 flex-1 ${i === steps.length - 1 ? "invisible" : s.line}`} />
            </div>
            <span className={`px-1 text-center text-xs leading-[14px] ${s.label}`}>
              <span className="sr-only">
                Paso {i + 1} de {steps.length}
                {state === "completed" ? ", completado" : state === "current" ? ", actual" : ""}:{" "}
              </span>
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
