import { useState } from 'react'
import { Filter, Search, Tag, X, Check, Calendar } from 'lucide-react'

export default function GlobalFilterPanel({ onFilterChange }) {
  const [isOpen, setIsOpen] = useState(true) // Expand by default so the user sees it immediately
  
  // Filter states
  const [instGroup, setInstGroup] = useState('All Groups')
  const [institution, setInstitution] = useState('All Institutions')
  const [campus, setCampus] = useState('All Campuses')
  const [dept, setDept] = useState('All Departments')
  
  const [acadYear, setAcadYear] = useState('2025-26')
  const [term, setTerm] = useState('Term 1')
  const [className, setClassName] = useState('All Classes')
  const [section, setSection] = useState('All Sections')
  const [subject, setSubject] = useState('All Subjects')
  
  const [role, setRole] = useState('All Roles')
  const [student, setStudent] = useState('All Students')
  const [teacher, setTeacher] = useState('All Teachers')
  const [employee, setEmployee] = useState('All Employees')
  
  const [dateRange, setDateRange] = useState('Last 30 Days')
  const [category, setCategory] = useState('All Categories')
  const [status, setStatus] = useState('All Statuses')

  // Search filter query
  const [searchQuery, setSearchQuery] = useState('')

  const [activeTags, setActiveTags] = useState(['Dwarka Campus', 'Math Dept', 'Term 1'])

  const handleRemoveTag = (tag) => {
    setActiveTags(prev => prev.filter(t => t !== tag))
  }

  const handleClearAll = () => {
    setInstGroup('All Groups')
    setInstitution('All Institutions')
    setCampus('All Campuses')
    setDept('All Departments')
    setAcadYear('2025-26')
    setTerm('Term 1')
    setClassName('All Classes')
    setSection('All Sections')
    setSubject('All Subjects')
    setRole('All Roles')
    setStudent('All Students')
    setTeacher('All Teachers')
    setEmployee('All Employees')
    setDateRange('Last 30 Days')
    setCategory('All Categories')
    setStatus('All Statuses')
    setActiveTags([])
  }

  const handleApply = () => {
    // Collect non-default values as tags
    const newTags = []
    if (instGroup !== 'All Groups') newTags.push(instGroup)
    if (institution !== 'All Institutions') newTags.push(institution)
    if (campus !== 'All Campuses') newTags.push(campus)
    if (dept !== 'All Departments') newTags.push(dept)
    if (className !== 'All Classes') newTags.push(className)
    if (role !== 'All Roles') newTags.push(role)
    if (status !== 'All Statuses') newTags.push(status)

    setActiveTags(newTags)
    onFilterChange?.({
      instGroup, institution, campus, dept, acadYear, term, className, section, subject, role, student, teacher, employee, dateRange, category, status
    })
  }

  return (
    <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '1rem' }}>
          <Filter size={20} style={{ color: 'var(--color-primary)' }} />
          <span>Universal Decisions Filter Engine</span>
          <span className="badge" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', fontSize: '0.75rem' }}>16 Active Dimensions</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-outline" onClick={handleClearAll} style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Reset Filters</button>
          <button className="btn btn-primary" onClick={handleApply} style={{ padding: '0.4rem 1.25rem', fontSize: '0.85rem' }}>Apply Filters</button>
          <button className="btn btn-outline" onClick={() => setIsOpen(!isOpen)} style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}>
            {isOpen ? 'Collapse Panel' : 'Expand Panel'}
          </button>
        </div>
      </div>

      {isOpen && (
        <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
          
          {/* Main filters grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
            
            {/* ── Group 1: Organizational Structure ── */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Institution Group</label>
              <select className="ap-select" value={instGroup} onChange={e => setInstGroup(e.target.value)}>
                <option>All Groups</option>
                <option>ABC Education Group</option>
                <option>XYZ University Group</option>
                <option>National Coaching Network</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Institution</label>
              <select className="ap-select" value={institution} onChange={e => setInstitution(e.target.value)}>
                <option>All Institutions</option>
                <option>Green Valley Public School</option>
                <option>Apex Engineering College</option>
                <option>Metropolitan University</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Campus</label>
              <select className="ap-select" value={campus} onChange={e => setCampus(e.target.value)}>
                <option>All Campuses</option>
                <option>Koramangala Campus, Bangalore</option>
                <option>Dwarka Campus, Delhi</option>
                <option>Adyar Campus, Chennai</option>
                <option>Salt Lake Campus, Kolkata</option>
                <option>Bandra Campus, Mumbai</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Department</label>
              <select className="ap-select" value={dept} onChange={e => setDept(e.target.value)}>
                <option>All Departments</option>
                <option>Mathematics</option>
                <option>Science Faculty</option>
                <option>Languages Faculty</option>
                <option>IT & Support Operations</option>
              </select>
            </div>

            {/* ── Group 2: Academics ── */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Academic Year</label>
              <select className="ap-select" value={acadYear} onChange={e => setAcadYear(e.target.value)}>
                <option>2025-26</option>
                <option>2024-25</option>
                <option>2023-24</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Term</label>
              <select className="ap-select" value={term} onChange={e => setTerm(e.target.value)}>
                <option>Term 1</option>
                <option>Term 2</option>
                <option>Term 3</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Class</label>
              <select className="ap-select" value={className} onChange={e => setClassName(e.target.value)}>
                <option>All Classes</option>
                <option>Grade 8</option>
                <option>Grade 9</option>
                <option>Grade 10</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Section</label>
              <select className="ap-select" value={section} onChange={e => setSection(e.target.value)}>
                <option>All Sections</option>
                <option>Section A</option>
                <option>Section B</option>
                <option>Section C</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Subject</label>
              <select className="ap-select" value={subject} onChange={e => setSubject(e.target.value)}>
                <option>All Subjects</option>
                <option>Algebra / Math</option>
                <option>Physics</option>
                <option>Chemistry</option>
              </select>
            </div>

            {/* ── Group 3: People ── */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Role</label>
              <select className="ap-select" value={role} onChange={e => setRole(e.target.value)}>
                <option>All Roles</option>
                <option>Principal</option>
                <option>Teacher</option>
                <option>Parent</option>
                <option>Finance Manager</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Student</label>
              <select className="ap-select" value={student} onChange={e => setStudent(e.target.value)}>
                <option>All Students</option>
                <option>Alex Taylor</option>
                <option>Aditya Sen</option>
                <option>Karthik Rao</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Teacher</label>
              <select className="ap-select" value={teacher} onChange={e => setTeacher(e.target.value)}>
                <option>All Teachers</option>
                <option>Dr. Suresh Kumar</option>
                <option>Mrs. Ranjana Sharma</option>
              </select>
            </div>

            {/* ── Group 4: Time and Status ── */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Date Range</label>
              <select className="ap-select" value={dateRange} onChange={e => setDateRange(e.target.value)}>
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
                <option>Custom Range</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Category</label>
              <select className="ap-select" value={category} onChange={e => setCategory(e.target.value)}>
                <option>All Categories</option>
                <option>Academic</option>
                <option>Finance</option>
                <option>Safety / Wellness</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Status</label>
              <select className="ap-select" value={status} onChange={e => setStatus(e.target.value)}>
                <option>All Statuses</option>
                <option>Verified</option>
                <option>Pending Verification</option>
                <option>Non-Compliant</option>
              </select>
            </div>

          </div>

        </div>
      )}

      {/* Active tags area */}
      {activeTags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-muted)', marginRight: '0.25rem' }}>Active Queries:</span>
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
