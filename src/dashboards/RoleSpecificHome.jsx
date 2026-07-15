import { useState } from 'react'
import Card from '../components/Card.jsx'
import StatCard from '../components/StatCard.jsx'
import BarChart from '../components/BarChart.jsx'
import DonutChart from '../components/DonutChart.jsx'
import { Calendar, Users, Wallet, Bus, HelpCircle, Sparkles, ClipboardCheck, Clock, Check } from 'lucide-react'

export default function RoleSpecificHome({ role }) {
  const [success, setSuccess] = useState('')

  const handleSimulate = (msg) => {
    setSuccess(msg)
    setTimeout(() => setSuccess(''), 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* ── TEACHER HOME DASHBOARD ── */}
      {role === 'Teacher' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="Today's Scheduled Classes" subtitle="Interactive daily syllabus schedule">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ padding: '0.88rem', background: 'var(--color-surface-3)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>Algebra & Equations</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Class 9-A · 09:30 AM - 10:30 AM</div>
                  </div>
                  <span className="badge" style={{ background: 'var(--color-green-bg)', color: 'var(--color-green-text)' }}>Completed</span>
                </div>
                <div style={{ padding: '0.88rem', background: 'var(--color-surface-3)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>Trigonometry Introduction</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Class 10-B · 11:30 AM - 12:30 PM</div>
                  </div>
                  <span className="badge" style={{ background: 'var(--color-amber-bg)', color: 'var(--color-amber-text)' }}>Attendance Pending</span>
                </div>
                <div style={{ padding: '0.88rem', background: 'var(--color-surface-3)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>Geometry Theorems</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Class 8-C · 02:00 PM - 03:00 PM</div>
                  </div>
                  <span className="badge" style={{ background: 'var(--color-blue-bg)', color: 'var(--color-blue-text)' }}>Next Up</span>
                </div>
              </div>
            </Card>

            <Card title="Pending Appraisals & Feedback" subtitle="Monthly classroom evaluations">
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>Your CBSE peer review forms are ready for draft inputs.</div>
              <button className="btn btn-outline" onClick={() => handleSimulate('Form draft saved')}>Edit Appraisal Draft</button>
            </Card>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="Assessments & Tests Overview" subtitle="Grading and evaluation queues">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                  <span>Geometry Homework (Class 9-A)</span>
                  <strong>18/25 Evaluated</strong>
                </div>
                <div style={{ height: '6px', borderRadius: '3px', background: 'var(--color-border)', overflow: 'hidden' }}>
                  <div style={{ width: '72%', height: '100%', background: 'var(--color-primary)' }} />
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => handleSimulate('Grading console loaded')}>Open Grading Desk</button>
            </Card>
          </div>
        </div>
      )}

      {/* ── FINANCE HOME DASHBOARD ── */}
      {role === 'Finance Administrator' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="Today's Live Collections Stream" subtitle="Tuition, transport, and library receipts">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ padding: '0.75rem', background: 'var(--color-surface-3)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>Aditya Sen (Grade 8)</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Tuition Fee Term 1 · UPI</div>
                  </div>
                  <strong style={{ color: 'var(--color-green)' }}>+₹24,500</strong>
                </div>
                <div style={{ padding: '0.75rem', background: 'var(--color-surface-3)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>Alex Taylor (Grade 9)</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Bus Pass Autopay · Cards</div>
                  </div>
                  <strong style={{ color: 'var(--color-green)' }}>+₹4,200</strong>
                </div>
              </div>
            </Card>

            <Card title="Cost optimizations & Simulators" subtitle="Auto routing and budget forecastings">
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>Projekt fleet cost simulator points out potential route improvements.</div>
              <button className="btn btn-outline" onClick={() => handleSimulate('Simulator completed: ₹12,000 saved')}>Activate Optimizer</button>
            </Card>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="Payroll & Reimbursement Status" subtitle="Staff salaries and contractor bills">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                <div>Salary Month: <strong>July 2026</strong></div>
                <div>Status: <span className="badge" style={{ background: 'var(--color-green-bg)', color: 'var(--color-green-text)' }}>Disbursed</span></div>
                <div>Contractor Bills: <strong>3 Pending</strong></div>
              </div>
              <button className="btn btn-primary" onClick={() => handleSimulate('Payroll process initiated')}>Process Bills</button>
            </Card>
          </div>
        </div>
      )}

      {/* ── HR HOME DASHBOARD ── */}
      {role === 'HR Manager' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="Staff Leave Requests" subtitle="Approval and coverage matrices">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ padding: '0.75rem', background: 'var(--color-surface-3)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>Dr. Suresh Kumar (Maths)</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>2 Days Sick Leave · July 18-19</div>
                  </div>
                  <button className="btn btn-primary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.72rem' }} onClick={() => handleSimulate('Leave approved')}>Approve</button>
                </div>
              </div>
            </Card>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="Hiring & Recruitment Pipeline" subtitle="Current vacant CBSE positions">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Physics Teacher (Dwarka)', 'Exam coordinator (Adyar)'].map((pos, i) => (
                  <div key={pos} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
                    <span>{pos}</span>
                    <strong style={{ color: 'var(--color-primary)' }}>{i === 0 ? '3 Resumes Review' : 'Interview Scheduled'}</strong>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ── TRANSPORT HOME DASHBOARD ── */}
      {role === 'Transport Manager' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="Active Routes & GPS Feed" subtitle="Live tracking & delays scoreboard">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ padding: '0.75rem', background: 'var(--color-surface-3)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>Bus Route 14 (Dwarka)</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Driver: Ramesh Lal</div>
                  </div>
                  <span className="badge" style={{ background: 'var(--color-red-bg)', color: 'var(--color-red-text)' }}>Delay 15 mins</span>
                </div>
                <div style={{ padding: '0.75rem', background: 'var(--color-surface-3)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>Bus Route 22 (Koramangala)</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Driver: Suresh Rao</div>
                  </div>
                  <span className="badge" style={{ background: 'var(--color-green-bg)', color: 'var(--color-green-text)' }}>On Time</span>
                </div>
              </div>
            </Card>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="Fleet Incidents & Safety Logs" subtitle="Bus breakdown and maintenance warning logs">
              <div style={{ padding: '0.75rem', background: 'var(--color-amber-bg)', color: 'var(--color-amber-text)', borderRadius: '10px', fontSize: '0.78rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <ClipboardCheck size={16} />
                <span>Bus #12 is due for routine engine fitness tests tomorrow.</span>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ── HELP DESK / SUPPORT HOME DASHBOARD ── */}
      {role === 'Support Agent' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="Help Desk Incident Queue" subtitle="Active ticket support logs">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ padding: '0.75rem', background: 'var(--color-surface-3)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>Parent portal login lock</strong>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Ticket #1023 · Created 10 mins ago</div>
                  </div>
                  <span className="badge" style={{ background: 'var(--color-red-bg)', color: 'var(--color-red-text)' }}>1.5 hrs left</span>
                </div>
              </div>
            </Card>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="SLA & Diagnostics Panel" subtitle="Check server parameters">
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>Run real-time diagnostics on school database nodes.</div>
              <button className="btn btn-primary" onClick={() => handleSimulate('Diagnostics complete: 99.9% uptime')}>Run Database Check</button>
            </Card>
          </div>
        </div>
      )}

      {success && (
        <div style={{ padding: '0.75rem 1.25rem', background: 'var(--color-green-bg)', color: 'var(--color-green-text)', borderRadius: '12px', fontSize: '0.82rem', textAlign: 'center', fontWeight: 500 }}>
          <Check size={16} style={{ display: 'inline', marginRight: '0.35rem' }} /> {success}
        </div>
      )}

    </div>
  )
}
