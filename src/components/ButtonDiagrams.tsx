import { CaretCircleLeftIcon, CaretCircleRightIcon } from "@phosphor-icons/react/dist/ssr";

const MARKER_COLOR = "#c54600";

function NumberBadge({ n }: { n: number }) {
  return (
    <span
      className="flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
      style={{ backgroundColor: MARKER_COLOR }}
    >
      {n}
    </span>
  );
}

export function ButtonAnatomyDiagram() {
  return (
    <div className="flex items-center justify-center overflow-visible rounded-lg bg-white px-24 py-16">
      <div className="relative inline-flex items-center gap-2 rounded-[20px] bg-[#23297b] px-4 py-3 text-white">
        {/* Marker 1: the button itself */}
        <div className="absolute right-full top-1/2 mr-3 flex -translate-y-1/2 items-center gap-2">
          <NumberBadge n={1} />
          <span className="h-px w-8" style={{ backgroundColor: MARKER_COLOR }} />
        </div>

        {/* Marker 2: left icon */}
        <div className="relative">
          <span className="absolute bottom-full left-1/2 mb-2 flex -translate-x-1/2 flex-col items-center gap-1">
            <NumberBadge n={2} />
            <span className="h-6 w-px" style={{ backgroundColor: MARKER_COLOR }} />
          </span>
          <CaretCircleLeftIcon className="size-5" weight="regular" />
        </div>

        {/* Marker 3: label */}
        <div className="relative">
          <span className="absolute bottom-full left-1/2 mb-2 flex -translate-x-1/2 flex-col items-center gap-1">
            <NumberBadge n={3} />
            <span className="h-6 w-px" style={{ backgroundColor: MARKER_COLOR }} />
          </span>
          <span className="text-base">Label</span>
        </div>

        {/* Marker 4: right icon */}
        <div className="relative">
          <span className="absolute bottom-full left-1/2 mb-2 flex -translate-x-1/2 flex-col items-center gap-1">
            <NumberBadge n={4} />
            <span className="h-6 w-px" style={{ backgroundColor: MARKER_COLOR }} />
          </span>
          <CaretCircleRightIcon className="size-5" weight="regular" />
        </div>
      </div>
    </div>
  );
}

const PADDING_TINT = "rgba(0,125,0,0.25)";
const PADDING_SOLID = "#007d00";
const SPACING_TINT = "rgba(197,70,0,0.25)";
const SPACING_SOLID = "#c54600";

function MeasureChip({
  value,
  color,
  className = "",
}: {
  value: string;
  color: string;
  className?: string;
}) {
  return (
    <span
      className={`absolute whitespace-nowrap rounded px-2 py-1 text-xs font-bold leading-none text-white ${className}`}
      style={{ backgroundColor: color }}
    >
      {value}
    </span>
  );
}

function GapMarker({ value }: { value: string }) {
  return (
    <span className="relative inline-block w-4 self-stretch">
      <MeasureChip
        value={value}
        color={SPACING_SOLID}
        className="left-1/2 -top-7 -translate-x-1/2"
      />
    </span>
  );
}

export function ButtonSpecsDiagram() {
  return (
    <div className="flex items-center justify-center rounded-lg bg-[#f2f2f2] p-14">
      <div
        className="relative rounded-[24px]"
        style={{ backgroundColor: PADDING_TINT, boxShadow: "0 0 0 1px #0d69d4" }}
      >
        <MeasureChip value="12" color={PADDING_SOLID} className="left-4 top-1" />
        <MeasureChip value="12" color={PADDING_SOLID} className="left-4 bottom-1" />
        <MeasureChip
          value="16"
          color={PADDING_SOLID}
          className="-left-4 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <MeasureChip
          value="16"
          color={PADDING_SOLID}
          className="-right-4 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        <div style={{ padding: "24px 32px" }}>
          <div
            className="flex items-center justify-center rounded-md text-[#2a2f6f]"
            style={{ backgroundColor: SPACING_TINT }}
          >
            <span className="flex items-center justify-center rounded bg-white/80 p-1.5">
              <CaretCircleLeftIcon className="size-7" weight="regular" />
            </span>
            <GapMarker value="8" />
            <span className="rounded bg-white/80 px-3 py-1.5 text-base font-medium">Label</span>
            <GapMarker value="8" />
            <span className="flex items-center justify-center rounded bg-white/80 p-1.5">
              <CaretCircleRightIcon className="size-7" weight="regular" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
