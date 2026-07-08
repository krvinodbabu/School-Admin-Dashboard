/**
 * Weekly Lesson Plans — create, filter, review, and manage lesson plans.
 */
import { useState } from 'react'
import {
  Plus, Search, Filter, Download, Eye, Edit, Send,
  CheckCircle, XCircle, ChevronDown, BookOpen, Calendar, User,
} from 'lucide-react'
import PageHeader from '../../components/PageHeader.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import {
  lessonPlans, SUBJECTS, GRADES, TERMS, ACADEMIC_YEARS, PLAN_STATUSES,
} from '../../data/academicPlanningData.js'

const STATUS_COLOR = {
  Draft: 'status-default',
  Submitted: 'status-pending',
  'Under Review': 'status-leave',
  Approved: 'status-paid',
  'Needs Revision': 'status-overdue',
}

export default function WeeklyLessonPlans() {
  const [search, setSearch] = useState('')
  const [filterSubject, setFilterSubject] = useState('')
  const [filterGrade, setFilterGrade]   = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterTerm, setFilterTerm]     = useState('')
  const [viewMode, setViewMode]         = useState('table') // 'table' | 'cards'
  const [selected, setSelected]         = useState(null)
  const [showFilters, setShowFilters]   = useState(false)

  const filtered = lessonPlans.filter((p) => {
    const q = search.toLowerCase()
    const matchSearch = !q || p.teacher.toLowerCase().includes(q) ||
      p.subject.toLowerCase().includes(q) || p.topics.toLowerCase().includes(q)
    return matchSearch &&
      (!filterSubject || p.subject === filterSubject) &&
      (!filterGrade   || p.grade === filterGrade) &&
      (!filterStatus  || p.status === filterStatus) &&
      (!filterTerm    || p.term === filterTerm)
  })

  return (
    <div className="page">
      <PageHeader
        title="Weekly Lesson Plans"
        subtitle={`${filtered.length} lesson plans · Term 1, 2025-26`}
        eyebrow="Academic Planning"
      >
        <button type="button" className="btn btn--secondary" id="lp-toggle-view"
          onClick={() => setViewMode(v => v === 'table' ? 'cards' : 'table')}>
          {viewMode === 'table' ? 'Card View' : 'Table View'}
        </button>
        <button type="button" className="btn btn--primary" id="lp-create-btn">
          <Plus size={16} /> Create Plan
        </button>
      </PageHeader>

      {/* Search + Filters */}
      <div className="ap-toolbar card" style={{ marginBottom: '1.25rem', padding: '1rem 1.25rem' }}>
        <div className="ap-toolbar__top">
          <div className="ap-search">
            <Search size={15} className="ap-search__icon" />
            <input
              type="search"
              className="ap-search__input"
              placeholder="Search teacher, subject, topic…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              id="lp-search"
            />
          </div>
          <button type="button" className="btn btn--secondary ap-filter-toggle"
            onClick={() => setShowFilters(f => !f)} id="lp-filter-btn">
            <Filter size={15} /> Filters
            <ChevronDown size={14} style={{ transform: showFilters ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
        </div>

        {showFilters && (
          <div className="ap-filters">
            <select className="ap-select" value={filterTerm} onChange={e => setFilterTerm(e.target.value)} id="lp-filter-term">
              <option value="">All Terms</option>
              {TERMS.map(t => <option key={t}>{t}</option>)}
            </select>
            <select className="ap-select" value={filterSubject} onChange={e => setFilterSubject(e.target.value)} id="lp-filter-subject">
              <option value="">All Subjects</option>
              {SUBJECTS.map(s => <option key={s}>{s}</option>)}
            </select>
            <select className="ap-select" value={filterGrade} onChange={e => setFilterGrade(e.target.value)} id="lp-filter-grade">
              <option value="">All Grades</option>
              {GRADES.map(g => <option key={g}>{g}</option>)}
            </select>
            <select className="ap-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} id="lp-filter-status">
              <option value="">All Statuses</option>
              {PLAN_STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
            <button type="button" className="btn btn--ghost" onClick={() => {
              setFilterSubject(''); setFilterGrade(''); setFilterStatus(''); setFilterTerm('')
            }}>Clear</button>
          </div>
        )}
      </div>

      {/* Detail drawer overlay */}
      {selected && (
        <div className="ap-drawer-overlay" onClick={() => setSelected(null)}>
          <div className="ap-drawer" onClick={e => e.stopPropagation()}>
            <div className="ap-drawer__header">
              <div>
                <h2 className="ap-drawer__title">{selected.subject} — Week {selected.week}</h2>
                <p className="ap-drawer__sub">{selected.teacher} · {selected.grade} · {selected.term}</p>
              </div>
              <button className="btn btn--ghost ap-drawer__close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="ap-drawer__body">
              {[
                ['Topics Covered', selected.topics],
                ['Learning Objectives', selected.objectives],
                ['Teaching Methodology', selected.methodology],
                ['Homework Assigned', selected.homework],
                ['Resources Required', selected.resources],
                ['Submitted Date', selected.submittedDate || '—'],
                ['Approved By', selected.approvedBy || '—'],
                ['Revisions', selected.revisions],
              ].map(([label, val]) => (
                <div key={label} className="ap-drawer__field">
                  <span className="ap-drawer__label">{label}</span>
                  <span className="ap-drawer__value">{val}</span>
                </div>
              ))}
              <div className="ap-drawer__field">
                <span className="ap-drawer__label">Status</span>
                <span className={`badge ${STATUS_COLOR[selected.status]}`}>{selected.status}</span>
              </div>
            </div>
            <div className="ap-drawer__footer">
              <button className="btn btn--ghost"><Download size={15}/> Download PDF</button>
              <button className="btn btn--secondary"><Edit size={15}/> Edit</button>
              {selected.status === 'Draft' && <button className="btn btn--primary"><Send size={15}/> Submit</button>}
              {selected.status === 'Under Review' && <>
                <button className="btn btn--primary" style={{ background: 'var(--gradient-green)' }}><CheckCircle size={15}/> Approve</button>
                <button className="btn btn--primary" style={{ background: 'var(--gradient-red)' }}><XCircle size={15}/> Reject</button>
              </>}
            </div>
          </div>
        </div>
      )}

      {/* Table view */}
      {viewMode === 'table' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-wrapper desktop-only">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Subject</th>
                  <th>Grade</th>
                  <th>Week</th>
                  <th>Topics</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan={8} className="data-table__empty">No lesson plans found.</td></tr>
                )}
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td><strong>{p.teacher}</strong></td>
                    <td>{p.subject}</td>
                    <td><span className="badge badge--section">{p.grade}</span></td>
                    <td>Week {p.week}</td>
                    <td style={{ maxWidth: 200 }}><span className="ap-truncate">{p.topics}</span></td>
                    <td><span className={`badge ${STATUS_COLOR[p.status]}`}>{p.status}</span></td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>{p.submittedDate || '—'}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon" title="View" onClick={() => setSelected(p)}><Eye size={15}/></button>
                        <button className="btn-icon btn-icon--edit" title="Edit"><Edit size={15}/></button>
                        <button className="btn-icon" title="Download"><Download size={15}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile cards */}
          <div className="mobile-only mobile-cards-list" style={{ padding: '0.75rem' }}>
            {filtered.map(p => (
              <div key={p.id} className="mobile-card" onClick={() => setSelected(p)} style={{ cursor: 'pointer' }}>
                <div className="student-mobile-card__header">
                  <span className="student-mobile-card__name">{p.subject}</span>
                  <span className={`badge ${STATUS_COLOR[p.status]}`}>{p.status}</span>
                </div>
                <div className="student-mobile-card__details">
                  <div className="student-mobile-card__detail">
                    <span className="student-mobile-card__label">Teacher</span>
                    <span className="student-mobile-card__value">{p.teacher}</span>
                  </div>
                  <div className="student-mobile-card__detail">
                    <span className="student-mobile-card__label">Grade / Week</span>
                    <span className="student-mobile-card__value">{p.grade} · Week {p.week}</span>
                  </div>
                  <div className="student-mobile-card__detail">
                    <span className="student-mobile-card__label">Topics</span>
                    <span className="student-mobile-card__value ap-truncate">{p.topics}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Card view */}
      {viewMode === 'cards' && (
        <div className="ap-card-grid">
          {filtered.length === 0 && (
            <div className="ap-empty">
              <BookOpen size={40} style={{ opacity: 0.2 }} />
              <p>No lesson plans found matching your filters.</p>
            </div>
          )}
          {filtered.map(p => (
            <div key={p.id} className="ap-plan-card" onClick={() => setSelected(p)}>
              <div className="ap-plan-card__header">
                <span className="ap-plan-card__subject">{p.subject}</span>
                <span className={`badge ${STATUS_COLOR[p.status]}`}>{p.status}</span>
              </div>
              <div className="ap-plan-card__meta">
                <span><User size={12}/> {p.teacher}</span>
                <span><Calendar size={12}/> Week {p.week}</span>
                <span><BookOpen size={12}/> {p.grade}</span>
              </div>
              <p className="ap-plan-card__topics">{p.topics}</p>
              <div className="ap-plan-card__footer">
                <span className="ap-plan-card__date">{p.submittedDate ? `Submitted ${p.submittedDate}` : 'Draft'}</span>
                <Eye size={15} style={{ color: 'var(--color-text-muted)' }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
