import type { ColorScale } from "@/data/colors";
import { ColorSwatch } from "@/components/ColorSwatch";

export function ColorScaleRow({ scale }: { scale: ColorScale }) {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold text-zinc-900">{scale.name}</h3>
      <p className="mt-1 mb-3 text-sm text-zinc-600">{scale.description}</p>
      <div className="flex flex-wrap gap-2">
        {scale.steps.map((step) => (
          <ColorSwatch key={step.step} label={step.step} hex={step.hex} />
        ))}
      </div>
    </section>
  );
}
