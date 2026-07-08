/**
 * Utility helpers used across the application.
 */

/** Format a number as Indian Rupee currency */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

/** Format a date string for display */
export function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/** Return CSS class name for fee/status badges */
export function getStatusClass(status) {
  const map = {
    Paid: 'status-paid',
    Pending: 'status-pending',
    Overdue: 'status-overdue',
    Active: 'status-active',
    'On Leave': 'status-leave',
    Upcoming: 'status-pending',
    Completed: 'status-paid',
    Issued: 'status-active',
  }
  return map[status] || 'status-default'
}

/** Truncate text with ellipsis */
export function truncate(text, maxLength = 50) {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}…`
}
