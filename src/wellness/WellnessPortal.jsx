import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import StatCard from '../components/StatCard.jsx'
import { ShieldAlert, Send, EyeOff, UserPlus, HeartPulse } from 'lucide-react'

export default function WellnessPortal() {
  const [anonLog, setAnonLog] = useState([
    { id: 1, timestamp: '2023-11-01 10:12', type: 'Bullying/Harassment', details: 'Reported bullying incident near Block B locker rooms. Under validation.', status: 'Investigating' },
    { id: 2, timestamp: '2023-10-28 14:02', type: 'Facility Issue', details: 'Broken window in laboratory room 4. Maintained.', status: 'Resolved' }
  ])
  const [reportType, setReportType] = useState('Bullying/Harassment')
  const [reportDetails, setReportDetails] = useState('')

  const handleAnonSubmit = (e) => {
    e.preventDefault()
    if (!reportDetails.trim()) return
    const newReport = {
      id: Date.now(),
      timestamp: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString().slice(0, 5),
      type: reportType,
      details: reportDetails,
      status: 'Open'
    }
    setAnonLog(prev => [newReport, ...prev])
    setReportDetails('')
    alert('Thank you. Your report has been anonymously logged. Ticket ID: ' + newReport.id)
  }

  return (
    <div className="page animate-fadeIn">
      <PageHeader 
        title="Wellness & Campus Safety Portal" 
        subtitle="Report security incidents anonymously, audit campus safety logs, and access wellness checkins."
        eyebrow="Campus Security"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Left Column: Anonymous Reporter */}
        <Card title="Anonymous Incident Reporting System" subtitle="Submissions are fully encrypted and do not track IP addresses.">
          
          <div style={{ padding: '1rem', background: 'var(--color-purple-bg)', color: 'var(--color-purple-text)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <EyeOff size={20} />
            <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Incidents logged here are routed directly to the Campus Principal and Counselor.</span>
          </div>

          <form onSubmit={handleAnonSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 500, marginBottom: '0.5rem' }}>Incident Type</label>
              <select className="ap-select" value={reportType} onChange={e => setReportType(e.target.value)}>
                <option>Bullying/Harassment</option>
                <option>Safety Hazard (Electricity/Fire)</option>
                <option>Facility Outage/Leaking</option>
                <option>Academic Malpractice</option>
                <option>Others</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 500, marginBottom: '0.5rem' }}>Describe the Incident</label>
              <textarea 
                className="ap-input" 
                rows="4" 
                placeholder="Include date, time, block location, and details. Do not write names if you wish to remain 100% anonymous."
                value={reportDetails}
                onChange={e => setReportDetails(e.target.value)}
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Send size={16} /> File Anonymous Report
            </button>
          </form>
        </Card>

        {/* Right Column: Safety Actions & Contacts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <Card title="Emergency Alerts Panel" subtitle="Immediate broadcast trigger for safety officials.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button className="btn" style={{ background: 'var(--color-red-bg)', color: 'var(--color-red)', border: 'none', width: '100%', justifyContent: 'center', padding: '1rem', fontWeight: 700 }} onClick={() => alert('Campus Emergency alert triggered school-wide!')}>
                🚨 Trigger Campus Lockdown
              </button>
              <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => alert('Fire department alerted.')}>
                🔥 Report Fire / Smoke
              </button>
              <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => alert('Medical team dispatched.')}>
                🚑 Medical Assistance Required
              </button>
            </div>
          </Card>

          <Card title="Visitor Log (Security Check)">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { name: 'Dr. Ramesh Rao', purpose: 'Guest Lecture Math', checkin: '14:15 PM' },
                { name: 'Anil Tyagi', purpose: 'Parent Meeting', checkin: '13:02 PM' }
              ].map((visitor, idx) => (
                <div key={idx} style={{ padding: '0.75rem', background: 'var(--color-surface-3)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                  <div>
                    <strong>{visitor.name}</strong>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>{visitor.purpose}</div>
                  </div>
                  <span style={{ fontWeight: 600 }}>{visitor.checkin}</span>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>

      {/* Incidents Table */}
      <Card title="Anonymous Incident Logs (Review Queue)" subtitle="Public tracking of resolved/open anonymous grievances.">
        <div className="table-responsive">
          <table className="ap-table">
            <thead>
              <tr>
                <th>Incident ID</th>
                <th>Timestamp</th>
                <th>Type</th>
                <th>Details Summary</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {anonLog.map(log => (
                <tr key={log.id}>
                  <td style={{ fontWeight: 700 }}>#{log.id}</td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{log.timestamp}</td>
                  <td><span className="badge" style={{ background: 'var(--color-surface-3)' }}>{log.type}</span></td>
                  <td style={{ fontSize: '0.88rem' }}>{log.details}</td>
                  <td>
                    <span className="badge" style={{ 
                      background: log.status === 'Resolved' ? 'var(--color-green-bg)' : 'var(--color-amber-bg)',
                      color: log.status === 'Resolved' ? 'var(--color-green-text)' : 'var(--color-amber-text)'
                    }}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
