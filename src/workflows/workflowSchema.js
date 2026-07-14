/**
 * Universal Workflow Engine Schema
 * Defines the configuration-driven structure for workflows.
 */

export const WORKFLOW_TRIGGERS = {
  MANUAL: 'MANUAL',
  SYSTEM_EVENT: 'SYSTEM_EVENT',
  SCHEDULED: 'SCHEDULED'
};

export const APPROVAL_LEVELS = {
  L1: 'L1', // Direct Manager/HOD
  L2: 'L2', // Department Head / Coordinator
  L3: 'L3', // Principal / Director
  HR: 'HR',
  FINANCE: 'FINANCE'
};

export const WORKFLOW_STATUS = {
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  NEEDS_REVISION: 'NEEDS_REVISION',
  ESCALATED: 'ESCALATED',
  CANCELLED: 'CANCELLED'
};

export const SLA_PRIORITIES = {
  P1: { id: 'P1', label: 'Critical (4h)', hours: 4, color: 'var(--color-red-text)', bg: 'var(--color-red-bg)' },
  P2: { id: 'P2', label: 'High (1d)', hours: 24, color: 'var(--color-orange-text)', bg: 'var(--color-orange-bg)' },
  P3: { id: 'P3', label: 'Medium (3d)', hours: 72, color: 'var(--color-blue-text)', bg: 'var(--color-blue-bg)' },
  P4: { id: 'P4', label: 'Low (5d)', hours: 120, color: 'var(--color-green-text)', bg: 'var(--color-green-bg)' }
};

// Represents a workflow template (configuration)
export const WorkflowTemplateSchema = {
  id: String,
  name: String,
  description: String,
  category: String, // e.g., 'HR', 'Academic', 'Finance', 'IT'
  trigger: String, // from WORKFLOW_TRIGGERS
  slaPriority: String, // from SLA_PRIORITIES
  steps: [
    {
      stepId: Number,
      name: String,
      assigneeRole: String, // e.g., 'HOD', 'Principal'
      actionRequired: ['APPROVE', 'REVIEW', 'ACKNOWLEDGE'],
      escalationRule: {
        triggerAfterHours: Number,
        escalateToRole: String
      }
    }
  ]
};

// Represents an active/past workflow instance
export const WorkflowInstanceSchema = {
  id: String,
  templateId: String,
  requesterId: String,
  requesterName: String,
  status: String, // from WORKFLOW_STATUS
  priority: String, // e.g., 'High', 'Normal'
  submissionDate: Date,
  currentStepId: Number,
  history: [
    {
      date: Date,
      action: String,
      by: String,
      note: String
    }
  ]
};
