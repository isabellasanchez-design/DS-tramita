// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=278-17362
// source=src/components/ui/SidebarMenu.tsx
// component=SidebarMenu
import figma from 'figma'
const instance = figma.selectedInstance

const open = instance.getEnum('State', { 'Open': true, 'Closed': false })
const text = (name: string) => {
  const layer = instance.findText(name)
  return layer && layer.type === 'TEXT' ? layer.textContent : ''
}
const name = text('Profile Name')
const email = text('Profile Email')

// Los ítems salen de sus propias plantillas. Las secciones de Figma no son
// componentes, así que van en un solo SidebarMenuSection de ejemplo.
const items = instance.findConnectedInstances((node) => /^sidebar-menu-item/.test(node.codeConnectId() ?? ''))
let itemsCode
for (const item of items) {
  const code = item.executeTemplate().example
  itemsCode = itemsCode ? figma.code`${itemsCode}
    ${code}` : code
}

export default {
  example: figma.code`<SidebarMenu${open ? '' : ' defaultOpen={false}'}${name ? ` profile={{ name: "${name}"${email ? `, email: "${email}"` : ''} }}` : ''}>
  <SidebarMenuSection label="Sección">
    ${itemsCode}
  </SidebarMenuSection>
</SidebarMenu>`,
  imports: ['import { SidebarMenu, SidebarMenuItem, SidebarMenuSection } from "@/components/ui/SidebarMenu"'],
  id: 'sidebar-menu',
  metadata: { nestable: false },
}
