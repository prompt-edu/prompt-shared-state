import type { RouteObject } from 'react-router-dom'
import type { Role } from '..'

export type ExtendedRouteObject = RouteObject & {
  requiredPermissions?: Role[]
}
