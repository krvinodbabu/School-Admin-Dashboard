/**
 * Parent AI Copilot — AI-powered child progress summaries,
 * attendance trends, and learning recommendations.
 */
import { useState } from 'react';
import { Sparkles, TrendingUp, Calendar, BookOpen, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { getAIResponse } from '../ai/aiResponses.js';

const CHILDREN = [
  { id: 1, name: 'Aarav Sharma', class: '8-A', avatar: 'AS', overall: 78, attendance: 88, trend: 'Improving' },
  { id: 2, name: 'Meera Sharma', class: '5-B', avatar: 'MS', overall: 85, attendance: 94, trend: 'Stable' },
];

const DEADLINES = [
  { subject: 'Mathematics', task: 'Chapter 7 Homework', due: 'Tomorrow', urgent: true },
  { subject: 'Science', task: 'Lab Report Submission', due: 'In 3 days', urgent: false },
  { subject: 'English', task: 'Essay - "My Role Model"', due: 'Next Monday', urgent: false },
];

export default function ParentCopilot() {
  const [activeChild, setActiveChild] = useState(CHILDREN[0]);
  const [aiSummary, setAiSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadSummary = async () => {
    setIsLoading(true);
    try {
      const resp = await getAIResponse('child-progress');
      setAiSummary(resp);
    } catch {
      setAiSummary('Unable to load summary.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h3 key={i} style={{ margin: '0.75rem 0 0.5rem', fontSize: '1.05rem', fontWeight: 600 }}>{line.replace('## ', '')}</h3>;
      if (line.startsWith('### ')) return <h4 key={i} style={{ margin: '0.5rem 0 0.25rem', fontSize: '0.95rem', fontWeight: 600 }}>{line.replace('### ', '')}</h4>;
      if (line.startsWith('| ')) return <div key={i} style={{ fontSize: '0.82rem', fontFamily: 'monospace', whiteSpace: 'pre', overflowX: 'auto' }}>{line}</div>;
      if (line.startsWith('> ')) return <div key={i} style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', borderLeft: '3px solid var(--color-primary)', paddingLeft: '0.75rem', margin: '0.5rem 0', fontStyle: 'italic' }}>{line.replace('> ', '')}</div>;
      if (line.startsWith('- ')) return <div key={i} style={{ paddingLeft: '0.75rem', fontSize: '0.88rem', lineHeight: 1.7 }}>• {line.replace('- ', '')}</div>;
      if (line.match(/^\d+\./)) return <div key={i} style={{ paddingLeft: '0.75rem', fontSize: '0.88rem', lineHeight: 1.7 }}>{line}</div>;
      if (line.trim() === '') return <div key={i} style={{ height: '0.35rem' }} />;
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return <p key={i} style={{ margin: '0.15rem 0', fontSize: '0.88rem', lineHeight: 1.6 }}>
        {parts.map((part, j) => part.startsWith('**') ? <strong key={j}>{part.replace(/\*\*/g, '')}</strong> : part)}
      </p>;
    });
  };

  return (
    <div className="page">
      <PageHeader
        title="Parent AI Copilot"
        subtitle="Get AI-powered insights about your child's academic progress and recommendations."
        eyebrow="AI Copilot"
      />

      {/* Child Selector */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        {CHILDREN.map(child => (
          <div
            key={child.id}
            className="card"
            onClick={() => { setActiveChild(child); setAiSummary(''); }}
            style={{
              padding: '1rem 1.5rem', cursor: 'pointer', flex: '1',
              border: activeChild.id === child.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              display: 'flex', alignItems: 'center', gap: '1rem',
            }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--gradient-brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
              {child.avatar}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '1rem' }}>{child.name}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Class {child.class} · {child.trend}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Quick Stats */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1.25rem', fontSize: '1rem' }}>Quick Overview — {activeChild.name}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ padding: '1rem', borderRadius: '10px', background: 'var(--color-green-bg)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-green-text)' }}>{activeChild.overall}%</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-green-text)' }}>Overall Score</div>
            </div>
            <div style={{ padding: '1rem', borderRadius: '10px', background: 'var(--color-blue-bg)', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-blue-text)' }}>{activeChild.attendance}%</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-blue-text)' }}>Attendance</div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: '10px', background: 'var(--color-surface-3)', fontSize: '0.9rem' }}>
            <strong>💡 AI Insight:</strong> Your child performs strongly in Mathematics and Science but may require additional support in English writing skills. Consider 20 minutes of daily reading practice.
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1.25rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={16} /> Upcoming Deadlines
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {DEADLINES.map((d, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{d.task}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{d.subject}</div>
                </div>
                <span className="badge" style={{ background: d.urgent ? 'var(--color-red-bg)' : 'var(--color-green-bg)', color: d.urgent ? 'var(--color-red-text)' : 'var(--color-green-text)' }}>
                  {d.due}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Summary Section */}
      <div className="card" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={16} style={{ color: 'var(--color-primary)' }} /> AI Progress Report
          </h3>
          <button className="btn btn--primary btn--sm" onClick={loadSummary} disabled={isLoading}>
            <Sparkles size={14} /> {isLoading ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
        {aiSummary ? (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>{renderContent(aiSummary)}</div>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            Click "Generate Report" to get an AI-powered analysis of your child's performance.
          </div>
        )}
      </div>
    </div>
  );
}
