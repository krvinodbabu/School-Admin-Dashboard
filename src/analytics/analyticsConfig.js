/**
 * Analytics desk configurations for each of the core operating segments.
 */
export const ANALYTICS_VIEWS = {
  'Leadership': {
    title: 'Leadership & Executive Analytics',
    metrics: [
      { name: 'Revenue Growth', value: '+8.5%', desc: 'AY 2025-26 vs AY 2024-25' },
      { name: 'Enrollment Expansion', value: '+12.4%', desc: 'Target: +15%' },
      { name: 'Academic Health Score', value: '94%', desc: 'Overall mastery index' },
      { name: 'Staff Attrition Rate', value: '4.2%', desc: 'Industry average: 7.5%' },
      { name: 'Parent Satisfaction Index', value: '4.7 / 5', desc: 'Calculated from yearly survey' }
    ],
    chartLabel: 'Enrollment Growth Trend (in hundreds)',
    chartData: [
      { label: '2021', value: 38 },
      { label: '2022', value: 41 },
      { label: '2023', value: 44 },
      { label: '2024', value: 47 },
      { label: '2025', value: 50 }
    ]
  },
  'Academic': {
    title: 'Academic Performance Analytics',
    metrics: [
      { name: 'Subject Performance Avg', value: '74%', desc: 'Grade book analytics' },
      { name: 'Assessment Pass Rate', value: '96.8%', desc: 'Term examinations' },
      { name: 'NEP Competency Mastery', value: '72%', desc: 'Skill outcomes index' }
    ],
    chartLabel: 'Subject Average Mastery Rate (%)',
    chartData: [
      { label: 'Math', value: 72 },
      { label: 'Science', value: 78 },
      { label: 'English', value: 85 },
      { label: 'History', value: 74 },
      { label: 'Art', value: 90 }
    ]
  },
  'Finance': {
    title: 'Financial Health Desk',
    metrics: [
      { name: 'Collection Efficiency', value: '94.1%', desc: 'Collected vs Outstanding' },
      { name: 'Overdue Tuition Fees', value: '₹28.4 Lakhs', desc: '112 active defaults' },
      { name: 'Operational Budget Burn', value: '72%', desc: 'Term 1 allocation' }
    ],
    chartLabel: 'Tuition Fee Collection Efficiency (%)',
    chartData: [
      { label: 'Term 1', value: 96 },
      { label: 'Term 2', value: 94 },
      { label: 'Term 3', value: 90 },
      { label: 'Term 4', value: 82 }
    ]
  },
  'HR': {
    title: 'HR & Staffing Analytics',
    metrics: [
      { name: 'Monthly Staff Attrition', value: '0.4%', desc: '3 employees left' },
      { name: 'Open Recruitment funnels', value: '8 positions', desc: 'Average hire time: 24 days' },
      { name: 'Staff Leave Utilization', value: '12%', desc: 'Average leaves per employee' }
    ],
    chartLabel: 'Monthly Recruitment Pipelines (Applications)',
    chartData: [
      { label: 'Applied', value: 340 },
      { label: 'Screened', value: 120 },
      { label: 'Interviewed', value: 45 },
      { label: 'Offered', value: 8 }
    ]
  },
  'Transport': {
    title: 'Transit & Logistics Analytics',
    metrics: [
      { name: 'Route Optimization Rate', value: '96.2%', desc: 'Active bus routing density' },
      { name: 'Fleet Fuel Log (Avg)', value: '4.8 km/l', desc: 'Calculated across 60 buses' },
      { name: 'Average Transit Delay', value: '3.4 mins', desc: 'Weekly route delay baseline' }
    ],
    chartLabel: 'Average Daily Transit Delays (minutes)',
    chartData: [
      { label: 'Mon', value: 4 },
      { label: 'Tue', value: 3 },
      { label: 'Wed', value: 5 },
      { label: 'Thu', value: 2 },
      { label: 'Fri', value: 3 }
    ]
  },
  'Admissions': {
    title: 'Admissions Pipeline Analytics',
    metrics: [
      { name: 'Lead Conversion Rate', value: '28%', desc: 'Enquiries converted to enrollments' },
      { name: 'Application Funnel Size', value: '1,420 files', desc: 'AY 2026-27 cohort' },
      { name: 'Main Acquisition Source', value: 'Referrals (42%)', desc: 'Word of mouth campaign' }
    ],
    chartLabel: 'Admissions Source Leads breakdown (%)',
    chartData: [
      { label: 'Web', value: 32 },
      { label: 'Referral', value: 42 },
      { label: 'Fairs', value: 16 },
      { label: 'Social', value: 10 }
    ]
  },
  'Support': {
    title: 'Helpdesk & Support Analytics',
    metrics: [
      { name: 'Ticket volume (Month)', value: '120 Tickets', desc: 'Resolved: 94' },
      { name: 'SLA Breach Rate', value: '1.2%', desc: 'Urgent priority tickets' },
      { name: 'Average Resolution Time', value: '1.8 hrs', desc: 'Target resolution: 2 hrs' }
    ],
    chartLabel: 'Average Support Resolution Time (Hours)',
    chartData: [
      { label: 'Critical', value: 1 },
      { label: 'High', value: 2 },
      { label: 'Medium', value: 3 },
      { label: 'Low', value: 5 }
    ]
  }
}
