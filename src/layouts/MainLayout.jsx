import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import TopNav from '../components/TopNav.jsx'
import { useEduOS } from '../core/EduOSContext.jsx'
import { useTenant } from '../context/TenantContext.jsx'
import OnboardingWizard from '../onboarding/OnboardingWizard.jsx'
import CopilotPanel from '../copilot/CopilotPanel.jsx'
import RoleSwitcher from '../roles/RoleSwitcher.jsx'
import CommandPalette from '../components/CommandPalette.jsx'

const pageTitles = {
  '/': 'Dashboard',
  '/students': 'Students Management',
  '/teachers': 'Teachers Management',
  '/fees': 'Fees Management',
  '/classes': 'Classes & Sections',
  '/attendance': 'Attendance',
  '/exams': 'Exams & Results',
  '/timetable': 'Timetable',
  '/library': 'Library Management',
  '/sports': 'Sports Activities',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
  '/admissions': 'Admissions Intake',
  '/hr': 'Staff Directory',
  '/transport': 'Bus Routing',
  '/events': 'School Events',
  '/support': 'Help Desk',
  '/system/access': 'Access Control Matrix',
  '/system/audit': 'Audit Trail Log',
  '/platform/campuses': 'Campus Management',
  '/platform/departments': 'Departments',
  '/platform/cross-analytics': 'Cross-Campus Analytics',
  '/platform/explorer': 'Organizational Explorer',
  '/platform/communication': 'Multi-Campus Communication',
  '/academic/lesson-plans': 'Weekly Lesson Plans',
  '/academic/syllabus': 'Syllabus Planner',
  '/academic/assessments': 'Assessment Planner',
  '/academic/question-bank': 'Question Bank',
  '/academic/approvals': 'Approval Workflow',
  '/academic/analytics': 'Analytics & Coverage',
  '/system/roles': 'Role Catalogue',
  '/system/privileges': 'Privilege Matrix',
  '/analytics/role-desk': 'Analytics Desk',
  '/executive/command-center': 'Command Center'
}

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const { isWizardCompleted } = useTenant()
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'School Admin'

  // Open palette listener
  useEffect(() => {
    const handleOpenPalette = () => setPaletteOpen(true)
    window.addEventListener('eduos_open_command_palette', handleOpenPalette)
    return () => window.removeEventListener('eduos_open_command_palette', handleOpenPalette)
  }, [])

  // Page tracking for Recents
  useEffect(() => {
    const currentPath = location.pathname
    const currentTitle = pageTitles[currentPath] || 'Campus Page'
    if (currentPath !== '/login' && currentPath !== '/403') {
      const saved = localStorage.getItem('eduos_recent_activity')
      let list = saved ? JSON.parse(saved) : []
      list = list.filter(item => item.to !== currentPath)
      list.unshift({ to: currentPath, label: currentTitle })
      list = list.slice(0, 4) // Keep top 4
      localStorage.setItem('eduos_recent_activity', JSON.stringify(list))
      window.dispatchEvent(new Event('eduos_navigation_change'))
    }
  }, [location])

  if (!isWizardCompleted) {
    return <OnboardingWizard />
  }

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-layout__main">
        <TopNav title={title} onMenuClick={() => setSidebarOpen(true)} />
        <main className="app-layout__content">
          <Outlet />
        </main>
      </div>
      <CopilotPanel />
      <RoleSwitcher />
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  )
}

