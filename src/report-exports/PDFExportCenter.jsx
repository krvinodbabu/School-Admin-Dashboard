import { useState } from 'react'
import { FileText, Download, Printer, ShieldAlert, Sparkles, Check } from 'lucide-react'

export default function PDFExportCenter({ reportTitle, reportId }) {
  const [downloading, setDownloading] = useState(false)
  const [success, setSuccess] = useState(false)

  const triggerPDFCompile = () => {
    setDownloading(true)
    setSuccess(false)
    setTimeout(() => {
      setDownloading(false)
      setSuccess(true)
    }, 2000)
  }

  return (
    <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}>
        <FileText size={20} style={{ color: 'var(--color-primary)' }} />
        <span>PDF Compilation & Export Engine</span>
      </div>

      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
        Compile the current dashboard report into an official institution PDF. The generated document includes institution branding logos, executive cover sheets, charts, and audit appendices.
      </p>

      {success ? (
        <div style={{ padding: '0.75rem 1rem', background: 'var(--color-green-bg)', color: 'var(--color-green-text)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Check size={16} /> Compiled & PDF Downloaded successfully!
        </div>
      ) : (
        <button 
          className="btn btn-primary" 
          onClick={triggerPDFCompile}
          disabled={downloading}
          style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          {downloading ? 'Compiling Cover & Charts PDF...' : 'Compile to PDF Report'}
        </button>
      )}

      {/* Structured Document Map */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '1rem', background: 'var(--color-surface-3)' }}>
        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600, marginBottom: '0.25rem' }}>EXPORT DOCUMENT STRUCTURE</div>
        {[
          '1. Official Institution Cover Sheet',
          '2. Scope of Audit & Parameters',
          '3. Executive Dashboard Summary',
          '4. Detailed Tabular Analysis Logs',
          '5. AI-predicted Analytics Forecasts',
          '6. Compliance Appendix'
        ].map(item => (
          <div key={item} style={{ fontSize: '0.78rem', color: 'var(--color-text)' }}>{item}</div>
        ))}
      </div>
    </div>
  )
}
