import type { ReactNode } from 'react'
import type { Role } from '..'

export interface SidebarMenuItemProps {
  goToPath: string
  icon: ReactNode
  title: string
  requiredPermissions?: Role[]
  subitems?: {
    goToPath: string
    title: string
    requiredPermissions?: Role[]
  }[]
}
