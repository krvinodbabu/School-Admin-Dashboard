/**
 * Root application component.
 * Defines all routes and maps each path to a page component inside MainLayout.
 */
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import ModulePlaceholder from './modules/ModulePlaceholder.jsx'

const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const Students = lazy(() => import('./pages/Students.jsx'))
const Teachers = lazy(() => import('./pages/Teachers.jsx'))
const Fees = lazy(() => import('./pages/Fees.jsx'))
const Classes = lazy(() => import('./pages/Classes.jsx'))
const Attendance = lazy(() => import('./pages/Attendance.jsx'))
const Exams = lazy(() => import('./pages/Exams.jsx'))
const Timetable = lazy(() => import('./pages/Timetable.jsx'))
const Library = lazy(() => import('./pages/Library.jsx'))
const Sports = lazy(() => import('./pages/Sports.jsx'))
const Notifications = lazy(() => import('./pages/Notifications.jsx'))
const Settings = lazy(() => import('./pages/Settings.jsx'))

/* Academic Planning */
const WeeklyLessonPlans = lazy(() => import('./pages/academic-planning/WeeklyLessonPlans.jsx'))
const TermSyllabusPlanner = lazy(() => import('./pages/academic-planning/TermSyllabusPlanner.jsx'))
const AssessmentPlanner = lazy(() => import('./pages/academic-planning/AssessmentPlanner.jsx'))
const QuestionBank = lazy(() => import('./pages/academic-planning/QuestionBank.jsx'))
const ApprovalWorkflow = lazy(() => import('./pages/academic-planning/ApprovalWorkflow.jsx'))
const AnalyticsCoverage = lazy(() => import('./pages/academic-planning/AnalyticsCoverage.jsx'))

function App() {
  return (
    <Suspense fallback={
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading EduOS...</p>
      </div>
    }>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="fees" element={<Fees />} />
          <Route path="classes" element={<Classes />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="exams" element={<Exams />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="library" element={<Library />} />
          <Route path="sports" element={<Sports />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />

          {/* New operating system module placeholders */}
          <Route path="admissions" element={<ModulePlaceholder name="Admissions" />} />
          <Route path="hr" element={<ModulePlaceholder name="HR" />} />
          <Route path="transport" element={<ModulePlaceholder name="Transport" />} />
          <Route path="events" element={<ModulePlaceholder name="Events" />} />
          <Route path="support" element={<ModulePlaceholder name="Support" />} />

          {/* Academic Planning */}
          <Route path="academic/lesson-plans" element={<WeeklyLessonPlans />} />
          <Route path="academic/syllabus" element={<TermSyllabusPlanner />} />
          <Route path="academic/assessments" element={<AssessmentPlanner />} />
          <Route path="academic/question-bank" element={<QuestionBank />} />
          <Route path="academic/approvals" element={<ApprovalWorkflow />} />
          <Route path="academic/analytics" element={<AnalyticsCoverage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App

