/**
 * Privilege matrix configuration for EduOS using a CRUD/Action model.
 */
export const PRIVILEGE_CATEGORIES = [
  {
    module: 'Student Module',
    privileges: [
      { key: 'student.view', name: 'View Student Profile' },
      { key: 'student.create', name: 'Create Student Record' },
      { key: 'student.edit', name: 'Update Student Details' },
      { key: 'student.delete', name: 'Delete Student Record' },
      { key: 'student.export', name: 'Export Student Reports' },
      { key: 'student.import', name: 'Bulk Import Students' },
      { key: 'student.approve', name: 'Approve Admission/Enrollment' }
    ]
  },
  {
    module: 'Finance Module',
    privileges: [
      { key: 'fees.view', name: 'View Fee Structure & Records' },
      { key: 'fees.collect', name: 'Collect Tuition Fees' },
      { key: 'fees.refund', name: 'Issue Refund' },
      { key: 'fees.invoice', name: 'Generate Invoice' },
      { key: 'payroll.view', name: 'View Employee Payroll' },
      { key: 'payroll.process', name: 'Process Monthly Payroll' }
    ]
  },
  {
    module: 'Transport Module',
    privileges: [
      { key: 'transport.view', name: 'View Transit Routes & Schedules' },
      { key: 'transport.assign', name: 'Assign Students to Routes' },
      { key: 'transport.drivers', name: 'Manage Bus Drivers' },
      { key: 'transport.gps', name: 'Real-time GPS Tracking' }
    ]
  },
  {
    module: 'Support Module',
    privileges: [
      { key: 'tickets.create', name: 'Create Helpdesk Ticket' },
      { key: 'tickets.assign', name: 'Assign Helpdesk Ticket' },
      { key: 'tickets.resolve', name: 'Resolve Helpdesk Ticket' },
      { key: 'tickets.escalate', name: 'Escalate Helpdesk Incident' }
    ]
  },
  {
    module: 'Academic Module',
    privileges: [
      { key: 'lessonplan.create', name: 'Create Lesson Plan' },
      { key: 'lessonplan.edit', name: 'Edit Lesson Plan' },
      { key: 'lessonplan.approve', name: 'Approve Lesson Plan' },
      { key: 'assessment.create', name: 'Create Academic Assessment' },
      { key: 'assessment.approve', name: 'Approve Grade Books' }
    ]
  }
]

export const ROLE_PRIVILEGE_MAPPING = {
  'Principal': ['*'],
  'Teacher': [
    'student.view',
    'lessonplan.create', 'lessonplan.edit',
    'assessment.create',
    'tickets.create'
  ],
  'Parent': [
    'student.view',
    'fees.view',
    'transport.view', 'transport.gps',
    'tickets.create'
  ],
  'Finance Team': [
    'fees.view', 'fees.collect', 'fees.refund', 'fees.invoice',
    'payroll.view', 'payroll.process'
  ],
  'HR Team': [
    'payroll.view',
    'tickets.create'
  ],
  'Transport Team': [
    'transport.view', 'transport.assign', 'transport.drivers', 'transport.gps'
  ],
  'Software Support Team': [
    'tickets.create', 'tickets.assign', 'tickets.resolve', 'tickets.escalate'
  ]
}
