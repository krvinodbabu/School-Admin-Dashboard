/**
 * AI Ethics & Governance — Usage logs, transparency indicators,
 * human review requirements, and AI recommendation explanations.
 */
import { useState } from 'react';
import { Shield, Eye, CheckCircle, AlertTriangle, Clock, Bot, User, FileText } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';

const AI_LOGS = [
  { id: 1, timestamp: '2023-11-01 14:32:15', action: 'Lesson Plan Generated', module: 'Teacher Copilot', user: 'Sarah Jenkins', status: 'AI Generated', reviewed: true, reviewer: 'Principal Smith', confidence: 94 },
  { id: 2, timestamp: '2023-11-01 14:15:42', action: 'Student Risk Assessment', module: 'Learning Intelligence', user: 'System (Scheduled)', status: 'AI Generated', reviewed: true, reviewer: 'Academic Coordinator', confidence: 88 },
  { id: 3, timestamp: '2023-11-01 13:45:10', action: 'Fee Default Prediction', module: 'Management AI', user: 'Finance Team', status: 'AI Generated', reviewed: false, reviewer: null, confidence: 85 },
  { id: 4, timestamp: '2023-11-01 12:30:00', action: 'Career Path Recommendation', module: 'Career Guidance', user: 'System (Batch)', status: 'AI Generated', reviewed: false, reviewer: null, confidence: 82 },
  { id: 5, timestamp: '2023-11-01 11:20:33', action: 'MCQ Set Generated', module: 'Teacher Copilot', user: 'Mark Robinson', status: 'AI Generated', reviewed: true, reviewer: 'HOD Mathematics', confidence: 89 },
  { id: 6, timestamp: '2023-11-01 10:05:18', action: 'Attendance Trend Analysis', module: 'Parent Copilot', user: 'Parent Portal', status: 'AI Generated', reviewed: false, reviewer: null, confidence: 95 },
  { id: 7, timestamp: '2023-10-31 16:45:00', action: 'Route Optimization', module: 'Transport AI', user: 'Transport Manager', status: 'AI Generated', reviewed: true, reviewer: 'Operations Head', confidence: 87 },
  { id: 8, timestamp: '2023-10-31 15:10:22', action: 'Staff Attrition Forecast', module: 'Management AI', user: 'HR Team', status: 'AI Generated', reviewed: false, reviewer: null, confidence: 82 },
];

const GOVERNANCE_POLICIES = [
  { name: 'Student Data Access', requirement: 'All AI queries involving student PII must be logged and auditable.', status: 'Enforced' },
  { name: 'Human Review for Decisions', requirement: 'Any AI recommendation affecting student placement or grading requires human verification.', status: 'Enforced' },
  { name: 'Transparency Labels', requirement: 'All AI-generated content must display "AI Generated" badges visibly.', status: 'Enforced' },
  { name: 'Bias Monitoring', requirement: 'AI models must be tested quarterly for demographic bias in predictions.', status: 'Scheduled' },
  { name: 'Data Retention', requirement: 'AI interaction logs retained for 2 years, then anonymized.', status: 'Enforced' },
];

export default function AIGovernance() {
  const [activeTab, setActiveTab] = useState('logs');

  const reviewedCount = AI_LOGS.filter(l => l.reviewed).length;
  const pendingReview = AI_LOGS.filter(l => !l.reviewed).length;

  return (
    <div className="page">
      <PageHeader
        title="AI Ethics & Governance"
        subtitle="Transparency, accountability, and human oversight for all AI operations."
        eyebrow="AI Governance"
      />

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-blue-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-blue-text)' }}>
            <Bot size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{AI_LOGS.length}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>AI Interactions</div>
          </div>
        </div>
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-green-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-green-text)' }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{reviewedCount}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Human Verified</div>
          </div>
        </div>
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-amber-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-amber-text)' }}>
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{pendingReview}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Pending Review</div>
          </div>
        </div>
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-indigo-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-indigo-text)' }}>
            <Eye size={20} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{Math.round(AI_LOGS.reduce((a, l) => a + l.confidence, 0) / AI_LOGS.length)}%</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Avg Confidence</div>
          </div>
        </div>
      </div>

      <div className="tabs" style={{ marginBottom: '1.5rem' }}>
        <button className={`tab ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}>Usage Logs</button>
        <button className={`tab ${activeTab === 'policies' ? 'active' : ''}`} onClick={() => setActiveTab('policies')}>Governance Policies</button>
      </div>

      {activeTab === 'logs' && (
        <div className="card">
          <div className="table-responsive">
            <table className="ap-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Action</th>
                  <th>Module</th>
                  <th>User</th>
                  <th>Status</th>
                  <th>Confidence</th>
                  <th>Review</th>
                </tr>
              </thead>
              <tbody>
                {AI_LOGS.map(log => (
                  <tr key={log.id}>
                    <td style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>{log.timestamp}</td>
                    <td style={{ fontWeight: 500 }}>{log.action}</td>
                    <td><span className="badge" style={{ background: 'var(--color-surface-3)', fontSize: '0.72rem' }}>{log.module}</span></td>
                    <td style={{ fontSize: '0.88rem' }}>{log.user}</td>
                    <td>
                      <span className="badge" style={{ background: 'var(--color-indigo-bg)', color: 'var(--color-indigo-text)', display: 'flex', alignItems: 'center', gap: '0.25rem', width: 'fit-content' }}>
                        <Bot size={10} /> AI Generated
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '40px', height: '5px', borderRadius: '3px', background: 'var(--color-surface-3)', overflow: 'hidden' }}>
                          <div style={{ width: `${log.confidence}%`, height: '100%', borderRadius: '3px', background: log.confidence >= 90 ? 'var(--color-green)' : 'var(--color-blue)' }} />
                        </div>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{log.confidence}%</span>
                      </div>
                    </td>
                    <td>
                      {log.reviewed ? (
                        <span className="badge" style={{ background: 'var(--color-green-bg)', color: 'var(--color-green-text)', display: 'flex', alignItems: 'center', gap: '0.25rem', width: 'fit-content' }}>
                          <User size={10} /> Verified
                        </span>
                      ) : (
                        <span className="badge" style={{ background: 'var(--color-amber-bg)', color: 'var(--color-amber-text)', fontSize: '0.72rem' }}>
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'policies' && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ margin: '0 0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={18} /> AI Governance Framework
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {GOVERNANCE_POLICIES.map((policy, i) => (
              <div key={i} style={{ padding: '1.25rem', borderRadius: '10px', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.35rem', fontSize: '0.95rem' }}>{policy.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{policy.requirement}</p>
                </div>
                <span className="badge" style={{
                  background: policy.status === 'Enforced' ? 'var(--color-green-bg)' : 'var(--color-amber-bg)',
                  color: policy.status === 'Enforced' ? 'var(--color-green-text)' : 'var(--color-amber-text)',
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}>
                  {policy.status === 'Enforced' ? '✅' : '📅'} {policy.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
