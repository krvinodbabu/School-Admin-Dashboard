import { useRBAC } from '../rbac/RBACContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import { Clock, User, ShieldAlert, CheckCircle2, Activity, Info } from 'lucide-react'

export default function AuditLogs() {
  const { auditLogs } = useRBAC()

  const formatTimestamp = (isoStr) => {
    try {
      const d = new Date(isoStr)
      return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' · ' + d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    } catch {
      return isoStr
    }
  }

  return (
    <div className="page animate-fadeIn">
      <PageHeader 
        title="Audit Trail Log" 
        subtitle="Chronological trail of permission changes, role operations, and system alerts" 
        eyebrow="Platform Security"
      />

      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="ap-qb-stat" style={{ flex: 1, minWidth: '180px' }}>
          <span className="ap-qb-stat__value" style={{ color: 'var(--color-brand)' }}>{auditLogs.length}</span>
          <span className="ap-qb-stat__label">Total Recorded Logs</span>
        </div>
        <div className="ap-qb-stat" style={{ flex: 1, minWidth: '180px' }}>
          <span className="ap-qb-stat__value" style={{ color: 'var(--color-green)' }}>
            {auditLogs.filter(l => l.result === 'Success').length}
          </span>
          <span className="ap-qb-stat__label">Success Actions</span>
        </div>
        <div className="ap-qb-stat" style={{ flex: 1, minWidth: '180px' }}>
          <span className="ap-qb-stat__value" style={{ color: 'var(--color-red)' }}>
            {auditLogs.filter(l => l.result !== 'Success').length}
          </span>
          <span className="ap-qb-stat__label">Failed Attempts</span>
        </div>
      </div>

      <Card title="Security & Operation Audit Log" subtitle="Track user actions, context changes, and security authorization logs">
        <div className="ap-timeline" style={{ marginTop: '1rem' }}>
          {auditLogs.length === 0 && (
            <div className="ap-empty">
              <Info size={32} style={{ opacity: 0.2 }} />
              <p>Audit logs are currently empty.</p>
            </div>
          )}
          {auditLogs.map((log, idx) => (
            <div key={log.id} className="ap-timeline__item">
              <div className="ap-timeline__connector">
                <div className="ap-timeline__icon" style={{
                  background: log.result === 'Success' ? 'var(--color-green-bg)' : 'var(--color-red-bg)',
                  borderColor: log.result === 'Success' ? 'var(--color-green)' : 'var(--color-red)',
                  color: log.result === 'Success' ? 'var(--color-green-text)' : 'var(--color-red-text)'
                }}>
                  {log.result === 'Success' ? <CheckCircle2 size={14} /> : <ShieldAlert size={14} />}
                </div>
                {idx < auditLogs.length - 1 && <div className="ap-timeline__line" />}
              </div>
              <div className="ap-timeline__content" style={{ background: 'var(--color-surface-2)', padding: '0.875rem 1.25rem', borderRadius: 'var(--radius)', border: '1px solid var(--color-border)', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text)' }}>
                    {log.action}
                  </span>
                  <span className={`badge ${log.result === 'Success' ? 'status-paid' : 'status-overdue'}`}>
                    {log.result}
                  </span>
                </div>
                
                <div className="ap-timeline__dates" style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <User size={12} /> Persona: <strong>{log.user}</strong>
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Activity size={12} /> Module: <strong>{log.module}</strong>
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={12} /> {formatTimestamp(log.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
