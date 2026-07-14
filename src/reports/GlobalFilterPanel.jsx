import { useState } from 'react'
import { Filter, Search, Tag, X, Check } from 'lucide-react'

export default function GlobalFilterPanel({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const [campus, setCampus] = useState('All Campuses')
  const [dept, setDept] = useState('All Departments')
  const [term, setTerm] = useState('Term 1')
  const [activeTags, setActiveTags] = useState([])

  const handleAddTag = (tag) => {
    if (activeTags.includes(tag)) return
    const updated = [...activeTags, tag]
    setActiveTags(updated)
    onFilterChange?.({ campus, dept, term, tags: updated })
  }

  const handleRemoveTag = (tag) => {
    const updated = activeTags.filter(t => t !== tag)
    setActiveTags(updated)
    onFilterChange?.({ campus, dept, term, tags: updated })
  }

  return (
    <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.95rem' }}>
          <Filter size={18} style={{ color: 'var(--color-primary)' }} />
          <span>Global Decisions Filter Engine</span>
        </div>
        <button 
          className="btn btn-outline" 
          onClick={() => setIsOpen(!isOpen)}
          style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
        >
          {isOpen ? 'Close Engine' : 'Configure Filters'}
        </button>
      </div>

      {isOpen && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem', marginTop: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem', animation: 'fadeIn 0.2s' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Campus Allocation</label>
            <select className="ap-select" value={campus} onChange={e => { setCampus(e.target.value); onFilterChange?.({ campus: e.target.value, dept, term, tags: activeTags }) }}>
              <option>All Campuses</option>
              <option>Koramangala Campus, Bangalore</option>
              <option>Dwarka Campus, Delhi</option>
              <option>Adyar Campus, Chennai</option>
              <option>Salt Lake Campus, Kolkata</option>
              <option>Bandra Campus, Mumbai</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Operating Department</label>
            <select className="ap-select" value={dept} onChange={e => { setDept(e.target.value); onFilterChange?.({ campus, dept: e.target.value, term, tags: activeTags }) }}>
              <option>All Departments</option>
              <option>Mathematics</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Admissions & Outreaches</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Academic Term</label>
            <select className="ap-select" value={term} onChange={e => { setTerm(e.target.value); onFilterChange?.({ campus, dept, term: e.target.value, tags: activeTags }) }}>
              <option>Term 1</option>
              <option>Term 2</option>
              <option>Term 3</option>
            </select>
          </div>

        </div>
      )}

      {/* Active filters display tags */}
      {activeTags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
          {activeTags.map(tag => (
            <span key={tag} className="badge" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}>
              {tag} <X size={12} style={{ cursor: 'pointer' }} onClick={() => handleRemoveTag(tag)} />
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
