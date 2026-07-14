/**
 * Outcome Based Education — Track Course Outcomes, Program Outcomes,
 * and Graduate Attributes with attainment charts and mapping visualizations.
 */
import { useState } from 'react';
import { Target, CheckCircle, BarChart2, Layers } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';

const COURSE_OUTCOMES = [
  { id: 'CO1', name: 'Apply mathematical concepts to solve real-world problems', attainment: 78, target: 70, status: 'Met' },
  { id: 'CO2', name: 'Analyze scientific phenomena through experimental methods', attainment: 72, target: 70, status: 'Met' },
  { id: 'CO3', name: 'Communicate effectively in written and oral English', attainment: 65, target: 70, status: 'Not Met' },
  { id: 'CO4', name: 'Demonstrate critical thinking in problem scenarios', attainment: 74, target: 70, status: 'Met' },
  { id: 'CO5', name: 'Collaborate effectively in team-based projects', attainment: 82, target: 70, status: 'Met' },
];

const PROGRAM_OUTCOMES = [
  { id: 'PO1', name: 'Foundational Knowledge', attainment: 76, mappedCOs: ['CO1', 'CO2'] },
  { id: 'PO2', name: 'Problem Solving', attainment: 74, mappedCOs: ['CO1', 'CO4'] },
  { id: 'PO3', name: 'Communication', attainment: 65, mappedCOs: ['CO3'] },
  { id: 'PO4', name: 'Teamwork', attainment: 82, mappedCOs: ['CO5'] },
  { id: 'PO5', name: 'Ethical Awareness', attainment: 70, mappedCOs: ['CO4', 'CO5'] },
];

const GRADUATE_ATTRIBUTES = [
  { name: 'Knowledge Competence', score: 75, icon: '📚' },
  { name: 'Analytical Ability', score: 72, icon: '🔍' },
  { name: 'Ethical Values', score: 80, icon: '⚖️' },
  { name: 'Global Perspective', score: 68, icon: '🌍' },
  { name: 'Leadership', score: 65, icon: '👑' },
  { name: 'Lifelong Learning', score: 78, icon: '📈' },
];

export default function OutcomeTracker() {
  const [activeTab, setActiveTab] = useState('course');
  const [instType, setInstType] = useState('School');

  return (
    <div className="page">
      <PageHeader
        title="Outcome Based Education"
        subtitle="Track learning outcomes, program outcomes, and graduate attributes."
        eyebrow="Learning Intelligence"
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="tabs">
          <button className={`tab ${activeTab === 'course' ? 'active' : ''}`} onClick={() => setActiveTab('course')}>Course Outcomes</button>
          <button className={`tab ${activeTab === 'program' ? 'active' : ''}`} onClick={() => setActiveTab('program')}>Program Outcomes</button>
          <button className={`tab ${activeTab === 'graduate' ? 'active' : ''}`} onClick={() => setActiveTab('graduate')}>Graduate Attributes</button>
        </div>
        <select className="ap-select" value={instType} onChange={e => setInstType(e.target.value)} style={{ minWidth: '140px' }}>
          <option>School</option>
          <option>College</option>
          <option>University</option>
        </select>
      </div>

      {activeTab === 'course' && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Target size={18} /> Course Outcome Attainment</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {COURSE_OUTCOMES.map(co => (
              <div key={co.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: co.status === 'Met' ? 'var(--color-green-bg)' : 'var(--color-red-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: co.status === 'Met' ? 'var(--color-green-text)' : 'var(--color-red-text)', flexShrink: 0 }}>
                  {co.id}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: '0.5rem' }}>{co.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: 'var(--color-surface-3)', overflow: 'hidden', position: 'relative' }}>
                      <div style={{ position: 'absolute', left: `${co.target}%`, top: 0, bottom: 0, width: '2px', background: 'var(--color-text-muted)', zIndex: 1 }} />
                      <div style={{ width: `${co.attainment}%`, height: '100%', borderRadius: '4px', background: co.status === 'Met' ? 'var(--color-green)' : 'var(--color-red)' }} />
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem', width: '40px' }}>{co.attainment}%</span>
                  </div>
                </div>
                <span className="badge" style={{ background: co.status === 'Met' ? 'var(--color-green-bg)' : 'var(--color-red-bg)', color: co.status === 'Met' ? 'var(--color-green-text)' : 'var(--color-red-text)' }}>
                  {co.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'program' && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Layers size={18} /> Program Outcomes & CO Mapping</h3>
          <div className="table-responsive">
            <table className="ap-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Program Outcome</th>
                  <th>Mapped COs</th>
                  <th>Attainment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {PROGRAM_OUTCOMES.map(po => (
                  <tr key={po.id}>
                    <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{po.id}</td>
                    <td style={{ fontWeight: 500 }}>{po.name}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        {po.mappedCOs.map(co => (
                          <span key={co} className="badge" style={{ background: 'var(--color-bg-secondary)', fontSize: '0.7rem' }}>{co}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '60px', height: '6px', borderRadius: '3px', background: 'var(--color-surface-3)', overflow: 'hidden' }}>
                          <div style={{ width: `${po.attainment}%`, height: '100%', borderRadius: '3px', background: po.attainment >= 70 ? 'var(--color-green)' : 'var(--color-amber)' }} />
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{po.attainment}%</span>
                      </div>
                    </td>
                    <td>
                      <span className="badge" style={{ background: po.attainment >= 70 ? 'var(--color-green-bg)' : 'var(--color-amber-bg)', color: po.attainment >= 70 ? 'var(--color-green-text)' : 'var(--color-amber-text)' }}>
                        {po.attainment >= 70 ? 'Achieved' : 'In Progress'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'graduate' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
          {GRADUATE_ATTRIBUTES.map((ga, i) => (
            <div key={i} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{ga.icon}</div>
              <h3 style={{ margin: '0 0 1rem', fontSize: '1rem' }}>{ga.name}</h3>
              <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 1rem' }}>
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-surface-3)" strokeWidth="6" />
                  <circle cx="40" cy="40" r="34" fill="none" stroke="var(--color-primary)" strokeWidth="6"
                    strokeDasharray={`${ga.score * 2.136} ${213.6 - ga.score * 2.136}`}
                    strokeDashoffset="53.4" strokeLinecap="round" />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.1rem', fontWeight: 700 }}>{ga.score}%</div>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                {ga.score >= 75 ? '✅ On Track' : ga.score >= 65 ? '⚠️ Needs Improvement' : '🔴 Below Target'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
