import { PaperclipIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { Tag } from "@/components/ui/Tag";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

const image = { src: "/examples/card-placeholder.png", alt: "" };

function sampleTags() {
  return ["Nuevo", "Virtual", "Gratis"].map((label) => (
    <Tag key={label} tagCase="Marca" size="S" iconLeft={false}>
      {label}
    </Tag>
  ));
}

export function CardSample({
  orientation = "vertical",
  disabled = false,
}: {
  orientation?: "vertical" | "horizontal";
  disabled?: boolean;
}) {
  return (
    <Card
      orientation={orientation}
      image={image}
      icon={<PaperclipIcon weight="regular" />}
      tags={sampleTags()}
      title="Registro de marca"
      href={disabled ? undefined : "#"}
      disabled={disabled}
      status={
        <Tag tagCase={disabled ? "Waiting" : "Success"}>{disabled ? "No disponible" : "Disponible"}</Tag>
      }
      action={<Button variant="Outline">Iniciar trámite</Button>}
    >
      Protege el nombre y el logo de tu empresa ante la Superintendencia de Industria y Comercio.
    </Card>
  );
}

export function IconButtonSizes() {
  return (
    <div className="flex items-end gap-6 rounded-xl bg-zinc-50 p-6">
      {(["Small", "Medium", "Large"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <IconButton icon={<PaperclipIcon weight="regular" />} size={size} />
          <span className="text-xs font-medium text-zinc-600">{size}</span>
        </div>
      ))}
    </div>
  );
}

export function TestimonialSample() {
  return (
    <TestimonialCard
      rating={3}
      title="Trámite rápido y sin filas"
      author={{ name: "Jane Doe", role: "Product designer", avatarSrc: "/examples/avatar.png" }}
    >
      Registré mi empresa en dos días sin ir a ninguna oficina. Todo el proceso fue claro.
    </TestimonialCard>
  );
}
