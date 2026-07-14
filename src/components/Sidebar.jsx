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
  Activity,
  Layers,
  GitBranch,
  Clock,
  Sparkles,
  Brain,
  Compass,
  Award,
  Cpu,
  Eye,
  Target
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

// Standalone Workflow Engine links
const workflowSection = {
  label: '⚙️ Workflows & Approvals',
  items: [
    { to: '/workflows/approvals', label: 'Approval Center', icon: GitPullRequestArrow, permission: 'lessonplan.approve' },
    { to: '/workflows/tasks', label: 'Task Management', icon: ListChecks, permission: 'rbac.view' },
    { to: '/workflows/cases', label: 'Case Management', icon: Briefcase, permission: 'rbac.view' },
    { to: '/workflows/service-desk', label: 'Service Desk', icon: HelpCircle, permission: 'tickets.create' },
    { to: '/workflows/designer', label: 'Workflow Designer', icon: GitBranch, permission: 'rbac.view' },
    { to: '/workflows/escalations', label: 'Escalation Matrix', icon: Shield, permission: 'rbac.view' },
    { to: '/workflows/sla', label: 'SLA Management', icon: Clock, permission: 'rbac.view' },
    { to: '/workflows/notifications', label: 'Notification Hub', icon: Bell, permission: 'notifications.send' },
    { to: '/workflows/analytics', label: 'Analytics', icon: BarChart3, permission: 'rbac.view' }
  ]
}

// AI Copilot & Intelligence links
const aiSection = {
  label: '🤖 AI & Intelligence',
  items: [
    { to: '/ai/teacher-copilot', label: 'Teacher Copilot', icon: Sparkles, permission: 'lessonplan.create' },
    { to: '/ai/parent-copilot', label: 'Parent Copilot', icon: Users, permission: 'student.view' },
    { to: '/ai/learning-intelligence', label: 'Learning Intelligence', icon: Brain, permission: 'student.view' },
    { to: '/ai/management', label: 'Management AI', icon: BarChart3, permission: 'audit.view' },
    { to: '/ai/governance', label: 'AI Governance', icon: Eye, permission: 'rbac.view' },
  ]
}

// Learning & Development links
const learningSection = {
  label: '🎓 Learning & Development',
  items: [
    { to: '/ai/competencies', label: 'Competency Tracker', icon: Target, permission: 'student.view' },
    { to: '/ai/outcomes', label: 'Outcome Tracker', icon: Layers, permission: 'student.view' },
    { to: '/ai/portfolio', label: 'Digital Portfolio', icon: FileText, permission: 'student.view' },
    { to: '/ai/credentials', label: 'Micro Credentials', icon: Award, permission: 'student.view' },
    { to: '/ai/career-guidance', label: 'Career Guidance', icon: Compass, permission: 'student.view' },
  ]
}

// Future Campus links
const futureCampusSection = {
  label: '🚀 Future Campus',
  items: [
    { to: '/ai/future-campus', label: 'Integration Readiness', icon: Cpu, permission: 'rbac.view' },
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

          {/* Workflow Engine links */}
          {(() => {
            const visibleWorkflowItems = workflowSection.items.filter(item => {
              if (item.permission && !hasPermission(item.permission)) {
                return false
              }
              return true
            })

            if (visibleWorkflowItems.length === 0) return null

            return (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="sidebar__section-label">{workflowSection.label}</span>
                {visibleWorkflowItems.map((item) => (
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

          {/* AI & Intelligence links */}
          {(() => {
            const items = aiSection.items.filter(item => !item.permission || hasPermission(item.permission))
            if (items.length === 0) return null
            return (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="sidebar__section-label">{aiSection.label}</span>
                {items.map((item) => <NavItem key={item.to} {...item} onClick={onClose} />)}
              </div>
            )
          })()}

          {/* Learning & Development links */}
          {(() => {
            const items = learningSection.items.filter(item => !item.permission || hasPermission(item.permission))
            if (items.length === 0) return null
            return (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="sidebar__section-label">{learningSection.label}</span>
                {items.map((item) => <NavItem key={item.to} {...item} onClick={onClose} />)}
              </div>
            )
          })()}

          {/* Future Campus links */}
          {(() => {
            const items = futureCampusSection.items.filter(item => !item.permission || hasPermission(item.permission))
            if (items.length === 0) return null
            return (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="sidebar__section-label">{futureCampusSection.label}</span>
                {items.map((item) => <NavItem key={item.to} {...item} onClick={onClose} />)}
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
