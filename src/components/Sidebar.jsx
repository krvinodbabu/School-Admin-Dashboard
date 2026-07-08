/**
 * Sidebar navigation — lists all main sections of the school ERP.
 * Uses react-router NavLink for active route highlighting.
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

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />}
      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__header">
          <div className="sidebar__brand">
            <School size={28} />
            <div>
              <span className="sidebar__brand-name">EduAdmin</span>
              <span className="sidebar__brand-tag">School ERP</span>
            </div>
          </div>
          <button type="button" className="sidebar__close" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar__nav">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
              onClick={onClose}
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  )
}
