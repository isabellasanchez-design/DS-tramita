import { CaretCircleLeftIcon, CaretCircleRightIcon } from "@phosphor-icons/react/dist/ssr";
import { getButtonStyle, buttonSizeSpecs, type ButtonSize } from "@/data/buttons";

export function ButtonSizePreview({ size }: { size: ButtonSize }) {
  const style = getButtonStyle("Primary", "Default");
  const { paddingY, paddingX, gap, fontSize, iconSize } = buttonSizeSpecs[size];

  return (
    <div
      className="inline-flex items-center justify-center whitespace-nowrap"
      style={{
        backgroundColor: style.bg,
        color: style.text,
        borderRadius: style.radius,
        paddingInline: paddingX,
        paddingBlock: paddingY,
        gap,
        fontSize,
      }}
    >
      <CaretCircleLeftIcon style={{ width: iconSize, height: iconSize }} weight="regular" />
      <span>Label</span>
      <CaretCircleRightIcon style={{ width: iconSize, height: iconSize }} weight="regular" />
    </div>
  );
}
