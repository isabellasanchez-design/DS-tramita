import {
  RectangleDashedIcon,
  ArrowsHorizontalIcon,
  TextAaIcon,
  ImageIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { ButtonSize, buttonSizeSpecs } from "@/data/buttons";

export function ButtonSizeSpecCard({
  size,
  spec,
}: {
  size: ButtonSize;
  spec: (typeof buttonSizeSpecs)[ButtonSize];
}) {
  const rows = [
    {
      icon: RectangleDashedIcon,
      label: "Padding",
      value: `${spec.paddingY}px / ${spec.paddingX}px`,
    },
    {
      icon: ArrowsHorizontalIcon,
      label: "Espacio interno",
      value: `${spec.gap}px`,
    },
    {
      icon: TextAaIcon,
      label: "Tipografía",
      value: spec.typography,
    },
    {
      icon: ImageIcon,
      label: "Ícono",
      value: `${spec.iconSize}x${spec.iconSize}px`,
    },
  ];

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="flex items-center justify-between gap-2 bg-[#e4e5f4] px-4 py-3">
        <span className="text-sm font-bold text-zinc-900">{size}</span>
        <span className="font-mono text-xs text-zinc-500">{spec.height}px alto</span>
      </div>
      <div className="divide-y divide-zinc-100">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-3 px-4 py-3">
            <row.icon className="size-4 shrink-0 text-zinc-400" weight="regular" />
            <span className="flex-1 text-sm text-zinc-600">{row.label}</span>
            <span className="text-right font-mono text-sm text-zinc-900">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
