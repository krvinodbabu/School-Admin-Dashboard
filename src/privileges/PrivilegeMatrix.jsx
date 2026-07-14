import { useState } from 'react'
import { PRIVILEGE_CATEGORIES, ROLE_PRIVILEGE_MAPPING } from './privilegesConfig.js'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import { Shield, Check, X, ShieldAlert } from 'lucide-react'

export default function PrivilegeMatrix() {
  const [selectedRole, setSelectedRole] = useState('Teacher')
  const roles = Object.keys(ROLE_PRIVILEGE_MAPPING)

  const hasPerm = (role, key) => {
    const perms = ROLE_PRIVILEGE_MAPPING[role] || []
    if (perms.includes('*')) return true
    return perms.includes(key)
  }

  return (
    <div className="page animate-fadeIn">
      <PageHeader 
        title="Enterprise Privilege Matrix" 
        subtitle="Review default permission allocations across key institutional operating groups using a CRUD model."
        eyebrow="Platform Security"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '1.5rem', alignItems: 'flex-start' }}>
        
        {/* Left selector */}
        <Card title="Institutional Groups">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {roles.map(r => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`tab ${selectedRole === r ? 'active' : ''}`}
                style={{ justifyContent: 'flex-start', padding: '0.75rem 1rem', fontSize: '0.88rem' }}
              >
                {r}
              </button>
            ))}
          </div>
        </Card>

        {/* Right Matrix Detail */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <Card title={`${selectedRole} Privileges Overview`} subtitle="CRUD Model Access breakdown for the active selection.">
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {PRIVILEGE_CATEGORIES.map((cat, i) => (
                <div key={i} style={{ border: '1px solid var(--color-border)', borderRadius: '12px', overflow: 'hidden' }}>
                  
                  {/* Category Header */}
                  <div style={{ background: 'var(--color-surface-3)', padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--color-border)', fontWeight: 600, fontSize: '0.88rem' }}>
                    {cat.module}
                  </div>

                  {/* Privileges List */}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {cat.privileges.map(priv => {
                      const enabled = hasPerm(selectedRole, priv.key)
                      return (
                        <div 
                          key={priv.key} 
                          style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            padding: '0.88rem 1.25rem', 
                            borderBottom: '1px solid var(--color-border)',
                            fontSize: '0.88rem'
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 500 }}>{priv.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>{priv.key}</div>
                          </div>

                          <div style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            background: enabled ? 'var(--color-green-bg)' : 'var(--color-red-bg)',
                            color: enabled ? 'var(--color-green-text)' : 'var(--color-red-text)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            {enabled ? <Check size={16} /> : <X size={16} />}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>

          </Card>
        </div>

      </div>
    </div>
  )
}
