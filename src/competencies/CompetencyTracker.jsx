/**
 * Competency Based Education — NEP 2020 aligned competency and skill tracking.
 */
import { useState } from 'react';
import { Target, Award, TrendingUp, Users } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';

const COMPETENCIES = [
  { id: 1, name: 'Communication Skills', category: 'Language & Expression', avgScore: 72, students: 450, trend: '+3%', icon: '🗣️', indicators: ['Oral presentation', 'Written expression', 'Active listening', 'Debate participation'] },
  { id: 2, name: 'Critical Thinking', category: 'Cognitive Skills', avgScore: 68, students: 450, trend: '+5%', icon: '🧠', indicators: ['Problem analysis', 'Logical reasoning', 'Evidence evaluation', 'Solution synthesis'] },
  { id: 3, name: 'Collaboration', category: 'Social Skills', avgScore: 76, students: 450, trend: '+2%', icon: '🤝', indicators: ['Team participation', 'Conflict resolution', 'Shared responsibility', 'Peer support'] },
  { id: 4, name: 'Leadership', category: 'Social Skills', avgScore: 62, students: 450, trend: '+1%', icon: '👑', indicators: ['Initiative taking', 'Decision making', 'Mentoring', 'Event organization'] },
  { id: 5, name: 'Creativity', category: 'Innovation', avgScore: 74, students: 450, trend: '+4%', icon: '🎨', indicators: ['Original thinking', 'Artistic expression', 'Innovation projects', 'Design thinking'] },
  { id: 6, name: 'Digital Literacy', category: 'Technology', avgScore: 80, students: 450, trend: '+8%', icon: '💻', indicators: ['Basic computing', 'Internet safety', 'Data analysis', 'Coding fundamentals'] },
];

export default function CompetencyTracker() {
  const [selectedComp, setSelectedComp] = useState(null);

  return (
    <div className="page">
      <PageHeader
        title="Competency Based Education"
        subtitle="NEP 2020 aligned competency tracking across all academic programs."
        eyebrow="Learning Intelligence"
      />

      {/* Competency Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
        {COMPETENCIES.map(comp => (
          <div
            key={comp.id}
            className="card"
            onClick={() => setSelectedComp(selectedComp?.id === comp.id ? null : comp)}
            style={{ padding: '1.5rem', cursor: 'pointer', border: selectedComp?.id === comp.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', transition: 'all 0.2s' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ fontSize: '2rem' }}>{comp.icon}</div>
              <span className="badge" style={{ background: 'var(--color-green-bg)', color: 'var(--color-green-text)', fontSize: '0.7rem' }}>{comp.trend}</span>
            </div>
            <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem' }}>{comp.name}</h3>
            <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{comp.category}</p>

            {/* Progress Ring */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ position: 'relative', width: '56px', height: '56px' }}>
                <svg width="56" height="56" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="24" fill="none" stroke="var(--color-surface-3)" strokeWidth="4" />
                  <circle cx="28" cy="28" r="24" fill="none" stroke="var(--color-primary)" strokeWidth="4"
                    strokeDasharray={`${comp.avgScore * 1.508} ${150.8 - comp.avgScore * 1.508}`}
                    strokeDashoffset="37.7" strokeLinecap="round" />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '0.82rem', fontWeight: 700 }}>{comp.avgScore}%</div>
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>Avg. Mastery</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{comp.students} students tracked</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Competency Detail */}
      {selectedComp && (
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ margin: '0 0 0.25rem' }}>{selectedComp.icon} {selectedComp.name}</h3>
          <p style={{ margin: '0 0 1.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{selectedComp.category} · Behavioral Indicators</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            {selectedComp.indicators.map((ind, i) => (
              <div key={i} style={{ padding: '1rem', borderRadius: '10px', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.85rem' }}>
                  {i + 1}
                </div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{ind}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    Mastery: {Math.round(selectedComp.avgScore + (Math.random() * 10 - 5))}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
