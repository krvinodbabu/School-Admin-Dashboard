/**
 * Approval Workflow — management review of lesson plan submissions.
 */
import { useState } from 'react'
import {
  CheckCircle, XCircle, Clock, MessageSquare, Send, ChevronDown, ChevronUp,
  User, FileText, AlertTriangle,
} from 'lucide-react'
import PageHeader from '../../components/PageHeader.jsx'
import { workflowItems, SUBJECTS } from '../../data/academicPlanningData.js'

const WF_STATUS_CLASS = {
  'Pending Review': 'status-pending',
  'Under Review':   'status-leave',
  'Needs Revision': 'status-overdue',
  'Approved':       'status-paid',
}

const PRIORITY_CLASS = {
  High:   { bg: 'var(--color-red-bg)',   text: 'var(--color-red-text)' },
  Normal: { bg: 'var(--color-blue-bg)',  text: 'var(--color-blue-text)' },
}

export default function ApprovalWorkflow() {
  const [expanded, setExpanded]         = useState(null)
  const [filterStatus, setFilterStatus] = useState('')
  const [comment, setComment]           = useState('')

  const statuses = [...new Set(workflowItems.map(w => w.status))]

  const filtered = workflowItems.filter(w =>
    !filterStatus || w.status === filterStatus
  )

  const pendingCount = workflowItems.filter(w => w.status === 'Pending Review').length
  const reviewCount  = workflowItems.filter(w => w.status === 'Under Review').length
  const revisionCount = workflowItems.filter(w => w.status === 'Needs Revision').length

  return (
    <div className="page">
      <PageHeader
        title="Approval Workflow"
        subtitle={`${pendingCount} pending · ${reviewCount} under review · ${revisionCount} need revision`}
        eyebrow="Academic Planning"
      />

      {/* Summary KPI strip */}
      <div className="ap-wf-kpis">
        <div className="ap-wf-kpi">
          <div className="ap-wf-kpi__icon" style={{ background: 'var(--color-amber-bg)', color: 'var(--color-amber-text)' }}>
            <Clock size={18} />
          </div>
          <div>
            <span className="ap-wf-kpi__value">{pendingCount}</span>
            <span className="ap-wf-kpi__label">Pending Review</span>
          </div>
        </div>
        <div className="ap-wf-kpi">
          <div className="ap-wf-kpi__icon" style={{ background: 'var(--color-indigo-bg)', color: 'var(--color-indigo-text)' }}>
            <FileText size={18} />
          </div>
          <div>
            <span className="ap-wf-kpi__value">{reviewCount}</span>
            <span className="ap-wf-kpi__label">Under Review</span>
          </div>
        </div>
        <div className="ap-wf-kpi">
          <div className="ap-wf-kpi__icon" style={{ background: 'var(--color-red-bg)', color: 'var(--color-red-text)' }}>
            <AlertTriangle size={18} />
          </div>
          <div>
            <span className="ap-wf-kpi__value">{revisionCount}</span>
            <span className="ap-wf-kpi__label">Needs Revision</span>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="card ap-inline-filters" style={{ marginBottom: '1.25rem' }}>
        <select className="ap-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} id="wf-filter-status">
          <option value="">All Statuses</option>
          {statuses.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Workflow items */}
      <div className="ap-wf-list">
        {filtered.length === 0 && (
          <div className="ap-empty">
            <CheckCircle size={40} style={{ opacity: 0.2 }} />
            <p>No items matching your filter.</p>
          </div>
        )}

        {filtered.map(item => {
          const isExpanded = expanded === item.id
          return (
            <div key={item.id} className="card ap-wf-item" style={{ marginBottom: '1rem' }}>
              {/* Header */}
              <div className="ap-wf-item__header" onClick={() => setExpanded(isExpanded ? null : item.id)} style={{ cursor: 'pointer' }}>
                <div className="ap-wf-item__info">
                  <div className="ap-wf-item__avatar">
                    {item.teacher.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="ap-wf-item__name">{item.teacher}</h3>
                    <p className="ap-wf-item__meta">
                      {item.subject} · Grade {item.grade} · Week {item.week} · Submitted {item.submittedDate}
                    </p>
                  </div>
                </div>
                <div className="ap-wf-item__right">
                  <span className="badge" style={{ background: PRIORITY_CLASS[item.priority].bg, color: PRIORITY_CLASS[item.priority].text }}>
                    {item.priority}
                  </span>
                  <span className={`badge ${WF_STATUS_CLASS[item.status] || 'status-default'}`}>
                    {item.status}
                  </span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* Expanded panel */}
              {isExpanded && (
                <div className="ap-wf-item__expanded">
                  {/* Activity Timeline */}
                  <div className="ap-wf-section">
                    <h4 className="ap-wf-section__title">Revision History</h4>
                    <div className="ap-timeline ap-timeline--compact">
                      {item.history.map((h, idx) => (
                        <div key={idx} className="ap-timeline__item">
                          <div className="ap-timeline__connector">
                            <div className="ap-timeline__icon ap-timeline__icon--sm">
                              {h.action.includes('Approved') ? <CheckCircle size={12} /> :
                               h.action.includes('Revision') ? <AlertTriangle size={12} /> :
                               <Clock size={12} />}
                            </div>
                            {idx < item.history.length - 1 && <div className="ap-timeline__line" />}
                          </div>
                          <div className="ap-timeline__content">
                            <div className="ap-timeline__title" style={{ fontSize: '0.82rem' }}>
                              <strong>{h.action}</strong> by {h.by}
                            </div>
                            <div className="ap-timeline__dates" style={{ fontSize: '0.75rem' }}>
                              <span>{h.date}</span>
                              <span style={{ color: 'var(--color-text-muted)' }}>{h.note}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comments */}
                  {item.comments.length > 0 && (
                    <div className="ap-wf-section">
                      <h4 className="ap-wf-section__title">
                        <MessageSquare size={14} /> Comments ({item.comments.length})
                      </h4>
                      <div className="ap-wf-comments">
                        {item.comments.map((c, idx) => (
                          <div key={idx} className="ap-wf-comment">
                            <div className="ap-wf-comment__avatar">
                              {c.by.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div className="ap-wf-comment__body">
                              <div className="ap-wf-comment__header">
                                <strong>{c.by}</strong>
                                <span>{c.date}</span>
                              </div>
                              <p className="ap-wf-comment__text">{c.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add comment */}
                  <div className="ap-wf-add-comment">
                    <input
                      type="text"
                      className="ap-wf-comment-input"
                      placeholder="Add a comment…"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    />
                    <button className="btn btn--secondary btn--sm"><Send size={14} /> Send</button>
                  </div>

                  {/* Action buttons */}
                  <div className="ap-wf-actions">
                    <button className="btn btn--primary" style={{ background: 'var(--gradient-green)' }} id={`wf-approve-${item.id}`}>
                      <CheckCircle size={15} /> Approve
                    </button>
                    <button className="btn btn--primary" style={{ background: 'var(--gradient-red)' }} id={`wf-reject-${item.id}`}>
                      <XCircle size={15} /> Request Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
