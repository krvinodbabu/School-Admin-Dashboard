/**
 * Dashboard — premium hero landing page with KPI cards, charts, and activity feeds.
 */
import {
  Users,
  GraduationCap,
  Wallet,
  ClipboardCheck,
  FileText,
  Bell,
  Sparkles,
  CalendarDays,
  ArrowRight,
  BookOpen,
} from 'lucide-react'
import StatCard from '../components/StatCard.jsx'
import Card from '../components/Card.jsx'
import BarChart from '../components/BarChart.jsx'
import DonutChart from '../components/DonutChart.jsx'
import { getDashboardData } from '../services/dataService.js'
import { formatCurrency, formatDate } from '../utils/helpers.js'
import { useEduOS } from '../core/EduOSContext.jsx'
import RoleDashboardPlaceholders from '../roles/RoleDashboardPlaceholders.jsx'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning'
  if (h < 17) return 'Good Afternoon'
  return 'Good Evening'
}

function getTodayFormatted() {
  return new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function Dashboard() {
  const { stats, attendanceTrend, feeDistribution, upcomingExams, recentNotifications } =
    getDashboardData()
  const { institution, currentRole } = useEduOS()

  return (
    <div className="page animate-fadeIn">

      {/* ── Hero Banner ── */}
      <div className="dashboard-hero">
        <div className="dashboard-hero__eyebrow">
          <Sparkles size={11} />
          {institution.name} · Academic Year {institution.academicYear}
        </div>
        <h1 className="dashboard-hero__title">
          {getGreeting()}, {currentRole} 👋
        </h1>
        <p className="dashboard-hero__subtitle">
          Welcome to the {institution.type} Operating System portal for the {institution.campus}.
        </p>
        <div className="dashboard-hero__actions">
          <button type="button" className="btn btn--hero-secondary" id="dashboard-quick-report-btn">
            <FileText size={16} />
            Quick Report
          </button>
          <button type="button" className="btn btn--hero-primary" id="dashboard-add-student-btn">
            <GraduationCap size={16} />
            Add Student
          </button>
          <button type="button" className="btn btn--hero-primary" id="dashboard-schedule-btn">
            <CalendarDays size={16} />
            Schedule Event
          </button>
        </div>

        <div className="dashboard-hero__date">
          <strong>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</strong>
          {new Date().toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric' })}
        </div>
      </div>

      {/* ── Role Based Placeholders Panel ── */}
      <RoleDashboardPlaceholders />


      {/* ── KPI Stats ── */}
      <div className="stats-grid">
        <StatCard
          title="Total Students"
          value={stats.totalStudents.toLocaleString()}
          icon={GraduationCap}
          color="blue"
          trend="+12 this month"
        />
        <StatCard
          title="Total Teachers"
          value={stats.totalTeachers}
          icon={Users}
          color="purple"
          trend="2 new hires"
        />
        <StatCard
          title="Pending Fees"
          value={formatCurrency(stats.pendingFees)}
          icon={Wallet}
          color="amber"
          trend="34 students"
        />
        <StatCard
          title="Attendance Rate"
          value={`${stats.attendancePercentage}%`}
          icon={ClipboardCheck}
          color="green"
          trend="+1.2% vs last week"
        />
        <StatCard
          title="Upcoming Exams"
          value={stats.upcomingExams}
          icon={FileText}
          color="red"
          trend="Next: Jul 15"
        />
        <StatCard
          title="Notifications"
          value={stats.recentNotifications}
          icon={Bell}
          color="indigo"
          trend="3 unread"
        />
      </div>

      {/* ── Charts Row ── */}
      <div className="dashboard-grid">
        <Card
          title="Attendance Trend"
          subtitle="Monthly attendance percentage — last 6 months"
          actionLabel="Full report →"
        >
          <BarChart data={attendanceTrend} valueKey="percentage" labelKey="month" />
        </Card>

        <Card
          title="Fee Collection Status"
          subtitle="Distribution of paid, pending, and overdue fees"
        >
          <DonutChart data={feeDistribution} />
        </Card>

        {/* Upcoming Exams */}
        <Card
          title="Upcoming Exams"
          subtitle={`${upcomingExams.length} scheduled this month`}
          actionLabel="View all"
        >
          <ul className="list">
            {upcomingExams.map((exam) => (
              <li key={exam.id} className="list__item">
                <div>
                  <strong>{exam.name}</strong>
                  <span className="list__meta">
                    <BookOpen size={11} style={{ display: 'inline', marginRight: 4 }} />
                    {exam.classes}
                  </span>
                </div>
                <span className="list__date">{formatDate(exam.date)}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Recent Notifications */}
        <Card
          title="Recent Notifications"
          subtitle="Latest school-wide announcements"
          actionLabel="View all"
        >
          <ul className="list">
            {recentNotifications.map((n) => (
              <li key={n.id} className="list__item">
                <div>
                  <strong>{n.title}</strong>
                  <span className="list__meta">{n.message}</span>
                </div>
                <span className="list__time">{n.time}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
