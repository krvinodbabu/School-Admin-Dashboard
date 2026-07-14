/**
 * Teacher AI Copilot — AI-powered teaching assistant for lesson planning,
 * assessment generation, Bloom's taxonomy mapping, and more.
 */
import { useState } from 'react';
import {
  Sparkles, FileText, BookOpen, HelpCircle, Target, Lightbulb, Star,
  Loader, Copy, Save, RefreshCw, ChevronDown
} from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { getAIResponse, PROMPT_TEMPLATES, AI_ROLES } from '../ai/aiResponses.js';

const TEACHER_TOOLS = [
  { id: 'lesson-plan', label: 'Lesson Plan Generator', icon: FileText, desc: 'Generate complete lesson plans aligned to curriculum' },
  { id: 'homework', label: 'Homework Creator', icon: BookOpen, desc: 'Create homework and assignments with marking schemes' },
  { id: 'mcq', label: 'MCQ Generator', icon: HelpCircle, desc: 'Generate multiple-choice questions with answer keys' },
  { id: 'bloom', label: 'Bloom\'s Taxonomy Mapper', icon: Target, desc: 'Map learning objectives to Bloom\'s taxonomy levels' },
  { id: 'remediation', label: 'Remediation Planner', icon: Lightbulb, desc: 'Suggest activities for struggling students' },
  { id: 'enrichment', label: 'Enrichment Activities', icon: Star, desc: 'Suggest activities for advanced learners' },
];

export default function TeacherCopilot() {
  const [activeTool, setActiveTool] = useState(null);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState('Mathematics');
  const [grade, setGrade] = useState('8');
  const [saved, setSaved] = useState(false);

  const handleGenerate = async (toolId) => {
    setActiveTool(toolId);
    setIsLoading(true);
    setResult('');
    setSaved(false);
    try {
      const response = await getAIResponse(toolId);
      setResult(response);
    } catch {
      setResult('⚠️ Generation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h3 key={i} style={{ margin: '1rem 0 0.5rem', fontSize: '1.1rem', fontWeight: 600 }}>{line.replace('## ', '')}</h3>;
      if (line.startsWith('### ')) return <h4 key={i} style={{ margin: '0.75rem 0 0.35rem', fontSize: '1rem', fontWeight: 600 }}>{line.replace('### ', '')}</h4>;
      if (line.startsWith('| ')) return <div key={i} style={{ fontSize: '0.85rem', fontFamily: 'monospace', whiteSpace: 'pre', overflowX: 'auto' }}>{line}</div>;
      if (line.startsWith('> ')) return <div key={i} style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', borderLeft: '3px solid var(--color-primary)', paddingLeft: '0.75rem', margin: '0.75rem 0', fontStyle: 'italic' }}>{line.replace('> ', '')}</div>;
      if (line.startsWith('- ')) return <div key={i} style={{ paddingLeft: '1rem', fontSize: '0.9rem', lineHeight: 1.8 }}>• {line.replace('- ', '')}</div>;
      if (line.match(/^\d+\./)) return <div key={i} style={{ paddingLeft: '1rem', fontSize: '0.9rem', lineHeight: 1.8 }}>{line}</div>;
      if (line.trim() === '') return <div key={i} style={{ height: '0.5rem' }} />;
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return <p key={i} style={{ margin: '0.2rem 0', fontSize: '0.9rem', lineHeight: 1.7 }}>
        {parts.map((part, j) => part.startsWith('**') ? <strong key={j}>{part.replace(/\*\*/g, '')}</strong> : part)}
      </p>;
    });
  };

  return (
    <div className="page">
      <PageHeader
        title="Teacher AI Copilot"
        subtitle="AI-powered tools to accelerate lesson planning, assessment creation, and student support."
        eyebrow="AI Copilot"
      />

      {/* Configuration Bar */}
      <div className="card" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Subject:</label>
          <select className="ap-select" value={subject} onChange={e => setSubject(e.target.value)} style={{ minWidth: '140px' }}>
            <option>Mathematics</option>
            <option>Science</option>
            <option>English</option>
            <option>Social Studies</option>
            <option>Hindi</option>
            <option>Computer Science</option>
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Grade:</label>
          <select className="ap-select" value={grade} onChange={e => setGrade(e.target.value)} style={{ minWidth: '100px' }}>
            {[...Array(12)].map((_, i) => <option key={i + 1} value={i + 1}>Class {i + 1}</option>)}
          </select>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          <Sparkles size={14} style={{ color: 'var(--color-primary)' }} /> Powered by EduOS AI Engine
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: result ? '320px 1fr' : '1fr', gap: '1.5rem' }}>
        {/* Tool Cards */}
        <div style={{ display: 'flex', flexDirection: result ? 'column' : 'row', flexWrap: result ? 'nowrap' : 'wrap', gap: '1rem' }}>
          {TEACHER_TOOLS.map(tool => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <div
                key={tool.id}
                className="card"
                onClick={() => handleGenerate(tool.id)}
                style={{
                  padding: '1.25rem',
                  cursor: 'pointer',
                  border: isActive ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  transition: 'all 0.2s',
                  flex: result ? 'none' : '1 1 280px',
                  background: isActive ? 'var(--color-primary-light)' : 'var(--color-surface)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: isActive ? 'var(--gradient-brand)' : 'var(--color-surface-3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: isActive ? '#fff' : 'var(--color-text-muted)',
                  }}>
                    <Icon size={18} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '0.95rem' }}>{tool.label}</h3>
                </div>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{tool.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Result Panel */}
        {(result || isLoading) && (
          <div className="card" style={{ padding: '1.5rem', position: 'relative' }}>
            {/* Action Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={16} style={{ color: 'var(--color-primary)' }} />
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>AI Generated Output</span>
                <span className="badge" style={{ background: 'var(--color-indigo-bg)', color: 'var(--color-indigo-text)', fontSize: '0.7rem' }}>AI Generated</span>
              </div>
              {result && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn btn--secondary btn--sm" onClick={() => handleGenerate(activeTool)}><RefreshCw size={14} /> Regenerate</button>
                  <button className="btn btn--secondary btn--sm" onClick={() => navigator.clipboard?.writeText(result)}><Copy size={14} /> Copy</button>
                  <button className="btn btn--primary btn--sm" onClick={() => setSaved(true)} style={saved ? { background: 'var(--gradient-green)' } : {}}>
                    <Save size={14} /> {saved ? 'Saved!' : 'Save Draft'}
                  </button>
                </div>
              )}
            </div>

            {isLoading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 2s infinite' }}>
                  <Sparkles size={24} color="#fff" />
                </div>
                <p style={{ color: 'var(--color-text-muted)' }}>Generating with AI...</p>
              </div>
            ) : (
              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {renderContent(result)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
