/**
 * Centralized permissions definition keys.
 */

export const PERMISSIONS_LIST = [
  // Student module permissions
  { key: 'student.view', label: 'View Students', module: 'Academics' },
  { key: 'student.create', label: 'Create Students', module: 'Academics' },
  { key: 'student.edit', label: 'Edit Students', module: 'Academics' },
  { key: 'student.delete', label: 'Delete Students', module: 'Academics' },

  // Teacher module permissions
  { key: 'teacher.view', label: 'View Teachers', module: 'Academics' },
  { key: 'teacher.create', label: 'Create Teachers', module: 'Academics' },
  { key: 'teacher.edit', label: 'Edit Teachers', module: 'Academics' },
  { key: 'teacher.delete', label: 'Delete Teachers', module: 'Academics' },

  // Academics planning & lesson plans permissions
  { key: 'lessonplan.create', label: 'Create Lesson Plans', module: 'Academics' },
  { key: 'lessonplan.edit', label: 'Edit Lesson Plans', module: 'Academics' },
  { key: 'lessonplan.approve', label: 'Approve/Reject Lesson Plans', module: 'Academics' },
  { key: 'assessment.create', label: 'Create Assessments', module: 'Academics' },
  { key: 'assessment.approve', label: 'Approve Assessments', module: 'Academics' },

  // Finance & payroll module permissions
  { key: 'fees.view', label: 'View Fees', module: 'Finance' },
  { key: 'fees.collect', label: 'Collect Fees', module: 'Finance' },
  { key: 'fees.refund', label: 'Refund Fees', module: 'Finance' },
  { key: 'payroll.view', label: 'View Payroll', module: 'Finance' },
  { key: 'payroll.process', label: 'Process Payroll', module: 'Finance' },

  // Transport module permissions
  { key: 'transport.view', label: 'View Transport', module: 'Transport' },
  { key: 'transport.edit', label: 'Configure Transport', module: 'Transport' },
  { key: 'transport.assign', label: 'Assign Transport Routes', module: 'Transport' },

  // Support module permissions
  { key: 'tickets.create', label: 'Create Tickets', module: 'Support' },
  { key: 'tickets.view', label: 'View Tickets', module: 'Support' },
  { key: 'tickets.assign', label: 'Assign Tickets', module: 'Support' },
  { key: 'tickets.close', label: 'Close Tickets', module: 'Support' },

  // Communication module permissions
  { key: 'notifications.send', label: 'Send Notifications', module: 'Communication' },
  { key: 'circulars.publish', label: 'Publish Circulars', module: 'Communication' },

  // RBAC System permissions
  { key: 'rbac.view', label: 'View Access Matrix', module: 'Settings' },
  { key: 'rbac.edit', label: 'Manage Roles & Permissions', module: 'Settings' },
  { key: 'audit.view', label: 'View Audit logs', module: 'Settings' }
]

export const PERMISSIONS_BY_MODULE = PERMISSIONS_LIST.reduce((acc, current) => {
  if (!acc[current.module]) {
    acc[current.module] = []
  }
  acc[current.module].push(current)
  return acc
}, {})
