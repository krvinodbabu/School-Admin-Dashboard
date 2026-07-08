import { Plus } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import DataTable from '../components/DataTable.jsx'
import { getClasses } from '../services/dataService.js'

const columns = [
  { key: 'className', label: 'Class' },
  { key: 'section', label: 'Section' },
  { key: 'students', label: 'Students' },
  { key: 'classTeacher', label: 'Class Teacher' },
  { key: 'room', label: 'Room No.' },
]

export default function Classes() {
  const classes = getClasses()

  return (
    <div className="page">
      <PageHeader title="Classes & Sections" subtitle={`${classes.length} active class sections`}>
        <button type="button" className="btn btn--primary">
          <Plus size={18} /> Add Class
        </button>
      </PageHeader>

      <div className="card">
        <DataTable
          columns={columns}
          data={classes}
          renderRow={(cls) => (
            <tr key={cls.id}>
              <td><strong>{cls.className}</strong></td>
              <td><span className="badge badge--section">{cls.section}</span></td>
              <td>{cls.students}</td>
              <td>{cls.classTeacher}</td>
              <td>{cls.room}</td>
            </tr>
          )}
          renderMobileCard={(cls) => (
            <div className="class-mobile-card">
              <div className="class-mobile-card__header">
                <span className="class-mobile-card__name">{cls.className}</span>
                <span className="badge badge--section">Section {cls.section}</span>
              </div>
              <div className="class-mobile-card__details">
                <div className="class-mobile-card__detail">
                  <span className="class-mobile-card__label">Teacher:</span>
                  <span className="class-mobile-card__value">{cls.classTeacher}</span>
                </div>
                <div className="class-mobile-card__detail">
                  <span className="class-mobile-card__label">Students:</span>
                  <span className="class-mobile-card__value">{cls.students}</span>
                </div>
                <div className="class-mobile-card__detail">
                  <span className="class-mobile-card__label">Room:</span>
                  <span className="class-mobile-card__value">{cls.room}</span>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  )
}
