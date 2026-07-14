import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import { LayoutGrid, BarChart3, Database, Save, Check, Play } from 'lucide-react'

export default function ReportBuilder() {
  const [dataSources, setDataSources] = useState([
    { name: 'Student Academic Records', active: true },
    { name: 'Fee Collection Ledger', active: false },
    { name: 'Fleet Transit Logs', active: false }
  ])

  const [availableColumns, setAvailableColumns] = useState([
    { id: 'col-1', label: 'Student Name', selected: true },
    { id: 'col-2', label: 'Average Mastery %', selected: true },
    { id: 'col-3', label: 'Fee Outstanding (INR)', selected: false },
    { id: 'col-4', label: 'Attendance Rate %', selected: true },
    { id: 'col-5', label: 'Assigned Transport Route', selected: false }
  ])

  const [selectedChart, setSelectedChart] = useState('Bar Chart')
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleToggleCol = (id) => {
    setAvailableColumns(prev => prev.map(col => 
      col.id === id ? { ...col, selected: !col.selected } : col
    ))
  }

  const handleSaveTemplate = () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  return (
    <div className="page animate-fadeIn">
      <PageHeader 
        title="Custom Report Builder" 
        subtitle="Drag & drop data fields, define filters, select visualizations, and save templates."
        eyebrow="Decisions Intelligence"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem', alignItems: 'flex-start' }}>
        
        {/* Left Control Board */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Data Sources */}
          <Card title="Data Sources">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {dataSources.map((src, i) => (
                <div 
                  key={i} 
                  onClick={() => setDataSources(prev => prev.map((s, idx) => ({ ...s, active: i === idx })))}
                  style={{ 
                    padding: '0.75rem 1rem', 
                    borderRadius: '8px', 
                    border: '1px solid var(--color-border)', 
                    cursor: 'pointer',
                    background: src.active ? 'var(--color-primary-light)' : 'transparent',
                    color: src.active ? 'var(--color-primary)' : 'var(--color-text)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Database size={14} />
                  <span>{src.name}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Fields Selection */}
          <Card title="Select Columns">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {availableColumns.map(col => (
                <label 
                  key={col.id} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem', 
                    fontSize: '0.85rem', 
                    padding: '0.5rem', 
                    borderRadius: '6px', 
                    cursor: 'pointer' 
                  }}
                >
                  <input 
                    type="checkbox" 
                    checked={col.selected} 
                    onChange={() => handleToggleCol(col.id)}
                    style={{ accentColor: 'var(--color-primary)' }}
                  />
                  <span>{col.label}</span>
                </label>
              ))}
            </div>
          </Card>

        </div>

        {/* Right Canvas */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <Card 
            title="Design Canvas" 
            subtitle="Build templates visually"
            actionLabel="Save Template"
          >
            {/* Visual preview dashboard */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Chart Type Picker */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, marginBottom: '0.5rem' }}>Chart Visualization</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['Bar Chart', 'Pie Chart', 'Tabular View'].map(chart => (
                    <button 
                      key={chart}
                      className={`btn ${selectedChart === chart ? 'btn-primary' : 'btn-outline'}`}
                      onClick={() => setSelectedChart(chart)}
                      style={{ padding: '0.4rem 1rem', fontSize: '0.82rem' }}
                    >
                      {chart}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic canvas simulator */}
              <div 
                style={{ 
                  height: '240px', 
                  border: '2px dashed var(--color-border)', 
                  borderRadius: '16px', 
                  background: 'var(--color-surface-3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <BarChart3 size={40} style={{ color: 'var(--color-text-muted)' }} />
                <strong style={{ fontSize: '0.9rem' }}>Template Design Active</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Selected Columns: {availableColumns.filter(c => c.selected).map(c => c.label).join(', ') || 'None'}
                </span>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                {saveSuccess ? (
                  <div style={{ padding: '0.5rem 1rem', background: 'var(--color-green-bg)', color: 'var(--color-green-text)', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Check size={14} /> Saved Template!
                  </div>
                ) : (
                  <button className="btn btn-primary" onClick={handleSaveTemplate} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Save size={16} /> Save Custom Template
                  </button>
                )}
              </div>

            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}
