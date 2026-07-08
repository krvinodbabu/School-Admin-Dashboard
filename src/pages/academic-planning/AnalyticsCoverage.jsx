/**
 * Analytics & Coverage Dashboard — KPI cards, charts, heatmap, and progress indicators.
 */
import {
  BookOpen, FileText, Clock, Database, Users, ClipboardCheck,
  BarChart2, TrendingUp,
} from 'lucide-react'
import StatCard from '../../components/StatCard.jsx'
import Card from '../../components/Card.jsx'
import BarChart from '../../components/BarChart.jsx'
import DonutChart from '../../components/DonutChart.jsx'
import PageHeader from '../../components/PageHeader.jsx'
import { analyticsData } from '../../data/academicPlanningData.js'

export default function AnalyticsCoverage() {
  const { overallStats, subjectProgress, weeklySubmissions, difficultyDistribution, teacherRates } = analyticsData

  return (
    <div className="page">
      <PageHeader
        title="Analytics & Coverage"
        subtitle="Comprehensive academic planning analytics and coverage metrics"
        eyebrow="Academic Planning"
      />

      {/* KPI Cards */}
      <div className="stats-grid">
        <StatCard title="Syllabus Completion" value={`${overallStats.syllabusCompletion}%`} icon={BookOpen} color="blue" trend="+4% this week" />
        <StatCard title="Lessons Submitted" value={overallStats.lessonsSubmitted} icon={FileText} color="green" trend="6 this week" />
        <StatCard title="Pending Approvals" value={overallStats.pendingApprovals} icon={Clock} color="amber" trend="2 urgent" />
        <StatCard title="Question Bank" value={overallStats.questionBankSize} icon={Database} color="purple" trend="+18 this month" />
        <StatCard title="Teacher Rate" value={`${overallStats.teacherSubmissionRate}%`} icon={Users} color="indigo" trend="+3% vs last month" />
        <StatCard title="Assessment Coverage" value={`${overallStats.assessmentCoverage}%`} icon={ClipboardCheck} color="red" trend="On track" />
      </div>

      {/* Charts row */}
      <div className="dashboard-grid">
        {/* Weekly submissions bar chart */}
        <Card title="Weekly Submissions" subtitle="Submitted vs. approved lesson plans by week">
          <BarChart data={weeklySubmissions} valueKey="submitted" labelKey="week" />
        </Card>

        {/* Difficulty distribution donut */}
        <Card title="Question Difficulty Distribution" subtitle="Breakdown of question bank by difficulty level">
          <DonutChart data={difficultyDistribution} />
        </Card>

        {/* Subject-wise progress */}
        <Card title="Subject-wise Syllabus Progress" subtitle="Coverage percentage per subject area">
          <div className="ap-analytics-progress-list">
            {subjectProgress.map(s => (
              <div key={s.subject} className="ap-analytics-progress-item">
                <div className="ap-analytics-progress-item__header">
                  <span className="ap-analytics-progress-item__subject">{s.subject}</span>
                  <span className="ap-analytics-progress-item__pct">{s.completion}%</span>
                </div>
                <div className="progress-bar" style={{ height: 8 }}>
                  <div
                    className="progress-bar__fill"
                    style={{
                      width: `${s.completion}%`,
                      background: s.completion >= 75
                        ? 'var(--gradient-green)'
                        : s.completion >= 50
                        ? 'var(--gradient-amber)'
                        : 'var(--gradient-red)',
                    }}
                  />
                </div>
                <div className="ap-analytics-progress-item__meta">
                  <span>{s.submitted} submitted</span>
                  {s.pending > 0 && <span style={{ color: 'var(--color-amber-text)' }}>{s.pending} pending</span>}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Teacher submission rates */}
        <Card title="Teacher Submission Rate" subtitle="Individual teacher compliance percentage">
          <div className="ap-teacher-rates">
            {teacherRates.map(t => (
              <div key={t.name} className="ap-teacher-rate">
                <div className="ap-teacher-rate__avatar">
                  {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="ap-teacher-rate__info">
                  <div className="ap-teacher-rate__header">
                    <span className="ap-teacher-rate__name">{t.name}</span>
                    <span className="ap-teacher-rate__pct" style={{
                      color: t.rate >= 90 ? 'var(--color-green-text)' : t.rate >= 75 ? 'var(--color-amber-text)' : 'var(--color-red-text)'
                    }}>{t.rate}%</span>
                  </div>
                  <div className="progress-bar" style={{ height: 5 }}>
                    <div
                      className="progress-bar__fill"
                      style={{
                        width: `${t.rate}%`,
                        background: t.rate >= 90 ? 'var(--gradient-green)' : t.rate >= 75 ? 'var(--gradient-amber)' : 'var(--gradient-red)',
                      }}
                    />
                  </div>
                  <span className="ap-teacher-rate__subject">{t.subject}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Heatmap — Submission activity */}
      <Card title="Submission Activity Heatmap" subtitle="Weekly lesson plan submission activity across subjects">
        <div className="ap-heatmap">
          <div className="ap-heatmap__header">
            <div className="ap-heatmap__label" />
            {weeklySubmissions.map(w => (
              <div key={w.week} className="ap-heatmap__col-label">{w.week}</div>
            ))}
          </div>
          {subjectProgress.map(s => (
            <div key={s.subject} className="ap-heatmap__row">
              <div className="ap-heatmap__label">{s.subject}</div>
              {weeklySubmissions.map((w, i) => {
                // Generate pseudo heat values based on deterministic combination
                const intensity = ((s.completion + w.submitted * 12 + i * 17) % 5)
                const opacities = [0.08, 0.2, 0.4, 0.65, 0.9]
                return (
                  <div
                    key={w.week}
                    className="ap-heatmap__cell"
                    style={{ background: `rgba(99, 102, 241, ${opacities[intensity]})` }}
                    title={`${s.subject} — ${w.week}: ${intensity + 1} submissions`}
                  />
                )
              })}
            </div>
          ))}
          <div className="ap-heatmap__legend">
            <span>Less</span>
            {[0.08, 0.2, 0.4, 0.65, 0.9].map((o, i) => (
              <div key={i} className="ap-heatmap__cell ap-heatmap__cell--legend" style={{ background: `rgba(99, 102, 241, ${o})` }} />
            ))}
            <span>More</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
