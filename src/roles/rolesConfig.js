/**
 * Configuration file defining all enterprise roles in EduOS categorized by domain.
 */
export const ROLE_CATALOGUE = [
  {
    category: 'Leadership Roles',
    description: 'Executive officers, governing bodies, and campus directors.',
    roles: [
      { id: 'Platform Super Admin', label: 'Platform Super Admin', desc: 'Full administrative access across all client environments.' },
      { id: 'Institution Owner', label: 'Institution Owner', desc: 'Owns the main operating account and organization configuration.' },
      { id: 'Chairman', label: 'Chairman', desc: 'Heads the governing board, reviews high-level command center reports.' },
      { id: 'Board Member', label: 'Board Member', desc: 'Access to high-level governance and strategic institution metrics.' },
      { id: 'Director', label: 'Director', desc: 'Oversees operational and financial health across multiple campuses.' },
      { id: 'Principal', label: 'Principal', desc: 'Academic and administrative lead of the primary campus.' },
      { id: 'Vice Principal', label: 'Vice Principal', desc: 'Supports the Principal in daily academic and disciplinary management.' },
      { id: 'Registrar', label: 'Registrar', desc: 'Manages student records, enrollments, admissions database.' },
      { id: 'Dean', label: 'Dean', desc: 'Heads academic faculties and program curricula.' },
      { id: 'Campus Administrator', label: 'Campus Administrator', desc: 'Manages campus infrastructure, facilities, safety.' }
    ]
  },
  {
    category: 'Academic Roles',
    description: 'Teaching staff, academic planners, library, and laboratory support.',
    roles: [
      { id: 'HOD', label: 'Head of Department (HOD)', desc: 'Manages departmental course allocations, syllabus tracking, evaluations.' },
      { id: 'Teacher', label: 'Teacher', desc: 'Manages classes, marks attendance, plans lessons, administers tests.' },
      { id: 'Professor', label: 'Professor', desc: 'Senior lecturer and academic program designer.' },
      { id: 'Lecturer', label: 'Lecturer', desc: 'Conducts class instructions, grading, student guidance.' },
      { id: 'Academic Coordinator', label: 'Academic Coordinator', desc: 'Maps curricula, verifies Bloom\'s taxonomy, syllabus coverage.' },
      { id: 'Exam Controller', label: 'Exam Controller', desc: 'Organizes exam scheduling, question banks, grading moderation.' },
      { id: 'Lab Assistant', label: 'Lab Assistant', desc: 'Manages lab equipment, safety, experiments scheduling.' },
      { id: 'Librarian', label: 'Librarian', desc: 'Manages library catalogs, lending records, reading rooms.' }
    ]
  },
  {
    category: 'Student Ecosystem',
    description: 'Primary beneficiaries, guardians, and external alumni networks.',
    roles: [
      { id: 'Student', label: 'Student', desc: 'Attends lectures, submits homework, participates in skills and micro-credentials.' },
      { id: 'Parent', label: 'Parent', desc: 'Monitors child progress, pays tuition fees, tracks transit status.' },
      { id: 'Alumni', label: 'Alumni', desc: 'Stays connected with placement office, mentors current students.' }
    ]
  },
  {
    category: 'Operations Roles',
    description: 'Core administrative support, human resources, admissions, and payroll.',
    roles: [
      { id: 'School Administrator', label: 'School Administrator', desc: 'Coordinates administrative operations and staff assignments.' },
      { id: 'Admissions Team', label: 'Admissions Team', desc: 'Manages enquiry funnels, applicant screenings, conversion rates.' },
      { id: 'Front Office Team', label: 'Front Office Team', desc: 'Visitor registry, call logging, general campus inquiries.' },
      { id: 'Finance Team', label: 'Finance Team', desc: 'Collects fees, tracks invoice defaults, manages budgets.' },
      { id: 'Procurement Team', label: 'Procurement Team', desc: 'Manages purchases, tenders, vendor lists.' },
      { id: 'HR Team', label: 'HR Team', desc: 'Manages staff recruitment, leaves, appraisals, attendance.' },
      { id: 'Payroll Team', label: 'Payroll Team', desc: 'Processes monthly staff payroll, salary brackets, deductions.' }
    ]
  },
  {
    category: 'Infrastructure Roles',
    description: 'Facilities management, transport, safety, and campus logistics.',
    roles: [
      { id: 'Transport Team', label: 'Transport Team', desc: 'Manages bus routing, GPS telematics, driver duty rosters.' },
      { id: 'Facilities Team', label: 'Facilities Team', desc: 'Manages building utilities, electric grids, scheduling classrooms.' },
      { id: 'Housekeeping Team', label: 'Housekeeping Team', desc: 'Campus cleanliness, waste management, sanitation checklists.' },
      { id: 'Security Team', label: 'Security Team', desc: 'Contactless face-matching check-in, visitor safety, gate control.' },
      { id: 'Hostel Team', label: 'Hostel Team', desc: 'Dorm room allocations, hostel discipline, warden audits.' },
      { id: 'Cafeteria Team', label: 'Cafeteria Team', desc: 'Meal menus, student food cards, cafeteria inventory.' }
    ]
  },
  {
    category: 'Student Services',
    description: 'Placement, physical wellness, counselling, and sports management.',
    roles: [
      { id: 'Counselling Team', label: 'Counselling Team', desc: 'Supports student mental health, wellness sessions.' },
      { id: 'Placement Team', label: 'Placement Team', desc: 'Coordinates campus interviews, internship programs.' },
      { id: 'Career Guidance Team', label: 'Career Guidance Team', desc: 'Runs AI Career Pathfinder, guidance counselor reviews.' },
      { id: 'Sports Team', label: 'Sports Team', desc: 'Manages athletics inventory, ground booking schedules.' },
      { id: 'Event Management Team', label: 'Event Management Team', desc: 'Coordinates calendars, cultural events, vendor bookings.' }
    ]
  },
  {
    category: 'Technology Roles',
    description: 'LMS administration, database systems, IT service desk, and support routing.',
    roles: [
      { id: 'IT Support Team', label: 'IT Support Team', desc: 'Maintains local networking, lab terminals, server racks.' },
      { id: 'Software Support Team', label: 'Software Support Team', desc: 'Reviews service desk tickets, software incidents, SLA compliance.' },
      { id: 'Grievance Team', label: 'Grievance Team', desc: 'Handles parent, student, and employee complaints.' },
      { id: 'Escalation Team', label: 'Escalation Team', desc: 'Resolves critical system outages, ticket escalations.' }
    ]
  },
  {
    category: 'Marketing Roles',
    description: 'Outreach, social management, CRM data, and recruitment campaigns.',
    roles: [
      { id: 'Marketing Team', label: 'Marketing Team', desc: 'Brand management, social media handles, campaigns.' },
      { id: 'CRM Team', label: 'CRM Team', desc: 'Tracks admission queries, cold outreach pipelines.' },
      { id: 'Outreach Team', label: 'Outreach Team', desc: 'Coordinates inter-school fairs, community workshops.' }
    ]
  }
]

// Flat list of all role IDs
export const ALL_ROLES = ROLE_CATALOGUE.flatMap(c => c.roles.map(r => r.id))
export const ROLE_LABELS = ROLE_CATALOGUE.flatMap(c => c.roles.map(r => ({ id: r.id, label: r.label })))
