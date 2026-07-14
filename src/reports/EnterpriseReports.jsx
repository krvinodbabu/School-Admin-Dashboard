import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import GlobalFilterPanel from './GlobalFilterPanel.jsx'
import PDFExportCenter from '../report-exports/PDFExportCenter.jsx'
import { REPORT_CATEGORIES, DRILLDOWN_DATA, AI_REPORT_INSIGHTS } from './reportData.js'
import { FileText, ArrowRight, Sparkles, Clock, Star, Users, FolderOpen } from 'lucide-react'

export default function EnterpriseReports() {
  const [selectedReportId, setSelectedReportId] = useState('fee-collect')
  const [drillState, setDrillState] = useState(null) // Holds current level of drilldown data
  
  // Resolve standard or active drilldown data
  const baseReport = DRILLDOWN_DATA[selectedReportId]
  const currentDrill = drillState || baseReport
  
  // Resolve AI Insights
  const insights = AI_REPORT_INSIGHTS[selectedReportId]

  const handleSelectReport = (id) => {
    setSelectedReportId(id)
    setDrillState(null) // Reset drilldown level
  }

  const handleDrill = (item) => {
    if (item.drillKey && baseReport?.details?.[item.drillKey]) {
      setDrillState(baseReport.details[item.drillKey])
    }
  }

  const handleBackToRoot = () => {
    setDrillState(null)
  }

  return (
    <div className="page animate-fadeIn">
      <PageHeader 
        title="Enterprise Decision & Intelligence Reports" 
        subtitle="Global campus reports, CBSE/NAAC audit indexes, and scheduled data distribution."
        eyebrow="Decisions Engine"
      />

      {/* Global Filter Bar */}
      <GlobalFilterPanel onFilterChange={(f) => console.log('Filters updated:', f)} />

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.5rem', alignItems: 'flex-start' }}>
        
        {/* Left Side: Report categories & saved templates list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <Card title="Report Categories">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {Object.keys(REPORT_CATEGORIES).map(catName => (
                <div key={catName}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    {catName}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    {REPORT_CATEGORIES[catName].map(report => {
                      const active = selectedReportId === report.id
                      return (
                        <button
                          key={report.id}
                          className={`tab ${active ? 'active' : ''}`}
                          onClick={() => handleSelectReport(report.id)}
                          style={{ 
                            justifyContent: 'flex-start', 
                            textAlign: 'left', 
                            fontSize: '0.82rem',
                            padding: '0.5rem 0.75rem',
                            width: '100%'
                          }}
                        >
                          {report.name}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Scheduled distribution options */}
          <Card title="Schedule Reports">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {['Daily Digest', 'Weekly Analytics Summary', 'Monthly Board Audit'].map(sch => (
                <div key={sch} style={{ padding: '0.75rem', background: 'var(--color-surface-3)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 500 }}>{sch}</span>
                  <span className="badge" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', fontSize: '0.72rem' }}>Email & WA</span>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* Right Side: Data view & drilldowns */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* AI Insights Card */}
          {insights && (
            <div 
              style={{ 
                background: 'var(--gradient-brand)', 
                color: '#fff', 
                padding: '1.5rem', 
                borderRadius: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                boxShadow: '0 8px 20px -6px rgba(99,102,241,0.3)'
              }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, color: '#fff', fontSize: '1rem' }}>AI Decision Recommendation</h3>
                  <span className="badge" style={{ background: 'rgba(255,255,255,0.25)', color: '#fff' }}>Confidence: {insights.confidence}%</span>
                </div>
                <p style={{ margin: '0.25rem 0 0', opacity: 0.9, fontSize: '0.85rem', lineHeight: 1.4 }}>
                  {insights.recommendation} <br/><strong>Suggested Action: {insights.action}</strong>
                </p>
              </div>
            </div>
          )}

          {/* Drilldown Report Canvas */}
          <Card 
            title={currentDrill?.title || 'Report Grid'} 
            subtitle="Drilldown analytics database. Click rows to view deeper granularity."
          >
            {/* Breadcrumbs */}
            {currentDrill?.breadcrumbs && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.78rem', color: 'var(--color-text-muted)', background: 'var(--color-surface-3)', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                <FolderOpen size={14} />
                {currentDrill.breadcrumbs.map((crumb, idx) => (
                  <span key={idx}>
                    {idx > 0 && <span style={{ margin: '0 0.25rem' }}>/</span>}
                    {crumb}
                  </span>
                ))}
                {drillState && (
                  <button 
                    onClick={handleBackToRoot} 
                    style={{ marginLeft: 'auto', border: 'none', background: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Reset Drilldown
                  </button>
                )}
              </div>
            )}

            {/* Drilldown Table Grid */}
            <div className="table-responsive">
              <table className="ap-table">
                <thead>
                  <tr>
                    <th>Dimension Category</th>
                    <th style={{ textAlign: 'right' }}>Calculated Value</th>
                    {currentDrill?.level === 2 && <th>System Status</th>}
                  </tr>
                </thead>
                <tbody>
                  {currentDrill?.items?.map((item, idx) => (
                    <tr 
                      key={idx} 
                      onClick={() => handleDrill(item)}
                      style={{ cursor: item.drillKey ? 'pointer' : 'default' }}
                    >
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <strong>{item.name}</strong>
                          {item.drillKey && <ArrowRight size={12} style={{ color: 'var(--color-primary)' }} />}
                        </div>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 700 }}>{item.value}</td>
                      {item.status && (
                        <td>
                          <span className="badge" style={{ background: item.status.includes('failed') || item.status.includes('remediation') ? 'var(--color-red-bg)' : 'var(--color-surface-3)' }}>
                            {item.status}
                          </span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* PDF exports compilation and printing */}
          <PDFExportCenter reportTitle={baseReport?.title} reportId={selectedReportId} />

        </div>

      </div>
    </div>
  )
}
