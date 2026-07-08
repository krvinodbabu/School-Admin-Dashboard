/**
 * Dashboard summary statistics and chart placeholder data.
 * Edit these values to change the dashboard widgets.
 */
export const dashboardStats = {
  totalStudents: 1248,
  totalTeachers: 86,
  pendingFees: 342500,
  attendancePercentage: 92.4,
  upcomingExams: 5,
  recentNotifications: 12,
}

export const attendanceTrend = [
  { month: 'Jan', percentage: 88 },
  { month: 'Feb', percentage: 90 },
  { month: 'Mar', percentage: 91 },
  { month: 'Apr', percentage: 89 },
  { month: 'May', percentage: 93 },
  { month: 'Jun', percentage: 92 },
]

export const feeDistribution = [
  { label: 'Paid', value: 68, color: '#22c55e' },
  { label: 'Pending', value: 22, color: '#f59e0b' },
  { label: 'Overdue', value: 10, color: '#ef4444' },
]

export const upcomingExamsList = [
  { id: 1, name: 'Mid-Term Mathematics', date: '2026-07-15', classes: '9-A, 9-B' },
  { id: 2, name: 'Science Practical', date: '2026-07-18', classes: '10-A' },
  { id: 3, name: 'English Literature', date: '2026-07-22', classes: '8-A, 8-B, 8-C' },
  { id: 4, name: 'Hindi Grammar', date: '2026-07-25', classes: '7-A' },
  { id: 5, name: 'Social Studies', date: '2026-07-28', classes: '6-B' },
]

export const recentNotificationsList = [
  { id: 1, title: 'Parent-Teacher Meeting', message: 'Scheduled for July 12, 2026 at 10:00 AM', time: '2 hours ago' },
  { id: 2, title: 'Fee Reminder', message: 'Quarterly fees due by July 20, 2026', time: '5 hours ago' },
  { id: 3, title: 'Sports Day', message: 'Annual sports day on August 5, 2026', time: '1 day ago' },
  { id: 4, title: 'Library Notice', message: 'New books added to the library catalog', time: '2 days ago' },
]
