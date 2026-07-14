import { useState } from 'react'
import { useAuth } from '../auth/AuthContext.jsx'
import { useEduOS } from '../core/EduOSContext.jsx'
import { useRBAC } from '../rbac/RBACContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { User, Mail, Shield, Building, Clock, MapPin, Key, Palette, LogOut } from 'lucide-react'

export default function UserProfile() {
  const { user, logout } = useAuth()
  const { institution } = useEduOS()
  const { rolePermissions } = useRBAC()
  
  const [theme, setTheme] = useState('system') // system, light, dark

  if (!user) return null

  const activePerms = rolePermissions[user.role] || []

  return (
    <div className="page">
      <PageHeader 
        title="My Profile" 
        subtitle="Manage your identity, preferences, and session."
        eyebrow="Identity Management"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'flex-start' }}>
        
        {/* Main Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Identity Card */}
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: 'var(--gradient-brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700 }}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 style={{ margin: '0 0 0.25rem', fontSize: '1.5rem' }}>{user.name}</h2>
                <div style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Mail size={16} /> {user.email}
                </div>
                <span className="badge" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
                  {user.role}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: 'var(--color-surface-3)', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Building size={14} /> Department
                </div>
                <div style={{ fontWeight: 500 }}>{user.department || 'Not Assigned'}</div>
              </div>
              <div style={{ padding: '1rem', background: 'var(--color-surface-3)', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={14} /> Campus
                </div>
                <div style={{ fontWeight: 500 }}>{institution.campus}</div>
              </div>
            </div>
          </div>

          {/* Permissions Summary */}
          <div className="card" style={{ padding: '2rem' }}>
            <h3 style={{ margin: '0 0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={20} /> Permissions Summary
            </h3>
            
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Based on your role as <strong>{user.role}</strong>, you have the following access rights.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {activePerms.includes('*') ? (
                <div style={{ padding: '0.75rem 1rem', background: 'var(--color-green-bg)', color: 'var(--color-green-text)', borderRadius: '8px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
                  <Key size={16} /> Global Administrator Access (All Permissions)
                </div>
              ) : activePerms.length > 0 ? (
                activePerms.map(perm => (
                  <span key={perm} className="badge" style={{ background: 'var(--color-surface-3)', padding: '0.5rem 0.75rem', fontSize: '0.82rem', fontFamily: 'monospace' }}>
                    {perm}
                  </span>
                ))
              ) : (
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>No special permissions assigned.</div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1.25rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Palette size={16} /> Theme Preferences
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['system', 'light', 'dark'].map(t => (
                <button 
                  key={t}
                  className={`btn ${theme === t ? 'btn-primary' : 'btn-outline'}`}
                  style={{ justifyContent: 'flex-start', textTransform: 'capitalize' }}
                  onClick={() => setTheme(t)}
                >
                  {t} Theme
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1.25rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} /> Session Info
            </h3>
            <div style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
              Last login:<br/>
              <strong style={{ color: 'var(--color-text)' }}>{new Date(user.lastLogin).toLocaleString()}</strong>
            </div>

            <button 
              className="btn"
              style={{ width: '100%', background: 'var(--color-red-bg)', color: 'var(--color-red)', border: 'none', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}
              onClick={() => logout()}
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
