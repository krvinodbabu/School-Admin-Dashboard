/**
 * Default mappings of role to permissions.
 */

export const DEFAULT_ROLE_MAPPINGS = {
  Principal: [
    '*' // Wildcard indicating full unrestricted access to all permissions
  ],
  'School Admin': [
    'student.view', 'student.create', 'student.edit', 'student.delete',
    'teacher.view', 'teacher.create', 'teacher.edit', 'teacher.delete',
    'lessonplan.create', 'lessonplan.edit', 'lessonplan.approve',
    'assessment.create', 'assessment.approve',
    'fees.view', 'fees.collect',
    'transport.view',
    'tickets.view', 'tickets.assign', 'tickets.close',
    'notifications.send', 'circulars.publish',
    'rbac.view', 'rbac.edit', 'audit.view'
  ],
  Teacher: [
    'student.view',
    'teacher.view',
    'lessonplan.create', 'lessonplan.edit',
    'assessment.create',
    'notifications.send',
    'reports.teacher.view'
  ],
  Parent: [
    'student.view',
    'fees.view',
    'reports.parent.view'
  ],
  Student: [
    'student.view',
    'tickets.create',
    'reports.student.view'
  ],
  Finance: [
    'fees.view', 'fees.collect', 'fees.refund',
    'payroll.view', 'payroll.process',
    'reports.finance.view'
  ],
  HR: [
    'teacher.view', 'teacher.create', 'teacher.edit',
    'payroll.view',
    'reports.hr.view'
  ],
  Transport: [
    'transport.view', 'transport.edit', 'transport.assign',
    'reports.transport.view'
  ],
  Admissions: [
    'student.view', 'student.create', 'student.edit',
    'reports.admissions.view'
  ],
  'Event Management': [
    'notifications.send', 'circulars.publish',
    'reports.events.view'
  ],
  'Sports Department': [
    'notifications.send',
    'reports.sports.view'
  ],
  Housekeeping: [
    'tickets.create', 'tickets.view',
    'reports.facilities.view'
  ],
  'Escalation Team': [
    'tickets.view', 'tickets.assign',
    'student.view', 'teacher.view'
  ],
  Marketing: [
    'notifications.send',
    'reports.marketing.view'
  ],
  'Software Support': [
    'tickets.view', 'tickets.assign', 'tickets.close',
    'rbac.view', 'audit.view',
    'reports.support.view', 'reports.library.view', 'reports.hostel.view'
  ]
}
