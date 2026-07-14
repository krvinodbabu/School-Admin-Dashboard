import { useNavigate, useLocation } from 'react-router-dom'
import { ShieldAlert, ArrowLeft, Key } from 'lucide-react'
import { useAuth } from './AuthContext.jsx'

export default function AccessDenied() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  
  const requiredPermission = location.state?.requiredPermission || 'Unknown Permission'
  const attemptedPath = location.state?.from?.pathname || '/'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-secondary)', padding: '2rem' }}>
      <div className="card" style={{ maxWidth: '480px', width: '100%', padding: '3rem 2rem', textAlign: 'center' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-red-bg)', color: 'var(--color-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <ShieldAlert size={40} />
        </div>
        
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Access Denied</h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
          You do not have the necessary permissions to access this page. Please contact your system administrator if you believe this is an error.
        </p>

        <div style={{ background: 'var(--color-surface-3)', borderRadius: '12px', padding: '1.25rem', textAlign: 'left', marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Current Role</div>
          <div style={{ fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>{user?.role || 'Guest'}</span>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Required Permission</div>
          <div style={{ fontWeight: 600, fontFamily: 'monospace', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Key size={14} style={{ color: 'var(--color-amber)' }} /> {requiredPermission}
          </div>
          
          <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem', marginTop: '1rem' }}>Attempted Path</div>
          <div style={{ fontSize: '0.88rem', color: 'var(--color-red)' }}>{attemptedPath}</div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="btn btn-outline" onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={16} /> Go Back
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
