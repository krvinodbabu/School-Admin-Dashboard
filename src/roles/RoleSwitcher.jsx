import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../auth/AuthContext.jsx'
import { Shield, ChevronUp, ChevronDown, Check, UserPlus } from 'lucide-react'

export default function RoleSwitcher() {
  const { user, switchRole, DEMO_USERS } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (!user) return null

  // Get subset of roles that have demo configs
  const switcherRoles = [
    { role: 'Principal', label: 'Principal' },
    { role: 'Teacher', label: 'Teacher' },
    { role: 'Parent', label: 'Parent' },
    { role: 'Finance Administrator', label: 'Finance Team' },
    { role: 'HR Manager', label: 'HR Team' },
    { role: 'Transport Manager', label: 'Transport Team' },
    { role: 'Support Agent', label: 'Support Team' }
  ]

  const handleRoleSelect = (role) => {
    switchRole(role)
    setIsOpen(false)
  }

  return (
    <div 
      ref={menuRef} 
      style={{ 
        position: 'fixed', 
        bottom: '1.5rem', 
        left: '1.5rem', 
        zIndex: 9999, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start' 
      }}
    >
      
      {/* Selector Drawer */}
      {isOpen && (
        <div 
          style={{ 
            background: 'var(--color-surface)', 
            border: '1px solid var(--color-border)', 
            borderRadius: '16px', 
            padding: '1rem', 
            marginBottom: '0.75rem', 
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.15)',
            width: '240px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            animation: 'copilotSlideUp 0.25s ease'
          }}
        >
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.25rem', paddingLeft: '0.5rem' }}>
            Experience as Role
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', maxHeight: '280px', overflowY: 'auto' }}>
            {switcherRoles.map(item => {
              const active = user.role === item.role
              return (
                <button
                  key={item.role}
                  onClick={() => handleRoleSelect(item.role)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: active ? 'var(--color-primary-light)' : 'transparent',
                    color: active ? 'var(--color-primary)' : 'var(--color-text)',
                    cursor: 'pointer',
                    fontSize: '0.88rem',
                    fontWeight: active ? 600 : 500,
                    textAlign: 'left',
                    width: '100%',
                    transition: 'all 0.15s'
                  }}
                  onMouseOver={(e) => {
                    if (!active) e.currentTarget.style.background = 'var(--color-surface-3)'
                  }}
                  onMouseOut={(e) => {
                    if (!active) e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <span>{item.label}</span>
                  {active && <Check size={14} />}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.25rem',
          borderRadius: '30px',
          background: 'var(--gradient-brand)',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 24px -6px rgba(99,102,241,0.5)',
          fontWeight: 600,
          fontSize: '0.88rem',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Shield size={16} />
        <span>Experience as: {switcherRoles.find(r => r.role === user.role)?.label || user.role}</span>
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>

    </div>
  )
}
