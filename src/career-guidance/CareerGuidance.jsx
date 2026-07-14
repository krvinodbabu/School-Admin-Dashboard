/**
 * AI Career Guidance — AI-powered career pathway recommendations based on student profiles.
 */
import { useState } from 'react';
import { Compass, TrendingUp, BookOpen, Star, ChevronRight, Sparkles } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';

const CAREER_PATHS = [
  { id: 1, name: 'Engineering', match: 92, icon: '⚙️', color: '#3b82f6', skills: ['Mathematics', 'Physics', 'Problem Solving', 'Coding'], learningPlan: ['JEE Preparation', 'Advanced Mathematics', 'Physics Olympiad', 'Coding Bootcamp'], description: 'Strong analytical and mathematical abilities align well with engineering disciplines.' },
  { id: 2, name: 'Medicine', match: 78, icon: '🏥', color: '#22c55e', skills: ['Biology', 'Chemistry', 'Empathy', 'Attention to Detail'], learningPlan: ['NEET Preparation', 'Biology Advanced', 'Chemistry Lab Skills', 'First Aid Certification'], description: 'Good science foundation with potential for healthcare career paths.' },
  { id: 3, name: 'Design', match: 85, icon: '🎨', color: '#f59e0b', skills: ['Creativity', 'Visual Thinking', 'Digital Tools', 'Communication'], learningPlan: ['NID Preparation', 'Digital Design Course', 'Portfolio Building', 'Design Thinking Workshop'], description: 'Creative aptitude and digital literacy suggest strong design potential.' },
  { id: 4, name: 'Law', match: 65, icon: '⚖️', color: '#8b5cf6', skills: ['Critical Thinking', 'Communication', 'Reading', 'Debate'], learningPlan: ['CLAT Preparation', 'Legal Studies', 'Debate Club', 'Model UN'], description: 'Communication skills and analytical thinking align with legal careers.' },
  { id: 5, name: 'Research', match: 88, icon: '🔬', color: '#6366f1', skills: ['Curiosity', 'Analysis', 'Mathematics', 'Writing'], learningPlan: ['Science Olympiad', 'Research Methodology', 'Academic Writing', 'Lab Internship'], description: 'Strong curiosity and analytical skills indicate research aptitude.' },
  { id: 6, name: 'Entrepreneurship', match: 70, icon: '🚀', color: '#ef4444', skills: ['Leadership', 'Innovation', 'Communication', 'Risk Taking'], learningPlan: ['Business Plan Competition', 'Financial Literacy', 'Startup Workshop', 'Marketing Basics'], description: 'Leadership qualities and innovative thinking support entrepreneurial career.' },
];

export default function CareerGuidance() {
  const [selectedPath, setSelectedPath] = useState(null);

  return (
    <div className="page">
      <PageHeader
        title="AI Career Guidance"
        subtitle="Personalized career pathway recommendations based on student aptitude and performance."
        eyebrow="AI Intelligence"
      />

      {/* AI Analysis Banner */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', background: 'var(--gradient-brand)', color: '#fff', borderRadius: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={24} />
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.25rem', color: '#fff' }}>AI Career Analysis Complete</h3>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '0.9rem' }}>
              Based on academic performance, competency scores, extracurricular activities, and aptitude indicators, we've identified the top career pathways.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedPath ? '1fr 420px' : '1fr', gap: '1.5rem' }}>
        {/* Career Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: selectedPath ? '1fr' : 'repeat(3, 1fr)', gap: '1.25rem' }}>
          {CAREER_PATHS.map(path => (
            <div
              key={path.id}
              className="card"
              onClick={() => setSelectedPath(selectedPath?.id === path.id ? null : path)}
              style={{
                padding: '1.5rem', cursor: 'pointer',
                border: selectedPath?.id === path.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>{path.icon}</div>
                <div style={{
                  padding: '0.35rem 0.75rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.85rem',
                  background: path.match >= 85 ? 'var(--color-green-bg)' : path.match >= 70 ? 'var(--color-blue-bg)' : 'var(--color-amber-bg)',
                  color: path.match >= 85 ? 'var(--color-green-text)' : path.match >= 70 ? 'var(--color-blue-text)' : 'var(--color-amber-text)',
                }}>
                  {path.match}% Match
                </div>
              </div>

              <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>{path.name}</h3>
              <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{path.description}</p>

              {/* Match bar */}
              <div style={{ height: '6px', borderRadius: '3px', background: 'var(--color-surface-3)', overflow: 'hidden' }}>
                <div style={{ width: `${path.match}%`, height: '100%', borderRadius: '3px', background: path.color, transition: 'width 0.5s ease' }} />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                {path.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="badge" style={{ background: 'var(--color-surface-3)', fontSize: '0.72rem' }}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        {selectedPath && (
          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>{selectedPath.icon}</div>
            <h3 style={{ margin: '0 0 0.25rem', textAlign: 'center' }}>{selectedPath.name}</h3>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span className="badge" style={{ background: 'var(--color-green-bg)', color: 'var(--color-green-text)', fontSize: '0.85rem', padding: '0.4rem 1rem' }}>{selectedPath.match}% Career Match</span>
            </div>

            <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.95rem' }}>🎯 Required Skills</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedPath.skills.map((skill, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0.75rem', borderRadius: '8px', background: 'var(--color-surface-3)' }}>
                  <Star size={14} style={{ color: 'var(--color-amber)' }} />
                  <span style={{ fontSize: '0.88rem' }}>{skill}</span>
                </div>
              ))}
            </div>

            <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.95rem' }}>📚 Suggested Learning Plan</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {selectedPath.learningPlan.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: '0.88rem' }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: '10px', background: 'var(--color-surface-3)', fontSize: '0.82rem', color: 'var(--color-text-muted)', borderLeft: '3px solid var(--color-primary)' }}>
              <strong>🤖 AI Note:</strong> This recommendation is based on academic performance, aptitude tests, and behavioral indicators. Human counselor review recommended.
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <span className="badge" style={{ background: 'var(--color-indigo-bg)', color: 'var(--color-indigo-text)', fontSize: '0.68rem' }}>AI Generated</span>
                <span className="badge" style={{ background: 'var(--color-amber-bg)', color: 'var(--color-amber-text)', fontSize: '0.68rem' }}>Pending Human Review</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
