import {
  Users,
  GraduationCap,
  Wallet,
  ClipboardCheck,
  FileText,
  Bell,
} from 'lucide-react'
import StatCard from '../components/StatCard.jsx'
import Card from '../components/Card.jsx'
import BarChart from '../components/BarChart.jsx'
import DonutChart from '../components/DonutChart.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { getDashboardData } from '../services/dataService.js'
import { formatCurrency } from '../utils/helpers.js'

export default function Dashboard() {
  const { stats, attendanceTrend, feeDistribution, upcomingExams, recentNotifications } =
    getDashboardData()

  return (
    <div className="page">
      <PageHeader
        title="Dashboard Overview"
        subtitle="Welcome back! Here's what's happening at your school today."
      />

      <div className="stats-grid">
        <StatCard title="Total Students" value={stats.totalStudents.toLocaleString()} icon={GraduationCap} color="blue" trend="+12 this month" />
        <StatCard title="Total Teachers" value={stats.totalTeachers} icon={Users} color="purple" trend="2 new hires" />
        <StatCard title="Pending Fees" value={formatCurrency(stats.pendingFees)} icon={Wallet} color="amber" trend="34 students" />
        <StatCard title="Attendance" value={`${stats.attendancePercentage}%`} icon={ClipboardCheck} color="green" trend="+1.2% vs last week" />
        <StatCard title="Upcoming Exams" value={stats.upcomingExams} icon={FileText} color="red" trend="Next: Jul 15" />
        <StatCard title="Notifications" value={stats.recentNotifications} icon={Bell} color="indigo" trend="3 unread" />
      </div>

      <div className="dashboard-grid">
        <Card title="Attendance Trend (6 Months)">
          <BarChart data={attendanceTrend} valueKey="percentage" labelKey="month" />
        </Card>

        <Card title="Fee Collection Status">
          <DonutChart data={feeDistribution} />
        </Card>

        <Card title="Upcoming Exams">
          <ul className="list">
            {upcomingExams.map((exam) => (
              <li key={exam.id} className="list__item">
                <div>
                  <strong>{exam.name}</strong>
                  <span className="list__meta">{exam.classes}</span>
                </div>
                <span className="list__date">{exam.date}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Recent Notifications">
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
