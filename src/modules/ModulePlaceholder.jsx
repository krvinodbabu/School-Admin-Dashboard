import PageHeader from '../components/PageHeader.jsx'
import { Sparkles, Construction, ChevronRight } from 'lucide-react'
import { useEduOS } from '../core/EduOSContext.jsx'

export default function ModulePlaceholder({ name }) {
  const { institution } = useEduOS()

  return (
    <div className="page animate-fadeIn">
      <PageHeader 
        title={`${name} Module`} 
        subtitle={`Configure and manage ${name.toLowerCase()} operations for ${institution.name}`}
        eyebrow="EduOS Core Platform"
      />

      <div className="card ap-empty" style={{ minHeight: '380px', padding: '3rem' }}>
        <div style={{
          background: 'var(--gradient-brand)',
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '1.5rem',
          animation: 'pulse 2s infinite'
        }} aria-hidden="true">
          <Construction size={32} />
        </div>

        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '800', 
          color: 'var(--color-text)',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
          margin: '0 0 0.5rem'
        }}>
          {name} Module Activated
        </h2>
        
        <p style={{ 
          fontSize: '0.9rem', 
          color: 'var(--color-text-muted)', 
          maxWidth: '460px', 
          lineHeight: '1.6',
          margin: '0 0 2rem'
        }}>
          This module is fully registered under the **{institution.type}** configuration for **{institution.name}** ({institution.campus}). Core workflows are initialized, and full operational panels will be loaded here.
        </p>

        <div className="ap-qb-stats" style={{ justifyContent: 'center' }}>
          <div className="ap-qb-stat">
            <span className="ap-qb-stat__value" style={{ color: 'var(--color-green-text)' }}>Active</span>
            <span className="ap-qb-stat__label">Module Status</span>
          </div>
          <div className="ap-qb-stat">
            <span className="ap-qb-stat__value">OS Foundation</span>
            <span className="ap-qb-stat__label">Engine Type</span>
          </div>
          <div className="ap-qb-stat">
            <span className="ap-qb-stat__value">{institution.academicYear}</span>
            <span className="ap-qb-stat__label">Academic Year</span>
          </div>
        </div>

        <div style={{
          marginTop: '2rem',
          fontSize: '0.8rem',
          color: 'var(--color-text-subtle)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem'
        }}>
          <Sparkles size={12} /> Dynamic configuration loaded via eduOSConfig.js
        </div>
      </div>
    </div>
  )
}
