import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext.jsx'
import { User, LogOut, ChevronDown, Settings } from 'lucide-react'

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

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

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="role-selector" ref={menuRef} style={{ position: 'relative' }}>
      <button 
        className="role-selector__btn" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '20px', padding: '0.25rem 0.75rem 0.25rem 0.25rem', cursor: 'pointer' }}
      >
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--gradient-brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
          {user.name.split(' ').map(n => n[0]).join('')}
        </div>
        <span style={{ fontSize: '0.88rem', fontWeight: 500, color: 'var(--color-text)' }}>{user.name}</span>
        <ChevronDown size={14} style={{ color: 'var(--color-text-muted)' }} />
      </button>

      {isOpen && (
        <div className="role-selector__dropdown" style={{ position: 'absolute', top: 'calc(100% + 0.5rem)', right: 0, width: '240px', background: 'var(--color-surface)', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', zIndex: 100, overflow: 'hidden' }}>
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{user.name}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{user.email}</div>
            <div className="badge" style={{ marginTop: '0.5rem', display: 'inline-block', background: 'var(--color-primary-light)', color: 'var(--color-primary)', fontSize: '0.72rem' }}>
              {user.role}
            </div>
          </div>
          
          <div style={{ padding: '0.5rem' }}>
            <button 
              className="role-selector__option"
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', borderRadius: '8px' }}
              onClick={() => { setIsOpen(false); navigate('/profile'); }}
            >
              <User size={16} /> <span style={{ fontSize: '0.88rem' }}>My Profile</span>
            </button>
            <button 
              className="role-selector__option"
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', borderRadius: '8px' }}
              onClick={() => { setIsOpen(false); navigate('/settings'); }}
            >
              <Settings size={16} /> <span style={{ fontSize: '0.88rem' }}>Settings</span>
            </button>
          </div>

          <div style={{ padding: '0.5rem', borderTop: '1px solid var(--color-border)' }}>
            <button 
              className="role-selector__option"
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', borderRadius: '8px', color: 'var(--color-red)' }}
              onClick={handleLogout}
            >
              <LogOut size={16} /> <span style={{ fontSize: '0.88rem' }}>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
