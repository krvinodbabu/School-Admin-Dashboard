/**
 * PROJECT STRUCTURE OVERVIEW
 * ==========================
 *
 * src/
 *   main.jsx          — App entry point; mounts React with BrowserRouter
 *   App.jsx           — Route definitions for all pages
 *   index.css         — Global styles and design tokens
 *
 *   layouts/
 *     MainLayout.jsx  — Shell with Sidebar + TopNav + page content (Outlet)
 *
 *   pages/
 *     Dashboard.jsx   — Overview widgets and charts
 *     Students.jsx    — Student table with actions
 *     Teachers.jsx    — Teacher table
 *     Fees.jsx        — Fee summary cards and records
 *     Classes.jsx     — Class/section listing
 *     Attendance.jsx  — Attendance charts and records
 *     Exams.jsx       — Exams and results tables
 *     Timetable.jsx   — Weekly timetable grid
 *     Library.jsx     — Book catalog and borrowed books
 *     Sports.jsx      — Indoor/outdoor sports with class-wise ranks
 *     Notifications.jsx — Notification cards
 *     Settings.jsx    — School profile and preferences forms
 *
 *   components/
 *     Sidebar.jsx     — Left navigation menu
 *     TopNav.jsx      — Top bar with search and profile
 *     StatCard.jsx    — Dashboard metric card
 *     DataTable.jsx   — Reusable table wrapper
 *     StatusBadge.jsx — Colored status pill
 *     ActionButtons.jsx — View/Edit/Delete placeholders
 *     BarChart.jsx    — CSS bar chart
 *     DonutChart.jsx  — CSS donut chart
 *     Card.jsx        — Content card wrapper
 *     PageHeader.jsx  — Page title and actions bar
 *
 *   data/
 *     *Data.js        — Dummy data arrays/objects (edit these to change content)
 *     index.js         — Re-exports all data modules
 *
 *   services/
 *     dataService.js  — Data access layer (swap with API calls later)
 *
 *   utils/
 *     helpers.js      — Formatting and utility functions
 *
 *   assets/
 *     (static images, icons, etc.)
 */

export {}
