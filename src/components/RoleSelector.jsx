import { useEduOS } from '../core/EduOSContext.jsx'
import { ROLES } from '../config/eduOSConfig.js'
import { UserCheck } from 'lucide-react'

export default function RoleSelector() {
  const { currentRole, setCurrentRole } = useEduOS()

  return (
    <div className="role-selector">
      <UserCheck size={16} className="role-selector__icon" aria-hidden="true" />
      <select 
        value={currentRole} 
        onChange={(e) => setCurrentRole(e.target.value)}
        className="role-selector__select"
        aria-label="Switch User Persona / Role"
        title="Switch user persona to see role-specific dashboards"
      >
        {ROLES.map(role => (
          <option key={role.id} value={role.id}>
            {role.label}
          </option>
        ))}
      </select>
    </div>
  )
}
