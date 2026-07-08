import { useEduOS } from '../core/EduOSContext.jsx'

/**
 * Reusable role persona guard.
 * Hides children completely if the active role doesn't match the required role.
 */
export default function RoleGuard({ role, children }) {
  const { currentRole } = useEduOS()

  if (currentRole !== role) {
    return null
  }

  return <>{children}</>
}
