// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=1167-53979
// source=src/components/ui/SidebarMenu.tsx
// component=SidebarMenuItem
import figma from 'figma'
const instance = figma.selectedInstance

// Copia del set usada en la documentación de Figma.
// State (open/closed) lo define la SidebarMenu que contiene el ítem.
const current = instance.getEnum('Propiedad 1', { 'Select': true, 'default': false })
const label = instance.getString('Menu item text')
const icon = instance.getInstanceSwap('Icon')
const iconCode = icon && icon.type === 'INSTANCE' ? icon.executeTemplate().example : undefined

export default {
  example: figma.code`<SidebarMenuItem href="/ruta"${iconCode ? figma.code` icon={${iconCode}}` : ''}${current ? ' current' : ''}>
  ${label}
</SidebarMenuItem>`,
  imports: ['import { SidebarMenuItem } from "@/components/ui/SidebarMenu"'],
  id: 'sidebar-menu-item-documentacion',
  metadata: { nestable: true },
}
