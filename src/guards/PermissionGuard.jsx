import { useRBAC } from '../rbac/RBACContext.jsx'

/**
 * Reusable permission check guard.
 * Hides children completely if the active role lacks the specified permission.
 */
export default function PermissionGuard({ permission, children }) {
  const { hasPermission } = useRBAC()

  if (!hasPermission(permission)) {
    return null // Hides unauthorized elements instead of disabling to keep UI premium & clean
  }

  return <>{children}</>
}
