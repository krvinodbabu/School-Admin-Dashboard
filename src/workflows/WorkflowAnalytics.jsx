import { useState } from 'react';
import { BarChart2, PieChart, Activity, Clock, TrendingUp } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { activeWorkflows } from '../workflows/workflowData.js';

export default function WorkflowAnalytics() {
  const totalWorkflows = activeWorkflows.length;
  const avgResolutionTime = '2.5 Days'; // Mock data

  return (
    <div className="page">
      <PageHeader
        title="Workflow Analytics"
        subtitle="Insights and performance metrics for organizational workflows."
        eyebrow="Workflow Engine"
      />

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card stat-card" style={{ padding: '1.5rem' }}>
          <div className="stat-card__icon" style={{ background: 'var(--color-blue-bg)', color: 'var(--color-blue-text)', padding: '0.75rem', borderRadius: '12px', display: 'inline-flex', marginBottom: '1rem' }}>
            <Activity size={24} />
          </div>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>Total Volume</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0.5rem 0 0 0' }}>{totalWorkflows}</p>
        </div>
        
        <div className="card stat-card" style={{ padding: '1.5rem' }}>
          <div className="stat-card__icon" style={{ background: 'var(--color-amber-bg)', color: 'var(--color-amber-text)', padding: '0.75rem', borderRadius: '12px', display: 'inline-flex', marginBottom: '1rem' }}>
            <Clock size={24} />
          </div>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>Avg. Resolution Time</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0.5rem 0 0 0' }}>{avgResolutionTime}</p>
        </div>
        
        <div className="card stat-card" style={{ padding: '1.5rem' }}>
          <div className="stat-card__icon" style={{ background: 'var(--color-green-bg)', color: 'var(--color-green-text)', padding: '0.75rem', borderRadius: '12px', display: 'inline-flex', marginBottom: '1rem' }}>
            <TrendingUp size={24} />
          </div>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>Efficiency Score</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0.5rem 0 0 0' }}>92%</p>
        </div>

        <div className="card stat-card" style={{ padding: '1.5rem' }}>
          <div className="stat-card__icon" style={{ background: 'var(--color-indigo-bg)', color: 'var(--color-indigo-text)', padding: '0.75rem', borderRadius: '12px', display: 'inline-flex', marginBottom: '1rem' }}>
            <BarChart2 size={24} />
          </div>
          <h3 style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>Active Templates</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: '0.5rem 0 0 0' }}>3</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="card" style={{ padding: '2rem', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <PieChart size={64} style={{ opacity: 0.1, marginBottom: '1rem' }} />
          <h3 style={{ margin: 0 }}>Workflows by Department</h3>
          <p style={{ color: 'var(--color-text-muted)' }}>Interactive chart coming soon</p>
        </div>

        <div className="card" style={{ padding: '2rem', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <BarChart2 size={64} style={{ opacity: 0.1, marginBottom: '1rem' }} />
          <h3 style={{ margin: 0 }}>Escalation Trends</h3>
          <p style={{ color: 'var(--color-text-muted)' }}>Interactive chart coming soon</p>
        </div>
      </div>
    </div>
  );
}
