import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import StatCard from '../components/StatCard.jsx'
import BarChart from '../components/BarChart.jsx'
import DonutChart from '../components/DonutChart.jsx'
import { Sparkles, Heart, DollarSign, Award, Settings, TrendingUp } from 'lucide-react'

export default function CommandCenter() {
  
  // Health scores configurations
  const healthScores = [
    { name: 'Institution Health Score', value: 92, trend: 'Optimal', color: '#3b82f6', icon: Heart },
    { name: 'Academic Health Score', value: 89, trend: 'Stable', color: '#a855f7', icon: Award },
    { name: 'Financial Health Score', value: 94, trend: 'Excellent', color: '#22c55e', icon: DollarSign },
    { name: 'Operational Health Score', value: 88, trend: 'Good', color: '#eab308', icon: Settings }
  ]

  // Satisfaction index
  const satisfactionMetrics = [
    { label: 'High', value: 78, color: '#22c55e' },
    { label: 'Moderate', value: 16, color: '#f59e0b' },
    { label: 'Low', value: 6, color: '#ef4444' }
  ]

  const growthData = [
    { label: 'Q1', value: 420 },
    { label: 'Q2', value: 480 },
    { label: 'Q3', value: 520 },
    { label: 'Q4', value: 610 }
  ]

  return (
    <div className="page animate-fadeIn" style={{ paddingBottom: '3rem' }}>
      <PageHeader 
        title="Executive Command Center" 
        subtitle="Global campus health metrics, student satisfaction index, and real-time AI strategic decisions."
        eyebrow="Leadership Desk"
      />

      {/* Conference Room Big KPI Board */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {healthScores.map((score, i) => {
          const Icon = score.icon
          return (
            <div 
              key={i} 
              className="card" 
              style={{ 
                padding: '2rem 1.5rem', 
                textAlign: 'center', 
                borderTop: `6px solid ${score.color}`,
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: `${score.color}15`, color: score.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={24} />
              </div>
              <h3 style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                {score.name}
              </h3>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-text)' }}>
                {score.value}%
              </div>
              <span className="badge" style={{ background: 'var(--color-green-bg)', color: 'var(--color-green-text)' }}>
                {score.trend}
              </span>
            </div>
          )
        })}
      </div>

      {/* AI Recommendations Banner */}
      <div 
        className="card" 
        style={{ 
          padding: '1.5rem', 
          marginBottom: '2rem', 
          background: 'var(--gradient-brand)', 
          color: '#fff', 
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={20} />
        </div>
        <div>
          <h3 style={{ margin: '0 0 0.25rem', color: '#fff', fontSize: '1.05rem' }}>AI Strategic Recommendations</h3>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '0.88rem' }}>
            Collection efficiency in Dwarka Campus is trailing. AI predicts sending direct digital notifications will recover outstanding dues by 14% within 10 days.
          </p>
        </div>
      </div>

      {/* Double Column Graphs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '1.5rem' }}>
        
        <Card title="Quarterly Enrollment Growth" subtitle="AY 2025-26 active admissions pipeline">
          <div style={{ height: '300px', padding: '1rem 0' }}>
            <BarChart data={growthData} labelKey="label" valueKey="value" />
          </div>
        </Card>

        <Card title="Student Satisfaction Index" subtitle="Aggregated surveys feedback index">
          <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DonutChart data={satisfactionMetrics} />
          </div>
        </Card>

      </div>
    </div>
  )
}
