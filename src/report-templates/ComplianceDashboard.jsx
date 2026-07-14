import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import StatCard from '../components/StatCard.jsx'
import { ShieldCheck, Check, X, ShieldAlert, Award, FileText } from 'lucide-react'

export default function ComplianceDashboard() {
  const [accreditList, setAccreditList] = useState([
    { id: 'CBSE-1', body: 'CBSE Affiliation Rule 14', name: 'Science Laboratory Infrastructure Check', status: 'Compliant' },
    { id: 'CBSE-2', body: 'CBSE Affiliation Rule 18', name: 'Qualified Staff Ratio (1:30 Max)', status: 'Compliant' },
    { id: 'NAAC-A', body: 'NAAC Criteria 1', name: 'Outcome Based Education Syllabus Mapping', status: 'Verification Required' },
    { id: 'NAAC-B', body: 'NAAC Criteria 2', name: 'Continuous Assessments & Feedback Matrix', status: 'Compliant' },
    { id: 'NBA-C', body: 'NBA Tier-1', name: 'Graduate Attributes Attainment Reports', status: 'Non-Compliant' }
  ])

  const handleAuditAction = (id) => {
    setAccreditList(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'Compliant' } : item
    ))
  }

  return (
    <div className="page animate-fadeIn">
      <PageHeader 
        title="Audit & Board Compliance Center" 
        subtitle="Track institutional compliance status with CBSE, NAAC, NBA, and UGC regulatory frameworks."
        eyebrow="Compliance Desk"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
        <StatCard title="Compliance Health Rating" value="92%" icon={ShieldCheck} color="green" trend="Total verified logs" />
        <StatCard title="Active Affiliation Rules" value="48 Rules" icon={FileText} color="blue" trend="Audited quarterly" />
        <StatCard title="Open Audits Tasks" value="2 Action Items" icon={ShieldAlert} color="amber" trend="Immediate actions required" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>
        
        {/* Compliance checklist */}
        <Card title="Board Verification Checklist" subtitle="Standards checks matrix">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {accreditList.map(item => (
              <div 
                key={item.id} 
                style={{ 
                  padding: '1.25rem', 
                  border: '1px solid var(--color-border)', 
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{item.body}</div>
                  <h4 style={{ margin: '0.25rem 0', fontSize: '0.92rem' }}>{item.name}</h4>
                  <span className="badge" style={{ 
                    background: item.status === 'Compliant' ? 'var(--color-green-bg)' : item.status === 'Non-Compliant' ? 'var(--color-red-bg)' : 'var(--color-amber-bg)',
                    color: item.status === 'Compliant' ? 'var(--color-green-text)' : item.status === 'Non-Compliant' ? 'var(--color-red-text)' : 'var(--color-amber-text)'
                  }}>
                    {item.status}
                  </span>
                </div>

                {item.status !== 'Compliant' && (
                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleAuditAction(item.id)}
                    style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}
                  >
                    Run Audits Verify
                  </button>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Board Framework Standards info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card title="Affiliations & Ratings">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: 'var(--color-surface-3)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Award size={18} style={{ color: 'var(--color-green)' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>NAAC rating: A++</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>CGPA 3.84 · Valid till 2028</div>
                </div>
              </div>
              <div style={{ padding: '1rem', background: 'var(--color-surface-3)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Award size={18} style={{ color: 'var(--color-primary)' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>NBA Accredited</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Tier-1 Standards Compliant</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}
