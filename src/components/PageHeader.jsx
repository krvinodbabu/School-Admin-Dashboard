/**
 * Page header with eyebrow label, large title, subtitle, and optional action slot.
 */
import { Home, ChevronRight } from 'lucide-react'

export default function PageHeader({ title, subtitle, eyebrow, children }) {
  return (
    <div className="page-header">
      <div>
        {/* Breadcrumb eyebrow */}
        <div className="page-header__eyebrow">
          <Home size={11} />
          <ChevronRight size={10} />
          <span>{eyebrow || title}</span>
        </div>
        <h1 className="page-header__title">{title}</h1>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
      </div>
      {children && <div className="page-header__actions">{children}</div>}
    </div>
  )
}
