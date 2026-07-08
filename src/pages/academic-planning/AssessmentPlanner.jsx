/**
 * Assessment Planner — track all assessments with calendar, list, and timeline views.
 */
import { useState } from 'react'
import { Plus, CalendarDays, List, GitBranch, Clock, BookOpen } from 'lucide-react'
import PageHeader from '../../components/PageHeader.jsx'
import StatusBadge from '../../components/StatusBadge.jsx'
import { assessments, SUBJECTS, GRADES } from '../../data/academicPlanningData.js'

const TYPE_COLORS = {
  'Unit Test':    '#6366f1',
  'Weekly Quiz':  '#22c55e',
  'Mid-Term':     '#f59e0b',
  'Assignment':   '#8b5cf6',
  'Practical':    '#3b82f6',
  'Project':      '#ec4899',
  'Final Exam':   '#ef4444',
  'Monthly Test': '#f97316',
}

const BLOOMS = ['Remembering', 'Understanding', 'Application', 'Analysis', 'Synthesis', 'Evaluation']

const AS_STATUS_CLASS = {
  Completed:   'status-paid',
  'In Progress': 'status-pending',
  Upcoming:    'status-leave',
  Planned:     'status-default',
}

export default function AssessmentPlanner() {
  const [view, setView]               = useState('list') // 'list' | 'calendar' | 'timeline'
  const [filterSubject, setFilterSubject] = useState('')
  const [filterGrade, setFilterGrade]   = useState('')
  const [filterType, setFilterType]     = useState('')

  const types = [...new Set(assessments.map(a => a.type))]

  const filtered = assessments.filter(a =>
    (!filterSubject || a.subject === filterSubject) &&
    (!filterGrade   || a.grade === filterGrade) &&
    (!filterType    || a.type === filterType)
  )

  // Group assessments by month for calendar view
  const byMonth = filtered.reduce((acc, a) => {
    const month = a.date ? a.date.slice(0, 7) : 'Undated'
    if (!acc[month]) acc[month] = []
    acc[month].push(a)
    return acc
  }, {})

  return (
    <div className="page">
      <PageHeader
        title="Assessment Planner"
        subtitle={`${filtered.length} assessments scheduled this term`}
        eyebrow="Academic Planning"
      >
        <button type="button" className="btn btn--primary" id="ap-add-assessment-btn">
          <Plus size={16}/> Add Assessment
        </button>
      </PageHeader>

      {/* Toolbar */}
      <div className="card ap-inline-filters" style={{ marginBottom: '1.25rem' }}>
        {/* View toggle */}
        <div className="ap-view-tabs">
          {[['list', <List size={15}/>, 'List'], ['calendar', <CalendarDays size={15}/>, 'Calendar'], ['timeline', <GitBranch size={15}/>, 'Timeline']].map(([v, icon, label]) => (
            <button key={v} type="button"
              className={`ap-view-tab ${view === v ? 'ap-view-tab--active' : ''}`}
              onClick={() => setView(v)} id={`ap-view-${v}`}>
              {icon} {label}
            </button>
          ))}
        </div>
        <div className="ap-filter-divider" />
        <select className="ap-select" value={filterSubject} onChange={e => setFilterSubject(e.target.value)} id="ap-filter-subject">
          <option value="">All Subjects</option>
          {SUBJECTS.map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="ap-select" value={filterGrade} onChange={e => setFilterGrade(e.target.value)} id="ap-filter-grade">
          <option value="">All Grades</option>
          {GRADES.map(g => <option key={g}>{g}</option>)}
        </select>
        <select className="ap-select" value={filterType} onChange={e => setFilterType(e.target.value)} id="ap-filter-type">
          <option value="">All Types</option>
          {types.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>

      {/* LIST VIEW */}
      {view === 'list' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-wrapper desktop-only">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Assessment</th>
                  <th>Subject</th>
                  <th>Grade</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Max Marks</th>
                  <th>Bloom's Level</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(a => (
                  <tr key={a.id}>
                    <td><strong>{a.name}</strong></td>
                    <td>{a.subject}</td>
                    <td><span className="badge badge--section">{a.grade}</span></td>
                    <td>
                      <span className="badge" style={{ background: `${TYPE_COLORS[a.type]}20`, color: TYPE_COLORS[a.type] }}>
                        {a.type}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem' }}>{a.date || '—'}</td>
                    <td style={{ fontSize: '0.82rem' }}>{a.duration ? `${a.duration} min` : '—'}</td>
                    <td style={{ fontWeight: 600 }}>{a.maxMarks}</td>
                    <td><span className="badge badge--section" style={{ background: 'var(--color-purple-bg)', color: 'var(--color-purple)' }}>{a.bloomsLevel}</span></td>
                    <td><span className={`badge ${AS_STATUS_CLASS[a.status] || 'status-default'}`}>{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile */}
          <div className="mobile-only mobile-cards-list" style={{ padding: '0.75rem' }}>
            {filtered.map(a => (
              <div key={a.id} className="mobile-card">
                <div className="student-mobile-card__header">
                  <span className="student-mobile-card__name">{a.name}</span>
                  <span className={`badge ${AS_STATUS_CLASS[a.status] || 'status-default'}`}>{a.status}</span>
                </div>
                <div className="student-mobile-card__details">
                  {[['Subject', a.subject], ['Grade', a.grade], ['Type', a.type], ['Date', a.date || '—'], ['Max Marks', a.maxMarks]].map(([l, v]) => (
                    <div key={l} className="student-mobile-card__detail">
                      <span className="student-mobile-card__label">{l}</span>
                      <span className="student-mobile-card__value">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CALENDAR VIEW */}
      {view === 'calendar' && (
        <div>
          {Object.entries(byMonth).sort().map(([month, items]) => (
            <div key={month} className="card" style={{ marginBottom: '1.25rem' }}>
              <h3 className="card__title" style={{ marginBottom: '1rem' }}>
                {new Date(month + '-01').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="ap-calendar-grid">
                {items.map(a => (
                  <div key={a.id} className="ap-cal-item"
                    style={{ borderLeft: `3px solid ${TYPE_COLORS[a.type] || '#6366f1'}` }}>
                    <div className="ap-cal-item__date">
                      <span className="ap-cal-item__day">
                        {a.date ? new Date(a.date).getDate() : '?'}
                      </span>
                      <span className="ap-cal-item__weekday">
                        {a.date ? new Date(a.date).toLocaleDateString('en-IN', { weekday: 'short' }) : ''}
                      </span>
                    </div>
                    <div className="ap-cal-item__info">
                      <div className="ap-cal-item__name">{a.name}</div>
                      <div className="ap-cal-item__meta">
                        {a.subject} · {a.grade}
                        {a.duration && <span> · <Clock size={11}/> {a.duration} min</span>}
                      </div>
                    </div>
                    <span className={`badge ${AS_STATUS_CLASS[a.status] || 'status-default'}`}>{a.status}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TIMELINE VIEW */}
      {view === 'timeline' && (
        <div className="card">
          <h3 className="card__title" style={{ marginBottom: '1.25rem' }}>Assessment Timeline</h3>
          <div className="ap-timeline">
            {[...filtered].sort((a, b) => (a.date || '').localeCompare(b.date || '')).map((a, idx) => (
              <div key={a.id} className="ap-timeline__item">
                <div className="ap-timeline__connector">
                  <div className="ap-timeline__icon" style={{
                    background: `${TYPE_COLORS[a.type] || '#6366f1'}20`,
                    border: `2px solid ${TYPE_COLORS[a.type] || '#6366f1'}`,
                    color: TYPE_COLORS[a.type] || '#6366f1',
                  }}>
                    <BookOpen size={12} />
                  </div>
                  {idx < filtered.length - 1 && <div className="ap-timeline__line" />}
                </div>
                <div className="ap-timeline__content">
                  <div className="ap-timeline__title">{a.name}</div>
                  <div className="ap-timeline__dates">
                    <span>{a.subject} · {a.grade}</span>
                    <span>{a.date || 'TBD'} {a.duration ? `· ${a.duration} min` : ''}</span>
                    <span className={`badge ${AS_STATUS_CLASS[a.status] || 'status-default'}`}>{a.status}</span>
                  </div>
                  <div className="ap-difficulty-bar">
                    <div className="ap-difficulty-seg" style={{ width: `${a.difficulty.simple}%`, background: 'var(--color-green)' }} title={`Simple ${a.difficulty.simple}%`}/>
                    <div className="ap-difficulty-seg" style={{ width: `${a.difficulty.medium}%`, background: 'var(--color-amber)' }} title={`Medium ${a.difficulty.medium}%`}/>
                    <div className="ap-difficulty-seg" style={{ width: `${a.difficulty.complex}%`, background: 'var(--color-red)' }} title={`Complex ${a.difficulty.complex}%`}/>
                  </div>
                  <div className="ap-difficulty-legend">
                    <span style={{ color: 'var(--color-green)' }}>● Simple {a.difficulty.simple}%</span>
                    <span style={{ color: 'var(--color-amber)' }}>● Medium {a.difficulty.medium}%</span>
                    <span style={{ color: 'var(--color-red)' }}>● Complex {a.difficulty.complex}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
