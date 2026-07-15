import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Star, FileText, ArrowRight, X } from 'lucide-react'

const SEARCHABLE_ITEMS = [
  { group: 'Students', label: 'Alex Taylor (Grade 9)', to: '/students' },
  { group: 'Students', label: 'Aditya Sen (Grade 8)', to: '/students' },
  { group: 'Students', label: 'Karthik Rao (Grade 10)', to: '/students' },
  { group: 'Teachers & Staff', label: 'Dr. Suresh Kumar (Mathematics)', to: '/teachers' },
  { group: 'Teachers & Staff', label: 'Mrs. Ranjana Sharma (Science)', to: '/teachers' },
  { group: 'Reports', label: 'Outstanding Fee Report', to: '/reports/enterprise' },
  { group: 'Reports', label: 'Fee Collection Report', to: '/reports/enterprise' },
  { group: 'Reports', label: 'Academic Performance Report', to: '/reports/enterprise' },
  { group: 'Reports', label: 'CBSE Assessment Analytics', to: '/reports/enterprise' },
  { group: 'Tickets & Support', label: 'Ticket #543: LMS gradebook failed sync', to: '/support' },
  { group: 'Tickets & Support', label: 'Ticket #211: Autopay failure report', to: '/support' },
  { group: 'Campuses & Departments', label: 'Koramangala Campus Dashboard', to: '/platform/campuses' },
  { group: 'Campuses & Departments', label: 'Dwarka Campus Dashboard', to: '/platform/campuses' },
  { group: 'Routes', label: 'Route A (Koramangala)', to: '/transport' },
  { group: 'Routes', label: 'Route B (Dwarka)', to: '/transport' },
  { group: 'Fees & Billing', label: 'Tuition Fee Management', to: '/fees' },
  { group: 'Admissions & CRM', label: 'Admissions Intake Pipeline', to: '/admissions' },
  { group: 'Workflows', label: 'Approval Center', to: '/workflows/approvals' },
  { group: 'Workflows', label: 'Task Management', to: '/workflows/tasks' },
  { group: 'Workflows', label: 'Case Management', to: '/workflows/cases' }
]

export default function CommandPalette({ isOpen, onClose }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('eduos_favorites')
    return saved ? JSON.parse(saved) : []
  })
  
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Ctrl + K trigger
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        if (isOpen) onClose()
        else window.dispatchEvent(new Event('eduos_open_command_palette'))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const filteredItems = SEARCHABLE_ITEMS.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.group.toLowerCase().includes(query.toLowerCase())
  )

  // Group filtered results
  const groupedResults = filteredItems.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = []
    acc[item.group].push(item)
    return acc
  }, {})

  const handleSelect = (to) => {
    navigate(to)
    onClose()
  }

  const toggleFavorite = (e, item) => {
    e.stopPropagation()
    let updated
    if (favorites.some(f => f.to === item.to)) {
      updated = favorites.filter(f => f.to !== item.to)
    } else {
      updated = [...favorites, { to: item.to, label: item.label }]
    }
    setFavorites(updated)
    localStorage.setItem('eduos_favorites', JSON.stringify(updated))
    window.dispatchEvent(new Event('eduos_navigation_change'))
  };

  if (!isOpen) return null

  return (
    <div 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 9999, 
        background: 'rgba(15, 23, 42, 0.6)', 
        backdropFilter: 'blur(4px)', 
        display: 'flex', 
        justifyContent: 'center', 
        paddingTop: '10vh' 
      }}
      onClick={onClose}
    >
      <div 
        style={{ 
          width: '100%', 
          maxWidth: '600px', 
          background: 'var(--color-surface)', 
          border: '1px solid var(--color-border)', 
          borderRadius: '16px', 
          boxShadow: 'var(--shadow-lg)', 
          display: 'flex', 
          flexDirection: 'column', 
          maxHeight: '70vh', 
          overflow: 'hidden' 
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem', borderBottom: '1px solid var(--color-border)' }}>
          <Search size={20} style={{ color: 'var(--color-primary)' }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a student name, class, route, or command (e.g. 'Ravi Kumar')..."
            style={{ 
              flex: 1, 
              border: 'none', 
              background: 'none', 
              outline: 'none', 
              fontSize: '1rem', 
              color: 'var(--color-text)' 
            }}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span style={{ fontSize: '0.72rem', background: 'var(--color-surface-3)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--color-text-muted)' }}>ESC</span>
          <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {Object.keys(groupedResults).length > 0 ? (
            Object.keys(groupedResults).map(groupName => (
              <div key={groupName} style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>
                  {groupName}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {groupedResults[groupName].map((item, idx) => {
                    const isFav = favorites.some(f => f.to === item.to)
                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelect(item.to)}
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center', 
                          padding: '0.65rem 0.75rem', 
                          borderRadius: '8px', 
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                          background: 'transparent'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--color-surface-3)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
                          <FileText size={16} style={{ color: 'var(--color-text-muted)' }} />
                          <span>{item.label}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <button
                            type="button"
                            onClick={(e) => toggleFavorite(e, item)}
                            style={{ 
                              border: 'none', 
                              background: 'none', 
                              cursor: 'pointer', 
                              color: isFav ? 'var(--color-primary)' : 'var(--color-text-muted)' 
                            }}
                          >
                            <Star size={16} style={{ fill: isFav ? 'var(--color-primary)' : 'none' }} />
                          </button>
                          <ArrowRight size={14} style={{ color: 'var(--color-primary)' }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>
              No matching records or modules found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
