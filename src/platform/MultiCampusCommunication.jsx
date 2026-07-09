import { useState } from 'react'
import { ANNOUNCEMENTS } from '../tenant/tenantData.js'
import { useTenant } from '../context/TenantContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import { Megaphone, AlertTriangle, Send, Bell, Calendar, Sparkles } from 'lucide-react'

export default function MultiCampusCommunication() {
  const { activeGroup, activeInstitution, activeCampus } = useTenant()
  
  const [selectedScope, setSelectedScope] = useState('All')
  const [announcements, setAnnouncements] = useState(ANNOUNCEMENTS)

  // Create form states
  const [scope, setScope] = useState('Campus')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [type, setType] = useState('info')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleBroadcast = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!title.trim()) {
      setError('Announcement Title is required.')
      return
    }
    if (!body.trim()) {
      setError('Announcement Body is required.')
      return
    }

    const newAnn = {
      id: Date.now(),
      scope,
      title: title.trim(),
      body: body.trim(),
      date: new Date().toISOString().split('T')[0],
      type
    }

    setAnnouncements(prev => [newAnn, ...prev])
    setTitle('')
    setBody('')
    setSuccess('Announcement broadcasted successfully!')
  }

  const filtered = announcements.filter(a => {
    if (selectedScope === 'All') return true
    return a.scope === selectedScope
  })

  // Get Emergency Alerts
  const emergencyAlerts = announcements.filter(a => a.type === 'emergency')

  const getAlertBg = (t) => {
    if (t === 'emergency') return 'var(--color-red-bg)'
    if (t === 'warning') return 'var(--color-amber-bg)'
    if (t === 'success') return 'var(--color-green-bg)'
    return 'var(--color-surface-2)'
  }

  const getAlertText = (t) => {
    if (t === 'emergency') return 'var(--color-red-text)'
    if (t === 'warning') return 'var(--color-amber-text)'
    if (t === 'success') return 'var(--color-green-text)'
    return 'var(--color-text)'
  }

  const getAlertBorder = (t) => {
    if (t === 'emergency') return 'rgba(239, 68, 68, 0.2)'
    if (t === 'warning') return 'rgba(245, 158, 11, 0.2)'
    if (t === 'success') return 'rgba(34, 197, 94, 0.2)'
    return 'var(--color-border)'
  }

  return (
    <div className="page animate-fadeIn">
      <PageHeader
        title="Multi-Campus Communication"
        subtitle="Broadcast system-wide notices, announcements, and emergency notifications"
        eyebrow="Platform Services"
      />

      {/* Emergency Alerts banner */}
      {emergencyAlerts.map(alert => (
        <div 
          key={alert.id}
          style={{
            background: 'var(--color-red-bg)',
            color: 'var(--color-red-text)',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            marginBottom: '1.5rem',
            animation: 'pulse 2.5s infinite'
          }}
        >
          <AlertTriangle size={18} style={{ marginTop: '0.1rem', flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>CRITICAL BROADCAST: {alert.title}</div>
            <div style={{ fontSize: '0.8rem', marginTop: '0.2rem', lineHeight: '1.4' }}>{alert.body}</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.8, marginTop: '0.4rem' }}>Target: {alert.scope} · Date: {alert.date}</div>
          </div>
        </div>
      ))}

      <div className="settings-grid">
        {/* Broadcast Form Card */}
        <Card title="Broadcast Announcement" subtitle="Send dynamic notifications to targeted scopes">
          <form onSubmit={handleBroadcast} className="settings-form">
            {error && <div className="onboarding-error">{error}</div>}
            {success && <div className="onboarding-error" style={{ background: 'var(--color-green-bg)', color: 'var(--color-green-text)', borderColor: 'rgba(34, 197, 94, 0.2)' }}>{success}</div>}

            <label htmlFor="ann-scope">Target Scope</label>
            <select 
              id="ann-scope"
              value={scope} 
              onChange={(e) => setScope(e.target.value)}
              style={{ marginTop: '0.35rem', marginBottom: '0.75rem' }}
            >
              <option value="Entire Group">Entire Education Group ({activeGroup.name})</option>
              <option value="Institution">Institution only ({activeInstitution?.name})</option>
              <option value="Campus">Campus only ({activeCampus?.name})</option>
              <option value="Department">Department level</option>
            </select>

            <label htmlFor="ann-type">Broadcast Type/Priority</label>
            <select 
              id="ann-type"
              value={type} 
              onChange={(e) => setType(e.target.value)}
              style={{ marginTop: '0.35rem', marginBottom: '0.75rem' }}
            >
              <option value="info">Info (Standard Announcement)</option>
              <option value="success">Event / Success Milestone</option>
              <option value="warning">Warning / Alert</option>
              <option value="emergency">Emergency Broadcast (Urgent Red Banner)</option>
            </select>

            <label htmlFor="ann-title">Announcement Title</label>
            <input 
              type="text" 
              id="ann-title" 
              placeholder="e.g. Schedule for Sports Day"
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ marginTop: '0.35rem', marginBottom: '0.75rem' }}
            />

            <label htmlFor="ann-body">Content Body</label>
            <textarea 
              id="ann-body" 
              placeholder="Enter announcement details here..."
              rows={4}
              value={body}
              onChange={e => setBody(e.target.value)}
              style={{ 
                marginTop: '0.35rem', 
                marginBottom: '1rem',
                width: '100%',
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface-2)',
                color: 'var(--color-text)',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem'
              }}
            />

            <button type="submit" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Send size={15} /> Send Broadcast
            </button>
          </form>
        </Card>

        {/* Announcements Feed Card */}
        <Card title="Announcements Log Feed" subtitle="Historical logs filterable by scope">
          <div className="ap-inline-filters" style={{ padding: '0.45rem', display: 'flex', gap: '0.35rem', overflowX: 'auto', flexWrap: 'nowrap', border: 'none', background: 'transparent', marginBottom: '1rem' }}>
            {['All', 'Entire Group', 'Institution', 'Campus', 'Department'].map(sc => (
              <button
                key={sc}
                type="button"
                onClick={() => setSelectedScope(sc)}
                className={`ap-view-tab ${selectedScope === sc ? 'ap-view-tab--active' : ''}`}
                style={{ whiteSpace: 'nowrap', padding: '0.35rem 0.65rem' }}
              >
                {sc}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {filtered.length === 0 && (
              <div className="ap-empty" style={{ minHeight: '180px' }}>
                <Megaphone size={32} style={{ opacity: 0.2 }} />
                <p>No announcements found for this scope.</p>
              </div>
            )}
            {filtered.map(item => (
              <div 
                key={item.id}
                style={{
                  background: getAlertBg(item.type),
                  color: getAlertText(item.type),
                  border: `1px solid ${getAlertBorder(item.type)}`,
                  padding: '0.875rem 1rem',
                  borderRadius: 'var(--radius)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{item.title}</span>
                  <span className="badge" style={{ fontSize: '0.62rem' }}>{item.scope}</span>
                </div>
                <p style={{ fontSize: '0.78rem', margin: 0, opacity: 0.9, lineHeight: '1.4' }}>{item.body}</p>
                <span style={{ fontSize: '0.65rem', opacity: 0.6, marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <Calendar size={10} /> Published: {item.date}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
