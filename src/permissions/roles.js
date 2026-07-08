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
    'notifications.send'
  ],
  Parent: [
    'student.view',
    'fees.view'
  ],
  Student: [
    'student.view',
    'tickets.create'
  ],
  Finance: [
    'fees.view', 'fees.collect', 'fees.refund',
    'payroll.view', 'payroll.process'
  ],
  HR: [
    'teacher.view', 'teacher.create', 'teacher.edit',
    'payroll.view'
  ],
  Transport: [
    'transport.view', 'transport.edit', 'transport.assign'
  ],
  Admissions: [
    'student.view', 'student.create', 'student.edit'
  ],
  'Event Management': [
    'notifications.send', 'circulars.publish'
  ],
  'Sports Department': [
    'notifications.send'
  ],
  Housekeeping: [
    'tickets.create', 'tickets.view'
  ],
  'Escalation Team': [
    'tickets.view', 'tickets.assign',
    'student.view', 'teacher.view'
  ],
  Marketing: [
    'notifications.send'
  ],
  'Software Support': [
    'tickets.view', 'tickets.assign', 'tickets.close',
    'rbac.view', 'audit.view'
  ]
}
