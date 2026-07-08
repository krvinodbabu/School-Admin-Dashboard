import PageHeader from '../components/PageHeader.jsx'
import { getTimetable } from '../services/dataService.js'

export default function Timetable() {
  const { schedule, periods } = getTimetable()

  return (
    <div className="page">
      <PageHeader title="Timetable" subtitle="Weekly schedule for Class 10-A" />

      <div className="card">
        <div className="table-wrapper">
          <table className="data-table timetable-table">
            <thead>
              <tr>
                <th>Day</th>
                {periods.map((p) => (
                  <th key={p}>{p}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.id}>
                  <td><strong>{row.day}</strong></td>
                  <td>{row.period1}</td>
                  <td>{row.period2}</td>
                  <td>{row.period3}</td>
                  <td>{row.period4}</td>
                  <td>{row.period5}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
