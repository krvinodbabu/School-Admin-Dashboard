/**
 * Management AI Analytics — Executive AI dashboard with predictions,
 * trend indicators, what-if simulations, and institutional forecasts.
 */
import { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, GraduationCap, UserMinus, AlertTriangle, Sparkles, BarChart2, RefreshCw } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';

const PREDICTIONS = [
  { id: 'fee', label: 'Fee Default Prediction', value: '12.4%', change: '+4.2%', direction: 'up', risk: 'High', icon: DollarSign, color: 'var(--color-red)', bg: 'var(--color-red-bg)', detail: '14 families predicted to default. Send early reminders to flagged accounts. Estimated recovery with intervention: 91%.' },
  { id: 'admission', label: 'Admission Conversion', value: '68%', change: '+5%', direction: 'up', risk: 'Medium', icon: GraduationCap, color: 'var(--color-green)', bg: 'var(--color-green-bg)', detail: 'Out of 120 inquiries, 82 expected to convert. Follow up with 38 undecided families by end of week.' },
  { id: 'dropout', label: 'Student Dropout Risk', value: '3.2%', change: '-0.5%', direction: 'down', risk: 'Low', icon: UserMinus, color: 'var(--color-amber)', bg: 'var(--color-amber-bg)', detail: '8 students flagged. Primary risk factors: attendance < 60%, failing 2+ subjects, behavioral incidents.' },
  { id: 'attrition', label: 'Staff Attrition Risk', value: '23%', change: '+8%', direction: 'up', risk: 'High', icon: Users, color: 'var(--color-red)', bg: 'var(--color-red-bg)', detail: 'Mathematics department highest risk. 2 teachers with 5+ years, no promotion. Conduct retention interviews.' },
];

const WHAT_IF = [
  { scenario: 'Increase teacher salary by 10%', impact: 'Predicted attrition drops to 12%', confidence: 85 },
  { scenario: 'Add 1 section to Grade 8', impact: 'Need 3 additional teachers, ₹12L annual cost', confidence: 90 },
  { scenario: 'Implement early warning system', impact: 'Dropout risk reduces by 40%', confidence: 78 },
  { scenario: 'Offer fee installment plans', impact: 'Default rate drops to 5.8%', confidence: 82 },
];

const MONTHLY_TRENDS = [
  { month: 'Jul', enrollment: 95, collection: 92, performance: 74 },
  { month: 'Aug', enrollment: 96, collection: 88, performance: 72 },
  { month: 'Sep', enrollment: 94, collection: 85, performance: 76 },
  { month: 'Oct', enrollment: 97, collection: 90, performance: 78 },
  { month: 'Nov', enrollment: 97, collection: 82, performance: 80 },
  { month: 'Dec', enrollment: 96, collection: 78, performance: 77 },
];

export default function ManagementAI() {
  const [activeScenario, setActiveScenario] = useState(null);

  return (
    <div className="page">
      <PageHeader
        title="Management AI Analytics"
        subtitle="Executive intelligence dashboard with predictive analytics and what-if simulations."
        eyebrow="AI Intelligence"
      />

      {/* Prediction Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '2rem' }}>
        {PREDICTIONS.map(p => {
          const Icon = p.icon;
          return (
            <div key={p.id} className="card" style={{ padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '60px', height: '60px', borderRadius: '50%', background: p.bg, opacity: 0.5 }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', position: 'relative' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.color }}>
                  <Icon size={20} />
                </div>
                <span className="badge" style={{ background: p.bg, color: p.color, fontSize: '0.7rem' }}>{p.risk} Risk</span>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, position: 'relative' }}>{p.value}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>{p.label}</div>
              <div style={{ fontSize: '0.78rem', color: p.direction === 'up' ? 'var(--color-red-text)' : 'var(--color-green-text)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {p.direction === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {p.change} vs last quarter
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* AI Recommendations */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} style={{ color: 'var(--color-primary)' }} /> AI Recommendations
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {PREDICTIONS.map(p => (
              <div key={p.id} style={{ padding: '1rem', borderRadius: '10px', background: 'var(--color-surface-3)', borderLeft: `3px solid ${p.color}` }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.35rem' }}>{p.label}</div>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{p.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What-If Simulator */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <RefreshCw size={18} style={{ color: 'var(--color-amber-text)' }} /> What-If Simulator
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {WHAT_IF.map((w, i) => (
              <div
                key={i}
                onClick={() => setActiveScenario(activeScenario === i ? null : i)}
                style={{ padding: '1rem', borderRadius: '10px', border: '1px solid var(--color-border)', cursor: 'pointer', background: activeScenario === i ? 'var(--color-primary-light)' : 'transparent', transition: 'all 0.2s' }}
              >
                <div style={{ fontWeight: 500, fontSize: '0.9rem', marginBottom: activeScenario === i ? '0.5rem' : 0 }}>
                  💡 {w.scenario}
                </div>
                {activeScenario === i && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', paddingTop: '0.5rem', borderTop: '1px dashed var(--color-border)' }}>
                    <strong>Predicted Impact:</strong> {w.impact}
                    <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.78rem' }}>Confidence:</span>
                      <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: 'var(--color-surface-3)', overflow: 'hidden' }}>
                        <div style={{ width: `${w.confidence}%`, height: '100%', borderRadius: '3px', background: 'var(--color-primary)' }} />
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{w.confidence}%</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="card" style={{ padding: '1.5rem', marginTop: '2rem' }}>
        <h3 style={{ margin: '0 0 1.25rem' }}>📊 Monthly Trend Analysis</h3>
        <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto' }}>
          {MONTHLY_TRENDS.map(m => (
            <div key={m.month} style={{ flex: '1', minWidth: '80px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.75rem' }}>{m.month}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {[
                  { val: m.enrollment, label: 'Enroll', color: 'var(--color-blue)' },
                  { val: m.collection, label: 'Fees', color: 'var(--color-green)' },
                  { val: m.performance, label: 'Perf', color: 'var(--color-purple)' },
                ].map(bar => (
                  <div key={bar.label}>
                    <div style={{ height: `${bar.val * 0.8}px`, background: bar.color, borderRadius: '4px 4px 0 0', opacity: 0.7, transition: 'height 0.5s ease' }} />
                    <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{bar.label} {bar.val}%</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
