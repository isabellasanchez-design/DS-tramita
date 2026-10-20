"use client";

import { useState } from "react";
import { InformationBar } from "@/components/ui/InformationBar";
import { Button } from "@/components/ui/Button";

const noop = () => {};

export function InformationBarSizes() {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-zinc-50 p-6">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">Desktop</span>
        <InformationBar onClose={noop}>Lorem ipsum dolor sit amet consectetur</InformationBar>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">Mobile (360px)</span>
        {/* El padding de móvil se activa por debajo de sm; aquí se fuerza para mostrarlo. */}
        <div className="w-[360px] max-w-full">
          <InformationBar onClose={noop} className="sm:px-4">
            Lorem ipsum dolor sit amet consectetur
          </InformationBar>
        </div>
      </div>
    </div>
  );
}

export function InformationBarDemo() {
  const [visible, setVisible] = useState(true);
  return visible ? (
    <InformationBar onClose={() => setVisible(false)}>
      El sábado 25 de octubre la plataforma no estará disponible de 6:00 a 10:00 a. m.
    </InformationBar>
  ) : (
    <Button variant="Outline" onClick={() => setVisible(true)}>
      Mostrar de nuevo
    </Button>
  );
}
