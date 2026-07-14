/**
 * Dashboard — premium hero landing page with KPI cards, charts, and activity feeds.
 */
import {
  Users,
  GraduationCap,
  Wallet,
  ClipboardCheck,
  FileText,
  Bell,
  Sparkles,
  CalendarDays,
  ArrowRight,
  BookOpen,
} from 'lucide-react'
import { useEduOS } from '../core/EduOSContext.jsx'
import DashboardSelector from '../dashboards/DashboardSelector.jsx'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning'
  if (h < 17) return 'Good Afternoon'
  return 'Good Evening'
}

export default function Dashboard() {
  const { institution, currentRole } = useEduOS()

  return (
    <div className="page animate-fadeIn" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* ── Hero Banner ── */}
      <div className="dashboard-hero" style={{ marginBottom: 0 }}>
        <div className="dashboard-hero__eyebrow">
          <Sparkles size={11} />
          {institution.name} · Academic Year {institution.academicYear}
        </div>
        <h1 className="dashboard-hero__title">
          {getGreeting()}, {currentRole} 👋
        </h1>
        <p className="dashboard-hero__subtitle">
          Welcome to the {institution.type} Operating System portal for the {institution.campus}.
        </p>
        <div className="dashboard-hero__actions">
          <button type="button" className="btn btn--hero-secondary" id="dashboard-quick-report-btn">
            <FileText size={16} />
            Quick Report
          </button>
        </div>

        <div className="dashboard-hero__date">
          <strong>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</strong>
          {new Date().toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric' })}
        </div>
      </div>

      {/* ── Configuration Driven Dynamic Dashboard ── */}
      <DashboardSelector />

    </div>
  )
}
