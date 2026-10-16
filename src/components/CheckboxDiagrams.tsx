import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { CheckboxPreview } from "@/components/CheckboxPreview";
import { getCheckboxStyle } from "@/data/checkbox";

const MARKER_COLOR = "#c54600";
const PADDING_TINT = "rgba(0,125,0,0.25)";
const PADDING_SOLID = "#007d00";
const SCALE = 3;

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

function MeasureChip({ value, className = "" }: { value: string; className?: string }) {
  return (
    <span
      className={`absolute whitespace-nowrap rounded px-2 py-1 text-xs font-bold leading-none text-white ${className}`}
      style={{ backgroundColor: PADDING_SOLID }}
    >
      {value}
    </span>
  );
}

export function CheckboxAnatomyDiagram() {
  return (
    <div className="flex items-center justify-center rounded-lg bg-white px-24 pb-12 pt-20">
      <div className="relative" aria-hidden>
        <CheckboxPreview
          style={getCheckboxStyle("Selected", "Enabled")}
          label="Checkbox"
          scale={SCALE}
        />

        {/* Marker 1: área del Checkbox */}
        <div className="absolute right-full top-1/2 mr-2 flex -translate-y-1/2 items-center gap-2">
          <NumberBadge n={1} />
          <span className="h-px w-8" style={{ backgroundColor: MARKER_COLOR }} />
        </div>

        {/* Marker 2: Container */}
        <div className="absolute left-full top-1/2 -ml-3 flex -translate-y-1/2 items-center gap-2">
          <span className="h-px w-12" style={{ backgroundColor: MARKER_COLOR }} />
          <NumberBadge n={2} />
        </div>

        {/* Marker 3: Check */}
        <div className="absolute bottom-full left-1/2 -mb-2 flex -translate-x-1/2 flex-col items-center gap-1">
          <NumberBadge n={3} />
          <span className="h-8 w-px" style={{ backgroundColor: MARKER_COLOR }} />
        </div>
      </div>
    </div>
  );
}

export function CheckboxSpecsDiagram() {
  const pad = 3 * SCALE;
  return (
    <div className="flex items-center justify-center rounded-lg bg-[#f2f2f2] p-16" aria-hidden>
      <div
        className="relative"
        style={{
          padding: pad,
          backgroundColor: PADDING_TINT,
          boxShadow: "0 0 0 1px #0d69d4",
        }}
      >
        <MeasureChip value="3" className="left-1/2 -top-7 -translate-x-1/2" />
        <MeasureChip value="3" className="left-1/2 -bottom-7 -translate-x-1/2" />
        <MeasureChip value="3" className="top-1/2 -left-8 -translate-y-1/2" />
        <MeasureChip value="3" className="top-1/2 -right-8 -translate-y-1/2" />

        <span
          className="flex items-center justify-center bg-[#1c2057]"
          style={{ width: 18 * SCALE, height: 18 * SCALE, borderRadius: 4 * SCALE }}
        >
          <CheckIcon weight="regular" color="#ffffff" style={{ width: 16 * SCALE, height: 16 * SCALE }} />
        </span>
      </div>
    </div>
  );
}
