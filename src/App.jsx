import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import ModulePlaceholder from './modules/ModulePlaceholder.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx'

const Login = lazy(() => import('./auth/Login.jsx'))
const AccessDenied = lazy(() => import('./auth/AccessDenied.jsx'))
const UserProfile = lazy(() => import('./profile/UserProfile.jsx'))

/* New Role & Analytics Modules */
const RoleCatalogue = lazy(() => import('./roles/RoleCatalogue.jsx'))
const PrivilegeMatrix = lazy(() => import('./privileges/PrivilegeMatrix.jsx'))
const AnalyticsSelector = lazy(() => import('./analytics/AnalyticsSelector.jsx'))
const CommandCenter = lazy(() => import('./executive/CommandCenter.jsx'))

/* Enterprise Reporting Desk */
const SelfServicePortal = lazy(() => import('./reports/core/SelfServicePortal.jsx'))
const ReportBuilder = lazy(() => import('./report-builder/ReportBuilder.jsx'))
const ComplianceDashboard = lazy(() => import('./report-templates/ComplianceDashboard.jsx'))

/* Future Education portals */
const StudentSuccessDashboard = lazy(() => import('./student-success/StudentSuccessDashboard.jsx'))
const WellnessPortal = lazy(() => import('./wellness/WellnessPortal.jsx'))
const AlumniNetwork = lazy(() => import('./alumni/AlumniNetwork.jsx'))
const SustainabilityESG = lazy(() => import('./sustainability/SustainabilityESG.jsx'))
const GlobalEducation = lazy(() => import('./global-education/GlobalEducation.jsx'))
const SmartCampusIoT = lazy(() => import('./smart-campus/SmartCampusIoT.jsx'))

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
const SettingsPage = lazy(() => import('./pages/Settings.jsx'))

/* Academic Planning */
const WeeklyLessonPlans = lazy(() => import('./pages/academic-planning/WeeklyLessonPlans.jsx'))
const TermSyllabusPlanner = lazy(() => import('./pages/academic-planning/TermSyllabusPlanner.jsx'))
const AssessmentPlanner = lazy(() => import('./pages/academic-planning/AssessmentPlanner.jsx'))
const QuestionBank = lazy(() => import('./pages/academic-planning/QuestionBank.jsx'))
const ApprovalWorkflow = lazy(() => import('./pages/academic-planning/ApprovalWorkflow.jsx'))
const AnalyticsCoverage = lazy(() => import('./pages/academic-planning/AnalyticsCoverage.jsx'))

/* Access & Platform Security */
const AccessManagement = lazy(() => import('./access-management/AccessManagement.jsx'))
const AuditLogs = lazy(() => import('./access-management/AuditLogs.jsx'))

/* Tenant, Campuses & Organization Hierarchy */
const Campuses = lazy(() => import('./campuses/Campuses.jsx'))
const Departments = lazy(() => import('./departments/Departments.jsx'))
const CrossCampusAnalytics = lazy(() => import('./platform/CrossCampusAnalytics.jsx'))
const OrganizationExplorer = lazy(() => import('./organization/OrganizationExplorer.jsx'))
const MultiCampusCommunication = lazy(() => import('./platform/MultiCampusCommunication.jsx'))

/* Workflow Automation Engine */
const WorkflowDesigner = lazy(() => import('./workflows/WorkflowDesigner.jsx'))
const ApprovalCenter = lazy(() => import('./approvals/ApprovalCenter.jsx'))
const EscalationMatrix = lazy(() => import('./escalations/EscalationMatrix.jsx'))
const SLAManagement = lazy(() => import('./sla/SLAManagement.jsx'))
const TaskManagement = lazy(() => import('./tasks/TaskManagement.jsx'))
const NotificationCenter = lazy(() => import('./notifications/NotificationCenter.jsx'))
const CaseManagement = lazy(() => import('./cases/CaseManagement.jsx'))
const ServiceDesk = lazy(() => import('./service-desk/ServiceDesk.jsx'))
const WorkflowAnalytics = lazy(() => import('./workflows/WorkflowAnalytics.jsx'))

/* AI Copilot & Future Education */
const TeacherCopilot = lazy(() => import('./copilot/TeacherCopilot.jsx'))
const ParentCopilot = lazy(() => import('./copilot/ParentCopilot.jsx'))
const StudentLearningIntelligence = lazy(() => import('./learning-intelligence/StudentLearningIntelligence.jsx'))
const ManagementAI = lazy(() => import('./ai/ManagementAI.jsx'))
const CompetencyTracker = lazy(() => import('./competencies/CompetencyTracker.jsx'))
const OutcomeTracker = lazy(() => import('./outcomes/OutcomeTracker.jsx'))
const DigitalPortfolio = lazy(() => import('./portfolio/DigitalPortfolio.jsx'))
const MicroCredentials = lazy(() => import('./portfolio/MicroCredentials.jsx'))
const CareerGuidance = lazy(() => import('./career-guidance/CareerGuidance.jsx'))
const FutureCampus = lazy(() => import('./future-campus/FutureCampus.jsx'))
const AIGovernance = lazy(() => import('./ai/AIGovernance.jsx'))

function App() {
  return (
    <Suspense fallback={
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading EduOS...</p>
      </div>
    }>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/403" element={<AccessDenied />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="students" element={<Students />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="fees" element={<Fees />} />
            <Route path="classes" element={<Classes />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="exams" element={<Exams />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="library" element={<Library />} />
            <Route path="sports" element={<Sports />} />
            <Route key="notifications" path="notifications" element={<Notifications />} />
            <Route path="settings" element={<SettingsPage />} />

            {/* New operating system module placeholders */}
            <Route path="admissions" element={<ModulePlaceholder name="Admissions" />} />
            <Route path="hr" element={<ModulePlaceholder name="HR" />} />
            <Route path="transport" element={<ModulePlaceholder name="Transport" />} />
            <Route path="events" element={<ModulePlaceholder name="Events" />} />
            <Route path="support" element={<ModulePlaceholder name="Support" />} />

            {/* Platform Access control management */}
            <Route path="system/access" element={<AccessManagement />} />
            <Route path="system/audit" element={<AuditLogs />} />
            <Route path="system/roles" element={<RoleCatalogue />} />
            <Route path="system/privileges" element={<PrivilegeMatrix />} />

            {/* Custom analytics and command center */}
            <Route path="analytics/role-desk" element={<AnalyticsSelector />} />
            <Route path="executive/command-center" element={<CommandCenter />} />

            {/* Custom Reporting and builder portals */}
            <Route path="reports/enterprise" element={<SelfServicePortal />} />
            <Route path="reports/builder" element={<ReportBuilder />} />
            <Route path="reports/compliance" element={<ComplianceDashboard />} />

            {/* Future ready portals */}
            <Route path="student/success" element={<StudentSuccessDashboard />} />
            <Route path="wellness/portal" element={<WellnessPortal />} />
            <Route path="alumni/network" element={<AlumniNetwork />} />
            <Route path="sustainability/esg" element={<SustainabilityESG />} />
            <Route path="global/education" element={<GlobalEducation />} />
            <Route path="smart-campus/iot" element={<SmartCampusIoT />} />

            {/* Tenant & Campus administration */}
            <Route path="platform/campuses" element={<Campuses />} />
            <Route path="platform/departments" element={<Departments />} />
            <Route path="platform/cross-analytics" element={<CrossCampusAnalytics />} />
            <Route path="platform/explorer" element={<OrganizationExplorer />} />
            <Route path="platform/communication" element={<MultiCampusCommunication />} />

            {/* Academic Planning */}
            <Route path="academic/lesson-plans" element={<WeeklyLessonPlans />} />
            <Route path="academic/syllabus" element={<TermSyllabusPlanner />} />
            <Route path="academic/assessments" element={<AssessmentPlanner />} />
            <Route path="academic/question-bank" element={<QuestionBank />} />
            <Route path="academic/approvals" element={<ApprovalWorkflow />} />
            <Route path="academic/analytics" element={<AnalyticsCoverage />} />
            
            {/* Workflow Automation Engine */}
            <Route path="workflows/designer" element={<WorkflowDesigner />} />
            <Route path="workflows/approvals" element={<ApprovalCenter />} />
            <Route path="workflows/escalations" element={<EscalationMatrix />} />
            <Route path="workflows/sla" element={<SLAManagement />} />
            <Route path="workflows/tasks" element={<TaskManagement />} />
            <Route path="workflows/notifications" element={<NotificationCenter />} />
            <Route path="workflows/cases" element={<CaseManagement />} />
            <Route path="workflows/service-desk" element={<ServiceDesk />} />
            <Route path="workflows/analytics" element={<WorkflowAnalytics />} />

            {/* AI Copilot & Future Education */}
            <Route path="ai/teacher-copilot" element={<TeacherCopilot />} />
            <Route path="ai/parent-copilot" element={<ParentCopilot />} />
            <Route path="ai/learning-intelligence" element={<StudentLearningIntelligence />} />
            <Route path="ai/management" element={<ManagementAI />} />
            <Route path="ai/competencies" element={<CompetencyTracker />} />
            <Route path="ai/outcomes" element={<OutcomeTracker />} />
            <Route path="ai/portfolio" element={<DigitalPortfolio />} />
            <Route path="ai/credentials" element={<MicroCredentials />} />
            <Route path="ai/career-guidance" element={<CareerGuidance />} />
            <Route path="ai/future-campus" element={<FutureCampus />} />
            <Route path="ai/governance" element={<AIGovernance />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App

