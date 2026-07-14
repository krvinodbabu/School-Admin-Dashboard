import { ROLE_DASHBOARDS, DEFAULT_DASHBOARD } from './roleDashboards.js'
import { useEduOS } from '../core/EduOSContext.jsx'
import StatCard from '../components/StatCard.jsx'
import Card from '../components/Card.jsx'
import BarChart from '../components/BarChart.jsx'
import DonutChart from '../components/DonutChart.jsx'
import { Users, GraduationCap, Wallet, ClipboardCheck, Bell, AlertTriangle } from 'lucide-react'

export default function DashboardSelector() {
  const { currentRole } = useEduOS()
  
  // Resolve dashboard configs based on exact mapping or a sensible default
  const config = ROLE_DASHBOARDS[currentRole] || DEFAULT_DASHBOARD

  // Mock charts
  const attendanceMockData = [
    { month: 'Jan', percentage: 92 },
    { month: 'Feb', percentage: 94 },
    { month: 'Mar', percentage: 95 },
    { month: 'Apr', percentage: 93 },
    { month: 'May', percentage: 94 },
    { month: 'Jun', percentage: 96 }
  ]

  const distributionMockData = [
    { label: 'Paid', value: 75, color: '#22c55e' },
    { label: 'Pending', value: 18, color: '#f59e0b' },
    { label: 'Overdue', value: 7, color: '#ef4444' }
  ]

  const getKPIIcon = (index) => {
    switch (index) {
      case 0: return GraduationCap
      case 1: return Users
      case 2: return Wallet
      default: return ClipboardCheck
    }
  }

  const getKPIColor = (type) => {
    if (type === 'good') return 'green'
    if (type === 'warn') return 'amber'
    return 'blue'
  }

  return (
    <div className="animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Alerts */}
      {config.alerts && config.alerts.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {config.alerts.map((alert, i) => (
            <div 
              key={i} 
              style={{ 
                background: alert.type === 'warn' ? 'var(--color-amber-bg)' : 'var(--color-blue-bg)',
                color: alert.type === 'warn' ? 'var(--color-amber-text)' : 'var(--color-blue-text)',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderLeft: `4px solid ${alert.type === 'warn' ? 'var(--color-amber)' : 'var(--color-primary)'}`,
                fontSize: '0.88rem',
                fontWeight: 500
              }}
            >
              <AlertTriangle size={18} />
              <span>{alert.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* KPIs Grid */}
      <div className="stats-grid">
        {config.kpis.map((kpi, i) => (
          <StatCard
            key={i}
            title={kpi.label}
            value={kpi.value}
            icon={getKPIIcon(i)}
            color={getKPIColor(kpi.trendType)}
            trend={kpi.trend}
          />
        ))}
      </div>

      {/* Generic Analytics Row */}
      <div className="dashboard-grid">
        <Card title="Attendance Performance Trend" subtitle="Campus monthly attendance registry">
          <BarChart data={attendanceMockData} labelKey="month" valueKey="percentage" />
        </Card>
        <Card title="Operational Distributions" subtitle="Fee collection and allocation statuses">
          <DonutChart data={distributionMockData} />
        </Card>
      </div>

    </div>
  )
}
