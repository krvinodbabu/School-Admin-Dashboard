/**
 * Sidebar navigation — dynamic configurable EduOS-quality design.
 * Features: animated active indicator, user profile, dynamic modules config list.
 */
import { NavLink } from 'react-router-dom'
import { useEduOS } from '../core/EduOSContext.jsx'
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
  UserPlus,
  Briefcase,
  Bus,
  CalendarDays,
  Building,
  HelpCircle
} from 'lucide-react'

// Dynamic mapping of links to their parent operating system modules
const moduleSections = [
  {
    module: 'Academics',
    label: '📚 Academic Management',
    items: [
      { to: '/students', label: 'Students', icon: GraduationCap },
      { to: '/teachers', label: 'Teachers', icon: Users },
      { to: '/classes', label: 'Classes & Sections', icon: School },
      { to: '/attendance', label: 'Attendance', icon: ClipboardCheck },
      { to: '/exams', label: 'Exams & Results', icon: FileText },
      { to: '/timetable', label: 'Timetable', icon: Calendar },
      { to: '/academic/lesson-plans', label: 'Lesson Plans', icon: NotebookPen },
      { to: '/academic/syllabus', label: 'Syllabus Planner', icon: CalendarRange },
      { to: '/academic/assessments', label: 'Assessments', icon: ListChecks },
      { to: '/academic/question-bank', label: 'Question Bank', icon: Database },
      { to: '/academic/approvals', label: 'Approvals', icon: GitPullRequestArrow },
    ]
  },
  {
    module: 'Admissions',
    label: '🎯 Admissions',
    items: [
      { to: '/admissions', label: 'Admissions Intake', icon: UserPlus }
    ]
  },
  {
    module: 'Finance',
    label: '💼 Finance & Billing',
    items: [
      { to: '/fees', label: 'Fees Management', icon: Wallet }
    ]
  },
  {
    module: 'HR',
    label: '👥 Human Resources',
    items: [
      { to: '/hr', label: 'Staff Directory', icon: Briefcase }
    ]
  },
  {
    module: 'Transport',
    label: '🚌 Transport',
    items: [
      { to: '/transport', label: 'Bus Routing', icon: Bus }
    ]
  },
  {
    module: 'Events',
    label: '🗓️ Events',
    items: [
      { to: '/events', label: 'School Events', icon: CalendarDays }
    ]
  },
  {
    module: 'Sports',
    label: '🏆 Sports',
    items: [
      { to: '/sports', label: 'Sports Activities', icon: Trophy }
    ]
  },
  {
    module: 'Facilities',
    label: '🏢 Facilities',
    items: [
      { to: '/library', label: 'Library Management', icon: BookOpen }
    ]
  },
  {
    module: 'Support',
    label: '🛠️ Helpdesk & Support',
    items: [
      { to: '/support', label: 'Help Desk', icon: HelpCircle }
    ]
  },
  {
    module: 'Communication',
    label: '🔔 Communication',
    items: [
      { to: '/notifications', label: 'Notifications', icon: Bell }
    ]
  },
  {
    module: 'Analytics',
    label: '📊 Analytics Desk',
    items: [
      { to: '/academic/analytics', label: 'Analytics & Coverage', icon: BarChart3 }
    ]
  },
  {
    module: 'Settings',
    label: '⚙️ Settings',
    items: [
      { to: '/settings', label: 'System Settings', icon: Settings }
    ]
  }
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
  const { modules, institution, currentRole } = useEduOS()

  // Helper to check if a specific module name is enabled
  const isModuleEnabled = (moduleName) => {
    const target = modules.find(m => m.name === moduleName)
    return target ? target.enabled : false
  }

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
              <span className="sidebar__brand-name">{institution.name.split(' ')[0]}OS</span>
              <span className="sidebar__brand-tag">Platform Foundation</span>
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
          {/* Always enabled Dashboard link */}
          <span className="sidebar__section-label">Main Menu</span>
          <NavItem to="/" label="Dashboard" icon={LayoutDashboard} end={true} onClick={onClose} />

          {/* Dynamically generated sections based on enabled modules configuration */}
          {moduleSections.map(section => {
            if (!isModuleEnabled(section.module)) return null
            return (
              <div key={section.module} style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="sidebar__section-label">{section.label}</span>
                {section.items.map((item) => (
                  <NavItem key={item.to} {...item} onClick={onClose} />
                ))}
              </div>
            )
          })}
        </nav>

        {/* User profile footer showing currently switched persona */}
        <div className="sidebar__footer">
          <div className="sidebar__user" title={`Persona active: ${currentRole}`}>
            <div className="sidebar__user-avatar" aria-hidden="true">
              {currentRole.slice(0, 2).toUpperCase()}
            </div>
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">Prototype Persona</span>
              <span className="sidebar__user-role">{currentRole}</span>
            </div>
            <ChevronUp size={15} className="sidebar__user-icon" />
          </div>
        </div>
      </aside>
    </>
  )
}
