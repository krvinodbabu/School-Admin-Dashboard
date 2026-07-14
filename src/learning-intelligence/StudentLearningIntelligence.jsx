/**
 * Student Learning Intelligence — AI-powered analytics dashboard showing
 * risk indicators, performance trajectories, competency radars, and heatmaps.
 */
import { useState } from 'react';
import { TrendingUp, AlertTriangle, Target, Brain, Activity, ChevronDown } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';

const STUDENTS = [
  { id: 1, name: 'Aarav Sharma', class: '8-A', risk: 'Low', riskScore: 15, overall: 78, trend: 'up', subjects: { Math: 85, Science: 82, English: 68, Social: 74, Hindi: 79 }, attendance: 88, competencies: { critical: 72, creative: 80, communication: 65, collaboration: 78, digital: 85 } },
  { id: 2, name: 'Priya Nair', class: '8-A', risk: 'High', riskScore: 82, overall: 45, trend: 'down', subjects: { Math: 42, Science: 48, English: 38, Social: 52, Hindi: 45 }, attendance: 62, competencies: { critical: 40, creative: 55, communication: 35, collaboration: 50, digital: 60 } },
  { id: 3, name: 'Rahul Verma', class: '9-B', risk: 'High', riskScore: 87, overall: 38, trend: 'down', subjects: { Math: 35, Science: 40, English: 32, Social: 42, Hindi: 38 }, attendance: 55, competencies: { critical: 30, creative: 45, communication: 28, collaboration: 35, digital: 50 } },
  { id: 4, name: 'Sneha Patel', class: '7-A', risk: 'Medium', riskScore: 58, overall: 62, trend: 'stable', subjects: { Math: 65, Science: 60, English: 58, Social: 68, Hindi: 62 }, attendance: 78, competencies: { critical: 60, creative: 65, communication: 55, collaboration: 62, digital: 70 } },
  { id: 5, name: 'Karan Mehta', class: '9-A', risk: 'Medium', riskScore: 52, overall: 65, trend: 'up', subjects: { Math: 70, Science: 68, English: 55, Social: 62, Hindi: 72 }, attendance: 82, competencies: { critical: 65, creative: 70, communication: 58, collaboration: 68, digital: 75 } },
  { id: 6, name: 'Ananya Gupta', class: '10-A', risk: 'Low', riskScore: 10, overall: 92, trend: 'up', subjects: { Math: 95, Science: 90, English: 88, Social: 92, Hindi: 94 }, attendance: 97, competencies: { critical: 90, creative: 92, communication: 88, collaboration: 85, digital: 95 } },
];

const RISK_COLORS = {
  Low: { bg: 'var(--color-green-bg)', text: 'var(--color-green-text)', bar: 'var(--color-green)' },
  Medium: { bg: 'var(--color-amber-bg)', text: 'var(--color-amber-text)', bar: 'var(--color-amber)' },
  High: { bg: 'var(--color-red-bg)', text: 'var(--color-red-text)', bar: 'var(--color-red)' },
};

export default function StudentLearningIntelligence() {
  const [filterRisk, setFilterRisk] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filtered = STUDENTS.filter(s => !filterRisk || s.risk === filterRisk);
  const highCount = STUDENTS.filter(s => s.risk === 'High').length;
  const medCount = STUDENTS.filter(s => s.risk === 'Medium').length;

  return (
    <div className="page">
      <PageHeader
        title="Student Learning Intelligence"
        subtitle={`${highCount} high risk · ${medCount} medium risk · AI-powered academic analytics`}
        eyebrow="Learning Intelligence"
      />

      {/* KPI Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Monitored', value: STUDENTS.length, icon: Brain, color: 'var(--color-blue-bg)', iconColor: 'var(--color-blue-text)' },
          { label: 'High Risk', value: highCount, icon: AlertTriangle, color: 'var(--color-red-bg)', iconColor: 'var(--color-red-text)' },
          { label: 'Medium Risk', value: medCount, icon: Activity, color: 'var(--color-amber-bg)', iconColor: 'var(--color-amber-text)' },
          { label: 'Avg Performance', value: Math.round(STUDENTS.reduce((a, s) => a + s.overall, 0) / STUDENTS.length) + '%', icon: TrendingUp, color: 'var(--color-green-bg)', iconColor: 'var(--color-green-text)' },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="card" style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: kpi.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: kpi.iconColor }}>
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{kpi.value}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{kpi.label}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter */}
      <div className="card" style={{ padding: '0.75rem 1rem', marginBottom: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Risk Level:</span>
        {['', 'High', 'Medium', 'Low'].map(r => (
          <button
            key={r}
            className={`tab ${filterRisk === r ? 'active' : ''}`}
            onClick={() => setFilterRisk(r)}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem' }}
          >
            {r || 'All Students'}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedStudent ? '1fr 400px' : '1fr', gap: '1.5rem' }}>
        {/* Student List */}
        <div className="card">
          <div className="table-responsive">
            <table className="ap-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Overall</th>
                  <th>Attendance</th>
                  <th>Risk Level</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id} onClick={() => setSelectedStudent(s)} style={{ cursor: 'pointer', background: selectedStudent?.id === s.id ? 'var(--color-primary-light)' : 'transparent' }}>
                    <td style={{ fontWeight: 500 }}>{s.name}</td>
                    <td>{s.class}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '60px', height: '6px', borderRadius: '3px', background: 'var(--color-surface-3)', overflow: 'hidden' }}>
                          <div style={{ width: `${s.overall}%`, height: '100%', borderRadius: '3px', background: s.overall >= 70 ? 'var(--color-green)' : s.overall >= 50 ? 'var(--color-amber)' : 'var(--color-red)' }} />
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{s.overall}%</span>
                      </div>
                    </td>
                    <td>{s.attendance}%</td>
                    <td>
                      <span className="badge" style={{ background: RISK_COLORS[s.risk].bg, color: RISK_COLORS[s.risk].text }}>{s.risk} Risk</span>
                    </td>
                    <td>{s.trend === 'up' ? '↗️ Improving' : s.trend === 'down' ? '↘️ Declining' : '→ Stable'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        {selectedStudent && (
          <div className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem' }}>{selectedStudent.name}</h3>
            <p style={{ margin: '0 0 1.25rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Class {selectedStudent.class} · {selectedStudent.attendance}% attendance</p>

            <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.9rem' }}>Subject Performance</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {Object.entries(selectedStudent.subjects).map(([subj, score]) => (
                <div key={subj} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '70px', fontSize: '0.82rem', fontWeight: 500 }}>{subj}</span>
                  <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: 'var(--color-surface-3)', overflow: 'hidden' }}>
                    <div style={{ width: `${score}%`, height: '100%', borderRadius: '4px', background: score >= 70 ? 'var(--color-green)' : score >= 50 ? 'var(--color-amber)' : 'var(--color-red)', transition: 'width 0.5s ease' }} />
                  </div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, width: '35px', textAlign: 'right' }}>{score}%</span>
                </div>
              ))}
            </div>

            <h4 style={{ margin: '0 0 0.75rem', fontSize: '0.9rem' }}>Competency Radar</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {Object.entries(selectedStudent.competencies).map(([comp, val]) => (
                <div key={comp} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: '100px', fontSize: '0.78rem', fontWeight: 500, textTransform: 'capitalize' }}>{comp}</span>
                  <div style={{ flex: 1, height: '8px', borderRadius: '4px', background: 'var(--color-surface-3)', overflow: 'hidden' }}>
                    <div style={{ width: `${val}%`, height: '100%', borderRadius: '4px', background: 'var(--color-primary)', transition: 'width 0.5s ease' }} />
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, width: '35px', textAlign: 'right' }}>{val}%</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: '10px', background: selectedStudent.risk === 'High' ? 'var(--color-red-bg)' : selectedStudent.risk === 'Medium' ? 'var(--color-amber-bg)' : 'var(--color-green-bg)', fontSize: '0.85rem' }}>
              <strong>AI Insight:</strong> {selectedStudent.risk === 'High' ? 'Immediate intervention recommended. Schedule parent meeting and assign peer tutor.' : selectedStudent.risk === 'Medium' ? 'Monitor closely. Consider additional support in weak subjects.' : 'Student is performing well. Consider enrichment opportunities.'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
