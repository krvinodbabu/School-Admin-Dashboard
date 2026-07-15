import { useState } from 'react'
import PageHeader from '../../components/PageHeader.jsx'
import Card from '../../components/Card.jsx'
import StatCard from '../../components/StatCard.jsx'
import BarChart from '../../components/BarChart.jsx'
import DonutChart from '../../components/DonutChart.jsx'
import GlobalFilterPanel from '../GlobalFilterPanel.jsx'
import ExportCenter from './ExportCenter.jsx'
import { DEPARTMENT_REPORTS, ROLE_REPORT_ACCESS, STRUCTURED_REPORTS_CONTENT, FALLBACK_REPORT_CONTENT } from './reportingConfig.js'
import { useAuth } from '../../auth/AuthContext.jsx'
import { Sparkles, Star, Save, Check, FileText, Search, Plus, Compass } from 'lucide-react'

export default function SelfServicePortal() {
  const { user } = useAuth()
  const currentRole = user?.role || 'Guest'
  
  // Resolve accessible departments
  const allowedDepts = ROLE_REPORT_ACCESS[currentRole] || []
  const hasFullAccess = allowedDepts.includes('*')

  const accessibleDepts = Object.keys(DEPARTMENT_REPORTS).filter(deptKey => 
    hasFullAccess || allowedDepts.includes(deptKey)
  )

  const [selectedDept, setSelectedDept] = useState(accessibleDepts[0] || '')
  const [selectedReportId, setSelectedReportId] = useState(() => {
    const list = DEPARTMENT_REPORTS[accessibleDepts[0]]?.reports || []
    return list[0]?.id || ''
  })

  // Search filter query
  const [searchQuery, setSearchQuery] = useState('')

  // View selectors
  const [activeView, setActiveView] = useState('summary')

  // Saved templates state
  const [favorites, setFavorites] = useState(['acad-attend'])
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Drilldown states
  const [drillRow, setDrillRow] = useState(null)

  const handleDeptSelect = (deptKey) => {
    setSelectedDept(deptKey)
    const list = DEPARTMENT_REPORTS[deptKey]?.reports || []
    if (list.length > 0) {
      setSelectedReportId(list[0].id)
    } else {
      setSelectedReportId('')
    }
    setDrillRow(null)
  }

  const handleReportSelect = (id) => {
    setSelectedReportId(id)
    setDrillRow(null)
  }

  // Get active report metadata
  const activeReport = selectedDept ? DEPARTMENT_REPORTS[selectedDept]?.reports.find(r => r.id === selectedReportId) : null
  
  // Get report content schemas
  const content = selectedReportId ? (STRUCTURED_REPORTS_CONTENT[selectedReportId] || FALLBACK_REPORT_CONTENT) : null

  // Toggle favorite
  const toggleFav = () => {
    if (!selectedReportId) return
    if (favorites.includes(selectedReportId)) {
      setFavorites(prev => prev.filter(id => id !== selectedReportId))
    } else {
      setFavorites(prev => [...prev, selectedReportId])
    }
  }

  const handleSaveTemplate = () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  // Filter report lists based on search
  const originalReportsList = selectedDept ? (DEPARTMENT_REPORTS[selectedDept]?.reports || []) : []
  const filteredReportsList = originalReportsList.filter(rep => 
    rep.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    rep.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Mock Trend Chart Data
  const trendMockData = [
    { month: 'Q1 Term', value: 78 },
    { month: 'Q2 Term', value: 83 },
    { month: 'Q3 Term', value: 88 },
    { month: 'Q4 Term', value: 93 }
  ]

  // Render Empty State if no accessible departments
  if (accessibleDepts.length === 0) {
    return (
      <div className="page animate-fadeIn">
        <PageHeader 
          title="Self-Service Reporting Desk" 
          subtitle="Enterprise analytics, CBSE/ICSE indexes, and automated data exports."
          eyebrow="My Reports"
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '3rem', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--color-surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--color-text-muted)' }}>
            <Compass size={32} />
          </div>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem' }}>No Reports Allocated</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', maxWidth: '400px', lineHeight: 1.5 }}>
            Your current switched role ({currentRole}) does not have active reporting permissions mapped. Contact the Super Administrator to request report permissions.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="page animate-fadeIn" style={{ paddingBottom: '3rem' }}>
      <PageHeader 
        title="Departmental Self-Service Reporting Portal" 
        subtitle={`Role-tailored workspace for ${currentRole}. CBSE indexes, data forecasts, and compliance registries.`}
        eyebrow="My Reports"
      />

      {/* Global filtering */}
      <GlobalFilterPanel onFilterChange={(f) => console.log('Portal filters updated:', f)} />

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.5rem', alignItems: 'flex-start' }}>
        
        {/* Left Side: Department & reports selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Departments */}
          <Card title="My Departments">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {accessibleDepts.map(deptKey => (
                <button
                  key={deptKey}
                  onClick={() => handleDeptSelect(deptKey)}
                  className={`tab ${selectedDept === deptKey ? 'active' : ''}`}
                  style={{ justifyContent: 'flex-start', padding: '0.6rem 0.88rem', fontSize: '0.82rem', width: '100%', textAlign: 'left' }}
                >
                  {deptKey}
                </button>
              ))}
            </div>
          </Card>

          {/* Sub-Reports with search */}
          <Card title="Available Reports">
            <div style={{ marginBottom: '1rem', position: 'relative' }}>
              <input
                type="text"
                placeholder="Search reports..."
                className="ap-input"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '2rem', fontSize: '0.78rem' }}
              />
              <Search size={14} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', maxHeight: '300px', overflowY: 'auto' }}>
              {filteredReportsList.map(report => (
                <button
                  key={report.id}
                  onClick={() => handleReportSelect(report.id)}
                  className={`tab ${selectedReportId === report.id ? 'active' : ''}`}
                  style={{ justifyContent: 'flex-start', padding: '0.5rem 0.75rem', fontSize: '0.78rem', textAlign: 'left', width: '100%' }}
                >
                  {report.name}
                </button>
              ))}
              {filteredReportsList.length === 0 && (
                <div style={{ padding: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.75rem', textAlign: 'center' }}>No matching reports.</div>
              )}
            </div>
          </Card>

          {/* Template Actions */}
          {selectedReportId && (
            <Card title="Template Controls">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button className="btn btn-outline" onClick={toggleFav} style={{ justifyContent: 'center', fontSize: '0.82rem' }}>
                  <Star size={14} style={{ marginRight: '0.35rem', fill: favorites.includes(selectedReportId) ? 'var(--color-primary)' : 'none' }} />
                  {favorites.includes(selectedReportId) ? 'Favorited Template' : 'Add to Favorites'}
                </button>
                {saveSuccess ? (
                  <div style={{ padding: '0.5rem', background: 'var(--color-green-bg)', color: 'var(--color-green-text)', borderRadius: '6px', fontSize: '0.78rem', textAlign: 'center' }}>
                    <Check size={14} style={{ display: 'inline', marginRight: '0.25rem' }} /> Template Saved!
                  </div>
                ) : (
                  <button className="btn btn-outline" onClick={handleSaveTemplate} style={{ justifyContent: 'center', fontSize: '0.82rem' }}>
                    <Save size={14} style={{ marginRight: '0.35rem' }} /> Save Template
                  </button>
                )}
              </div>
            </Card>
          )}

        </div>

        {/* Right Side: Report Canvas & Output Views */}
        {selectedReportId && content ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Report Header Card */}
            <div style={{ background: 'var(--gradient-brand)', color: '#fff', borderRadius: '16px', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', marginBottom: '0.5rem', display: 'inline-block' }}>Category: {selectedDept}</span>
                <h2 style={{ margin: '0.25rem 0 0.5rem', color: '#fff', fontSize: '1.5rem' }}>{activeReport?.name}</h2>
                <p style={{ margin: 0, opacity: 0.9, fontSize: '0.88rem' }}>Scope: {content.scope}</p>
              </div>
            </div>

            {/* Output Views Selection */}
            <div className="tabs" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: '0.5rem', borderRadius: '12px' }}>
              {['summary', 'detailed', 'trend', 'comparative', 'executive'].map(view => (
                <button
                  key={view}
                  className={`tab ${activeView === view ? 'active' : ''}`}
                  onClick={() => { setActiveView(view); setDrillRow(null); }}
                  style={{ textTransform: 'capitalize', fontSize: '0.82rem', padding: '0.5rem 1rem' }}
                >
                  {view} View
                </button>
              ))}
            </div>

            {/* AI Decision Recommendations Card */}
            {content.aiInsight && (
              <div style={{ padding: '1.25rem', background: 'var(--color-purple-bg)', color: 'var(--color-purple-text)', borderRadius: '12px', borderLeft: '4px solid var(--color-primary)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Sparkles size={20} style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>AI Strategic Decision Recommendation</span>
                    <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Confidence: {content.aiInsight.confidence}%</span>
                  </div>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.82rem', lineHeight: 1.4 }}>
                    {content.aiInsight.recommendation} <br/><strong>Suggested Action: {content.aiInsight.action}</strong>
                  </p>
                </div>
              </div>
            )}

            {/* Render Views dynamic contents */}
            <Card title="Report Information & Analysis">
              
              {activeView === 'summary' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="stats-grid animate-fadeIn" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {content.kpis.map((kpi, idx) => (
                      <StatCard key={idx} title={kpi.label} value={kpi.value} trend={kpi.trend} color={kpi.type === 'good' ? 'green' : kpi.type === 'warn' ? 'amber' : 'blue'} icon={FileText} />
                    ))}
                  </div>
                  <div style={{ padding: '1rem', background: 'var(--color-surface-3)', borderRadius: '12px' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>Executive Summary</div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{content.summary}</p>
                  </div>
                </div>
              )}

              {activeView === 'detailed' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ padding: '1rem', background: 'var(--color-surface-3)', borderRadius: '12px' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>Detailed Analysis Logs (Click rows for granular parameters)</div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{content.analysis}</p>
                  </div>

                  <div className="table-responsive">
                    <table className="ap-table">
                      <thead>
                        <tr>
                          <th>Metric Dimension</th>
                          <th>Data Value</th>
                          <th>Status Index</th>
                        </tr>
                      </thead>
                      <tbody>
                        {content.table.map((row, idx) => (
                          <tr key={idx} onClick={() => setDrillRow(drillRow === idx ? null : idx)} style={{ cursor: 'pointer' }}>
                            <td><strong>{row.name}</strong></td>
                            <td>{row.value || 'Data Active'}</td>
                            <td>
                              <span className="badge" style={{ background: row.status.includes('Review') || row.status.includes('Action') ? 'var(--color-red-bg)' : 'var(--color-surface-3)' }}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Drilldown view detail container */}
                  {drillRow !== null && (
                    <div className="animate-fadeIn" style={{ padding: '1.25rem', background: 'var(--color-surface-3)', border: '1px solid var(--color-border)', borderRadius: '12px', marginTop: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary)' }}>Granular Drilldown: {content.table[drillRow].name}</div>
                        <button className="btn btn-outline" style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem' }} onClick={() => setDrillRow(null)}>Close</button>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
                        Dynamic compliance scan completed. This metrics layer matches our target index specifications. Internal records indicate no further remediation logs.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeView === 'trend' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ height: '240px' }}>
                    <BarChart data={trendMockData} labelKey="month" valueKey="value" />
                  </div>
                  <div style={{ padding: '1rem', background: 'var(--color-surface-3)', borderRadius: '12px' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>Trend Indicators</div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{content.trends}</p>
                  </div>
                </div>
              )}

              {activeView === 'comparative' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DonutChart data={[
                      { label: 'Primary Wing', value: 45, color: '#3b82f6' },
                      { label: 'Secondary Wing', value: 35, color: '#a855f7' },
                      { label: 'Tertiary Wing', value: 20, color: '#22c55e' }
                    ]} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ padding: '1rem', background: 'var(--color-surface-3)', borderRadius: '12px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.35rem' }}>Risk Assessment Report</div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{content.risks}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeView === 'executive' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: 'var(--color-surface-3)', borderRadius: '12px', borderLeft: '4px solid var(--color-green)' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>Strategic Conclusion</div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{content.conclusion}</p>
                  </div>
                  <div style={{ padding: '1rem', background: 'var(--color-surface-3)', borderRadius: '12px', borderLeft: '4px solid var(--color-primary)' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.25rem' }}>Recommendations & Actions</div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                      {content.recommendations} <br/><strong>Suggested Action: {content.action}</strong>
                    </p>
                  </div>
                </div>
              )}

            </Card>

            {/* Export Actions Panel */}
            <ExportCenter reportTitle={activeReport?.name} filters={['Term 1', selectedDept]} />

          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '3rem', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem' }}>No Report Selected</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Choose an active report from the sidebar panel to render metrics.</p>
          </div>
        )}

      </div>
    </div>
  )
}
