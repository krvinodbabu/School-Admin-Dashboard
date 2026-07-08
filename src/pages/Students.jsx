import { Plus } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import DataTable from '../components/DataTable.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import ActionButtons, { placeholderAction } from '../components/ActionButtons.jsx'
import { getStudents } from '../services/dataService.js'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'rollNumber', label: 'Roll Number' },
  { key: 'class', label: 'Class' },
  { key: 'attendance', label: 'Attendance %' },
  { key: 'feeStatus', label: 'Fee Status' },
  { key: 'actions', label: 'Actions' },
]

export default function Students() {
  const students = getStudents()

  return (
    <div className="page">
      <PageHeader title="Students Management" subtitle={`${students.length} students enrolled`}>
        <button type="button" className="btn btn--primary">
          <Plus size={18} /> Add Student
        </button>
      </PageHeader>

      <div className="card">
        <DataTable
          columns={columns}
          data={students}
          renderRow={(student) => (
            <tr key={student.id}>
              <td><strong>{student.name}</strong></td>
              <td>{student.rollNumber}</td>
              <td>{student.class}</td>
              <td>
                <div className="progress-cell">
                  <div className="progress-bar">
                    <div className="progress-bar__fill" style={{ width: `${student.attendance}%` }} />
                  </div>
                  <span>{student.attendance}%</span>
                </div>
              </td>
              <td><StatusBadge status={student.feeStatus} /></td>
              <td>
                <ActionButtons
                  onView={() => placeholderAction('View', student.name)}
                  onEdit={() => placeholderAction('Edit', student.name)}
                  onDelete={() => placeholderAction('Delete', student.name)}
                />
              </td>
            </tr>
          )}
          renderMobileCard={(student) => (
            <div className="student-mobile-card">
              <div className="student-mobile-card__header">
                <span className="student-mobile-card__name">{student.name}</span>
                <StatusBadge status={student.feeStatus} />
              </div>
              <div className="student-mobile-card__details">
                <div className="student-mobile-card__detail">
                  <span className="student-mobile-card__label">Roll Number:</span>
                  <span className="student-mobile-card__value">{student.rollNumber}</span>
                </div>
                <div className="student-mobile-card__detail">
                  <span className="student-mobile-card__label">Class:</span>
                  <span className="student-mobile-card__value">{student.class}</span>
                </div>
                <div className="student-mobile-card__detail">
                  <span className="student-mobile-card__label">Attendance:</span>
                  <div className="progress-cell">
                    <div className="progress-bar">
                      <div className="progress-bar__fill" style={{ width: `${student.attendance}%` }} />
                    </div>
                    <span>{student.attendance}%</span>
                  </div>
                </div>
              </div>
              <div className="student-mobile-card__actions">
                <ActionButtons
                  onView={() => placeholderAction('View', student.name)}
                  onEdit={() => placeholderAction('Edit', student.name)}
                  onDelete={() => placeholderAction('Delete', student.name)}
                />
              </div>
            </div>
          )}
        />
      </div>
    </div>
  )
}
