// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=1325-7812
// source=src/components/ui/EmailPreview.tsx
// component=EmailPreview
import figma from 'figma'
const instance = figma.selectedInstance

const from = instance.getString('From')
const to = instance.getString('To')
const subject = instance.getString('Email subject line')
const body = instance.getString('Email body')
const note = instance.getString('Traceability note')

export default {
  example: figma.code`<EmailPreview
  from="${from}"
  to="${to}"
  subject="${subject}"
  note="${note}"
>
  {\`${body}\`}
</EmailPreview>`,
  imports: ['import { EmailPreview } from "@/components/ui/EmailPreview"'],
  id: 'email-preview',
  metadata: { nestable: true },
}
