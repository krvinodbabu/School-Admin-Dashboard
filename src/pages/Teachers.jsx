import { Plus } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import DataTable from '../components/DataTable.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { getTeachers } from '../services/dataService.js'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'subject', label: 'Subject' },
  { key: 'experience', label: 'Experience' },
  { key: 'contact', label: 'Contact Number' },
  { key: 'status', label: 'Status' },
]

export default function Teachers() {
  const teachers = getTeachers()

  return (
    <div className="page">
      <PageHeader title="Teachers Management" subtitle={`${teachers.length} teaching staff members`}>
        <button type="button" className="btn btn--primary">
          <Plus size={18} /> Add Teacher
        </button>
      </PageHeader>

      <div className="card">
        <DataTable
          columns={columns}
          data={teachers}
          renderRow={(teacher) => (
            <tr key={teacher.id}>
              <td><strong>{teacher.name}</strong></td>
              <td>{teacher.subject}</td>
              <td>{teacher.experience}</td>
              <td>{teacher.contact}</td>
              <td><StatusBadge status={teacher.status} /></td>
            </tr>
          )}
          renderMobileCard={(teacher) => (
            <div className="teacher-mobile-card">
              <div className="teacher-mobile-card__header">
                <span className="teacher-mobile-card__name">{teacher.name}</span>
                <StatusBadge status={teacher.status} />
              </div>
              <div className="teacher-mobile-card__details">
                <div className="teacher-mobile-card__detail">
                  <span className="teacher-mobile-card__label">Subject:</span>
                  <span className="teacher-mobile-card__value">{teacher.subject}</span>
                </div>
                <div className="teacher-mobile-card__detail">
                  <span className="teacher-mobile-card__label">Experience:</span>
                  <span className="teacher-mobile-card__value">{teacher.experience}</span>
                </div>
                <div className="teacher-mobile-card__detail">
                  <span className="teacher-mobile-card__label">Contact:</span>
                  <span className="teacher-mobile-card__value">{teacher.contact}</span>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  )
}
