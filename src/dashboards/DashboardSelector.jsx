import { useState } from 'react'
import { useEduOS } from '../core/EduOSContext.jsx'
import StudentSuccessDashboard from '../student-success/StudentSuccessDashboard.jsx'
import ExecutiveCommandCenter from './ExecutiveCommandCenter.jsx'
import RoleSpecificHome from './RoleSpecificHome.jsx'
import StatCard from '../components/StatCard.jsx'
import Card from '../components/Card.jsx'
import BarChart from '../components/BarChart.jsx'
import DonutChart from '../components/DonutChart.jsx'
import { ROLE_DASHBOARDS, DEFAULT_DASHBOARD } from './roleDashboards.js'
import { 
  Users, GraduationCap, Wallet, ClipboardCheck, AlertTriangle, 
  Calendar, Bus, Shield, FileText, CheckCircle, Compass, Star, Play
} from 'lucide-react'

export default function DashboardSelector() {
  const { currentRole, institution } = useEduOS()
  const config = ROLE_DASHBOARDS[currentRole] || DEFAULT_DASHBOARD

  // Custom states for interactive mock elements
  const [ptmBooked, setPtmBooked] = useState(false)
  const [consentApproved, setConsentApproved] = useState(false)
  
  // Teacher AI states
  const [aiTopic, setAiTopic] = useState('')
  const [generatedLesson, setGeneratedLesson] = useState('')

  if (currentRole === 'Student') {
    return <StudentSuccessDashboard />
  }

  // Phase 2: Render Executive Command Center for Leadership roles
  if (['Principal', 'System Administrator', 'Platform Super Admin'].includes(currentRole)) {
    return <ExecutiveCommandCenter />
  }

  // Phase 8: Render Role-Specific dashboards for Teacher, Finance, HR, Transport, Support
  if (['Teacher', 'Finance Administrator', 'HR Manager', 'Transport Manager', 'Support Agent'].includes(currentRole)) {
    return <RoleSpecificHome role={currentRole} />
  }

  // Attendance Trend Mock Data
  const attendanceMockData = [
    { month: 'Jan', percentage: 92 },
    { month: 'Feb', percentage: 94 },
    { month: 'Mar', percentage: 95 },
    { month: 'Apr', percentage: 93 },
    { month: 'May', percentage: 94 },
    { month: 'Jun', percentage: 96 }
  ]

  // Distribution mock data
  const distributionMockData = [
    { label: 'Paid', value: 75, color: '#22c55e' },
    { label: 'Pending', value: 18, color: '#f59e0b' },
    { label: 'Overdue', value: 7, color: '#ef4444' }
  ]

  // KPI icon mapper
  const getKPIIcon = (index) => {
    switch (index) {
      case 0: return GraduationCap
      case 1: return Users
      case 2: return Wallet
      default: return ClipboardCheck
    }
  }

  return (
    <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Alerts Panel */}
      {config.alerts && config.alerts.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {config.alerts.map((alert, i) => (
            <div 
              key={i} 
              style={{ 
                background: alert.type === 'warn' ? 'var(--color-amber-bg)' : 'var(--color-blue-bg)',
                color: alert.type === 'warn' ? 'var(--color-amber-text)' : 'var(--color-blue-text)',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderLeft: `4px solid ${alert.type === 'warn' ? 'var(--color-amber)' : 'var(--color-primary)'}`,
                fontSize: '0.88rem',
                fontWeight: 500
              }}
            >
              <AlertTriangle size={18} />
              <span>{alert.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Dynamic KPI Cards */}
      <div className="stats-grid">
        {config.kpis.map((kpi, i) => (
          <StatCard
            key={i}
            title={kpi.label}
            value={kpi.value}
            icon={getKPIIcon(i)}
            color={kpi.trendType === 'good' ? 'green' : kpi.trendType === 'warn' ? 'amber' : 'blue'}
            trend={kpi.trend}
          />
        ))}
      </div>

      {/* ────────────────── PARENT WORKSPACE ────────────────── */}
      {currentRole === 'Parent' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="Child Academic Progress Timeline" subtitle="Term assessments and competency flags">
              <div style={{ height: '240px', padding: '1rem 0' }}>
                <BarChart data={[
                  { label: 'Unit 1', value: 85 },
                  { label: 'Unit 2', value: 92 },
                  { label: 'Quarterly', value: 78 },
                  { label: 'Unit 3', value: 94 }
                ]} labelKey="label" valueKey="value" />
              </div>
            </Card>

            <Card title="Consent & Approvals Center" subtitle="Manage campus permissions">
              <div style={{ padding: '1rem', background: 'var(--color-surface-3)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>Field Trip to Visvesvaraya Museum</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Date: July 20 · Travel by school bus</div>
                </div>
                {consentApproved ? (
                  <span className="badge" style={{ background: 'var(--color-green-bg)', color: 'var(--color-green-text)' }}>Approved</span>
                ) : (
                  <button className="btn btn-primary" onClick={() => setConsentApproved(true)}>Approve Consent</button>
                )}
              </div>
            </Card>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="Book PTM Slot" subtitle="Schedule parent-teacher conference.">
              {ptmBooked ? (
                <div style={{ padding: '1rem', background: 'var(--color-green-bg)', color: 'var(--color-green-text)', borderRadius: '12px', textAlign: 'center' }}>
                  PTM Booked successfully! <br/><strong>Date: July 15 @ 4:00 PM</strong>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setPtmBooked(true) }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <select className="ap-select">
                    <option>Dr. Suresh Kumar (Mathematics)</option>
                    <option>Mrs. Ranjana Sharma (Science)</option>
                  </select>
                  <input type="datetime-local" className="ap-input" defaultValue="2026-07-15T16:00" />
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Confirm Booking</button>
                </form>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* Fallback general graphs */}
      {!['Parent', 'Student'].includes(currentRole) && (
        <div className="dashboard-grid">
          <Card title="Attendance Performance Trend" subtitle="Campus monthly attendance registry">
            <BarChart data={attendanceMockData} labelKey="month" valueKey="percentage" />
          </Card>
          <Card title="Operational Distributions" subtitle="Fee collection and allocation statuses">
            <DonutChart data={distributionMockData} />
          </Card>
        </div>
      )}

    </div>
  )
}
