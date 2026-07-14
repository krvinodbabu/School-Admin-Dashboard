import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'
import { Building2, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck, Mail, Lock, CheckCircle, ChevronRight } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const { login, DEMO_USERS } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Quick demo logins
  const quickLogins = DEMO_USERS.filter(u => ['Principal', 'Teacher', 'Parent', 'Finance Administrator'].includes(u.role))

  const handleLogin = async (e) => {
    e?.preventDefault()
    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }
    
    setError('')
    setIsLoading(true)
    
    try {
      const user = await login(email, password)
      
      // Role-based redirection
      const dest = location.state?.from?.pathname || getRoleRedirect(user.role)
      navigate(dest, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickLogin = (demoUser) => {
    setEmail(demoUser.email)
    setPassword(demoUser.password)
    // Wait for state to update, then login
    setTimeout(() => {
      login(demoUser.email, demoUser.password).then(user => {
        navigate(getRoleRedirect(user.role), { replace: true })
      })
    }, 100)
  }

  const getRoleRedirect = (role) => {
    switch(role) {
      case 'Principal':
      case 'System Administrator':
        return '/'
      case 'Teacher':
        return '/ai/teacher-copilot'
      case 'Parent':
        return '/ai/parent-copilot'
      case 'Finance Administrator':
        return '/fees'
      case 'HR Manager':
        return '/teachers'
      case 'Transport Manager':
        return '/campuses'
      case 'Support Agent':
      case 'Escalation Manager':
        return '/workflows/service-desk'
      case 'Student':
        return '/ai/learning-intelligence'
      default:
        return '/'
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--color-bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Orbs */}
      <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(40px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', zIndex: 0 }} />

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, padding: '2rem' }}>
        
        <div style={{ width: '100%', maxWidth: '440px' }}>
          
          {/* Logo Area */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={24} color="#fff" />
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', background: 'linear-gradient(90deg, var(--color-primary), var(--color-purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              EduOS
            </h1>
          </div>

          {/* Login Card */}
          <div className="card" style={{ padding: '2.5rem', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.3)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem' }}>Welcome Back</h2>
              <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Enter your credentials to access your workspace.</p>
            </div>

            {error && (
              <div style={{ background: 'var(--color-red-bg)', color: 'var(--color-red-text)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.88rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} /> {error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 500, marginBottom: '0.5rem' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}><Mail size={18} /></div>
                  <input 
                    type="email" 
                    className="ap-input" 
                    style={{ paddingLeft: '2.5rem' }} 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 500 }}>Password</label>
                  <a href="#" style={{ fontSize: '0.82rem', color: 'var(--color-primary)', textDecoration: 'none' }}>Forgot password?</a>
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}><Lock size={18} /></div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="ap-input" 
                    style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                <input type="checkbox" id="remember" style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px' }} />
                <label htmlFor="remember" style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>Remember me for 30 days</label>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0.75rem', fontSize: '1rem', background: 'var(--gradient-brand)', border: 'none' }}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 size={20} className="spinner" style={{ animation: 'spin 1s linear infinite' }} /> : 'Sign In'}
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '2rem 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
              <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Or continue with</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
            </div>

            {/* SSO Placeholders */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button className="btn btn-outline" style={{ display: 'flex', justifyContent: 'center', opacity: 0.6, cursor: 'not-allowed' }} title="Coming Soon">
                <span style={{ marginRight: '0.5rem' }}>G</span> Google
              </button>
              <button className="btn btn-outline" style={{ display: 'flex', justifyContent: 'center', opacity: 0.6, cursor: 'not-allowed' }} title="Coming Soon">
                <span style={{ marginRight: '0.5rem' }}>M</span> Microsoft 365
              </button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>SAML, LDAP & Biometric login coming soon.</span>
            </div>
          </div>
          
        </div>
      </div>

      {/* Demo Mode Right Panel */}
      <div style={{ display: 'none', '@media (min-width: 1024px)': { display: 'block' }, width: '480px', background: '#fff', borderLeft: '1px solid var(--color-border)', padding: '3rem', overflowY: 'auto', zIndex: 1 }} className="demo-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          <span className="badge" style={{ background: 'var(--color-amber-bg)', color: 'var(--color-amber-text)', padding: '0.5rem 1rem', fontSize: '0.88rem' }}>
            🧪 Demo Environment
          </span>
        </div>
        
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Quick Login</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Select a persona to explore EduOS from different perspectives.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {quickLogins.map((u, i) => (
            <div 
              key={i}
              onClick={() => handleQuickLogin(u)}
              style={{ padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.25rem' }}>Login as {u.role}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{u.email}</div>
              </div>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--color-surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text)' }}>
                <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inline styles for the demo panel media query logic */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 1024px) {
          .demo-panel { display: block !important; }
        }
      `}} />
    </div>
  )
}
