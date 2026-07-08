import { useEduOS } from '../core/EduOSContext.jsx'
import { 
  ShieldCheck, 
  Activity, 
  BookOpen, 
  Users, 
  CreditCard, 
  Clock, 
  Bus, 
  FileText, 
  CalendarDays, 
  Trophy, 
  CheckSquare, 
  AlertTriangle, 
  Megaphone, 
  Terminal,
  Heart
} from 'lucide-react'
import Card from '../components/Card.jsx'

export default function RoleDashboardPlaceholders() {
  const { currentRole } = useEduOS()

  // Get data content based on the selected persona
  const getRoleWidgets = () => {
    switch (currentRole) {
      case 'Principal':
        return [
          { title: 'School Health Index', value: '94% (Excellent)', subtitle: 'All domains operational', icon: Heart, color: 'blue' },
          { title: 'Board Exam Projection', value: '98.2% Pass Rate', subtitle: 'Target: 99%', icon: ShieldCheck, color: 'green' },
          { title: 'Decisions Pending', value: '3 Approvals', subtitle: 'Syllabus revision, Lab budget', icon: Clock, color: 'amber' }
        ]
      case 'School Admin':
        return [
          { title: 'System Uptime', value: '99.98% Operational', subtitle: 'All APIs healthy', icon: Activity, color: 'blue' },
          { title: 'Active Logins', value: '1,240 Users Today', subtitle: 'Students & Staff', icon: Users, color: 'green' },
          { title: 'Campus Checklist', value: 'Completed', subtitle: 'Sanitation & security checked', icon: CheckSquare, color: 'indigo' }
        ]
      case 'Teacher':
        return [
          { title: 'Classes Today', value: '2 Lectures', subtitle: '9-A Math (9:30 AM), 10-B Geometry (11:00 AM)', icon: BookOpen, color: 'blue' },
          { title: 'Pending Evaluations', value: '46 Papers', subtitle: 'Algebra Test, English Essays', icon: FileText, color: 'amber' },
          { title: 'Active Lesson Plans', value: 'Week 4 Math', subtitle: 'Substitution Method due today', icon: CheckSquare, color: 'green' }
        ]
      case 'Parent':
        return [
          { title: 'Child Attendance', value: '95.5%', subtitle: 'Present today (Block B)', icon: Activity, color: 'green' },
          { title: 'Pending Homework', value: '2 Assignments', subtitle: 'Math Exercise 4.1, Physics FBD', icon: BookOpen, color: 'amber' },
          { title: 'Next Fee Payment', value: 'Due in 12 Days', subtitle: 'Term 2 tuition & transport fee', icon: CreditCard, color: 'red' }
        ]
      case 'Student':
        return [
          { title: 'Next Lecture', value: 'Chemistry Lab', subtitle: 'Block C - Room 302 @ 10:15 AM', icon: BookOpen, color: 'blue' },
          { title: 'Active Homework', value: '2 Pending', subtitle: 'Physics FBD, Bio ecosystem study', icon: CheckSquare, color: 'amber' },
          { title: 'Extracurriculars', value: 'Sports Meet', subtitle: 'Registration is open till Friday', icon: Trophy, color: 'green' }
        ]
      case 'Finance':
        return [
          { title: 'Total Collections', value: '₹45.8 Lakhs', subtitle: 'AY 2025-26 Term 1', icon: CreditCard, color: 'green' },
          { title: 'Overdue Tuition', value: '34 Students', subtitle: '₹2.10 Lakhs pending', icon: AlertTriangle, color: 'red' },
          { title: 'Reimbursement Claims', value: '8 Pending', subtitle: 'Vouchers under validation', icon: Clock, color: 'amber' }
        ]
      case 'HR':
        return [
          { title: 'Staff Leaves', value: '5 Under Review', subtitle: '3 teachers, 2 support staff', icon: Clock, color: 'amber' },
          { title: 'Open Requisitions', value: '3 Vacancies', subtitle: 'Physics (Interviews today), History', icon: Users, color: 'blue' },
          { title: 'Teacher Attendance', value: '92% Present', subtitle: '6 substitutes assigned', icon: Activity, color: 'green' }
        ]
      case 'Transport':
        return [
          { title: 'Active Buses', value: '12 / 12 Running', subtitle: 'All routes on schedule', icon: Bus, color: 'green' },
          { title: 'GPS Connectivity', value: '100% Signal', subtitle: 'Real-time telemetry streaming', icon: Activity, color: 'blue' },
          { title: 'Vehicle Audit', value: 'Bus #4 Delayed', subtitle: 'Scheduled for fitness test', icon: AlertTriangle, color: 'amber' }
        ]
      case 'Admissions':
        return [
          { title: 'Applications Received', value: '142 Files', subtitle: 'AY 2026-27 intake pipeline', icon: FileText, color: 'blue' },
          { title: 'Screening Stage', value: '48 Pending', subtitle: 'Documents verification & interviews', icon: Clock, color: 'amber' },
          { title: 'Target Achieved', value: '32%', subtitle: 'Ahead of last year\'s schedule', icon: ShieldCheck, color: 'green' }
        ]
      case 'Event Management':
        return [
          { title: 'Next Major Event', value: 'Annual Sports Meet', subtitle: 'Scheduled: July 12', icon: CalendarDays, color: 'blue' },
          { title: 'Facility Bookings', value: '2 Reserved', subtitle: 'Auditorium (Drama), Ground A', icon: CheckSquare, color: 'green' },
          { title: 'Vendor Confirmations', value: '4 Pending', subtitle: 'Catering, sounds & light decoration', icon: Clock, color: 'amber' }
        ]
      case 'Sports Department':
        return [
          { title: 'Ground A Booking', value: 'U-15 Football Practice', subtitle: '3:00 PM - 5:00 PM', icon: Trophy, color: 'green' },
          { title: 'Sports Inventory', value: 'Stock Completed', subtitle: '10 basketballs requested', icon: CheckSquare, color: 'blue' },
          { title: 'Inter-School Meet', value: 'July 18', subtitle: '18 students registered', icon: CalendarDays, color: 'indigo' }
        ]
      case 'Housekeeping':
        return [
          { title: 'Blocks Sanitised', value: 'Blocks A - D', subtitle: 'Routine sanitisation checked', icon: CheckSquare, color: 'green' },
          { title: 'Inventory Alert', value: 'Disinfectants low', subtitle: 'Order status: In Transit', icon: AlertTriangle, color: 'amber' },
          { title: 'Maintenance Tickets', value: '2 Reported', subtitle: 'Water cooler leak in Block B', icon: Clock, color: 'red' }
        ]
      case 'Escalation Team':
        return [
          { title: 'Emergency Alerts', value: '0 Critical', subtitle: 'All systems safe', icon: ShieldCheck, color: 'green' },
          { title: 'Open Grievances', value: '2 Parent Issues', subtitle: 'Priority: Normal', icon: AlertTriangle, color: 'amber' },
          { title: 'System Flags', value: '7-B Attendance Drop', subtitle: 'Currently under 80%', icon: Activity, color: 'red' }
        ]
      case 'Marketing':
        return [
          { title: 'Active Campaigns', value: 'Enrollment Drive 2026', subtitle: 'Live on Meta & Search', icon: Megaphone, color: 'blue' },
          { title: 'Open House RSVPs', value: '120 Registrations', subtitle: 'Next event: Saturday', icon: Users, color: 'green' },
          { title: 'Press Mentions', value: 'Award feature', subtitle: 'Published in City Herald', icon: FileText, color: 'indigo' }
        ]
      case 'Software Support':
        return [
          { title: 'API Integrations', value: 'All Active', subtitle: 'Payment Gateway & SMS normal', icon: Activity, color: 'green' },
          { title: 'Pending Tickets', value: '4 Password-Resets', subtitle: 'SLA target: 15 minutes', icon: Terminal, color: 'blue' },
          { title: 'EduOS Version', value: 'v2.4.1 Stable', subtitle: 'Next patch: Sat 11:59 PM', icon: ShieldCheck, color: 'indigo' }
        ]
      default:
        return []
    }
  }

  const widgets = getRoleWidgets()

  if (widgets.length === 0) return null

  return (
    <div className="role-placeholders">
      <div className="role-placeholders__header">
        <h3 className="role-placeholders__title">
          Persona Dashboard View: <span className="role-placeholders__role-badge">{currentRole}</span>
        </h3>
        <p className="role-placeholders__subtitle">
          Displaying role-specific metric indicators and contextual workflows for prototype validation.
        </p>
      </div>

      <div className="role-placeholders__grid">
        {widgets.map((w, i) => {
          const Icon = w.icon
          return (
            <div key={i} className={`role-placeholder-card role-placeholder-card--${w.color}`}>
              <div className="role-placeholder-card__row">
                <div className="role-placeholder-card__text-group">
                  <span className="role-placeholder-card__label">{w.title}</span>
                  <h4 className="role-placeholder-card__value">{w.value}</h4>
                  <span className="role-placeholder-card__sub">{w.subtitle}</span>
                </div>
                <div className="role-placeholder-card__icon-wrapper">
                  <Icon size={20} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
