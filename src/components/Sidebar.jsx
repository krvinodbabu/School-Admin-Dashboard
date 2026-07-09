/**
 * Sidebar navigation — dynamically filtered based on active modules, roles, and campus configurations.
 */
import { NavLink } from 'react-router-dom'
import { useEduOS } from '../core/EduOSContext.jsx'
import { useRBAC } from '../rbac/RBACContext.jsx'
import { useTenant } from '../context/TenantContext.jsx'
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
  HelpCircle,
  Shield,
  Activity
} from 'lucide-react'

// Dynamic mapping of links to their parent operating system modules & required permissions
const moduleSections = [
  {
    module: 'Academics',
    label: '📚 Academic Management',
    items: [
      { to: '/students', label: 'Students', icon: GraduationCap, permission: 'student.view' },
      { to: '/teachers', label: 'Teachers', icon: Users, permission: 'teacher.view' },
      { to: '/classes', label: 'Classes & Sections', icon: School, permission: 'student.view' },
      { to: '/attendance', label: 'Attendance', icon: ClipboardCheck, permission: 'student.view' },
      { to: '/exams', label: 'Exams & Results', icon: FileText, permission: 'student.view' },
      { to: '/timetable', label: 'Timetable', icon: Calendar, permission: 'student.view' },
      { to: '/academic/lesson-plans', label: 'Lesson Plans', icon: NotebookPen, permission: 'lessonplan.create' },
      { to: '/academic/syllabus', label: 'Syllabus Planner', icon: CalendarRange, permission: 'lessonplan.create' },
      { to: '/academic/assessments', label: 'Assessments', icon: ListChecks, permission: 'assessment.create' },
      { to: '/academic/question-bank', label: 'Question Bank', icon: Database, permission: 'assessment.create' },
      { to: '/academic/approvals', label: 'Approvals', icon: GitPullRequestArrow, permission: 'lessonplan.approve' },
    ]
  },
  {
    module: 'Admissions',
    label: '🎯 Admissions',
    items: [
      { to: '/admissions', label: 'Admissions Intake', icon: UserPlus, permission: 'student.create' }
    ]
  },
  {
    module: 'Finance',
    label: '💼 Finance & Billing',
    items: [
      { to: '/fees', label: 'Fees Management', icon: Wallet, permission: 'fees.view' }
    ]
  },
  {
    module: 'HR',
    label: '👥 Human Resources',
    items: [
      { to: '/hr', label: 'Staff Directory', icon: Briefcase, permission: 'teacher.create' }
    ]
  },
  {
    module: 'Transport',
    label: '🚌 Transport',
    items: [
      { to: '/transport', label: 'Bus Routing', icon: Bus, permission: 'transport.view' }
    ]
  },
  {
    module: 'Events',
    label: '🗓️ Events',
    items: [
      { to: '/events', label: 'School Events', icon: CalendarDays, permission: 'circulars.publish' }
    ]
  },
  {
    module: 'Sports',
    label: '🏆 Sports',
    items: [
      { to: '/sports', label: 'Sports Activities', icon: Trophy, permission: 'notifications.send' }
    ]
  },
  {
    module: 'Facilities',
    label: '🏢 Facilities',
    items: [
      { to: '/library', label: 'Library Management', icon: BookOpen, permission: 'student.view' }
    ]
  },
  {
    module: 'Support',
    label: '🛠️ Helpdesk & Support',
    items: [
      { to: '/support', label: 'Help Desk', icon: HelpCircle, permission: 'tickets.create' }
    ]
  },
  {
    module: 'Communication',
    label: '🔔 Communication',
    items: [
      { to: '/notifications', label: 'Notifications', icon: Bell, permission: 'notifications.send' }
    ]
  },
  {
    module: 'Analytics',
    label: '📊 Analytics Desk',
    items: [
      { to: '/academic/analytics', label: 'Analytics & Coverage', icon: BarChart3, permission: 'lessonplan.approve' }
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

// Standalone Tenant & Campus administrative links
const tenantSection = {
  label: '🏢 Tenant & Campus',
  items: [
    { to: '/platform/campuses', label: 'Campus Management', icon: Building, permission: 'rbac.view' },
    { to: '/platform/departments', label: 'Departments', icon: School, permission: 'rbac.view' },
    { to: '/platform/cross-analytics', label: 'Cross-Campus Analytics', icon: BarChart3, permission: 'audit.view' },
    { to: '/platform/explorer', label: 'Organization Explorer', icon: Layers, permission: 'rbac.view' },
    { to: '/platform/communication', label: 'Multi-Campus Notice', icon: Bell, permission: 'notifications.send' }
  ]
}

// Standalone System Control Links visible only to RBAC managers
const securitySection = {
  label: '🛡️ Security & Control',
  items: [
    { to: '/system/access', label: 'Access Control Matrix', icon: Shield, permission: 'rbac.view' },
    { to: '/system/audit', label: 'Audit Trail Log', icon: FileText, permission: 'audit.view' }
  ]
}

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
  const { hasPermission } = useRBAC()
  const { activeInstitution, activeCampus, activeAcademicYear } = useTenant()

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
        <div className="sidebar__header" style={{ paddingBottom: '0.5rem' }}>
          <div className="sidebar__brand">
            <div className="sidebar__brand-icon" aria-hidden="true">
              <School size={20} color="#fff" />
            </div>
            <div className="sidebar__brand-text">
              <span className="sidebar__brand-name">EduOS</span>
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

        {/* Active Context Badge */}
        <div className="active-context-badge">
          <div className="active-context-badge__title">Current Context:</div>
          <div className="active-context-badge__inst">{activeInstitution?.name || institution.name}</div>
          <div className="active-context-badge__camp">{activeCampus?.name || institution.campus}</div>
          <div className="active-context-badge__year">Academic Year {activeAcademicYear}</div>
        </div>

        {/* Nav items */}
        <nav className="sidebar__nav-scroll" aria-label="Site navigation">
          {/* Always enabled Dashboard link */}
          <span className="sidebar__section-label">Main Menu</span>
          <NavItem to="/" label="Dashboard" icon={LayoutDashboard} end={true} onClick={onClose} />

          {/* Dynamically generated sections based on enabled modules & permissions */}
          {moduleSections.map(section => {
            if (!isModuleEnabled(section.module)) return null
            
            // Filter section items based on permission
            const visibleItems = section.items.filter(item => {
              if (item.permission && !hasPermission(item.permission)) {
                return false
              }
              return true
            })

            // If no items are visible under this section, hide the section entirely
            if (visibleItems.length === 0) return null

            return (
              <div key={section.module} style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="sidebar__section-label">{section.label}</span>
                {visibleItems.map((item) => (
                  <NavItem key={item.to} {...item} onClick={onClose} />
                ))}
              </div>
            )
          })}

          {/* Tenant & Campus administrative links */}
          {(() => {
            const visibleTenantItems = tenantSection.items.filter(item => {
              if (item.permission && !hasPermission(item.permission)) {
                return false
              }
              return true
            })

            if (visibleTenantItems.length === 0) return null

            return (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="sidebar__section-label">{tenantSection.label}</span>
                {visibleTenantItems.map((item) => (
                  <NavItem key={item.to} {...item} onClick={onClose} />
                ))}
              </div>
            )
          })()}

          {/* Platform Security controls */}
          {(() => {
            const visibleSecurityItems = securitySection.items.filter(item => {
              if (item.permission && !hasPermission(item.permission)) {
                return false
              }
              return true
            })

            if (visibleSecurityItems.length === 0) return null

            return (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="sidebar__section-label">{securitySection.label}</span>
                {visibleSecurityItems.map((item) => (
                  <NavItem key={item.to} {...item} onClick={onClose} />
                ))}
              </div>
            )
          })()}
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
