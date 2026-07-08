/**
 * Term Syllabus Planner — visual timeline of term coverage per subject.
 */
import { useState } from 'react'
import { CheckCircle, Clock, AlertTriangle, Circle, BookOpen } from 'lucide-react'
import PageHeader from '../../components/PageHeader.jsx'
import { syllabusData, SUBJECTS, TERMS, ACADEMIC_YEARS } from '../../data/academicPlanningData.js'

const STATUS_ICON = {
  Completed:   <CheckCircle size={16} color="var(--color-green)" />,
  'In Progress': <Clock size={16} color="var(--color-amber)" />,
  Delayed:     <AlertTriangle size={16} color="var(--color-red)" />,
  Pending:     <Circle size={16} color="var(--color-text-subtle)" />,
}

const STATUS_CLASS = {
  Completed:   'syl-status--done',
  'In Progress': 'syl-status--progress',
  Delayed:     'syl-status--delayed',
  Pending:     'syl-status--pending',
}

export default function TermSyllabusPlanner() {
  const [filterYear, setFilterYear]    = useState('2025-26')
  const [filterTerm, setFilterTerm]    = useState('Term 1')
  const [filterSubject, setFilterSubject] = useState('')

  const data = syllabusData.filter(d =>
    d.academicYear === filterYear &&
    d.term === filterTerm &&
    (!filterSubject || d.subject === filterSubject)
  )

  return (
    <div className="page">
      <PageHeader
        title="Term Syllabus Planner"
        subtitle="Track unit-wise syllabus completion across all subjects and classes"
        eyebrow="Academic Planning"
      />

      {/* Filters */}
      <div className="card ap-inline-filters">
        <select className="ap-select" value={filterYear} onChange={e => setFilterYear(e.target.value)} id="syl-filter-year">
          {ACADEMIC_YEARS.map(y => <option key={y}>{y}</option>)}
        </select>
        <select className="ap-select" value={filterTerm} onChange={e => setFilterTerm(e.target.value)} id="syl-filter-term">
          {TERMS.map(t => <option key={t}>{t}</option>)}
        </select>
        <select className="ap-select" value={filterSubject} onChange={e => setFilterSubject(e.target.value)} id="syl-filter-subject">
          <option value="">All Subjects</option>
          {SUBJECTS.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {data.length === 0 && (
        <div className="ap-empty">
          <BookOpen size={40} style={{ opacity: 0.2 }} />
          <p>No syllabus data found for selected filters.</p>
        </div>
      )}

      {data.map(course => {
        const pct = Math.round((course.completedChapters / course.totalChapters) * 100)
        return (
          <div key={course.id} className="card ap-syl-card">
            {/* Card header */}
            <div className="ap-syl-card__header">
              <div>
                <h3 className="card__title">{course.subject}</h3>
                <p className="card__subtitle">{course.grade} · {course.term} · {course.academicYear}</p>
              </div>
              <div className="ap-syl-card__progress-ring">
                <svg viewBox="0 0 60 60" width="60" height="60">
                  <circle cx="30" cy="30" r="24" fill="none" stroke="var(--color-border)" strokeWidth="5" />
                  <circle
                    cx="30" cy="30" r="24" fill="none"
                    stroke={pct >= 80 ? 'var(--color-green)' : pct >= 50 ? 'var(--color-amber)' : 'var(--color-red)'}
                    strokeWidth="5"
                    strokeDasharray={`${2 * Math.PI * 24 * pct / 100} ${2 * Math.PI * 24 * (100 - pct) / 100}`}
                    strokeLinecap="round"
                    transform="rotate(-90 30 30)"
                    style={{ transition: 'stroke-dasharray 0.6s ease' }}
                  />
                  <text x="30" y="34" textAnchor="middle" fontSize="11" fontWeight="700"
                    fill="var(--color-text)">{pct}%</text>
                </svg>
              </div>
            </div>

            {/* Overall progress bar */}
            <div className="ap-syl-summary">
              <div className="progress-cell" style={{ marginBottom: '1.25rem' }}>
                <div className="progress-bar" style={{ height: 8 }}>
                  <div className="progress-bar__fill" style={{ width: `${pct}%`,
                    background: pct >= 80 ? 'var(--gradient-green)' : pct >= 50 ? 'var(--gradient-amber)' : 'var(--gradient-red)' }} />
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                  {course.completedChapters}/{course.totalChapters} chapters
                </span>
              </div>
            </div>

            {/* Timeline units */}
            <div className="ap-timeline">
              {course.units.map((unit, idx) => (
                <div key={unit.id} className={`ap-timeline__item ${STATUS_CLASS[unit.status]}`}>
                  <div className="ap-timeline__connector">
                    <div className="ap-timeline__icon">{STATUS_ICON[unit.status]}</div>
                    {idx < course.units.length - 1 && <div className="ap-timeline__line" />}
                  </div>
                  <div className="ap-timeline__content">
                    <div className="ap-timeline__title">{unit.name}</div>
                    <div className="ap-timeline__dates">
                      <span>Planned: <strong>{unit.planned}</strong></span>
                      {unit.actual && <span>Actual: <strong>{unit.actual}</strong></span>}
                      {unit.status === 'Delayed' && <span className="ap-delayed-tag">⚠ Delayed</span>}
                    </div>
                    {unit.completion > 0 && (
                      <div className="progress-cell" style={{ marginTop: '0.4rem', gap: '0.5rem' }}>
                        <div className="progress-bar" style={{ height: 4 }}>
                          <div className="progress-bar__fill" style={{ width: `${unit.completion}%`,
                            background: unit.status === 'Delayed' ? 'var(--gradient-red)' : 'var(--gradient-brand)' }} />
                        </div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{unit.completion}%</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
