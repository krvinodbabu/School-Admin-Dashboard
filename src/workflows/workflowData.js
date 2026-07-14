import { WORKFLOW_TRIGGERS, WORKFLOW_STATUS, SLA_PRIORITIES } from './workflowSchema.js';

export const workflowTemplates = [
  {
    id: 'TPL-001',
    name: 'Teacher Leave Request',
    description: 'Standard workflow for teacher sick or casual leave.',
    category: 'HR',
    trigger: WORKFLOW_TRIGGERS.MANUAL,
    slaPriority: SLA_PRIORITIES.P3.id,
    steps: [
      { stepId: 1, name: 'HOD Approval', assigneeRole: 'HOD', actionRequired: 'APPROVE', escalationRule: { triggerAfterHours: 24, escalateToRole: 'Principal' } },
      { stepId: 2, name: 'Principal Final Approval', assigneeRole: 'Principal', actionRequired: 'APPROVE', escalationRule: { triggerAfterHours: 48, escalateToRole: 'Director' } }
    ]
  },
  {
    id: 'TPL-002',
    name: 'Lesson Plan Approval',
    description: 'Weekly review of academic lesson plans.',
    category: 'Academic',
    trigger: WORKFLOW_TRIGGERS.SCHEDULED,
    slaPriority: SLA_PRIORITIES.P2.id,
    steps: [
      { stepId: 1, name: 'Academic Coordinator Review', assigneeRole: 'Academic Coordinator', actionRequired: 'REVIEW', escalationRule: null },
      { stepId: 2, name: 'Principal Acknowledgement', assigneeRole: 'Principal', actionRequired: 'ACKNOWLEDGE', escalationRule: null }
    ]
  },
  {
    id: 'TPL-003',
    name: 'Purchase Request',
    description: 'Procurement requests for department supplies.',
    category: 'Finance',
    trigger: WORKFLOW_TRIGGERS.MANUAL,
    slaPriority: SLA_PRIORITIES.P3.id,
    steps: [
      { stepId: 1, name: 'Department Head', assigneeRole: 'HOD', actionRequired: 'APPROVE', escalationRule: { triggerAfterHours: 48, escalateToRole: 'Principal' } },
      { stepId: 2, name: 'Finance Review', assigneeRole: 'Finance', actionRequired: 'APPROVE', escalationRule: { triggerAfterHours: 72, escalateToRole: 'Director' } }
    ]
  }
];

export const activeWorkflows = [
  {
    id: 'WF-10492',
    templateId: 'TPL-002',
    templateName: 'Lesson Plan Approval',
    requesterId: 'USR-899',
    requesterName: 'Sarah Jenkins',
    department: 'Science',
    status: WORKFLOW_STATUS.PENDING,
    priority: 'High',
    submissionDate: '2023-11-01T08:30:00Z',
    currentStepId: 1,
    currentStepName: 'Academic Coordinator Review',
    slaBreachAt: '2023-11-02T08:30:00Z', // P2 is 1 day
    history: [
      { date: '2023-11-01T08:30:00Z', action: 'Submitted Lesson Plan - Week 4', by: 'Sarah Jenkins', note: 'Please review the practical lab requirements.' }
    ]
  },
  {
    id: 'WF-10493',
    templateId: 'TPL-001',
    templateName: 'Teacher Leave Request',
    requesterId: 'USR-211',
    requesterName: 'Mark Robinson',
    department: 'Mathematics',
    status: WORKFLOW_STATUS.ESCALATED,
    priority: 'Normal',
    submissionDate: '2023-10-28T09:00:00Z',
    currentStepId: 1,
    currentStepName: 'HOD Approval',
    slaBreachAt: '2023-10-31T09:00:00Z', // P3 is 3 days
    history: [
      { date: '2023-10-28T09:00:00Z', action: 'Leave Requested (2 Days)', by: 'Mark Robinson', note: 'Family emergency.' },
      { date: '2023-10-31T09:05:00Z', action: 'ESCALATED to Principal', by: 'System', note: 'SLA breached at HOD level.' }
    ]
  },
  {
    id: 'WF-10494',
    templateId: 'TPL-003',
    templateName: 'Purchase Request',
    requesterId: 'USR-305',
    requesterName: 'Emily Clark',
    department: 'Art',
    status: WORKFLOW_STATUS.IN_PROGRESS,
    priority: 'Normal',
    submissionDate: '2023-10-30T10:15:00Z',
    currentStepId: 2,
    currentStepName: 'Finance Review',
    slaBreachAt: '2023-11-02T10:15:00Z', // P3 is 3 days
    history: [
      { date: '2023-10-30T10:15:00Z', action: 'Purchase Request Submitted ($450)', by: 'Emily Clark', note: 'Art supplies for term project.' },
      { date: '2023-10-31T14:20:00Z', action: 'Approved by HOD', by: 'David Lee', note: 'Approved, within budget.' }
    ]
  },
  {
    id: 'WF-10495',
    templateId: 'TPL-002',
    templateName: 'Lesson Plan Approval',
    requesterId: 'USR-112',
    requesterName: 'Michael Chang',
    department: 'History',
    status: WORKFLOW_STATUS.NEEDS_REVISION,
    priority: 'Normal',
    submissionDate: '2023-11-01T11:00:00Z',
    currentStepId: 1,
    currentStepName: 'Academic Coordinator Review',
    slaBreachAt: '2023-11-02T11:00:00Z',
    history: [
      { date: '2023-11-01T11:00:00Z', action: 'Submitted Lesson Plan - Week 4', by: 'Michael Chang', note: 'Includes field trip details.' },
      { date: '2023-11-01T15:45:00Z', action: 'Requested Revision', by: 'Amanda Smith', note: 'Please attach the permission slip template for the field trip.' }
    ]
  }
];
