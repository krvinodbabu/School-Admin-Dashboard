import { CROSS_CAMPUS_STATS } from '../tenant/tenantData.js'
import { useTenant } from '../context/TenantContext.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import StatCard from '../components/StatCard.jsx'
import BarChart from '../components/BarChart.jsx'
import DonutChart from '../components/DonutChart.jsx'
import { Layers, Building, Users, CreditCard, ShieldAlert, Award } from 'lucide-react'

export default function CrossCampusAnalytics() {
  const { activeGroup } = useTenant()
  const stats = CROSS_CAMPUS_STATS

  // Convert comparative campus stats into suitable arrays for the bar/donut charts
  const collectionData = stats.campusComparison.map(c => ({
    month: c.code,
    percentage: c.collection
  }))

  const studentDistribution = stats.campusComparison.map(c => ({
    label: c.name,
    value: c.students,
    color: c.code === 'HYD' ? '#3b82f6' : c.code === 'BLR' ? '#10b981' : '#f59e0b'
  }))

  return (
    <div className="page animate-fadeIn">
      <PageHeader
        title="Cross-Campus Analytics"
        subtitle={`Executive operational metrics for the ${activeGroup.name}`}
        eyebrow="Tenant Infrastructure"
      />

      {/* Summary KPI metrics */}
      <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
        <StatCard title="Total Institutions" value={stats.totalInstitutions} icon={Building} color="blue" />
        <StatCard title="Total Active Campuses" value={stats.totalCampuses} icon={Layers} color="indigo" />
        <StatCard title="Global Student Pool" value={stats.totalStudents.toLocaleString()} icon={Users} color="green" />
        <StatCard title="Global Workforce" value={stats.totalEmployees} icon={Users} color="purple" />
        <StatCard title="Fee Collection rate" value={`${stats.feeCollection}%`} icon={CreditCard} color="amber" />
        <StatCard title="Target Admissions" value={`${stats.admissionsRate}%`} icon={Award} color="red" />
      </div>

      <div className="dashboard-grid">
        {/* Fee Collection Rate Comparer chart */}
        <Card title="Collections Comparison" subtitle="Fee collection percentage by campus branch code">
          <BarChart data={collectionData} valueKey="percentage" labelKey="month" />
        </Card>

        {/* Student Distribution chart */}
        <Card title="Student Enrollment Share" subtitle="Proportional distribution of active students by campus">
          <DonutChart data={studentDistribution} />
        </Card>
      </div>

      {/* Comparative Matrix table */}
      <div className="card" style={{ marginTop: '1.5rem', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
          <h3 className="card__title">Campus Comparative Performance Matrix</h3>
          <p className="card__subtitle">Detailed audit records of active campus modules benchmarks</p>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Campus</th>
                <th>Branch Code</th>
                <th>Active Students</th>
                <th>Staff Count</th>
                <th>Collections Rate</th>
                <th>Admissions Met</th>
                <th>Academic Score</th>
              </tr>
            </thead>
            <tbody>
              {stats.campusComparison.map(c => (
                <tr key={c.code}>
                  <td><strong>{c.name}</strong></td>
                  <td><span className="badge badge--section">{c.code}</span></td>
                  <td>{c.students.toLocaleString()}</td>
                  <td>{c.staff}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <div className="progress-bar" style={{ height: 6, width: '60px' }}>
                        <div className="progress-bar__fill" style={{ width: `${c.collection}%`, background: 'var(--gradient-green)' }} />
                      </div>
                      <span>{c.collection}%</span>
                    </div>
                  </td>
                  <td>{c.admissions}%</td>
                  <td>
                    <span className="badge" style={{ background: 'var(--color-brand-bg)', color: 'var(--color-brand)', fontWeight: 700 }}>
                      {c.performance}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
