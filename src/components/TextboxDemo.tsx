"use client";

import { useState, type FormEvent } from "react";
import { EnvelopeSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

// Formulario de ejemplo: valida al enviar y al salir del campo, nunca mientras se escribe.
export function TextboxDemo() {
  const [emailError, setEmailError] = useState<string>();
  const [sent, setSent] = useState(false);

  function validate(value: string) {
    const error = value.includes("@") ? undefined : "Escribe un correo con @, por ejemplo nombre@correo.com.";
    setEmailError(error);
    return error;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSent(!validate(String(form.get("correo") ?? "")));
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-5">
      <Input
        name="correo"
        type="email"
        label="Correo electrónico"
        required
        placeholder="nombre@correo.com"
        iconLeft={<EnvelopeSimpleIcon weight="regular" />}
        status={emailError ? "error" : sent ? "success" : undefined}
        message={emailError ?? (sent ? "Correo verificado." : "Te enviaremos la confirmación del trámite.")}
        onBlur={(event) => event.target.value && validate(event.target.value)}
      />
      <Select name="documento" label="Tipo de documento" placeholder="Selecciona una opción" defaultValue="" required>
        <option value="cc">Cédula de ciudadanía</option>
        <option value="ce">Cédula de extranjería</option>
        <option value="pas">Pasaporte</option>
      </Select>
      <Input name="nacimiento" type="date" label="Fecha de nacimiento" optional />
      <Input name="clave" type="password" label="Contraseña" hint="Mínimo 8 caracteres." />
      <div>
        <Button type="submit">Enviar</Button>
      </div>
    </form>
  );
}
