"use client";

import { useState } from "react";
import { CaretCircleLeftIcon, CaretCircleRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { buttonTypeNames } from "@/data/buttons";

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
