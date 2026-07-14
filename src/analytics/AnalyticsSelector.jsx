import { useState } from 'react'
import { ANALYTICS_VIEWS } from './analyticsConfig.js'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import BarChart from '../components/BarChart.jsx'
import { BarChart3, TrendingUp, DollarSign, Users, Award, Shield } from 'lucide-react'

export default function AnalyticsSelector() {
  const [activeTab, setActiveTab] = useState('Leadership')
  const config = ANALYTICS_VIEWS[activeTab]

  return (
    <div className="page animate-fadeIn">
      <PageHeader 
        title="Role Specific Analytics Desk" 
        subtitle="Segmented operations performance metrics, recruitment pipelines, and transit efficiency tracker."
        eyebrow="Learning Intelligence"
      />

      {/* Segment Selector tabs */}
      <div className="tabs" style={{ marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        {Object.keys(ANALYTICS_VIEWS).map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '1.5rem', alignItems: 'flex-start' }}>
        
        {/* Left Side: Chart */}
        <Card title={config.title} subtitle={config.chartLabel}>
          <div style={{ height: '320px', padding: '1rem 0' }}>
            <BarChart data={config.chartData} labelKey="label" valueKey="value" />
          </div>
        </Card>

        {/* Right Side: Key Metrics list */}
        <Card title="Key Analytics Metrics">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {config.metrics.map((m, i) => (
              <div 
                key={i} 
                style={{ 
                  padding: '1.25rem', 
                  background: 'var(--color-surface-3)', 
                  borderRadius: '12px', 
                  border: '1px solid var(--color-border)' 
                }}
              >
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>
                  {m.name}
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  {m.desc}
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  )
}
