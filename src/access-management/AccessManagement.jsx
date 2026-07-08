import { useState } from 'react'
import { useRBAC } from '../rbac/RBACContext.jsx'
import { useEduOS } from '../core/EduOSContext.jsx'
import { PERMISSIONS_LIST, PERMISSIONS_BY_MODULE } from '../permissions/permissions.js'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import { Shield, Plus, Copy, Check, Eye, HelpCircle } from 'lucide-react'

export default function AccessManagement() {
  const { rolePermissions, updateRolePermissions, createCustomRole, cloneRole } = useRBAC()
  const { currentRole } = useEduOS()

  const [selectedRole, setSelectedRole] = useState('Principal')
  const [newRoleName, setNewRoleName] = useState('')
  const [cloneSourceName, setCloneSourceName] = useState('Teacher')
  const [cloneTargetName, setCloneTargetName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const roles = Object.keys(rolePermissions)

  const handleCreateRole = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!newRoleName.trim()) {
      setError('Role name cannot be empty')
      return
    }
    try {
      createCustomRole(newRoleName.trim(), '')
      setSelectedRole(newRoleName.trim())
      setNewRoleName('')
      setSuccess(`Custom role "${newRoleName.trim()}" created successfully!`)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleCloneRole = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!cloneTargetName.trim()) {
      setError('New cloned role name cannot be empty')
      return
    }
    try {
      cloneRole(cloneSourceName, cloneTargetName.trim())
      setSelectedRole(cloneTargetName.trim())
      setCloneTargetName('')
      setSuccess(`Role "${cloneSourceName}" cloned to "${cloneTargetName.trim()}" successfully!`)
    } catch (err) {
      setError(err.message)
    }
  }

  const handleTogglePermission = (permissionKey) => {
    if (selectedRole === 'Principal') return // Principal permissions are wildcard * and cannot be customized

    const activePerms = rolePermissions[selectedRole] || []
    let updatedPerms
    if (activePerms.includes(permissionKey)) {
      updatedPerms = activePerms.filter(k => k !== permissionKey)
    } else {
      updatedPerms = [...activePerms, permissionKey]
    }
    updateRolePermissions(selectedRole, updatedPerms)
  }

  return (
    <div className="page animate-fadeIn">
      <PageHeader 
        title="Access Control Matrix" 
        subtitle="Manage institution-specific roles, permissions hierarchy, and configurations" 
        eyebrow="Platform Security"
      />

      {/* Summary message */}
      {(error || success) && (
        <div style={{
          background: error ? 'var(--color-red-bg)' : 'var(--color-green-bg)',
          color: error ? 'var(--color-red-text)' : 'var(--color-green-text)',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius)',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1.25rem',
          border: error ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(34, 197, 94, 0.2)'
        }}>
          {error || success}
        </div>
      )}

      <div className="settings-grid">
        {/* Sidebar Selector Card */}
        <Card title="Active System Roles" subtitle="Select a role to view or customize its access permissions">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '420px', overflowY: 'auto', paddingRight: '0.25rem' }}>
            {roles.map(role => (
              <button
                type="button"
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`onboarding-type-btn ${selectedRole === role ? 'onboarding-type-btn--active' : ''}`}
                style={{ 
                  width: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '0.55rem 0.75rem' 
                }}
              >
                <span>{role}</span>
                {role === 'Principal' && (
                  <span className="badge" style={{ background: 'var(--color-brand-bg)', color: 'var(--color-brand)', fontSize: '0.65rem' }}>Super Admin</span>
                )}
                {!['Principal', 'School Admin', 'Teacher', 'Parent', 'Student', 'Finance', 'HR', 'Transport', 'Admissions', 'Event Management', 'Sports Department', 'Housekeeping', 'Escalation Team', 'Marketing', 'Software Support'].includes(role) && (
                  <span className="badge" style={{ background: 'var(--color-amber-bg)', color: 'var(--color-amber-text)', fontSize: '0.65rem' }}>Custom</span>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Console Forms Card */}
        <Card title="Create & Clone Roles" subtitle="Extend EduOS using dynamic roles definition logic">
          {/* Create custom role */}
          <form onSubmit={handleCreateRole} className="settings-form" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem' }}>
            <label htmlFor="new-role">
              Custom Role Name
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
                <input 
                  type="text" 
                  id="new-role"
                  placeholder="e.g. Examination Controller" 
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                />
                <button type="submit" className="btn btn--primary" style={{ padding: '0 1rem' }}>
                  <Plus size={16} /> Create
                </button>
              </div>
            </label>
          </form>

          {/* Clone existing role */}
          <form onSubmit={handleCloneRole} className="settings-form">
            <label htmlFor="clone-source">Clone Source Role</label>
            <select 
              id="clone-source"
              value={cloneSourceName} 
              onChange={(e) => setCloneSourceName(e.target.value)}
              style={{ marginTop: '0.35rem', marginBottom: '0.75rem' }}
            >
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>

            <label htmlFor="clone-target">
              New Cloned Role Name
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
                <input 
                  type="text" 
                  id="clone-target"
                  placeholder="e.g. Vice Principal" 
                  value={cloneTargetName}
                  onChange={(e) => setCloneTargetName(e.target.value)}
                />
                <button type="submit" className="btn btn--secondary" style={{ padding: '0 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Copy size={14} /> Clone
                </button>
              </div>
            </label>
          </form>
        </Card>
      </div>

      {/* Permissions Matrix Table */}
      <div className="card" style={{ marginTop: '1.5rem', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
          <h3 className="card__title" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={18} color="var(--color-brand)" />
            Permissions Matrix for: <span className="role-placeholders__role-badge">{selectedRole}</span>
          </h3>
          <p className="card__subtitle">
            {selectedRole === 'Principal' 
              ? 'Super Admin role contains wildcard (*) permissions and cannot be modified.' 
              : 'Configure granular permission sets by checking/unchecking nodes.'}
          </p>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Module Subsystem</th>
                <th>Granular Permission Node</th>
                <th>Permission Key</th>
                <th style={{ textAlign: 'center', width: '120px' }}>Access Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(PERMISSIONS_BY_MODULE).map(([moduleName, permList]) => (
                <optgroup key={moduleName} label={moduleName}>
                  {permList.map((perm) => {
                    const isGranted = selectedRole === 'Principal' || (rolePermissions[selectedRole] || []).includes(perm.key)
                    return (
                      <tr key={perm.key}>
                        <td style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>{moduleName}</td>
                        <td><strong>{perm.label}</strong></td>
                        <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--color-text-subtle)' }}>{perm.key}</td>
                        <td style={{ textAlign: 'center' }}>
                          <input 
                            type="checkbox"
                            checked={isGranted}
                            disabled={selectedRole === 'Principal'}
                            onChange={() => handleTogglePermission(perm.key)}
                            style={{ 
                              width: '18px', 
                              height: '18px', 
                              cursor: selectedRole === 'Principal' ? 'not-allowed' : 'pointer',
                              accentColor: 'var(--color-brand)'
                            }}
                            title={selectedRole === 'Principal' ? 'Principal role permissions cannot be edited' : `Toggle ${perm.label}`}
                          />
                        </td>
                      </tr>
                    )
                  })}
                </optgroup>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
