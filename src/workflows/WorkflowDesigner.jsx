import { useState } from 'react';
import { 
  GitBranch, Plus, Settings, ChevronRight, Save, Play, 
  Trash2, AlertTriangle, Clock, CheckCircle 
} from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { WORKFLOW_TRIGGERS, SLA_PRIORITIES } from './workflowSchema.js';

export default function WorkflowDesigner() {
  const [activeTab, setActiveTab] = useState('designer'); // designer, templates
  const [workflowName, setWorkflowName] = useState('New Approval Workflow');
  const [trigger, setTrigger] = useState(WORKFLOW_TRIGGERS.MANUAL);
  const [slaPriority, setSlaPriority] = useState('P3');

  const [steps, setSteps] = useState([
    { id: 1, name: 'HOD Approval', role: 'HOD', action: 'APPROVE', escalationHours: 24, escalateTo: 'Principal' }
  ]);

  const addStep = () => {
    setSteps([...steps, {
      id: steps.length + 1,
      name: 'New Step',
      role: 'Manager',
      action: 'APPROVE',
      escalationHours: 24,
      escalateTo: 'Director'
    }]);
  };

  const removeStep = (id) => {
    if (steps.length === 1) return;
    setSteps(steps.filter(s => s.id !== id));
  };

  return (
    <div className="page">
      <PageHeader
        title="Workflow Designer"
        subtitle="Create and manage automated approval workflows and business rules."
        eyebrow="Workflow Engine"
      />

      <div className="tabs" style={{ marginBottom: '1.5rem' }}>
        <button 
          className={`tab ${activeTab === 'designer' ? 'active' : ''}`}
          onClick={() => setActiveTab('designer')}
        >
          Visual Designer
        </button>
        <button 
          className={`tab ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          Templates Library
        </button>
      </div>

      {activeTab === 'designer' && (
        <div className="wf-designer-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
          
          {/* Main Canvas */}
          <div className="card wf-canvas" style={{ minHeight: '600px', background: 'var(--color-bg-secondary)', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="wf-trigger-node" style={{ background: 'var(--color-bg-primary)', padding: '1rem', borderRadius: '12px', border: '1px dashed var(--color-border)', width: '300px', textAlign: 'center', marginBottom: '2rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'inline-flex', background: 'var(--color-indigo-bg)', color: 'var(--color-indigo-text)', padding: '0.5rem', borderRadius: '50%', marginBottom: '0.5rem' }}>
                <Play size={20} />
              </div>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Workflow Trigger</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{trigger}</p>
            </div>

            {steps.map((step, index) => (
              <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                {/* Connector line */}
                <div style={{ width: '2px', height: '40px', background: 'var(--color-border)' }}></div>
                
                {/* Step Node */}
                <div className="wf-step-node" style={{ background: 'var(--color-bg-primary)', padding: '1rem 1.5rem', borderRadius: '12px', border: '1px solid var(--color-border)', width: '400px', boxShadow: 'var(--shadow-sm)', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span className="badge" style={{ background: 'var(--color-bg-secondary)' }}>Step {index + 1}</span>
                      <h4 style={{ margin: 0, fontSize: '1rem' }}>{step.name}</h4>
                    </div>
                    <button className="btn-icon" onClick={() => removeStep(step.id)} style={{ color: 'var(--color-red-text)' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.875rem' }}>
                    <div>
                      <label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Assignee Role</label>
                      <div style={{ fontWeight: 500 }}>{step.role}</div>
                    </div>
                    <div>
                      <label style={{ display: 'block', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Action</label>
                      <div style={{ fontWeight: 500 }}>{step.action}</div>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--color-border)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AlertTriangle size={14} style={{ color: 'var(--color-amber-text)' }} />
                    <span style={{ color: 'var(--color-text-muted)' }}>Escalates to <strong>{step.escalateTo}</strong> after {step.escalationHours}h</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Step Button */}
            <div style={{ width: '2px', height: '40px', background: 'var(--color-border)' }}></div>
            <button className="btn btn--secondary" onClick={addStep} style={{ borderRadius: '50px', padding: '0.5rem 1.5rem' }}>
              <Plus size={16} /> Add Approval Step
            </button>
            
            {/* End Node */}
            <div style={{ width: '2px', height: '40px', background: 'var(--color-border)' }}></div>
            <div className="wf-end-node" style={{ background: 'var(--color-bg-primary)', padding: '0.75rem 1.5rem', borderRadius: '50px', border: '1px solid var(--color-border)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={16} style={{ color: 'var(--color-green-text)' }} /> Workflow Complete
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="card wf-config" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
              <Settings size={20} style={{ color: 'var(--color-text-muted)' }} />
              <h3 style={{ margin: 0 }}>Configuration</h3>
            </div>
            
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Workflow Name</label>
              <input 
                type="text" 
                className="ap-wf-comment-input" 
                value={workflowName}
                onChange={e => setWorkflowName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Trigger Event</label>
              <select 
                className="ap-select" 
                value={trigger}
                onChange={e => setTrigger(e.target.value)}
                style={{ width: '100%' }}
              >
                {Object.values(WORKFLOW_TRIGGERS).map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label>Global SLA Priority</label>
              <select 
                className="ap-select" 
                value={slaPriority}
                onChange={e => setSlaPriority(e.target.value)}
                style={{ width: '100%' }}
              >
                {Object.values(SLA_PRIORITIES).map(p => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </div>
            
            <button className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
              <Save size={16} /> Save Workflow
            </button>
          </div>
        </div>
      )}
      
      {activeTab === 'templates' && (
        <div className="card ap-empty">
          <GitBranch size={40} style={{ opacity: 0.2 }} />
          <p>Template library coming soon.</p>
        </div>
      )}
    </div>
  );
}
