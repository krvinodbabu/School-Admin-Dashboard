import { ACADEMIC_REPORTS_LIST } from '../academic/academicReports.js'
import { FINANCE_REPORTS_LIST } from '../finance/financeReports.js'

export const DEPARTMENT_REPORTS = {
  'Academic': {
    label: 'Academic Faculty Reports',
    reports: [
      ...ACADEMIC_REPORTS_LIST,
      { id: 'acad-outcomes', name: 'Outcome Based Attainment', desc: 'Syllabus mastery tracking logs.' },
      { id: 'acad-risk', name: 'Student Academic Risk Predictor', desc: 'At-risk performance tracking.' }
    ]
  },
  'Finance': {
    label: 'Finance & Treasury Reports',
    reports: [
      ...FINANCE_REPORTS_LIST,
      { id: 'fin-forecast', name: 'Revenue & Collection Projections', desc: 'Fee forecasting simulator.' }
    ]
  },
  'HR & Operations': {
    label: 'HR & Administrative Reports',
    reports: [
      { id: 'hr-recruitment', name: 'Recruitment & Appraisals', desc: 'Staff hiring and evaluations.' },
      { id: 'hr-attendance', name: 'Staff Attendance & Leaves Log', desc: 'Teacher attendance roster.' }
    ]
  },
  'Admissions': {
    label: 'Admissions CRM Reports',
    reports: [
      { id: 'adm-pipeline', name: 'Lead Pipeline & Conversion Funnel', desc: 'Acquisition campaigns results.' }
    ]
  },
  'Transport': {
    label: 'Transport & Logistics Reports',
    reports: [
      { id: 'trans-route', name: 'Route Optimization & Scorecards', desc: 'Bus routing delays logs.' }
    ]
  },
  'Student Services': {
    label: 'Sports, Events & Library Reports',
    reports: [
      { id: 'sports-perf', name: 'Athlete Performance Profiles', desc: 'Ground allocations & injuries.' },
      { id: 'events-budget', name: 'Events Registrations & Budgets', desc: 'Cultural and sports budgets.' },
      { id: 'lib-issues', name: 'Library Issuances & Overdues', desc: 'Issued books details.' }
    ]
  },
  'Campus Infrastructure': {
    label: 'Facilities, Hostels & Marketing Reports',
    reports: [
      { id: 'fac-maintenance', name: 'Facilities Maintenance Log', desc: 'Cleaning and asset usage.' },
      { id: 'hostel-occupancy', name: 'Hostel Occupancy & Visitors', desc: 'Dorm allocations & logs.' },
      { id: 'mkt-campaigns', name: 'Marketing Campaign Analytics', desc: 'Lead generation campaigns.' }
    ]
  },
  'Platform Support': {
    label: 'IT Helpdesk Reports',
    reports: [
      { id: 'supp-sla', name: 'Helpdesk SLA Compliances', desc: 'Open tickets & resolution times.' }
    ]
  }
}

// Role-based reporting access mapping
export const ROLE_REPORT_ACCESS = {
  'Principal': ['*'],
  'Platform Super Admin': ['*'],
  'System Administrator': ['*'],
  'Teacher': ['Academic'],
  'Parent': ['Academic', 'Transport'], // Child records and bus details
  'Finance Administrator': ['Finance'],
  'HR Manager': ['HR & Operations'],
  'Admissions Officer': ['Admissions'],
  'Transport Manager': ['Transport'],
  'Sports Director': ['Student Services'],
  'Support Agent': ['Platform Support']
}

// Structured Mock Report Contents
export const STRUCTURED_REPORTS_CONTENT = {
  'acad-attend': {
    scope: 'Koramangala, Dwarka, Adyar campuses (AY 2025-26 Term 1)',
    summary: 'Institution attendance improved by 4.5% overall.',
    analysis: 'Grade 9 student attendance fell below average (78%) in Math class.',
    trends: 'Positive attendance correlation observed in days with lab activities.',
    risks: '12 students flagged for attendance-related academic risk indices.',
    recommendations: 'Automate push alerts to parent portals when attendance dips below 85%.',
    action: 'Schedule parent-teacher conference for Grade 9 Section A.',
    conclusion: 'Current attendance baseline is stable but Grade 9 requires intervention.',
    kpis: [
      { label: 'Avg Attendance', value: '94.2%', trend: '+0.5% MoM', type: 'good' },
      { label: 'Grade 9 Average', value: '78.5%', trend: '-4.2% MoM', type: 'warn' },
      { label: 'Parent Alerts Triggered', value: '45 Alerts', trend: 'Active SMS logs', type: 'info' }
    ],
    table: [
      { name: 'Koramangala Grade 8', value: '95%', status: 'Stable' },
      { name: 'Dwarka Grade 9', value: '78%', status: 'Review Needed' },
      { name: 'Adyar Grade 10', value: '96%', status: 'Excellent' }
    ],
    aiInsight: {
      confidence: 94,
      recommendation: 'Dwarka Campus Grade 9 attendance shows warning signs. Direct communication to parents will mitigate issues.',
      action: 'Send WhatsApp alerts to Grade 9 Parents.'
    }
  },
  'fin-collect': {
    scope: 'All Campuses outstanding tuition registry',
    summary: 'Term 1 fee collection efficiency is at 94.1%.',
    analysis: 'Dwarka Campus shows the largest amount of overdue fees (₹8.2 Lakhs).',
    trends: 'Fee collection is up by 7% YoY due to UPI Autopay registrations.',
    risks: '₹28.4 Lakhs currently overdue from tuition fee defaults.',
    recommendations: 'Encourage enrollment in UPI Autopay program by offering a 1% cashback.',
    action: 'Activate Auto-Reminders for overdue balances.',
    conclusion: 'Fee collection pipeline is robust, but collection in Dwarka needs immediate reminders.',
    kpis: [
      { label: 'Total Collected', value: '₹4.82 Cr', trend: '+14% MoM', type: 'good' },
      { label: 'Outstanding Balance', value: '₹28.4 Lakhs', trend: '112 students default', type: 'warn' },
      { label: 'UPI Autopay Users', value: '420 Users', trend: '+80 this month', type: 'good' }
    ],
    table: [
      { name: 'Dwarka Campus', value: '₹8.2 Lakhs Overdue', status: 'Action Required' },
      { name: 'Koramangala Campus', value: '₹3.1 Lakhs Overdue', status: 'Stable' },
      { name: 'Adyar Campus', value: '₹1.5 Lakhs Overdue', status: 'Stable' }
    ],
    aiInsight: {
      confidence: 92,
      recommendation: 'Enrolling late payers into UPI Autopay will reduce invoice default rate by 18% in Term 2.',
      action: 'Email Autopay invite to pending invoice list.'
    }
  }
}

export const FALLBACK_REPORT_CONTENT = {
  scope: 'Default Report Scope (All Sectors)',
  summary: 'Operational metrics are within optimal baseline values.',
  analysis: 'All parameters healthy. No deviations detected.',
  trends: 'Stable upward trend across current term quarters.',
  risks: 'Low risk score. No immediate alerts flagged.',
  recommendations: 'Perform routine quarterly audit audits.',
  action: 'No manual intervention required.',
  conclusion: 'Baseline operational stats are fully compliant.',
  kpis: [
    { label: 'Uptime Index', value: '99.9%', trend: 'Optimal', type: 'good' },
    { label: 'Resource Load', value: '72%', trend: 'Normal', type: 'info' }
  ],
  table: [
    { name: 'Primary Division', value: 'Healthy', status: 'Compliant' },
    { name: 'Secondary Division', value: 'Healthy', status: 'Compliant' }
  ],
  aiInsight: {
    confidence: 88,
    recommendation: 'Maintain current configuration definitions.',
    action: 'No changes required.'
  }
}
