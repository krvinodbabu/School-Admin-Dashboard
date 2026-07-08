import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import { useEduOS } from '../core/EduOSContext.jsx'
import { Settings, Check, Sparkles } from 'lucide-react'

export default function SettingsPage() {
  const { institution, updateInstitution, modules, toggleModule } = useEduOS()
  const [name, setName] = useState(institution.name)
  const [campus, setCampus] = useState(institution.campus)
  const [academicYear, setAcademicYear] = useState(institution.academicYear)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    updateInstitution({ name, campus, academicYear })
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="page animate-fadeIn">
      <PageHeader 
        title="Settings" 
        subtitle="Configure school profile, academic year and dynamic system modules" 
      />

      <div className="settings-grid">
        {/* Profile Card */}
        <Card title="Institution Profile" subtitle="Configure organization properties & details">
          <form className="settings-form" onSubmit={handleProfileSubmit}>
            {saveSuccess && (
              <div style={{
                background: 'var(--color-green-bg)',
                color: 'var(--color-green-text)',
                padding: '0.625rem 0.875rem',
                borderRadius: 'var(--radius)',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                marginBottom: '1rem'
              }}>
                <Check size={14} /> Profile updated successfully!
              </div>
            )}
            <label htmlFor="set-type">
              Institution Type
              <input 
                type="text" 
                id="set-type"
                value={institution.type} 
                disabled 
                style={{ opacity: 0.6, cursor: 'not-allowed' }} 
              />
            </label>
            <label htmlFor="set-name">
              Institution Name
              <input 
                type="text" 
                id="set-name"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
            </label>
            <label htmlFor="set-campus">
              Campus / Branch
              <input 
                type="text" 
                id="set-campus"
                value={campus} 
                onChange={(e) => setCampus(e.target.value)} 
              />
            </label>
            <label htmlFor="set-year">
              Academic Year
              <select 
                id="set-year"
                value={academicYear} 
                onChange={(e) => setAcademicYear(e.target.value)}
              >
                <option value="2025-26">2025–26</option>
                <option value="2026-27">2026–27</option>
                <option value="2027-28">2027–28</option>
              </select>
            </label>
            <button type="submit" className="btn btn--primary">Save Changes</button>
          </form>
        </Card>

        {/* Modules Config Card */}
        <Card title="EduOS Module Configuration" subtitle="Enable or disable modular sub-systems in real-time">
          <div className="settings-modules-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', lineHeight: '1.4' }}>
              Toggling these modules will immediately dynamically generate/update sidebar navigation routes and platform layout visibility.
            </p>
            {modules.map((m) => (
              <label 
                key={m.name} 
                className="checkbox-label"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.625rem 0.875rem',
                  background: 'var(--color-surface-2)',
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                  border: '1px solid var(--color-border)',
                  transition: 'all var(--transition-base)'
                }}
              >
                <input 
                  type="checkbox" 
                  checked={m.enabled} 
                  onChange={() => toggleModule(m.name)} 
                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text)' }}>{m.label}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Identifier: {m.name}</span>
                </div>
              </label>
            ))}
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card title="System Settings & Safety" subtitle="System notifications, API logs and security settings">
          <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked /> Email notifications for billing alerts
            </label>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked /> Active SMS delivery gateway
            </label>
            <label className="checkbox-label">
              <input type="checkbox" /> Debug API log tracer
            </label>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked /> Automated weekly analytics backups
            </label>
            <button type="submit" className="btn btn--primary">Save System Settings</button>
          </form>
        </Card>
      </div>
    </div>
  )
}
