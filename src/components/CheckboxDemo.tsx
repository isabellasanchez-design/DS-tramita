import { Checkbox } from "@/components/ui/Checkbox";

const options = [
  { name: "cedula", label: "Copia de la cédula", defaultChecked: true },
  { name: "rut", label: "RUT actualizado", defaultChecked: false },
  { name: "camara", label: "Certificado de Cámara de Comercio", defaultChecked: false },
  { name: "poder", label: "Poder notariado (no aplica para este trámite)", disabled: true },
];

// Checkbox nativo con los estilos de Figma: se puede probar con mouse y teclado.
export function CheckboxDemo() {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 text-sm font-medium text-zinc-900">
        Documentos que vas a adjuntar
      </legend>
      {options.map(({ name, label, defaultChecked, disabled }) => (
        <Checkbox
          key={name}
          name={name}
          label={label}
          defaultChecked={defaultChecked}
          disabled={disabled}
        />
      ))}
    </fieldset>
  );
}
