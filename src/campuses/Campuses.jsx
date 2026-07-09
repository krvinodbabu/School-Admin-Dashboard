import { useState } from 'react'
import { useTenant } from '../context/TenantContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import StatCard from '../components/StatCard.jsx'
import { MapPin, Plus, User, Building, Users, Activity, Phone, Shield } from 'lucide-react'

export default function Campuses() {
  const { activeInstitution, addCampus } = useTenant()
  const [selectedCampus, setSelectedCampus] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  // Add Campus form states
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [head, setHead] = useState('')
  const [capacity, setCapacity] = useState(1000)
  const [error, setError] = useState('')

  const campusesList = activeInstitution?.campuses || []

  // Global Institution Stats
  const totalCapacity = campusesList.reduce((acc, c) => acc + (c.capacity || 0), 0)
  const totalStudents = campusesList.reduce((acc, c) => acc + (c.students || 0), 0)
  const totalStaff = campusesList.reduce((acc, c) => acc + (c.staff || 0), 0)

  const handleAddCampusSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) {
      setError('Campus Name is required')
      return
    }
    if (!address.trim()) {
      setError('Physical Address is required')
      return
    }
    if (!head.trim()) {
      setError('Principal Director is required')
      return
    }

    addCampus(activeInstitution.id, {
      name: name.trim(),
      address: address.trim(),
      contact: contact.trim(),
      head: head.trim(),
      capacity: Number(capacity)
    })

    // Reset Form
    setName('')
    setAddress('')
    setContact('')
    setHead('')
    setCapacity(1000)
    setShowAddForm(false)
  }

  return (
    <div className="page animate-fadeIn">
      <PageHeader
        title="Campus Management"
        subtitle={`Active branches under ${activeInstitution?.name || 'EduOS'}`}
        eyebrow="Tenant Infrastructure"
      >
        <button 
          type="button" 
          onClick={() => setShowAddForm(true)} 
          className="btn btn--primary"
          id="btn-add-campus"
        >
          <Plus size={16} /> Add Campus
        </button>
      </PageHeader>

      {/* KPI Stats */}
      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <StatCard title="Active Campuses" value={campusesList.length} icon={Building} color="blue" />
        <StatCard title="Total Group Enrollment" value={totalStudents.toLocaleString()} icon={Users} color="green" />
        <StatCard title="Total Capacity Limit" value={totalCapacity.toLocaleString()} icon={Shield} color="indigo" />
        <StatCard title="Total Operational Staff" value={totalStaff} icon={User} color="purple" />
      </div>

      {/* Grid of Campuses */}
      <div className="ap-card-grid">
        {campusesList.length === 0 && (
          <div className="ap-empty card" style={{ gridColumn: '1 / -1' }}>
            <Building size={40} style={{ opacity: 0.2 }} />
            <p>No campuses found. Add your first campus to get started.</p>
          </div>
        )}
        {campusesList.map(camp => {
          const capPct = Math.min(Math.round(((camp.students || 0) / (camp.capacity || 1000)) * 100), 100)
          return (
            <div 
              key={camp.id} 
              className="ap-plan-card"
              onClick={() => setSelectedCampus(camp)}
            >
              <div className="ap-plan-card__header">
                <span className="ap-plan-card__subject">{camp.name}</span>
                <span className="badge badge--section">{camp.code || 'CAMP'}</span>
              </div>

              <div className="ap-plan-card__meta" style={{ margin: '0.5rem 0' }}>
                <span><User size={12} /> Head: {camp.head}</span>
              </div>

              <p className="ap-plan-card__topics" style={{ fontSize: '0.8rem', minHeight: '36px' }}>
                <MapPin size={11} style={{ display: 'inline', marginRight: 4 }} />
                {camp.address}
              </p>

              {/* Capacity Progress indicator */}
              <div style={{ marginTop: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>
                  <span>Capacity Loading</span>
                  <span>{camp.students} / {camp.capacity} ({capPct}%)</span>
                </div>
                <div className="progress-bar" style={{ height: 6 }}>
                  <div 
                    className="progress-bar__fill" 
                    style={{ 
                      width: `${capPct}%`,
                      background: capPct >= 90 ? 'var(--gradient-red)' : capPct >= 75 ? 'var(--gradient-amber)' : 'var(--gradient-green)'
                    }} 
                  />
                </div>
              </div>

              <div className="ap-plan-card__footer" style={{ padding: '0.5rem 0 0', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-subtle)' }}><Phone size={10} /> {camp.contact}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-brand)' }}>Details →</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Campus Details Drawer Panel */}
      {selectedCampus && (
        <div className="ap-drawer-overlay" onClick={() => setSelectedCampus(null)}>
          <div className="ap-drawer" onClick={e => e.stopPropagation()}>
            <div className="ap-drawer__header">
              <div>
                <h2 className="ap-drawer__title">{selectedCampus.name} Detailed View</h2>
                <p className="ap-drawer__sub">Code: {selectedCampus.code || 'CAMP'} · {activeInstitution.name}</p>
              </div>
              <button type="button" className="btn btn--ghost ap-drawer__close" onClick={() => setSelectedCampus(null)}>✕</button>
            </div>
            <div className="ap-drawer__body">
              <div className="ap-drawer__field">
                <span className="ap-drawer__label">Director / Principal Head</span>
                <span className="ap-drawer__value">{selectedCampus.head}</span>
              </div>
              <div className="ap-drawer__field">
                <span className="ap-drawer__label">Address Location</span>
                <span className="ap-drawer__value">{selectedCampus.address}</span>
              </div>
              <div className="ap-drawer__field">
                <span className="ap-drawer__label">Contact Details</span>
                <span className="ap-drawer__value">{selectedCampus.contact}</span>
              </div>
              <div className="ap-drawer__field">
                <span className="ap-drawer__label">Operational Metrics</span>
                <div className="ap-qb-stats" style={{ marginTop: '0.5rem', flexWrap: 'nowrap' }}>
                  <div className="ap-qb-stat" style={{ flex: 1 }}>
                    <span className="ap-qb-stat__value">{selectedCampus.students}</span>
                    <span className="ap-qb-stat__label">Active Students</span>
                  </div>
                  <div className="ap-qb-stat" style={{ flex: 1 }}>
                    <span className="ap-qb-stat__value">{selectedCampus.staff}</span>
                    <span className="ap-qb-stat__label">Active Staff</span>
                  </div>
                  <div className="ap-qb-stat" style={{ flex: 1 }}>
                    <span className="ap-qb-stat__value">{selectedCampus.capacity}</span>
                    <span className="ap-qb-stat__label">Student Limit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Campus Modal */}
      {showAddForm && (
        <div className="ap-drawer-overlay" onClick={() => setShowAddForm(false)}>
          <div className="ap-drawer" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="ap-drawer__header">
              <div>
                <h2 className="ap-drawer__title">Create New Campus Branch</h2>
                <p className="ap-drawer__sub">Add operational campus mapping details under EduOS.</p>
              </div>
              <button type="button" className="btn btn--ghost ap-drawer__close" onClick={() => setShowAddForm(false)}>✕</button>
            </div>
            <form onSubmit={handleAddCampusSubmit} className="ap-drawer__body" style={{ gap: '1.25rem' }}>
              {error && <div className="onboarding-error">{error}</div>}

              <div className="form-group">
                <label htmlFor="c-name">Campus Name</label>
                <input 
                  type="text" 
                  id="c-name" 
                  placeholder="e.g. Bangalore Whitefield Campus"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="onboarding-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="c-addr">Physical Location Address</label>
                <input 
                  type="text" 
                  id="c-addr" 
                  placeholder="e.g. Whitefield Main Road, Bangalore"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  className="onboarding-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="c-phone">Contact Phone</label>
                <input 
                  type="tel" 
                  id="c-phone" 
                  placeholder="e.g. +91 80 1122 3344"
                  value={contact}
                  onChange={e => setContact(e.target.value)}
                  className="onboarding-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="c-head">Principal Director Head</label>
                <input 
                  type="text" 
                  id="c-head" 
                  placeholder="e.g. Ms. Shalini Hegde"
                  value={head}
                  onChange={e => setHead(e.target.value)}
                  className="onboarding-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="c-cap">Capacity Limit (Students count)</label>
                <input 
                  type="number" 
                  id="c-cap" 
                  value={capacity}
                  onChange={e => setCapacity(e.target.value)}
                  className="onboarding-input"
                  min="50"
                  max="15000"
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowAddForm(false)} className="btn btn--secondary" style={{ flex: 1, justifyContent: 'center' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary" style={{ flex: 1, justifyContent: 'center' }}>
                  Register Branch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
