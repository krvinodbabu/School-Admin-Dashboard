import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import StatCard from '../components/StatCard.jsx'
import { Globe, Award, Landmark, Languages } from 'lucide-react'

export default function GlobalEducation() {
  const [lang, setLang] = useState('English')

  const accreditations = [
    { agency: 'NAAC (India)', score: 'A++ (Cumulative CGPA 3.84)', status: 'Active (Expires 2028)' },
    { agency: 'ABET (International Engineering)', score: 'Fully Accredited Program', status: 'Active' },
    { agency: 'QS Global University Ranking', score: 'Top 500 Emerging Asia', status: 'Updated Jul 2024' }
  ]

  const programs = [
    { title: 'Global Exchange Program — IIT / MIT', students: '12 Students active', country: 'United States' },
    { title: 'Bilateral Research Alliance', students: '5 Labs synced', country: 'Germany' }
  ]

  return (
    <div className="page animate-fadeIn">
      <PageHeader 
        title="Global Education & Accreditation Desk" 
        subtitle="Manage international student registries, bilingual systems, and international university accreditations."
        eyebrow="Global Systems"
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', background: 'var(--color-surface-3)', padding: '1rem', borderRadius: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Languages size={18} />
          <strong>System Translation Portal</strong>
        </div>
        <select className="ap-select" value={lang} onChange={e => setLang(e.target.value)} style={{ minWidth: '150px' }}>
          <option>English</option>
          <option>Hindi (हिंदी)</option>
          <option>Tamil (தமிழ்)</option>
          <option>Spanish (Español)</option>
          <option>German (Deutsch)</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem' }}>
        
        {/* Accreditation and Standards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card title="International Accreditations Board" subtitle="Compliance indexes registry">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {accreditations.map((ac, idx) => (
                <div key={idx} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <strong style={{ fontSize: '0.95rem' }}>{ac.agency}</strong>
                    <span className="badge" style={{ background: 'var(--color-green-bg)', color: 'var(--color-green-text)', fontSize: '0.72rem' }}>{ac.status}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{ac.score}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Global Exchange Shuttles */}
        <Card title="Active University Alliances">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {programs.map((prog, idx) => (
              <div key={idx} style={{ padding: '1.25rem', background: 'var(--color-surface-3)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <Globe size={14} style={{ color: 'var(--color-primary)' }} />
                  <strong style={{ fontSize: '0.88rem' }}>{prog.country}</strong>
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{prog.title}</div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{prog.students}</span>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  )
}
