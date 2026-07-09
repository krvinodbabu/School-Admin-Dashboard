import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import TopNav from '../components/TopNav.jsx'
import { useEduOS } from '../core/EduOSContext.jsx'
import { useTenant } from '../context/TenantContext.jsx'
import OnboardingWizard from '../onboarding/OnboardingWizard.jsx'

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
}

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isWizardCompleted } = useTenant()
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'School Admin'

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
    </div>
  )
}

