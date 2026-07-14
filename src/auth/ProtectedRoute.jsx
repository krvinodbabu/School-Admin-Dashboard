import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'
import { useRBAC } from '../rbac/RBACContext.jsx'

export default function ProtectedRoute({ permission }) {
  const { isAuthenticated, user } = useAuth()
  const { hasPermission } = useRBAC()
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to login but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If a specific permission is required, check it
  if (permission && !hasPermission(permission)) {
    return <Navigate to="/403" state={{ requiredPermission: permission, from: location }} replace />
  }

  return <Outlet />
}
