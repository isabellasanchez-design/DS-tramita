"use client";

import { useState } from "react";
import { CaretCircleLeftIcon, CaretCircleRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { buttonTypeNames, type ButtonType } from "@/data/buttons";

// Botones reales con los estilos de Figma: se pueden probar con mouse y teclado.
// "Enviar" simula el estado Loading durante dos segundos.
export function ButtonDemo() {
  const [sending, setSending] = useState(false);

  function send() {
    setSending(true);
    setTimeout(() => setSending(false), 2000);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        {buttonTypeNames.map((type) => (
          <Button
            key={type}
            variant={type}
            iconLeft={<CaretCircleLeftIcon weight="regular" />}
            iconRight={<CaretCircleRightIcon weight="regular" />}
          >
            {type}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button loading={sending} onClick={send}>
          Enviar solicitud
        </Button>
        <Button variant="Outline" disabled>
          No disponible
        </Button>
      </div>
    </div>
  );
}

type LiveState = "Default" | "Hover" | "Focus" | "Disabled" | "Loading";

/** Un botón que muestra debajo el estado de Figma en el que está. */
function StateButton({ type, disabled }: { type: ButtonType; disabled: boolean }) {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);

  // Figma define un solo estado a la vez; si hay cursor y foco, se nombran los dos.
  const states: LiveState[] = disabled
    ? ["Disabled"]
    : loading
      ? ["Loading"]
      : [...(hover ? (["Hover"] as const) : []), ...(focus ? (["Focus"] as const) : [])];
  const current = states.length ? states.join(" + ") : "Default";

  return (
    <div className="flex flex-col items-center gap-3 rounded-lg bg-white p-4">
      <span className="text-xs font-medium text-zinc-500">{type}</span>
      <div className="flex h-[52px] items-center">
        <Button
          variant={type}
          disabled={disabled}
          loading={loading}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          // El foco de Figma es el de teclado (:focus-visible), igual que en el componente.
          onFocus={(event) => setFocus(event.currentTarget.matches(":focus-visible"))}
          onBlur={() => setFocus(false)}
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
          }}
        >
          Enviar
        </Button>
      </div>
      <span className="text-sm text-zinc-700">
        Estado: <strong className="font-semibold text-zinc-900">{current}</strong>
      </span>
    </div>
  );
}

// Los seis tipos con sus estados de Figma: Hover al pasar el cursor, Loading al
// hacer clic (dos segundos), Focus al llegar con Tab y Disabled con el switch.
export function ButtonStatesPlayground() {
  const [disabled, setDisabled] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <Switch label="Deshabilitar los botones" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {buttonTypeNames.map((type) => (
          <StateButton key={type} type={type} disabled={disabled} />
        ))}
      </div>
    </div>
  );
}
