// Uso en React de los componentes que se documentaron antes de tener componente.

export const checkboxReactUsage = `import { Checkbox } from "@/components/ui/Checkbox";

<fieldset>
  <legend>Documentos que vas a adjuntar</legend>
  <Checkbox name="rut" label="RUT actualizado" defaultChecked />
  <Checkbox name="poder" label="Poder notariado" disabled />
</fieldset>`;

export const radioReactUsage = `import { Radio } from "@/components/ui/Radio";

<fieldset>
  <legend>Tipo de persona</legend>
  <Radio name="persona" value="natural" label="Persona natural" defaultChecked />
  <Radio name="persona" value="juridica" label="Persona jurídica" />
</fieldset>`;

export const switchReactUsage = `import { Switch } from "@/components/ui/Switch";

<Switch name="notificaciones" label="Notificaciones por correo" defaultChecked />`;

export const chipReactUsage = `import { Chip } from "@/components/ui/Chip";

<fieldset>
  <legend>Filtrar trámites por estado</legend>
  <Chip name="estado" value="revision" label="En revisión" defaultChecked />
  <Chip name="estado" value="aprobado" label="Aprobado" icon={<CheckCircleIcon />} />
</fieldset>

// Selección única: comparten name y usan radio.
<Chip selection="single" name="orden" value="recientes" label="Más recientes" />`;

export const tagReactUsage = `import { Tag } from "@/components/ui/Tag";

<Tag tagCase="Success">Aprobado</Tag>
<Tag tagCase="Warning" type="Contrast" size="S">Pendiente</Tag>
<Tag tagCase="Error" type="Edge" iconLeft={false}>Rechazado</Tag>`;
