import { useState } from 'react';
import { Clock, Activity, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { SLA_PRIORITIES } from '../workflows/workflowSchema.js';
import { activeWorkflows } from '../workflows/workflowData.js';

export default function SLAManagement() {
  const breachedCount = activeWorkflows.filter(w => new Date(w.slaBreachAt) < new Date()).length;
  const compliantCount = activeWorkflows.length - breachedCount;
  const complianceRate = Math.round((compliantCount / activeWorkflows.length) * 100) || 0;

  return (
    <div className="page">
      <PageHeader
        title="SLA Management"
        subtitle="Track Service Level Agreements for workflows and approvals."
        eyebrow="Workflow Engine"
      />

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card stat-card" style={{ padding: '1.5rem' }}>
          <div className="stat-card__icon" style={{ background: 'var(--color-blue-bg)', color: 'var(--color-blue-text)', padding: '0.75rem', borderRadius: '12px', display: 'inline-flex', marginBottom: '1rem' }}>
            <Activity size={24} />
          </div>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>Total Active</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0.5rem 0 0 0' }}>{activeWorkflows.length}</p>
        </div>
        
        <div className="card stat-card" style={{ padding: '1.5rem' }}>
          <div className="stat-card__icon" style={{ background: 'var(--color-green-bg)', color: 'var(--color-green-text)', padding: '0.75rem', borderRadius: '12px', display: 'inline-flex', marginBottom: '1rem' }}>
            <CheckCircle size={24} />
          </div>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>SLA Compliant</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0.5rem 0 0 0' }}>{compliantCount}</p>
        </div>
        
        <div className="card stat-card" style={{ padding: '1.5rem' }}>
          <div className="stat-card__icon" style={{ background: 'var(--color-red-bg)', color: 'var(--color-red-text)', padding: '0.75rem', borderRadius: '12px', display: 'inline-flex', marginBottom: '1rem' }}>
            <AlertTriangle size={24} />
          </div>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>SLA Breached</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0.5rem 0 0 0' }}>{breachedCount}</p>
        </div>
        
        <div className="card stat-card" style={{ padding: '1.5rem' }}>
          <div className="stat-card__icon" style={{ background: 'var(--color-indigo-bg)', color: 'var(--color-indigo-text)', padding: '0.75rem', borderRadius: '12px', display: 'inline-flex', marginBottom: '1rem' }}>
            <TrendingUp size={24} />
          </div>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>Compliance Rate</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0.5rem 0 0 0' }}>{complianceRate}%</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ margin: '0 0 1.5rem 0' }}>SLA Policies</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {Object.values(SLA_PRIORITIES).map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: p.bg, color: p.color, width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                    {p.id}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{p.label.split(' ')[0]} Priority</h4>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Resolution target</p>
                  </div>
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                  {p.hours}h
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ margin: '0 0 1.5rem 0' }}>Breached Workflows</h3>
          <div className="table-responsive">
            <table className="ap-table">
              <thead>
                <tr>
                  <th>Workflow</th>
                  <th>Requester</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {activeWorkflows.filter(w => new Date(w.slaBreachAt) < new Date()).map(w => (
                  <tr key={w.id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{w.templateName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-red-text)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                        <Clock size={12} /> Breached {new Date(w.slaBreachAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td>{w.requesterName}</td>
                    <td>
                      <span className="badge" style={{ background: 'var(--color-red-bg)', color: 'var(--color-red-text)' }}>{w.status}</span>
                    </td>
                  </tr>
                ))}
                {breachedCount === 0 && (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem' }}>
                      No breached SLAs. Great job!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
