import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card.jsx'
import StatCard from '../components/StatCard.jsx'
import BarChart from '../components/BarChart.jsx'
import DonutChart from '../components/DonutChart.jsx'
import { 
  Users, GraduationCap, Wallet, ClipboardCheck, AlertTriangle, Shield, Check,
  Activity, Calendar, Clock, Sparkles, BookOpen, Compass, Award, Cpu
} from 'lucide-react'

export default function ExecutiveCommandCenter() {
  const navigate = useNavigate()
  const [activeTrend, setActiveTrend] = useState('revenue')
  const [successAction, setSuccessAction] = useState('')

  const handleQuickAction = (actionName) => {
    setSuccessAction(actionName)
    setTimeout(() => setSuccessAction(''), 2000)
  }

  // Analytics Trends datasets
  const trendData = {
    revenue: [
      { label: 'Q1', value: 85 },
      { label: 'Q2', value: 92 },
      { label: 'Q3', value: 110 },
      { label: 'Q4', value: 124 }
    ],
    attendance: [
      { label: 'Grade 8', value: 94 },
      { label: 'Grade 9', value: 88 },
      { label: 'Grade 10', value: 96 },
      { label: 'Grade 11', value: 92 }
    ],
    admissions: [
      { label: 'Jan', value: 120 },
      { label: 'Feb', value: 180 },
      { label: 'Mar', value: 240 },
      { label: 'Apr', value: 310 }
    ],
    tickets: [
      { label: 'Mon', value: 12 },
      { label: 'Tue', value: 8 },
      { label: 'Wed', value: 15 },
      { label: 'Thu', value: 4 }
    ],
    academic: [
      { label: 'Term 1', value: 72 },
      { label: 'Term 2', value: 78 },
      { label: 'Term 3', value: 84 },
      { label: 'Finals', value: 89 }
    ]
  }

  // Department cards info (Phase 7)
  const departments = [
    { name: 'Academics', to: '/classes', status: 'Healthy', kpi: '92% Syllabus Met', alerts: 'No syllabus delays', tasks: '12 Assessments Pending', workflows: '3 Lesson Approvals', color: 'var(--color-primary)' },
    { name: 'Finance', to: '/fees', status: 'Action Required', kpi: '₹4.85 Cr Collected', alerts: '₹22.5 L Outstanding', tasks: '8 Invoices Pending Approval', workflows: '2 Refund Cases', color: 'var(--color-amber)' },
    { name: 'HR', to: '/hr', status: 'Healthy', kpi: '320 Personnel Active', alerts: '5 vacancys in STEM', tasks: '2 Leave Requests Pending', workflows: '1 Appraisal Approval', color: 'var(--color-green)' },
    { name: 'Admissions', to: '/admissions', status: 'Healthy', kpi: '1,420 Enrolled', alerts: '93% target reached', tasks: '45 Active Enquiries', workflows: '0 Pending Admissions', color: 'var(--color-primary)' },
    { name: 'Transport', to: '/transport', status: 'Stable', kpi: '42 Active Routes', alerts: 'Bus 12 oil delay', tasks: '0 Driver absences', workflows: '1 Route Update', color: 'var(--color-blue)' },
    { name: 'Support', to: '/support', status: 'SLA Alert', kpi: '98.3% compliance', alerts: '2 SLA breaches today', tasks: '15 open tickets', workflows: '3 escalations pending', color: 'var(--color-red)' },
    { name: 'Sports', to: '/sports', status: 'Stable', kpi: '12 Teams Registered', alerts: 'No injury logs', tasks: '2 training updates', workflows: '0 Tournament filings', color: 'var(--color-purple)' },
    { name: 'Events', to: '/events', status: 'Stable', kpi: 'Science Fair (July 18)', alerts: 'Budget 94% utilized', tasks: '12 Volunteer setups', workflows: '1 Hall booking', color: 'var(--color-pink)' },
    { name: 'Marketing', to: '/platform/explorer', status: 'Stable', kpi: '5 Active campaigns', alerts: 'Social reach +12% MoM', tasks: '2 banner approvals', workflows: '0 Active spend adjustments', color: 'var(--color-teal)' },
    { name: 'Facilities', to: '/library', status: 'Healthy', kpi: '94% smartboards online', alerts: 'Maintenance normal', tasks: '3 repair tickets', workflows: '1 cleaning verification', color: 'var(--color-green)' }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', paddingBottom: '2rem' }}>
      
      {/* Dynamic Health Score & Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>
        
        {/* Gauge Health Score */}
        <Card title="Institution Health Rating" subtitle="Dynamic score based on academic, fiscal, and logistics KPIs">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '1rem 0' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Radial circle representation */}
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '8px solid var(--color-primary-light)', position: 'absolute' }}></div>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '8px solid var(--color-primary)', borderBottomColor: 'transparent', position: 'absolute', transform: 'rotate(45deg)' }}></div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)' }}>92</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.82rem' }}>
              <div>📚 Academics: <strong>94/100</strong></div>
              <div>💼 Finance: <strong>89/100</strong></div>
              <div>⚙️ Operations: <strong>92/100</strong></div>
              <div>🔔 Support Index: <strong>96/100</strong></div>
            </div>
          </div>
        </Card>

        {/* Quick Actions Console */}
        <Card title="Operational Quick Actions" subtitle="Trigger standard workflows and register personnel">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <button className="btn btn-outline" onClick={() => handleQuickAction('Student registered')} style={{ fontSize: '0.82rem', padding: '0.5rem' }}>+ Student</button>
            <button className="btn btn-outline" onClick={() => handleQuickAction('Employee registered')} style={{ fontSize: '0.82rem', padding: '0.5rem' }}>+ Employee</button>
            <button className="btn btn-outline" onClick={() => handleQuickAction('Admission ticket created')} style={{ fontSize: '0.82rem', padding: '0.5rem' }}>+ Admission</button>
            <button className="btn btn-outline" onClick={() => handleQuickAction('Helpdesk ticket raised')} style={{ fontSize: '0.82rem', padding: '0.5rem' }}>Raise Ticket</button>
            <button className="btn btn-outline" onClick={() => navigate('/reports/enterprise')} style={{ fontSize: '0.82rem', padding: '0.5rem' }}>Create Report</button>
            <button className="btn btn-outline" onClick={() => navigate('/workflows/designer')} style={{ fontSize: '0.82rem', padding: '0.5rem' }}>Create Workflow</button>
          </div>
          {successAction && (
            <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'var(--color-green-bg)', color: 'var(--color-green-text)', borderRadius: '6px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center' }}>
              <Check size={14} /> {successAction} successfully simulated!
            </div>
          )}
        </Card>

      </div>

      {/* Executive KPIs Grid (10 KPIs) */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.88rem' }}>Executive Key Indicators</h3>
        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          <StatCard title="Total Students" value="1,420" trend="+12% YoY" color="green" icon={GraduationCap} />
          <StatCard title="Total Staff" value="320" trend="1:26 Ratio" color="blue" icon={Users} />
          <StatCard title="Admissions" value="1,420/1,500" trend="93% Target" color="green" icon={Activity} />
          <StatCard title="Fee Collection" value="₹4.85 Cr" trend="92.4% Target" color="green" icon={Wallet} />
          <StatCard title="Avg Attendance" value="91.2%" trend="+0.8% MoM" color="green" icon={ClipboardCheck} />
          <StatCard title="Academic Health" value="94.2%" trend="A+ Avg" color="green" icon={BookOpen} />
          <StatCard title="Financial Health" value="89.5%" trend="Optimal" color="blue" icon={Wallet} />
          <StatCard title="Operational Health" value="92.1%" trend="Stable" color="blue" icon={Activity} />
          <StatCard title="Student CSAT" value="94.8%" trend="4.8 stars" color="green" icon={Sparkles} />
          <StatCard title="Parent CSAT" value="92.5%" trend="4.6 stars" color="green" icon={Sparkles} />
        </div>
      </div>

      {/* Dynamic AI Insights & Operational Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Operational Alerts */}
        <Card title="Operational Control Alerts" subtitle="Critical escalations needing immediate approval or routing">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ padding: '0.75rem', background: 'var(--color-red-bg)', color: 'var(--color-red-text)', borderRadius: '8px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={16} />
              <span>SLA Breach: LMS gradebook failed sync on Bandra campus.</span>
            </div>
            <div style={{ padding: '0.75rem', background: 'var(--color-amber-bg)', color: 'var(--color-amber-text)', borderRadius: '8px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={16} />
              <span>Low Attendance Warning: Grade 9 Section B fell to 76.5%.</span>
            </div>
            <div style={{ padding: '0.75rem', background: 'var(--color-blue-bg)', color: 'var(--color-blue-text)', borderRadius: '8px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} />
              <span>120 Parent reminder SMS notifications dispatched automatically.</span>
            </div>
          </div>
        </Card>

        {/* AI Recommendations */}
        <Card title="AI Copilot Recommendations" subtitle="Predictive models and strategic resource optimizations">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--color-purple-bg)', color: 'var(--color-purple-text)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.82rem' }}>
              <Sparkles size={16} style={{ flexShrink: 0, marginTop: '0.15rem' }} />
              <div>
                <strong>STEM Faculty Vacancy Risk</strong>
                <p style={{ margin: '0.15rem 0 0', opacity: 0.9 }}>Vacancy in Secondary STEM classes risks delaying trigonometry curriculum schedule by 12 days. Suggest hiring freelance contractors.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--color-purple-bg)', color: 'var(--color-purple-text)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.82rem' }}>
              <Sparkles size={16} style={{ flexShrink: 0, marginTop: '0.15rem' }} />
              <div>
                <strong>Autopay Optimizations</strong>
                <p style={{ margin: '0.15rem 0 0', opacity: 0.9 }}>UPI autopay registration shares have hit 72%. Activating Razorpay auto-collect would lower invoices collection loops by 4 days.</p>
              </div>
            </div>
          </div>
        </Card>

      </div>

      {/* Analytics Snapshot Trends */}
      <Card title="Decision Intelligence Trends" subtitle="Toggle analytics snapshots mapping campus growth metrics">
        <div className="tabs" style={{ background: 'var(--color-surface-3)', border: '1px solid var(--color-border)', padding: '0.25rem', borderRadius: '8px', marginBottom: '1.25rem', display: 'inline-flex' }}>
          {['revenue', 'attendance', 'admissions', 'tickets', 'academic'].map(t => (
            <button 
              key={t}
              className={`tab ${activeTrend === t ? 'active' : ''}`}
              onClick={() => setActiveTrend(t)}
              style={{ textTransform: 'capitalize', padding: '0.35rem 0.88rem', fontSize: '0.78rem' }}
            >
              {t} Trend
            </button>
          ))}
        </div>
        <div style={{ height: '200px' }}>
          <BarChart data={trendData[activeTrend]} labelKey="label" valueKey="value" />
        </div>
      </Card>

      {/* Department Cards Grid (10 Cards - Phase 7) */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.88rem' }}>Operating Department Overview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {departments.map((dept, i) => (
            <div 
              key={i} 
              onClick={() => navigate(dept.to)}
              style={{ 
                background: 'var(--color-surface)', 
                border: '1px solid var(--color-border)', 
                borderRadius: '16px', 
                padding: '1.25rem', 
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                borderLeft: `4px solid ${dept.color}`
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.92rem' }}>{dept.name}</strong>
                <span className="badge" style={{ fontSize: '0.68rem', background: dept.status === 'Healthy' ? 'var(--color-green-bg)' : dept.status === 'Stable' ? 'var(--color-blue-bg)' : 'var(--color-amber-bg)' }}>{dept.status}</span>
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, margin: '0.25rem 0' }}>{dept.kpi}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                <div>⚠️ {dept.alerts}</div>
                <div>📋 {dept.tasks}</div>
                <div>⚙️ {dept.workflows}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
