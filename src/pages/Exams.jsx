import PageHeader from '../components/PageHeader.jsx'
import DataTable from '../components/DataTable.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { getExamsData } from '../services/dataService.js'
import { formatDate } from '../utils/helpers.js'

const examColumns = [
  { key: 'name', label: 'Exam Name' },
  { key: 'class', label: 'Class' },
  { key: 'subject', label: 'Subject' },
  { key: 'date', label: 'Date' },
  { key: 'maxMarks', label: 'Max Marks' },
  { key: 'status', label: 'Status' },
]

const resultColumns = [
  { key: 'student', label: 'Student' },
  { key: 'exam', label: 'Exam' },
  { key: 'marks', label: 'Marks' },
  { key: 'maxMarks', label: 'Max Marks' },
  { key: 'grade', label: 'Grade' },
]

export default function Exams() {
  const { exams, results } = getExamsData()

  return (
    <div className="page">
      <PageHeader title="Exams & Results" subtitle="Manage examinations and view student results" />

      <div className="card">
        <h3 className="card__title">Upcoming & Recent Exams</h3>
        <DataTable
          columns={examColumns}
          data={exams}
          renderRow={(exam) => (
            <tr key={exam.id}>
              <td><strong>{exam.name}</strong></td>
              <td>{exam.class}</td>
              <td>{exam.subject}</td>
              <td>{formatDate(exam.date)}</td>
              <td>{exam.maxMarks}</td>
              <td><StatusBadge status={exam.status} /></td>
            </tr>
          )}
          renderMobileCard={(exam) => (
            <div className="exam-mobile-card">
              <div className="exam-mobile-card__header">
                <span className="exam-mobile-card__name">{exam.name}</span>
                <StatusBadge status={exam.status} />
              </div>
              <div className="exam-mobile-card__details">
                <div className="exam-mobile-card__detail">
                  <span className="exam-mobile-card__label">Class:</span>
                  <span className="exam-mobile-card__value">{exam.class}</span>
                </div>
                <div className="exam-mobile-card__detail">
                  <span className="exam-mobile-card__label">Subject:</span>
                  <span className="exam-mobile-card__value">{exam.subject}</span>
                </div>
                <div className="exam-mobile-card__detail">
                  <span className="exam-mobile-card__label">Date:</span>
                  <span className="exam-mobile-card__value">{formatDate(exam.date)}</span>
                </div>
                <div className="exam-mobile-card__detail">
                  <span className="exam-mobile-card__label">Max Marks:</span>
                  <span className="exam-mobile-card__value">{exam.maxMarks}</span>
                </div>
              </div>
            </div>
          )}
        />
      </div>

      <div className="card">
        <h3 className="card__title">Recent Results</h3>
        <DataTable
          columns={resultColumns}
          data={results}
          renderRow={(result) => (
            <tr key={result.id}>
              <td><strong>{result.student}</strong></td>
              <td>{result.exam}</td>
              <td>{result.marks}</td>
              <td>{result.maxMarks}</td>
              <td><span className="badge badge--grade">{result.grade}</span></td>
            </tr>
          )}
          renderMobileCard={(result) => (
            <div className="result-mobile-card">
              <div className="result-mobile-card__header">
                <span className="result-mobile-card__student">{result.student}</span>
                <span className="badge badge--grade">{result.grade}</span>
              </div>
              <div className="result-mobile-card__details">
                <div className="result-mobile-card__detail">
                  <span className="result-mobile-card__label">Exam:</span>
                  <span className="result-mobile-card__value">{result.exam}</span>
                </div>
                <div className="result-mobile-card__detail">
                  <span className="result-mobile-card__label">Marks:</span>
                  <span className="result-mobile-card__value">{result.marks} / {result.maxMarks}</span>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  )
}
