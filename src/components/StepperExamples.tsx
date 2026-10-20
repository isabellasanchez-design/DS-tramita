"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Stepper } from "@/components/ui/Stepper";

const steps = ["Tipo de solicitud", "Datos del solicitante", "Documentos", "Confirmación"];

export function StepperDemo() {
  const [current, setCurrent] = useState(1);
  return (
    <div className="flex flex-col gap-6">
      <Stepper steps={steps} current={current} />
      <div className="flex gap-3">
        <Button variant="Outline" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
          Anterior
        </Button>
        <Button disabled={current === steps.length} onClick={() => setCurrent((c) => c + 1)}>
          {current >= steps.length - 1 ? "Finalizar" : "Siguiente"}
        </Button>
      </div>
    </div>
  );
}
