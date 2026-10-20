import { CheckboxDoc } from "@/components/CheckboxDoc";
import { RadioDoc } from "@/components/RadioDoc";
import { SwitchDoc } from "@/components/SwitchDoc";
import { ChipsDoc } from "@/components/ChipsDoc";
import { TagsDoc } from "@/components/TagsDoc";
import { TextboxDoc } from "@/components/TextboxDoc";
import { TooltipDoc } from "@/components/TooltipDoc";
import { AlertToastDoc } from "@/components/AlertToastDoc";
import { InformationBarDoc } from "@/components/InformationBarDoc";
import { PaginationDoc } from "@/components/PaginationDoc";
import { TabsDoc } from "@/components/TabsDoc";
import { CardDoc } from "@/components/CardDoc";
import { DropdownDoc } from "@/components/DropdownDoc";
import { MenuDoc } from "@/components/MenuDoc";
import { PopupDoc } from "@/components/PopupDoc";
import { StepperDoc } from "@/components/StepperDoc";
import type { ComponentDoc } from "@/data/components";

// Componentes con documentación completa (por slug de components.ts); el resto
// usa ComponentDetail. Lo usan /componentes/[slug] y /componentes/[slug]/[component].
export const detailedDocs = {
  checkbox: CheckboxDoc,
  "radio-button": RadioDoc,
  switch: SwitchDoc,
  chips: ChipsDoc,
  tags: TagsDoc,
  textbox: TextboxDoc,
  tooltip: TooltipDoc,
  "alert-toast": AlertToastDoc,
  "information-bar": InformationBarDoc,
  pagination: PaginationDoc,
  tabs: TabsDoc,
  card: CardDoc,
  dropdown: DropdownDoc,
  menu: MenuDoc,
  popup: PopupDoc,
  stepper: StepperDoc,
} as const;

type DocProps = { component: ComponentDoc; eyebrow: string; eyebrowHref: string; docPath: string };

/** Página completa del componente, o null si todavía usa ComponentDetail. */
export function renderDetailedDoc(props: DocProps) {
  const slug = props.component.slug;
  if (!(slug in detailedDocs)) return null;
  const Doc = detailedDocs[slug as keyof typeof detailedDocs];
  return <Doc {...props} />;
}
