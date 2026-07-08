/**
 * Sidebar navigation — premium SaaS-quality design.
 * Features: animated active indicator, user profile, icon-wrapped links.
 */
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Wallet,
  School,
  ClipboardCheck,
  FileText,
  Calendar,
  BookOpen,
  Bell,
  Settings,
  Trophy,
  X,
  ChevronUp,
  NotebookPen,
  CalendarRange,
  ListChecks,
  Database,
  GitPullRequestArrow,
  BarChart3,
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/students', label: 'Students', icon: GraduationCap },
  { to: '/teachers', label: 'Teachers', icon: Users },
  { to: '/fees', label: 'Fees', icon: Wallet },
  { to: '/classes', label: 'Classes & Sections', icon: School },
  { to: '/attendance', label: 'Attendance', icon: ClipboardCheck },
  { to: '/exams', label: 'Exams & Results', icon: FileText },
  { to: '/timetable', label: 'Timetable', icon: Calendar },
  { to: '/library', label: 'Library', icon: BookOpen },
  { to: '/sports', label: 'Sports Activities', icon: Trophy },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/settings', label: 'Settings', icon: Settings },
]

const academicPlanningItems = [
  { to: '/academic/lesson-plans', label: 'Lesson Plans', icon: NotebookPen },
  { to: '/academic/syllabus', label: 'Syllabus Planner', icon: CalendarRange },
  { to: '/academic/assessments', label: 'Assessments', icon: ListChecks },
  { to: '/academic/question-bank', label: 'Question Bank', icon: Database },
  { to: '/academic/approvals', label: 'Approvals', icon: GitPullRequestArrow },
  { to: '/academic/analytics', label: 'Analytics', icon: BarChart3 },
]

function NavItem({ to, label, icon: Icon, end, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
      }
      onClick={onClick}
    >
      <span className="sidebar__link-icon">
        <Icon size={18} />
      </span>
      <span>{label}</span>
    </NavLink>
  )
}

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />}

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`} aria-label="Main navigation">
        {/* Header / Brand */}
        <div className="sidebar__header">
          <div className="sidebar__brand">
            <div className="sidebar__brand-icon" aria-hidden="true">
              <School size={20} color="#fff" />
            </div>
            <div className="sidebar__brand-text">
              <span className="sidebar__brand-name">EduAdmin</span>
              <span className="sidebar__brand-tag">School ERP</span>
            </div>
          </div>
          <button
            type="button"
            className="sidebar__close"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="sidebar__nav-scroll" aria-label="Site navigation">
          <span className="sidebar__section-label">Main Menu</span>
          {navItems.slice(0, 5).map((item) => (
            <NavItem key={item.to} {...item} onClick={onClose} />
          ))}

          <span className="sidebar__section-label">Academic</span>
          {navItems.slice(5, 10).map((item) => (
            <NavItem key={item.to} {...item} onClick={onClose} />
          ))}

          <span className="sidebar__section-label">📚 Academic Planning</span>
          {academicPlanningItems.map((item) => (
            <NavItem key={item.to} {...item} onClick={onClose} />
          ))}

          <span className="sidebar__section-label">System</span>
          {navItems.slice(10).map((item) => (
            <NavItem key={item.to} {...item} onClick={onClose} />
          ))}
        </nav>

        {/* User profile footer */}
        <div className="sidebar__footer">
          <div className="sidebar__user" title="Admin User — Principal">
            <div className="sidebar__user-avatar" aria-hidden="true">AD</div>
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">Admin User</span>
              <span className="sidebar__user-role">Principal</span>
            </div>
            <ChevronUp size={15} className="sidebar__user-icon" />
          </div>
        </div>
      </aside>
    </>
  )
}
