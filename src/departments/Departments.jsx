import { useState } from 'react'
import { DEPARTMENTS } from '../tenant/tenantData.js'
import { useTenant } from '../context/TenantContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import StatCard from '../components/StatCard.jsx'
import { Users, User, ClipboardCheck, Sparkles, Building, BarChart2 } from 'lucide-react'

export default function Departments() {
  const { activeCampus } = useTenant()
  const [filterQuery, setFilterQuery] = useState('')

  const filtered = DEPARTMENTS.filter(d => 
    d.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    d.head.toLowerCase().includes(filterQuery.toLowerCase())
  )

  // Total KPIs
  const totalStaffCount = DEPARTMENTS.reduce((acc, d) => acc + d.staff, 0)
  const totalPendingTasks = DEPARTMENTS.reduce((acc, d) => acc + d.tasks, 0)

  return (
    <div className="page animate-fadeIn">
      <PageHeader
        title="Department Management"
        subtitle={`System departments and performance metrics for the ${activeCampus?.name || 'EduOS Campus'}`}
        eyebrow="Tenant Infrastructure"
      />

      {/* KPI Stats */}
      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <StatCard title="Total Departments" value={DEPARTMENTS.length} icon={Building} color="blue" />
        <StatCard title="Active Department Staff" value={totalStaffCount} icon={Users} color="green" />
        <StatCard title="Total Pending Tasks" value={totalPendingTasks} icon={ClipboardCheck} color="amber" />
        <StatCard title="KPI Targets Met" value="94.6%" icon={BarChart2} color="indigo" />
      </div>

      {/* Search and Filters */}
      <div className="card ap-inline-filters" style={{ marginBottom: '1.25rem' }}>
        <input 
          type="search"
          className="onboarding-input"
          placeholder="Search departments or heads..."
          value={filterQuery}
          onChange={e => setFilterQuery(e.target.value)}
          style={{ maxWidth: '320px', padding: '0.45rem 0.75rem', fontSize: '0.82rem' }}
          id="dept-search-input"
        />
      </div>

      {/* Grid of Department Cards */}
      <div className="ap-card-grid">
        {filtered.map(dept => (
          <div key={dept.id} className="ap-plan-card" style={{ padding: '1.25rem' }}>
            <div className="ap-plan-card__header">
              <span className="ap-plan-card__subject">{dept.name}</span>
              <span className="badge badge--section" style={{ background: 'var(--color-surface-3)', color: 'var(--color-text)' }}>
                {dept.staff} Staff
              </span>
            </div>

            <div className="ap-plan-card__meta" style={{ margin: '0.5rem 0 0.75rem' }}>
              <span><User size={12} /> Head: <strong>{dept.head}</strong></span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                <span>Students Served:</span>
                <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{dept.students}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                <span>Pending Tasks:</span>
                <span style={{ fontWeight: 600, color: dept.tasks > 4 ? 'var(--color-red-text)' : 'var(--color-text)' }}>{dept.tasks}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                <span>Core KPI:</span>
                <span style={{ fontWeight: 700, color: 'var(--color-brand)' }}>{dept.kpi}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
