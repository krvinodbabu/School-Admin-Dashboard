/**
 * Question Bank — centralized searchable question repository.
 */
import { useState } from 'react'
import { Search, Plus, Tag, BarChart2, Eye, Edit, ChevronDown, ChevronUp } from 'lucide-react'
import PageHeader from '../../components/PageHeader.jsx'
import {
  questions, SUBJECTS, DIFFICULTY_LEVELS, QUESTION_TYPES,
} from '../../data/academicPlanningData.js'

const DIFF_COLOR = {
  Simple:  { bg: 'var(--color-green-bg)',  text: 'var(--color-green-text)' },
  Medium:  { bg: 'var(--color-amber-bg)',  text: 'var(--color-amber-text)' },
  Complex: { bg: 'var(--color-red-bg)',    text: 'var(--color-red-text)' },
}

const TYPE_COLOR = {
  'MCQ':                 { bg: 'var(--color-blue-bg)',   text: 'var(--color-blue-text)' },
  'Short Answer':        { bg: 'var(--color-purple-bg)', text: 'var(--color-purple-text)' },
  'Long Answer':         { bg: 'var(--color-indigo-bg)', text: 'var(--color-indigo-text)' },
  'Case Study':          { bg: '#fdf2f8',                text: '#9d174d' },
  'Assertion and Reason':{ bg: 'var(--color-amber-bg)',  text: 'var(--color-amber-text)' },
}

export default function QuestionBank() {
  const [search, setSearch]           = useState('')
  const [filterSubject, setFilterSubject] = useState('')
  const [filterType, setFilterType]   = useState('')
  const [filterDiff, setFilterDiff]   = useState('')
  const [expanded, setExpanded]       = useState(null)

  const chapters = [...new Set(questions.map(q => q.chapter))]

  const filtered = questions.filter(q => {
    const text = (q.text + q.tags.join(' ')).toLowerCase()
    return (!search || text.includes(search.toLowerCase())) &&
      (!filterSubject || q.subject === filterSubject) &&
      (!filterType    || q.type === filterType) &&
      (!filterDiff    || q.difficulty === filterDiff)
  })

  // Stats
  const totalQ    = questions.length
  const byDiff    = DIFFICULTY_LEVELS.map(d => ({ d, n: questions.filter(q => q.difficulty === d).length }))
  const byType    = QUESTION_TYPES.map(t => ({ t, n: questions.filter(q => q.type === t).length }))

  return (
    <div className="page">
      <PageHeader
        title="Question Bank"
        subtitle={`${totalQ} questions across ${[...new Set(questions.map(q => q.subject))].length} subjects`}
        eyebrow="Academic Planning"
      >
        <button type="button" className="btn btn--primary" id="qb-add-btn">
          <Plus size={16}/> Add Question
        </button>
      </PageHeader>

      {/* Stats row */}
      <div className="ap-qb-stats">
        <div className="ap-qb-stat">
          <span className="ap-qb-stat__value">{totalQ}</span>
          <span className="ap-qb-stat__label">Total Questions</span>
        </div>
        {byDiff.map(({ d, n }) => (
          <div key={d} className="ap-qb-stat">
            <span className="ap-qb-stat__value" style={{ color: DIFF_COLOR[d].text }}>{n}</span>
            <span className="ap-qb-stat__label">{d}</span>
          </div>
        ))}
        {byType.filter(x => x.n > 0).map(({ t, n }) => (
          <div key={t} className="ap-qb-stat">
            <span className="ap-qb-stat__value">{n}</span>
            <span className="ap-qb-stat__label">{t}</span>
          </div>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="card ap-inline-filters" style={{ marginBottom: '1.25rem' }}>
        <div className="ap-search" style={{ flex: 1, maxWidth: 340 }}>
          <Search size={15} className="ap-search__icon" />
          <input
            type="search"
            className="ap-search__input"
            placeholder="Search questions, tags, chapters…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            id="qb-search"
          />
        </div>
        <select className="ap-select" value={filterSubject} onChange={e => setFilterSubject(e.target.value)} id="qb-filter-subject">
          <option value="">All Subjects</option>
          {SUBJECTS.map(s => <option key={s}>{s}</option>)}
        </select>
        <select className="ap-select" value={filterType} onChange={e => setFilterType(e.target.value)} id="qb-filter-type">
          <option value="">All Types</option>
          {QUESTION_TYPES.map(t => <option key={t}>{t}</option>)}
        </select>
        <select className="ap-select" value={filterDiff} onChange={e => setFilterDiff(e.target.value)} id="qb-filter-diff">
          <option value="">All Difficulties</option>
          {DIFFICULTY_LEVELS.map(d => <option key={d}>{d}</option>)}
        </select>
        <button className="btn btn--ghost" onClick={() => { setSearch(''); setFilterSubject(''); setFilterType(''); setFilterDiff('') }}>Clear</button>
      </div>

      {/* Question list */}
      <div className="ap-qb-list">
        {filtered.length === 0 && (
          <div className="ap-empty">
            <BarChart2 size={40} style={{ opacity: 0.2 }} />
            <p>No questions match your search or filters.</p>
          </div>
        )}
        {filtered.map(q => (
          <div key={q.id} className="ap-question-card card" style={{ marginBottom: '0.875rem', cursor: 'pointer' }}
            onClick={() => setExpanded(expanded === q.id ? null : q.id)}>
            {/* Question header */}
            <div className="ap-question-card__header">
              <div className="ap-question-card__badges">
                <span className="badge" style={{ background: DIFF_COLOR[q.difficulty].bg, color: DIFF_COLOR[q.difficulty].text }}>{q.difficulty}</span>
                <span className="badge" style={{ background: TYPE_COLOR[q.type]?.bg, color: TYPE_COLOR[q.type]?.text }}>{q.type}</span>
                <span className="badge badge--section">{q.subject} · Ch: {q.chapter}</span>
                <span className="badge" style={{ background: 'var(--color-surface-3)', color: 'var(--color-text-muted)' }}>{q.marks} mark{q.marks > 1 ? 's' : ''}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)' }}>Used {q.usedCount}×</span>
                {expanded === q.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>

            {/* Question text */}
            <p className="ap-question-card__text">{q.text}</p>

            {/* Tags */}
            <div className="ap-question-card__tags">
              <Tag size={12} style={{ color: 'var(--color-text-subtle)', flexShrink: 0 }} />
              {q.tags.map(tag => (
                <span key={tag} className="ap-tag">{tag}</span>
              ))}
            </div>

            {/* Expanded content */}
            {expanded === q.id && (
              <div className="ap-question-card__expanded">
                {q.options.length > 0 && (
                  <div className="ap-options">
                    {q.options.map((opt, i) => (
                      <div key={i} className={`ap-option ${q.correctOption === opt.charAt(0) ? 'ap-option--correct' : ''}`}>
                        {opt}
                        {q.correctOption === opt.charAt(0) && <span className="ap-option__correct-tag">✓ Correct</span>}
                      </div>
                    ))}
                  </div>
                )}
                <div className="ap-explanation">
                  <strong>Explanation: </strong>{q.explanation}
                </div>
                <div className="ap-question-card__actions">
                  <button className="btn btn--secondary btn--sm"><Eye size={14}/> Preview</button>
                  <button className="btn btn--secondary btn--sm"><Edit size={14}/> Edit</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
