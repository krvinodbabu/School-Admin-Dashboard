import { createContext, useContext, useState, useEffect } from 'react'
import { useEduOS } from '../core/EduOSContext.jsx'
import { DEFAULT_ROLE_MAPPINGS } from '../permissions/roles.js'

const RBACContext = createContext(null)

export function RBACProvider({ children }) {
  const { currentRole } = useEduOS()

  // Load custom + default role permissions from localStorage or defaults
  const [rolePermissions, setRolePermissions] = useState(() => {
    const saved = localStorage.getItem('eduos_role_permissions')
    return saved ? JSON.parse(saved) : DEFAULT_ROLE_MAPPINGS
  })

  // Load Audit Trail Logs from localStorage
  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('eduos_audit_logs')
    return saved ? JSON.parse(saved) : [
      { id: 1, timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), user: 'System', module: 'System Settings', action: 'EduOS Platform Bootstrap', result: 'Success' },
      { id: 2, timestamp: new Date(Date.now() - 3600000).toISOString(), user: 'Principal', module: 'Access Control', action: 'RBAC Engine Configured', result: 'Success' }
    ]
  })

  useEffect(() => {
    localStorage.setItem('eduos_role_permissions', JSON.stringify(rolePermissions))
  }, [rolePermissions])

  useEffect(() => {
    localStorage.setItem('eduos_audit_logs', JSON.stringify(auditLogs))
  }, [auditLogs])

  // Core authorization helper
  const hasPermission = (permissionKey) => {
    if (currentRole === 'Principal' || currentRole === 'Platform Super Admin' || currentRole === 'System Administrator') {
      return true
    }
    const activePerms = rolePermissions[currentRole] || []
    if (activePerms.includes('*')) {
      return true // Wildcard Principal access
    }
    if (permissionKey === 'reports.view') {
      return activePerms.some(p => p.startsWith('reports.'))
    }
    return activePerms.includes(permissionKey)
  }

  // Audit log logger
  const logAudit = (user, moduleName, action, result) => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      user: user || currentRole,
      module: moduleName,
      action,
      result: result || 'Success'
    }
    setAuditLogs(prev => [newLog, ...prev].slice(0, 50)) // Cap at last 50 logs
  }

  // Switched persona audit trigger
  useEffect(() => {
    logAudit('System', 'Access Control', `Switched active prototype persona to ${currentRole}`, 'Success')
  }, [currentRole])

  // Custom Roles & Permissions Management
  const createCustomRole = (roleName, baseRoleName = '') => {
    if (rolePermissions[roleName]) {
      throw new Error(`Role "${roleName}" already exists.`)
    }
    const basePermissions = baseRoleName ? (rolePermissions[baseRoleName] || []) : []
    setRolePermissions(prev => ({
      ...prev,
      [roleName]: [...basePermissions]
    }))
    logAudit(currentRole, 'Access Control', `Created custom role "${roleName}" clined from "${baseRoleName || 'None'}"`, 'Success')
  }

  const updateRolePermissions = (roleName, permissions) => {
    setRolePermissions(prev => ({
      ...prev,
      [roleName]: [...permissions]
    }))
    logAudit(currentRole, 'Access Control', `Modified permissions configuration for role "${roleName}"`, 'Success')
  }

  const cloneRole = (sourceRole, destinationRole) => {
    if (rolePermissions[destinationRole]) {
      throw new Error(`Target role "${destinationRole}" already exists.`)
    }
    setRolePermissions(prev => ({
      ...prev,
      [destinationRole]: [...(prev[sourceRole] || [])]
    }))
    logAudit(currentRole, 'Access Control', `Cloned role "${sourceRole}" into new role "${destinationRole}"`, 'Success')
  }

  return (
    <RBACContext.Provider value={{
      rolePermissions,
      auditLogs,
      hasPermission,
      logAudit,
      createCustomRole,
      updateRolePermissions,
      cloneRole
    }}>
      {children}
    </RBACContext.Provider>
  )
}

export function useRBAC() {
  const context = useContext(RBACContext)
  if (!context) {
    throw new Error('useRBAC must be used within an RBACProvider')
  }
  return context
}
