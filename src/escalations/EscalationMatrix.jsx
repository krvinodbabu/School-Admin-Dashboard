import { useState } from 'react';
import { ShieldAlert, Plus, ArrowRight, Settings, Trash2 } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { APPROVAL_LEVELS } from '../workflows/workflowSchema.js';

export default function EscalationMatrix() {
  const [rules, setRules] = useState([
    { id: 1, name: 'Standard Leave Escalation', fromRole: 'HOD', delayHours: 48, toRole: 'Principal' },
    { id: 2, name: 'Purchase Request Critical', fromRole: 'Finance', delayHours: 72, toRole: 'Director' }
  ]);

  return (
    <div className="page">
      <PageHeader
        title="Escalation Matrix"
        subtitle="Configure rules for auto-escalating delayed approvals."
        eyebrow="Workflow Engine"
      />

      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert style={{ color: 'var(--color-amber-text)' }} /> Active Rules
          </h2>
          <button className="btn btn--primary">
            <Plus size={16} /> New Rule
          </button>
        </div>

        <div className="table-responsive">
          <table className="ap-table">
            <thead>
              <tr>
                <th>Rule Name</th>
                <th>When pending with</th>
                <th>Delay threshold</th>
                <th>Escalate to</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rules.map(rule => (
                <tr key={rule.id}>
                  <td style={{ fontWeight: 500 }}>{rule.name}</td>
                  <td>
                    <span className="badge" style={{ background: 'var(--color-bg-secondary)' }}>{rule.fromRole}</span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--color-red-text)', fontWeight: 500 }}>{rule.delayHours} Hours</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <ArrowRight size={14} style={{ color: 'var(--color-text-muted)' }} />
                      <span className="badge" style={{ background: 'var(--color-indigo-bg)', color: 'var(--color-indigo-text)' }}>{rule.toRole}</span>
                    </div>
                  </td>
                  <td>
                    <button className="btn-icon"><Settings size={16} /></button>
                    <button className="btn-icon" style={{ color: 'var(--color-red-text)' }}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
