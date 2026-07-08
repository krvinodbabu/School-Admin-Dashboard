/**
 * EduOS Platform Configuration definitions.
 */

export const INSTITUTION_TYPES = [
  'School',
  'College',
  'University',
  'Coaching Institute',
  'Training Institute',
  'Skill Development Center'
]

export const HIERARCHY_STEPS = [
  'Platform Provider',
  'Institution Group',
  'Institution',
  'Campus',
  'Department',
  'Users'
]

export const DEFAULT_MODULES = [
  { name: 'Academics', label: 'Academics', enabled: true, icon: 'NotebookPen' },
  { name: 'Admissions', label: 'Admissions', enabled: true, icon: 'UserPlus' },
  { name: 'Finance', label: 'Finance', enabled: true, icon: 'Wallet' },
  { name: 'HR', label: 'Human Resources (HR)', enabled: true, icon: 'Briefcase' },
  { name: 'Transport', label: 'Transport', enabled: true, icon: 'Bus' },
  { name: 'Events', label: 'Events & Calendar', enabled: true, icon: 'CalendarDays' },
  { name: 'Sports', label: 'Sports Activities', enabled: true, icon: 'Trophy' },
  { name: 'Facilities', label: 'Facilities & Library', enabled: true, icon: 'Building' },
  { name: 'Support', label: 'Support Desk', enabled: true, icon: 'HelpCircle' },
  { name: 'Communication', label: 'Communication', enabled: true, icon: 'Bell' },
  { name: 'Analytics', label: 'Analytics', enabled: true, icon: 'BarChart3' },
  { name: 'Settings', label: 'System Settings', enabled: true, icon: 'Settings' }
]

export const ROLES = [
  { id: 'Principal', label: 'Principal' },
  { id: 'School Admin', label: 'School Admin' },
  { id: 'Teacher', label: 'Teacher' },
  { id: 'Parent', label: 'Parent' },
  { id: 'Student', label: 'Student' },
  { id: 'Finance', label: 'Finance' },
  { id: 'HR', label: 'HR' },
  { id: 'Transport', label: 'Transport' },
  { id: 'Admissions', label: 'Admissions' },
  { id: 'Event Management', label: 'Event Management' },
  { id: 'Sports Department', label: 'Sports Department' },
  { id: 'Housekeeping', label: 'Housekeeping' },
  { id: 'Escalation Team', label: 'Escalation Team' },
  { id: 'Marketing', label: 'Marketing' },
  { id: 'Software Support', label: 'Software Support' }
]
