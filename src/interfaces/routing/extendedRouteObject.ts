import { RouteObject } from 'react-router-dom'
import { Role } from '..'

export type ExtendedRouteObject = RouteObject & {
  requiredPermissions?: Role[]
}
