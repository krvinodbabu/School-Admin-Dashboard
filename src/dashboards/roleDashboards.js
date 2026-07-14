import { SAMPLE_COUNTS } from '../sample-data/sampleData.js'

export const ROLE_DASHBOARDS = {
  'Principal': {
    title: 'Principal Dashboard',
    subtitle: 'Academic, administrative, and strategic command center.',
    kpis: [
      { label: 'Total Students', value: SAMPLE_COUNTS.students.toLocaleString(), trend: '+12% YoY', trendType: 'good' },
      { label: 'Admissions Target', value: `${SAMPLE_COUNTS.admissions}/1,500`, trend: '93.3% Achieved', trendType: 'good' },
      { label: 'Annual Revenue', value: '₹12.4 Cr', trend: '+8.5% YoY', trendType: 'good' },
      { label: 'Avg Attendance', value: '94.2%', trend: '+0.5% vs last month', trendType: 'good' }
    ],
    alerts: [
      { text: 'Academic Health Score fell by 1.2% in Grade 10 Mathematics.', type: 'warn' },
      { text: 'Fee default notifications sent to 120 parent accounts.', type: 'info' }
    ]
  },
  'Teacher': {
    title: 'Teacher Workspace',
    subtitle: 'Daily lecture allocations, lesson sheets, and grading hubs.',
    kpis: [
      { label: 'Lectures Today', value: '3 Classes', trend: 'Math, Geom, Algebra', trendType: 'info' },
      { label: 'Attendance Pending', value: '1 Class', trend: 'Grade 9-A', trendType: 'warn' },
      { label: 'Assessments Pending', value: '28 Papers', trend: 'Term 1 Geometry Test', trendType: 'warn' },
      { label: 'Lesson Plans Completed', value: '8/10', trend: '2 Due this Friday', trendType: 'info' }
    ],
    alerts: [
      { text: 'Submit assessment sheets for Mathematics Grade 10 by end of day.', type: 'warn' }
    ]
  },
  'Parent': {
    title: 'Parent Portal',
    subtitle: 'Child growth summaries, attendance logs, and school accounts.',
    kpis: [
      { label: 'Child Attendance', value: '96.2%', trend: 'On schedule', trendType: 'good' },
      { label: 'Pending Homework', value: '3 Tasks', trend: 'Math Ex 4.1, Science report', trendType: 'warn' },
      { label: 'Fee Outstanding', value: '₹12,500', trend: 'Due in 15 days', trendType: 'warn' },
      { label: 'Upcoming Event', value: 'Science Fair', trend: 'Jul 18 @ Auditorium', trendType: 'info' }
    ],
    alerts: [
      { text: 'Bus Route 14 is running 10 mins behind schedule due to traffic.', type: 'warn' }
    ]
  },
  'Finance Team': {
    title: 'Finance Dashboard',
    subtitle: 'Tuition invoice registry, outstanding dues, and payroll ledger.',
    kpis: [
      { label: 'Total Collections', value: '₹4.82 Cr', trend: '+14% vs last term', trendType: 'good' },
      { label: 'Outstanding Fees', value: '₹28.4 Lakhs', trend: '112 default profiles', trendType: 'warn' },
      { label: 'Staff Payroll (Current)', value: '₹52.4 Lakhs', trend: 'Processed on 1st', trendType: 'good' },
      { label: 'Collection Efficiency', value: '94.1%', trend: 'Target: 96%', trendType: 'good' }
    ],
    alerts: [
      { text: '8 vendor invoices pending approval for laboratory equipment supply.', type: 'warn' }
    ]
  },
  'Transport Team': {
    title: 'Transport Fleet Control',
    subtitle: 'GPS route tracking, driver schedules, and service intervals.',
    kpis: [
      { label: 'Active Routes', value: '42 / 48', trend: '6 local shuttles offline', trendType: 'info' },
      { label: 'Buses Running', value: `${SAMPLE_COUNTS.buses} Buses`, trend: '100% active GPS signal', trendType: 'good' },
      { label: 'Incident Reports', value: '0 Today', trend: 'No delays reported', trendType: 'good' },
      { label: 'Fuel Efficiency Avg', value: '4.8 km/l', trend: 'Fleet-wide baseline', trendType: 'info' }
    ],
    alerts: [
      { text: 'Bus #12 scheduled for annual safety fitness audit tomorrow morning.', type: 'info' }
    ]
  },
  'Software Support Team': {
    title: 'Helpdesk & Ticket Hub',
    subtitle: 'System support tickets, incidents, SLA monitors, and support logs.',
    kpis: [
      { label: 'Open Tickets', value: `${SAMPLE_COUNTS.tickets}`, trend: '42 urgent status', trendType: 'warn' },
      { label: 'SLA Breaches', value: '2 Incidents', trend: 'Gradebook import issue', trendType: 'warn' },
      { label: 'Avg Resolution Time', value: '1.8 hrs', trend: 'Benchmark: 2.0 hrs', trendType: 'good' },
      { label: 'SLA Compliance Rate', value: '98.3%', trend: 'Target: 98%', trendType: 'good' }
    ],
    alerts: [
      { text: 'Database maintenance scheduled this Sunday 2:00 AM - 4:00 AM.', type: 'info' }
    ]
  }
}

// Fallback if role is not fully mapped
export const DEFAULT_DASHBOARD = {
  title: 'Workspace Portal',
  subtitle: 'EduOS general portal overview.',
  kpis: [
    { label: 'Total Campuses', value: '5', trend: 'All systems green', trendType: 'good' },
    { label: 'Total Departments', value: '20', trend: '20 sectors online', trendType: 'good' },
    { label: 'Total Employees', value: '850', trend: 'All active staff', trendType: 'good' }
  ],
  alerts: []
}
