// Reporting engine configuration mapping permissions, layouts, and mock datasets.

export const DEPARTMENT_REPORTS = {
  'Academic': {
    label: 'Academic Faculty Reports',
    reports: [
      { id: 'acad-attend', name: 'Attendance Summary', desc: 'Syllabus and student attendance trends.' },
      { id: 'acad-perf', name: 'Class Performance', desc: 'Average academic scoring metrics.' },
      { id: 'acad-subj', name: 'Subject Performance', desc: 'Subject mastery analysis.' },
      { id: 'acad-assign', name: 'Assignment Completion', desc: 'Homework and worksheet metrics.' },
      { id: 'acad-assess', name: 'Assessment Analytics', desc: 'Test scores and grade distributions.' },
      { id: 'acad-outcomes', name: 'Learning Outcomes', desc: 'NEP 2020 competency attainment.' },
      { id: 'acad-comp', name: 'Competency Coverage', desc: 'Curriculum milestones.' },
      { id: 'acad-lesson', name: 'Lesson Plan Completion', desc: 'Syllabus coverage progress.' },
      { id: 'acad-risk', name: 'Student Risk Reports', desc: 'At-risk performance alert indicators.' }
    ]
  },
  'Finance': {
    label: 'Finance & Treasury Reports',
    reports: [
      { id: 'fin-collect', name: 'Fee Collection', desc: 'Real-time tuition fee collections.' },
      { id: 'fin-outstanding', name: 'Outstanding Fees', desc: 'Defaulters ledger and alerts.' },
      { id: 'fin-daily', name: 'Daily Collection', desc: 'Cash and online receipt totals.' },
      { id: 'fin-monthly', name: 'Monthly Collection', desc: 'Monthly accounting summaries.' },
      { id: 'fin-scholarship', name: 'Scholarship Reports', desc: 'Disbursements and concessions.' },
      { id: 'fin-payroll', name: 'Payroll Reports', desc: 'Salary distributions.' },
      { id: 'fin-vendor', name: 'Vendor Payments', desc: 'Contractor invoices.' },
      { id: 'fin-budget', name: 'Budget Reports', desc: 'Departmental allocations.' },
      { id: 'fin-forecast', name: 'Revenue Forecast', desc: 'Collection projection models.' }
    ]
  },
  'HR': {
    label: 'HR & Operations Reports',
    reports: [
      { id: 'hr-directory', name: 'Employee Directory', desc: 'Staff lists and contact databases.' },
      { id: 'hr-leave', name: 'Leave Summary', desc: 'Leave requests and balance sheets.' },
      { id: 'hr-attendance', name: 'Attendance Log', desc: 'Staff biometric login histories.' },
      { id: 'hr-funnel', name: 'Recruitment Funnel', desc: 'Interview pipelines.' },
      { id: 'hr-training', name: 'Training Completion', desc: 'PD program completions.' },
      { id: 'hr-appraisal', name: 'Appraisal Reports', desc: 'Performance ratings.' },
      { id: 'hr-attrition', name: 'Attrition Analysis', desc: 'Staff turnover metrics.' },
      { id: 'hr-workforce', name: 'Workforce Planning', desc: 'Teacher-student ratio allocations.' }
    ]
  },
  'Transport': {
    label: 'Transport & Logistics Reports',
    reports: [
      { id: 'trans-route', name: 'Route Performance', desc: 'GPS delay lists.' },
      { id: 'trans-alloc', name: 'Student Allocation', desc: 'Bus seats registry.' },
      { id: 'trans-util', name: 'Vehicle Utilization', desc: 'Odometer and fuel tracking.' },
      { id: 'trans-driver', name: 'Driver Attendance', desc: 'Biometric records.' },
      { id: 'trans-delays', name: 'Delay Reports', desc: 'Traffic and breakdown logs.' },
      { id: 'trans-incidents', name: 'Incident Reports', desc: 'Safety events logs.' }
    ]
  },
  'Admissions': {
    label: 'Admissions CRM Reports',
    reports: [
      { id: 'adm-pipeline', name: 'Lead Pipeline', desc: 'Active enquiries.' },
      { id: 'adm-status', name: 'Application Status', desc: 'Registration steps.' },
      { id: 'adm-funnel', name: 'Conversion Funnel', desc: 'Prospect-to-student conversions.' },
      { id: 'adm-campaign', name: 'Campaign Performance', desc: 'ROI of ads campaigns.' },
      { id: 'adm-source', name: 'Source Analysis', desc: 'Referrals vs walk-ins.' },
      { id: 'adm-forecast', name: 'Enrollment Forecast', desc: 'Estimated registrations.' }
    ]
  },
  'Support': {
    label: 'IT Helpdesk Reports',
    reports: [
      { id: 'supp-volume', name: 'Ticket Volume', desc: 'Inflow of student/staff tickets.' },
      { id: 'supp-resolution', name: 'Resolution Times', desc: 'Avg time-to-close metrics.' },
      { id: 'supp-sla', name: 'SLA Compliance', desc: 'Service-level targets achieved.' },
      { id: 'supp-escalation', name: 'Escalation Trends', desc: 'Tickets routed to level-2 agents.' },
      { id: 'supp-sat', name: 'User Satisfaction', desc: 'CSAT scores and feedback summaries.' }
    ]
  },
  'Sports': {
    label: 'Sports & Athletics Reports',
    reports: [
      { id: 'sports-part', name: 'Participation Reports', desc: 'Students active in clubs.' },
      { id: 'sports-team', name: 'Team Performance', desc: 'Interschool tournament scores.' },
      { id: 'sports-tourn', name: 'Tournament Statistics', desc: 'Medals tables and schedules.' },
      { id: 'sports-attend', name: 'Training Attendance', desc: 'Morning drills trackers.' },
      { id: 'sports-achieve', name: 'Achievement Reports', desc: 'National-level sport awards.' }
    ]
  },
  'Events': {
    label: 'School Events Reports',
    reports: [
      { id: 'ev-reg', name: 'Registrations', desc: 'Ticket bookings.' },
      { id: 'ev-attend', name: 'Attendance', desc: 'Turnout metrics.' },
      { id: 'ev-feedback', name: 'Feedback Analysis', desc: 'CSAT logs.' },
      { id: 'ev-budget', name: 'Budget Utilization', desc: 'Event spending sheets.' },
      { id: 'ev-volunteer', name: 'Volunteer Participation', desc: 'Student crew registries.' }
    ]
  },
  'Facilities': {
    label: 'Facilities & Assets Reports',
    reports: [
      { id: 'fac-maint', name: 'Maintenance Requests', desc: 'Plumbing, electrical tickets.' },
      { id: 'fac-asset', name: 'Asset Usage', desc: 'Projector/smartboard lifecycle logs.' },
      { id: 'fac-clean', name: 'Cleaning Schedules', desc: 'Sanitization verification sheets.' },
      { id: 'fac-incidents', name: 'Facility Incidents', desc: 'Damage reports.' },
      { id: 'fac-util', name: 'Utilization Metrics', desc: 'Auditorium booking rates.' }
    ]
  },
  'Marketing': {
    label: 'Marketing & Outreaches Reports',
    reports: [
      { id: 'mkt-campaign', name: 'Campaign Analytics', desc: 'Ad spend vs conversions.' },
      { id: 'mkt-leads', name: 'Leads Generated', desc: 'Outreach pipelines.' },
      { id: 'mkt-conversion', name: 'Conversion Rates', desc: 'Signup tracking.' },
      { id: 'mkt-enquiry', name: 'Website Enquiries', desc: 'Organic contact form leads.' },
      { id: 'mkt-social', name: 'Social Media Performance', desc: 'Impression growth statistics.' }
    ]
  },
  'Library': {
    label: 'Library & Catalog Reports',
    reports: [
      { id: 'lib-issued', name: 'Books Issued', desc: 'Active checkouts.' },
      { id: 'lib-returns', name: 'Returns', desc: 'Daily check-ins.' },
      { id: 'lib-overdue', name: 'Overdue Books', desc: 'Fine collections roster.' },
      { id: 'lib-popular', name: 'Popular Categories', desc: 'Highly requested genres.' },
      { id: 'lib-usage', name: 'Student Usage', desc: 'Study room bookings.' }
    ]
  },
  'Hostel': {
    label: 'Hostel & Residential Reports',
    reports: [
      { id: 'hostel-occupancy', name: 'Occupancy', desc: 'Room and bed allocations.' },
      { id: 'hostel-visitors', name: 'Visitor Logs', desc: 'Parent check-ins.' },
      { id: 'hostel-incidents', name: 'Incidents', desc: 'Curfew violations/illness logs.' },
      { id: 'hostel-attend', name: 'Attendance', desc: 'Night roll call logs.' },
      { id: 'hostel-room', name: 'Room Allocation', desc: 'Room inventories.' }
    ]
  },
  'Parent Portal': {
    label: 'Parent Portal Reports',
    reports: [
      { id: 'par-progress', name: 'Child Progress Report', desc: 'Subject averages vs topper.' },
      { id: 'par-attend', name: 'Attendance Trends', desc: 'Monthly child attendance.' },
      { id: 'par-fee', name: 'Fee Status', desc: 'Paid receipts and invoices.' },
      { id: 'par-academic', name: 'Academic Trends', desc: 'Exam score graphs.' },
      { id: 'par-behavior', name: 'Behavioral Reports', desc: 'Teacher remarks logs.' }
    ]
  },
  'Student Workspace': {
    label: 'Student Workspace Reports',
    reports: [
      { id: 'std-attend', name: 'Attendance Status', desc: 'Term requirements check.' },
      { id: 'std-marks', name: 'Marks Sheet', desc: 'Unit tests & term results.' },
      { id: 'std-assign', name: 'Assignments Status', desc: 'Completed vs pending tasks.' },
      { id: 'std-comp', name: 'Competency Matrix', desc: 'Syllabus mastery levels.' },
      { id: 'std-achieve', name: 'Achievements', desc: 'Extracurricular awards.' },
      { id: 'std-certs', name: 'Certifications', desc: 'Course completions.' },
      { id: 'std-portfolio', name: 'Academic Portfolio', desc: 'NEP credit banks.' }
    ]
  }
}

// Role report category mappings
export const ROLE_REPORT_ACCESS = {
  'Principal': ['*'],
  'Platform Super Admin': ['*'],
  'System Administrator': ['*'],
  'Teacher': ['Academic'],
  'Parent': ['Parent Portal'],
  'Student': ['Student Workspace'],
  'Finance': ['Finance'],
  'Finance Administrator': ['Finance'],
  'HR': ['HR'],
  'HR Manager': ['HR'],
  'Transport': ['Transport'],
  'Transport Manager': ['Transport'],
  'Admissions': ['Admissions'],
  'Admissions Officer': ['Admissions'],
  'Event Management': ['Events'],
  'Event Organizer': ['Events'],
  'Sports Department': ['Sports'],
  'Sports Director': ['Sports'],
  'Housekeeping': ['Facilities'],
  'Facilities Head': ['Facilities'],
  'Marketing': ['Marketing'],
  'Marketing Specialist': ['Marketing'],
  'Software Support': ['Support'],
  'Support Agent': ['Support'],
  'Librarian': ['Library'],
  'Hostel Warden': ['Hostel']
}

// Indian educational datasets
export const STRUCTURED_REPORTS_CONTENT = {
  'acad-attend': {
    scope: 'Green Valley Secondary Wing (AY 2025-26)',
    summary: 'Overall pupil attendance in the academic term reached 91.2%, representing a minor increase from the previous cycle.',
    analysis: 'Grade 9 Section B has witnessed a temporary slide in attendance, dropping to 76.5% during high-humidity weeks.',
    trends: 'Attendance reaches its peak (97%) during practical exam weeks and scheduled science lab projects.',
    risks: '14 students currently risk falling below the minimum CBSE mandate of 75%.',
    recommendations: 'Trigger automated notification pings to parents via the Parent Portal when a student crosses three consecutive absences.',
    action: 'Activate daily automated warnings for at-risk students.',
    conclusion: 'General attendance ratios remain stable, though Grade 9 requires persistent mentoring.',
    kpis: [
      { label: 'Secondary Avg', value: '91.2%', trend: '+0.8% MoM', type: 'good' },
      { label: 'Grade 9 Wing', value: '76.5%', trend: '-3.1% MoM', type: 'warn' },
      { label: 'CBSE Compliant', value: '88% Pupils', trend: 'Minimum 75%', type: 'info' }
    ],
    table: [
      { name: 'Grade 8 Section A', value: '94% Attendance', status: 'Compliant' },
      { name: 'Grade 9 Section B', value: '76.5% Attendance', status: 'Review Needed' },
      { name: 'Grade 10 Section C', value: '95% Attendance', status: 'Compliant' }
    ],
    aiInsight: {
      confidence: 93,
      recommendation: 'Targeted SMS push campaigns to guardians in Grade 9 can instantly lift turnout rates.',
      action: 'Configure automated SMS outreach.'
    }
  },
  'fin-collect': {
    scope: 'All Institutional Trust accounts (Green Valley Trust)',
    summary: 'Tuition and bus fee collection balances stand at ₹4.85 Crore, meeting 92.4% of our Term-1 targets.',
    analysis: 'Dwarka Campus reports an outstanding balance of ₹14.5 Lakhs, representing the largest regional ledger deficit.',
    trends: 'Digital collections via UPI and NetBanking have grown by 35% MoM, replacing physical bank drafts.',
    risks: '₹22.5 Lakhs currently sit in past-due brackets exceeding 90 days.',
    recommendations: 'Introduce a 1.5% prompt-payment incentive for UPI transactions during the first 5 days of the academic term.',
    action: 'Send automated invoice payment reminders via WhatsApp.',
    conclusion: 'Liquid collections remain healthy, with digital payments optimizing ledger speed.',
    kpis: [
      { label: 'Net Collected', value: '₹4.85 Cr', trend: '92.4% Target', type: 'good' },
      { label: 'Overdue Dues', value: '₹22.5 L', trend: '125 accounts', type: 'warn' },
      { label: 'UPI Share', value: '72% Total', trend: '+35% MoM', type: 'good' }
    ],
    table: [
      { name: 'Green Valley Dwarka', value: '₹14.5 L Overdue', status: 'Action Required' },
      { name: 'Green Valley Koramangala', value: '₹5.2 L Overdue', status: 'Stable' },
      { name: 'Green Valley Adyar', value: '₹2.8 L Overdue', status: 'Stable' }
    ],
    aiInsight: {
      confidence: 95,
      recommendation: 'Integrating Razorpay UPI Autopay channels can lower default indices by 22% in upcoming terms.',
      action: 'Configure Razorpay UPI integrations.'
    }
  },
  'hr-directory': {
    scope: 'Institutional workforce rosters (Academic & Non-Academic)',
    summary: 'Total headcount stands at 320 active members (180 Academic, 140 Support Staff).',
    analysis: 'Our teacher-student ratio remains compliant with CBSE guidelines at 1:26.',
    trends: 'Staff attendance matches 94.8% baseline metrics across the first quarter.',
    risks: 'Five critical faculty roles in Senior Secondary Physics remain vacant.',
    recommendations: 'Launch recruitment campaigns targeting retired CBSE mentors for short-term contracts.',
    action: 'Post vacancies on specialized educational portals.',
    conclusion: 'Staff ratios are healthy, though Senior Secondary STEM departments require swift hiring cycles.',
    kpis: [
      { label: 'Total Personnel', value: '320 Active', trend: 'Stable', type: 'good' },
      { label: 'STEM Vacancies', value: '5 Roles', trend: 'Critical hiring', type: 'warn' },
      { label: 'T-S Ratio', value: '1:26 Ratio', trend: 'CBSE Compliant', type: 'good' }
    ],
    table: [
      { name: 'Senior Wing STEM', value: '88% Staffed', status: 'Action Required' },
      { name: 'Primary Division', value: '100% Staffed', status: 'Optimal' },
      { name: 'Support Operations', value: '96% Staffed', status: 'Stable' }
    ],
    aiInsight: {
      confidence: 91,
      recommendation: 'Temporary hiring of STEM contractors will prevent syllabus delay before term-end examinations.',
      action: 'Initiate freelance contract interviews.'
    }
  }
}

export const FALLBACK_REPORT_CONTENT = {
  scope: 'Standard Department Workspace (Indian CBSE/ICSE Matrix)',
  summary: 'All recorded operational data and student scoring baselines fit within scheduled compliance levels.',
  analysis: 'Evaluated metrics represent normal academic behaviors. No critical outliers or policy violations identified.',
  trends: 'A consistent upward performance curve (2.4% average growth) across the institutional metrics.',
  risks: 'Operational risk assessment score: Low. No immediate remedies needed.',
  recommendations: 'Maintain present parameters and schedule standard end-of-term audits.',
  action: 'No manual intervention required at this stage.',
  conclusion: 'Metrics are optimal. Continue standard operational workflows.',
  kpis: [
    { label: 'Compliance Rate', value: '98.5%', trend: 'CBSE Compliant', type: 'good' },
    { label: 'Operational Load', value: '68%', trend: 'Normal Range', type: 'info' }
  ],
  table: [
    { name: 'Primary Section', value: 'Healthy Score', status: 'Compliant' },
    { name: 'Secondary Section', value: 'Healthy Score', status: 'Compliant' }
  ],
  aiInsight: {
    confidence: 85,
    recommendation: 'Baseline parameters remain fully balanced. Continue routine weekly data sweeps.',
    action: 'No adjustment needed.'
  }
}
