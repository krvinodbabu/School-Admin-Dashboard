/**
 * Multi-Tenant and Campus Architecture Mock Data Definitions.
 */

export const INSTITUTION_GROUPS = [
  {
    id: 'grp-abc',
    name: 'ABC Education Group',
    institutions: [
      {
        id: 'inst-school',
        name: 'ABC International School',
        type: 'School',
        campuses: [
          { id: 'camp-hyd', name: 'Hyderabad Campus', code: 'HYD', address: 'Gachibowli, Hyderabad, Telangana', contact: '+91 40 4455 6677', head: 'Dr. Ramesh Rao', capacity: 1500, students: 1240, staff: 120 },
          { id: 'camp-blr', name: 'Bangalore Campus', code: 'BLR', address: 'Whitefield, Bangalore, Karnataka', contact: '+91 80 8899 0011', head: 'Ms. Shalini Hegde', capacity: 1200, students: 980, staff: 95 }
        ]
      },
      {
        id: 'inst-college',
        name: 'ABC College of Engineering',
        type: 'College',
        campuses: [
          { id: 'camp-tech-main', name: 'Main Technical Campus', code: 'TECH', address: 'OMR, Chennai, Tamil Nadu', contact: '+91 44 2233 4455', head: 'Dr. A. K. Sen', capacity: 3000, students: 2450, staff: 210 }
        ]
      }
    ]
  },
  {
    id: 'grp-xyz',
    name: 'XYZ University Group',
    institutions: [
      {
        id: 'inst-univ',
        name: 'XYZ Global University',
        type: 'University',
        campuses: [
          { id: 'camp-delhi', name: 'Delhi NCR Campus', code: 'DEL', address: 'Sector 62, Noida, UP', contact: '+91 120 3344 5566', head: 'Prof. S. K. Gupta', capacity: 5000, students: 4120, staff: 380 },
          { id: 'camp-pune', name: 'Pune Campus', code: 'PUNE', address: 'Hinjewadi, Pune, Maharashtra', contact: '+91 20 5566 7788', head: 'Dr. Preeti Joshi', capacity: 2500, students: 1850, staff: 160 }
        ]
      }
    ]
  },
  {
    id: 'grp-national',
    name: 'National Coaching Network',
    institutions: [
      {
        id: 'inst-coach',
        name: 'National IIT Academy',
        type: 'Coaching Center',
        campuses: [
          { id: 'camp-kota', name: 'Kota Main Hub', code: 'KOTA', address: 'Rajeev Gandhi Nagar, Kota, Rajasthan', contact: '+91 744 2233 1122', head: 'Mr. V. K. Bansal', capacity: 8000, students: 7420, staff: 450 }
        ]
      }
    ]
  }
]

export const DEPARTMENTS = [
  { id: 'dept-academic', name: 'Academic', head: 'Ms. Anita Deshmukh', staff: 45, students: 620, tasks: 4, kpi: 'Syllabus: 78%' },
  { id: 'dept-admissions', name: 'Admissions', head: 'Mr. Vikram Sen', staff: 8, students: 140, tasks: 2, kpi: 'Conversion: 82%' },
  { id: 'dept-finance', name: 'Finance', head: 'Mr. Raghav Pillai', staff: 6, students: 950, tasks: 7, kpi: 'Dues Pending: 8%' },
  { id: 'dept-hr', name: 'HR', head: 'Ms. Priya Menon', staff: 4, students: 0, tasks: 3, kpi: 'Vacancy Ratio: 2%' },
  { id: 'dept-transport', name: 'Transport', head: 'Mr. Satish Shinde', staff: 18, students: 480, tasks: 1, kpi: 'On-Time rate: 97%' },
  { id: 'dept-sports', name: 'Sports', head: 'Mr. Sandeep Patil', staff: 5, students: 320, tasks: 2, kpi: 'Tournament wins: 6' },
  { id: 'dept-events', name: 'Events', head: 'Ms. Divya Nair', staff: 3, students: 750, tasks: 5, kpi: 'Feedback: 4.8/5' },
  { id: 'dept-facilities', name: 'Facilities', head: 'Mr. Mahesh Kale', staff: 12, students: 1100, tasks: 8, kpi: 'Tickets resolved: 94%' },
  { id: 'dept-support', name: 'Support', head: 'Mr. Rohan Das', staff: 4, students: 220, tasks: 3, kpi: 'SLA Met: 99.4%' },
  { id: 'dept-it', name: 'IT', head: 'Mr. Amit Verma', staff: 5, students: 1200, tasks: 2, kpi: 'Uptime: 99.99%' },
  { id: 'dept-library', name: 'Library', head: 'Ms. Sudha Murthy', staff: 3, students: 850, tasks: 0, kpi: 'Circulation: 420/wk' },
  { id: 'dept-hostel', name: 'Hostel', head: 'Mr. Baldev Singh', staff: 10, students: 340, tasks: 6, kpi: 'Occupancy: 95%' }
]

export const ANNOUNCEMENTS = [
  { id: 1, scope: 'Entire Group', title: 'Global Annual Budget Approvals', body: 'The operating board has approved the budget projections for the academic year 2026-27 across all institutions.', date: '2026-07-08', type: 'info' },
  { id: 2, scope: 'Institution', title: 'Mid-Term Examination Timetable Released', body: 'The mid-term exams schedule has been uploaded to student portals. Please verify unit assignments.', date: '2026-07-07', type: 'info' },
  { id: 3, scope: 'Campus', title: 'Hyderabad Campus Infrastructure Upgrade', body: 'Block B digital smartboards installations are scheduled to be completed by Sunday.', date: '2026-07-06', type: 'success' },
  { id: 4, scope: 'Department', title: 'IT Dept Routine Database Backups', body: 'EduOS servers patch updates and backup routines will be executed on Saturday midnight (11:59 PM). Expect brief downtime.', date: '2026-07-05', type: 'warning' },
  { id: 5, scope: 'Campus', title: 'EMERGENCY: Heavy Rain Alert', body: 'Due to severe weather warnings in Hyderabad region, classes will be held online tomorrow.', date: '2026-07-09', type: 'emergency' }
]

export const CROSS_CAMPUS_STATS = {
  totalInstitutions: 4,
  totalCampuses: 6,
  totalStudents: 18140,
  totalEmployees: 1450,
  feeCollection: 92.4,
  admissionsRate: 78.5,
  academicPerformance: 84.2,
  campusComparison: [
    { name: 'Hyderabad Campus', code: 'HYD', students: 1240, staff: 120, collection: 94.5, admissions: 81, performance: 86 },
    { name: 'Bangalore Campus', code: 'BLR', students: 980, staff: 95, collection: 91.2, admissions: 74, performance: 83 },
    { name: 'Main Technical Campus', code: 'TECH', students: 2450, staff: 210, collection: 96.0, admissions: 85, performance: 88 },
    { name: 'Delhi NCR Campus', code: 'DEL', students: 4120, staff: 380, collection: 89.4, admissions: 72, performance: 79 },
    { name: 'Pune Campus', code: 'PUNE', students: 1850, staff: 160, collection: 93.0, admissions: 79, performance: 84 },
    { name: 'Kota Main Hub', code: 'KOTA', students: 7420, staff: 450, collection: 95.8, admissions: 92, performance: 90 }
  ]
}

export const ORG_STRUCTURE = {
  name: 'ABC Education Group',
  type: 'Group',
  children: [
    {
      name: 'ABC International School',
      type: 'Institution',
      children: [
        {
          name: 'Hyderabad Campus',
          type: 'Campus',
          children: [
            {
              name: 'Academic Department',
              type: 'Department',
              children: [
                { name: 'Grade 9-A Teachers', type: 'Team', children: [{ name: 'Ms. Priya Sharma', type: 'User' }, { name: 'Mr. Ravi Gupta', type: 'User' }] },
                { name: 'Grade 10-B Teachers', type: 'Team', children: [{ name: 'Mr. Anil Mehta', type: 'User' }] }
              ]
            },
            {
              name: 'Finance Department',
              type: 'Department',
              children: [
                { name: 'Billing Team', type: 'Team', children: [{ name: 'Mr. Raghav Pillai', type: 'User' }] }
              ]
            }
          ]
        },
        {
          name: 'Bangalore Campus',
          type: 'Campus',
          children: [
            {
              name: 'Academic Department',
              type: 'Department',
              children: [
                { name: 'Grade 8 Teachers', type: 'Team', children: [{ name: 'Ms. Kavita Nair', type: 'User' }] }
              ]
            }
          ]
        }
      ]
    }
  ]
}
