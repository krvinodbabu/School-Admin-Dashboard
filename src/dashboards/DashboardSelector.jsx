import { useState } from 'react'
import { useEduOS } from '../core/EduOSContext.jsx'
import StudentSuccessDashboard from '../student-success/StudentSuccessDashboard.jsx'
import StatCard from '../components/StatCard.jsx'
import Card from '../components/Card.jsx'
import BarChart from '../components/BarChart.jsx'
import DonutChart from '../components/DonutChart.jsx'
import { ROLE_DASHBOARDS, DEFAULT_DASHBOARD } from './roleDashboards.js'
import { 
  Users, GraduationCap, Wallet, ClipboardCheck, Bell, AlertTriangle, 
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

  // Finance states
  const [paySuccess, setPaySuccess] = useState(false)

  // QR Code check-in state
  const [qrChecked, setQrChecked] = useState(false)

  if (currentRole === 'Student') {
    return <StudentSuccessDashboard />
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

      {/* Role specific custom layouts */}
      
      {/* ────────────────── PARENT WORKSPACE ────────────────── */}
      {currentRole === 'Parent' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem' }}>
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

      {/* ────────────────── TEACHER WORKSPACE ────────────────── */}
      {currentRole === 'Teacher' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="AI Lesson Planner & Content Generator" subtitle="NEP aligned interactive planning engine">
              <form onSubmit={e => { e.preventDefault(); setGeneratedLesson(`### Mathematics: ${aiTopic}\n\n1. **Learning Objective**: Apply trigonometric rules to right-angled triangles.\n2. **Bloom's Taxonomy**: Analyze & Apply.\n3. **MCQ Quiz**: Generate 5 assessment matrices.`) }} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <input 
                  type="text" 
                  className="ap-input" 
                  placeholder="Enter topic (e.g. Trigonometry Basics)" 
                  value={aiTopic}
                  onChange={e => setAiTopic(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn btn-primary">Generate Plan</button>
              </form>

              {generatedLesson && (
                <div style={{ background: 'var(--color-surface-3)', padding: '1.25rem', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.82rem', whiteSpace: 'pre-wrap', borderLeft: '4px solid var(--color-primary)' }}>
                  {generatedLesson}
                </div>
              )}
            </Card>

            <Card title="Competency Tracking Matrix">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Critical Thinking', 'Problem Solving', 'Peer Collaboration'].map(comp => (
                  <div key={comp} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                    <span>{comp}</span>
                    <strong>84% Average Mastery</strong>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="Professional Development">
              <div style={{ padding: '1rem', background: 'var(--color-surface-3)', borderRadius: '12px', marginBottom: '1rem' }}>
                <strong>NEP 2020 Teacher Training</strong>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '0.25rem 0' }}>Duration: 12 Hours completed</div>
                <div style={{ height: '6px', borderRadius: '3px', background: 'var(--color-border)', overflow: 'hidden' }}>
                  <div style={{ width: '80%', height: '100%', background: 'var(--color-green)' }} />
                </div>
              </div>
              <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => alert('Opening training catalogs...')}>Browse Certifications</button>
            </Card>
          </div>
        </div>
      )}

      {/* ────────────────── FINANCE WORKSPACE ────────────────── */}
      {currentRole === 'Finance Administrator' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="Future Payment Gateways Desk" subtitle="Autopay registries and subscription setups">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ padding: '1.25rem', background: 'var(--color-surface-3)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                  <strong>UPI Autopay enrollment</strong>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.5rem 0' }}>420 Users</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Recurring billing active</span>
                </div>
                <div style={{ padding: '1.25rem', background: 'var(--color-surface-3)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                  <strong>Scholarship allocations</strong>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.5rem 0' }}>₹12.4 Lakhs</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>45 active recipients</span>
                </div>
              </div>
            </Card>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="Cost Optimization Simulator">
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>AI recommendation: optimize fleet logistics.</div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => alert('Simulating smart routing offset: Projected savings of ₹42,000/mo.')}>Run AI Optimizer</button>
            </Card>
          </div>
        </div>
      )}

      {/* ────────────────── TRANSPORT WORKSPACE ────────────────── */}
      {currentRole === 'Transport Manager' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="Live Optimized Transit Routes" subtitle="GPS telematics & driver scorecards logs">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Route A (Koramangala)', 'Route B (Dwarka)', 'Route C (Salt Lake)'].map((route, i) => (
                  <div key={route} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong>{route}</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Driver Score: {95 - i*4}/100</div>
                    </div>
                    <span className="badge" style={{ background: 'var(--color-green-bg)', color: 'var(--color-green-text)' }}>On Time</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="Vehicle Maintenance Logs">
              <div style={{ fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div>Bus #14: <strong style={{ color: 'var(--color-green)' }}>Healthy</strong></div>
                <div>Bus #22: <strong style={{ color: 'var(--color-amber)' }}>Due for oil change</strong></div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ────────────────── SUPPORT WORKSPACE ────────────────── */}
      {currentRole === 'Support Agent' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem' }}>
          <Card title="Active Incidents Queue" subtitle="Service Desk ticket logs">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { title: 'LMS gradebook failed sync', time: '10 mins ago', sla: '1.5 hrs remaining' },
                { title: 'Autopay failure report', time: '45 mins ago', sla: '2.0 hrs remaining' }
              ].map((ticket, idx) => (
                <div key={idx} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{ticket.title}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Logged: {ticket.time}</div>
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-red)' }}>{ticket.sla}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="AI Diagnostics Tools">
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => alert('Starting server diagnostics check... All systems normal.')}>
              Run System Diagnostics
            </button>
          </Card>
        </div>
      )}

      {/* Fallback general graphs for other roles (Super Admin, Principal etc. who have distinct pages) */}
      {['Principal', 'System Administrator', 'HR Manager', 'Admissions Officer', 'Sports Director', 'Marketing Head', 'Housekeeping Supervisor', 'Escalation Manager'].includes(currentRole) && (
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

const distributionMockData = [
  { label: 'Paid', value: 75, color: '#22c55e' },
  { label: 'Pending', value: 18, color: '#f59e0b' },
  { label: 'Overdue', value: 7, color: '#ef4444' }
]
