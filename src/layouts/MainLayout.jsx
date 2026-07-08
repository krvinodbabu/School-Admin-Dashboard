/**
 * Main application layout.
 * Combines Sidebar + TopNav and renders child routes via Outlet.
 */
import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar.jsx'
import TopNav from '../components/TopNav.jsx'

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
}

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'School Admin'

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
