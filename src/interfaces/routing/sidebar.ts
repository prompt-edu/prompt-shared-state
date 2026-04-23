import { Role } from '..'
import { ReactNode } from 'react'

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
