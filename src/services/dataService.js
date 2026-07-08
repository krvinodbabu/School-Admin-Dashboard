/**
 * Service layer for accessing dummy data.
 * In a real app, these functions would call APIs.
 * For now, they simply re-export local data modules.
 */
import * as data from '../data/index.js'

export function getDashboardData() {
  return {
    stats: data.dashboardStats,
    attendanceTrend: data.attendanceTrend,
    feeDistribution: data.feeDistribution,
    upcomingExams: data.upcomingExamsList,
    recentNotifications: data.recentNotificationsList,
  }
}

export function getStudents() {
  return data.students
}

export function getTeachers() {
  return data.teachers
}

export function getFeesData() {
  return {
    summary: data.feeSummary,
    records: data.feeRecords,
  }
}

export function getClasses() {
  return data.classes
}

export function getAttendanceData() {
  return {
    records: data.attendanceRecords,
    weekly: data.weeklyAttendance,
  }
}

export function getExamsData() {
  return {
    exams: data.exams,
    results: data.results,
  }
}

export function getTimetable() {
  return {
    schedule: data.timetable,
    periods: data.periods,
  }
}

export function getLibraryData() {
  return {
    books: data.libraryBooks,
    borrowed: data.borrowedBooks,
  }
}

export function getNotifications() {
  return data.notifications
}

export function getSportsData() {
  return {
    summary: data.sportsSummary,
    indoorSports: data.indoorSports,
    outdoorSports: data.outdoorSports,
    classRankings: data.classRankings,
    sportWiseRanks: data.sportWiseRanks,
  }
}
