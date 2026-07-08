import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import DataTable from '../components/DataTable.jsx'
import BarChart from '../components/BarChart.jsx'
import { getAttendanceData } from '../services/dataService.js'
import { formatDate } from '../utils/helpers.js'

const columns = [
  { key: 'date', label: 'Date' },
  { key: 'class', label: 'Class' },
  { key: 'present', label: 'Present' },
  { key: 'absent', label: 'Absent' },
  { key: 'percentage', label: 'Attendance %' },
]

export default function Attendance() {
  const { records, weekly } = getAttendanceData()

  return (
    <div className="page">
      <PageHeader title="Attendance" subtitle="Daily and weekly attendance overview" />

      <div className="dashboard-grid dashboard-grid--2">
        <Card title="This Week's Attendance">
          <BarChart data={weekly} valueKey="percentage" labelKey="day" />
        </Card>

        <Card title="Quick Stats">
          <div className="quick-stats">
            <div className="quick-stat">
              <span className="quick-stat__value">92.4%</span>
              <span className="quick-stat__label">Overall Average</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat__value">1,152</span>
              <span className="quick-stat__label">Present Today</span>
            </div>
            <div className="quick-stat">
              <span className="quick-stat__value">96</span>
              <span className="quick-stat__label">Absent Today</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="card">
        <h3 className="card__title">Recent Attendance Records</h3>
        <DataTable
          columns={columns}
          data={records}
          renderRow={(record) => (
            <tr key={record.id}>
              <td>{formatDate(record.date)}</td>
              <td><strong>{record.class}</strong></td>
              <td className="text-green">{record.present}</td>
              <td className="text-red">{record.absent}</td>
              <td>
                <div className="progress-cell">
                  <div className="progress-bar">
                    <div className="progress-bar__fill" style={{ width: `${record.percentage}%` }} />
                  </div>
                  <span>{record.percentage}%</span>
                </div>
              </td>
            </tr>
          )}
          renderMobileCard={(record) => (
            <div className="attendance-mobile-card">
              <div className="attendance-mobile-card__header">
                <span className="attendance-mobile-card__date">{formatDate(record.date)}</span>
                <span className="badge badge--section">{record.class}</span>
              </div>
              <div className="attendance-mobile-card__details">
                <div className="attendance-mobile-card__detail">
                  <span className="attendance-mobile-card__label">Present:</span>
                  <span className="attendance-mobile-card__value text-green">{record.present}</span>
                </div>
                <div className="attendance-mobile-card__detail">
                  <span className="attendance-mobile-card__label">Absent:</span>
                  <span className="attendance-mobile-card__value text-red">{record.absent}</span>
                </div>
                <div className="attendance-mobile-card__detail">
                  <span className="attendance-mobile-card__label">Attendance:</span>
                  <div className="progress-cell">
                    <div className="progress-bar">
                      <div className="progress-bar__fill" style={{ width: `${record.percentage}%` }} />
                    </div>
                    <span>{record.percentage}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  )
}
