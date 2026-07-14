/**
 * Static configuration mappings for the Enterprise Reporting Center.
 */

export const REPORT_CATEGORIES = {
  'Academics': [
    { id: 'acad-perf', name: 'Academic Performance Index', desc: 'Syllabus coverage & term marks distribution.' },
    { id: 'lesson-cov', name: 'Lesson Plan & Coverage Report', desc: 'Weekly planner completion timelines.' },
    { id: 'comp-mastery', name: 'Competency Mastery Grid', desc: 'NEP 2020 skill mappings progress.' }
  ],
  'Finance': [
    { id: 'fee-collect', name: 'Fee Collection Audit', desc: 'Real-time invoice collections efficiency.' },
    { id: 'fee-outstanding', name: 'Outstanding Dues Registry', desc: 'Late fee profiles & autopay errors.' },
    { id: 'budget-burn', name: 'Campus Operational Budgets', desc: 'Departmental budget vs actuals.' }
  ],
  'HR & Operations': [
    { id: 'hr-attrition', name: 'Workforce Attrition Forecast', desc: 'Hiring pipeline and leaves logs.' },
    { id: 'transit-route', name: 'Transit Route Delays & Telematics', desc: 'Driver scorecards and fuel efficiency.' },
    { id: 'support-sla', name: 'Helpdesk SLA Performance', desc: 'Ticket volume & resolution times.' }
  ]
}

export const DRILLDOWN_DATA = {
  'fee-collect': {
    title: 'Institution Revenue (Total Collection: ₹12.4 Cr)',
    level: 0,
    breadcrumbs: ['Institution Group', 'All Campuses'],
    items: [
      { name: 'Koramangala Campus, Bangalore', value: '₹3.4 Cr', drillKey: 'camp-1' },
      { name: 'Dwarka Campus, Delhi', value: '₹4.2 Cr', drillKey: 'camp-2' },
      { name: 'Adyar Campus, Chennai', value: '₹2.1 Cr', drillKey: 'camp-3' },
      { name: 'Salt Lake Campus, Kolkata', value: '₹1.5 Cr', drillKey: 'camp-4' },
      { name: 'Bandra Campus, Mumbai', value: '₹1.2 Cr', drillKey: 'camp-5' }
    ],
    details: {
      'camp-1': {
        title: 'Koramangala Campus (₹3.4 Cr) By Department',
        level: 1,
        breadcrumbs: ['Institution Group', 'All Campuses', 'Koramangala Campus'],
        items: [
          { name: 'Mathematics Department', value: '₹1.2 Cr', drillKey: 'dept-math' },
          { name: 'Science Faculty', value: '₹1.4 Cr', drillKey: 'dept-science' },
          { name: 'Languages Department', value: '₹0.8 Cr', drillKey: 'dept-lang' }
        ]
      },
      'dept-math': {
        title: 'Mathematics Department Outstanding Registry (Top Students)',
        level: 2,
        breadcrumbs: ['Institution Group', 'All Campuses', 'Koramangala', 'Math Dept'],
        items: [
          { name: 'Aditya Sen (Grade 9)', value: '₹12,500 Outstanding', status: 'Payment Overdue' },
          { name: 'Karthik Rao (Grade 10)', value: '₹8,400 Outstanding', status: 'Due in 5 days' },
          { name: 'Pooja Hegde (Grade 8)', value: '₹15,000 Outstanding', status: 'Autopay failed' }
        ]
      }
    }
  },
  'acad-perf': {
    title: 'Academic Performance (Institution Baseline: 84% Mastery)',
    level: 0,
    breadcrumbs: ['Institution Group', 'All Campuses'],
    items: [
      { name: 'Grade 8 (Secondary)', value: '88% Average Mastery', drillKey: 'grade-8' },
      { name: 'Grade 9 (Secondary)', value: '78% Average Mastery', drillKey: 'grade-9' },
      { name: 'Grade 10 (High School)', value: '85% Average Mastery', drillKey: 'grade-10' }
    ],
    details: {
      'grade-9': {
        title: 'Grade 9 Class Performance by Subject',
        level: 1,
        breadcrumbs: ['Institution Group', 'All Campuses', 'Grade 9'],
        items: [
          { name: 'Mathematics (Algebra)', value: '72% Mastery Rate', drillKey: 'sub-math' },
          { name: 'Physics (Optics)', value: '80% Mastery Rate', drillKey: 'sub-phys' },
          { name: 'English (Composition)', value: '82% Mastery Rate', drillKey: 'sub-eng' }
        ]
      },
      'sub-math': {
        title: 'Mathematics (Grade 9) Top At-Risk Students list',
        level: 2,
        breadcrumbs: ['Institution Group', 'All Campuses', 'Grade 9', 'Mathematics'],
        items: [
          { name: 'Rahul Varma', value: '52% Skill Index', status: 'Needs remediation' },
          { name: 'Sneha Patil', value: '58% Skill Index', status: 'Needs remediation' },
          { name: 'Karan Johar', value: '62% Skill Index', status: 'Low performance flag' }
        ]
      }
    }
  }
}

export const AI_REPORT_INSIGHTS = {
  'fee-collect': {
    confidence: 94,
    recommendation: 'DWK Delhi Campus outstanding is growing. Send automated digital invoice notifications.',
    action: 'Activate Dwarka WhatsApp reminders schedule.'
  },
  'acad-perf': {
    confidence: 88,
    recommendation: 'Grade 9 Math mastery fell to 72%. Schedule dedicated remediation classes.',
    action: 'Launch algebraic foundation workshops.'
  }
}
