import { useState } from 'react';
import { 
  CheckCircle, XCircle, Clock, AlertTriangle, ChevronDown, ChevronUp, MessageSquare, Send, FileText
} from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import { activeWorkflows } from '../workflows/workflowData.js';
import { WORKFLOW_STATUS, SLA_PRIORITIES } from '../workflows/workflowSchema.js';

export default function ApprovalCenter() {
  const [activeTab, setActiveTab] = useState('pending'); // pending, my-requests, escalated
  const [expanded, setExpanded] = useState(null);
  const [comment, setComment] = useState('');

  // Filter workflows based on tabs
  const getFilteredWorkflows = () => {
    switch (activeTab) {
      case 'pending':
        return activeWorkflows.filter(w => w.status === WORKFLOW_STATUS.PENDING || w.status === WORKFLOW_STATUS.NEEDS_REVISION);
      case 'my-requests':
        return activeWorkflows.filter(w => w.requesterId === 'USR-305'); // Dummy user filter
      case 'escalated':
        return activeWorkflows.filter(w => w.status === WORKFLOW_STATUS.ESCALATED);
      default:
        return activeWorkflows;
    }
  };

  const filtered = getFilteredWorkflows();

  return (
    <div className="page">
      <PageHeader
        title="Approval Center"
        subtitle="Centralized dashboard for all workflow approvals and requests."
        eyebrow="Workflow Engine"
      />

      <div className="tabs" style={{ marginBottom: '1.5rem' }}>
        <button 
          className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending My Review
        </button>
        <button 
          className={`tab ${activeTab === 'my-requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('my-requests')}
        >
          My Requests
        </button>
        <button 
          className={`tab ${activeTab === 'escalated' ? 'active' : ''}`}
          onClick={() => setActiveTab('escalated')}
        >
          Escalated to Me
        </button>
      </div>

      <div className="ap-wf-list">
        {filtered.length === 0 && (
          <div className="ap-empty">
            <CheckCircle size={40} style={{ opacity: 0.2 }} />
            <p>No items found for this view.</p>
          </div>
        )}

        {filtered.map(item => {
          const isExpanded = expanded === item.id;
          const sla = Object.values(SLA_PRIORITIES).find(p => p.id === activeWorkflows.find(w => w.id === item.id)?.slaPriority) || SLA_PRIORITIES.P3;
          
          return (
            <div key={item.id} className="card ap-wf-item" style={{ marginBottom: '1rem' }}>
              <div className="ap-wf-item__header" onClick={() => setExpanded(isExpanded ? null : item.id)} style={{ cursor: 'pointer' }}>
                <div className="ap-wf-item__info">
                  <div className="ap-wf-item__avatar">
                    {item.requesterName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="ap-wf-item__name">{item.templateName} - {item.requesterName}</h3>
                    <p className="ap-wf-item__meta">
                      {item.department} · Current Step: {item.currentStepName} · Submitted: {new Date(item.submissionDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="ap-wf-item__right">
                  <span className="badge" style={{ background: sla.bg || 'var(--color-bg-secondary)', color: sla.color || 'var(--color-text)' }}>
                    {sla.label || 'Normal'}
                  </span>
                  <span className={`badge`} style={{ background: item.status === WORKFLOW_STATUS.ESCALATED ? 'var(--color-red-bg)' : 'var(--color-indigo-bg)', color: item.status === WORKFLOW_STATUS.ESCALATED ? 'var(--color-red-text)' : 'var(--color-indigo-text)' }}>
                    {item.status}
                  </span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {isExpanded && (
                <div className="ap-wf-item__expanded">
                  <div className="ap-wf-section">
                    <h4 className="ap-wf-section__title">Workflow History</h4>
                    <div className="ap-timeline ap-timeline--compact">
                      {item.history.map((h, idx) => (
                        <div key={idx} className="ap-timeline__item">
                          <div className="ap-timeline__connector">
                            <div className="ap-timeline__icon ap-timeline__icon--sm">
                              {h.action.includes('Approved') ? <CheckCircle size={12} /> :
                               h.action.includes('ESCALATED') ? <AlertTriangle size={12} /> :
                               <Clock size={12} />}
                            </div>
                            {idx < item.history.length - 1 && <div className="ap-timeline__line" />}
                          </div>
                          <div className="ap-timeline__content">
                            <div className="ap-timeline__title" style={{ fontSize: '0.82rem' }}>
                              <strong>{h.action}</strong> by {h.by}
                            </div>
                            <div className="ap-timeline__dates" style={{ fontSize: '0.75rem' }}>
                              <span>{new Date(h.date).toLocaleString()}</span>
                              <span style={{ color: 'var(--color-text-muted)' }}>{h.note}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {activeTab !== 'my-requests' && (
                    <>
                      <div className="ap-wf-add-comment">
                        <input
                          type="text"
                          className="ap-wf-comment-input"
                          placeholder="Add a remark..."
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        />
                      </div>
                      <div className="ap-wf-actions">
                        <button className="btn btn--primary" style={{ background: 'var(--gradient-green)' }}>
                          <CheckCircle size={15} /> Approve
                        </button>
                        <button className="btn btn--primary" style={{ background: 'var(--gradient-red)' }}>
                          <XCircle size={15} /> Reject
                        </button>
                        <button className="btn btn--secondary">
                          <MessageSquare size={15} /> Request Info
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}
