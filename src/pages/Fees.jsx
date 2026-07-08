import PageHeader from '../components/PageHeader.jsx'
import StatCard from '../components/StatCard.jsx'
import DataTable from '../components/DataTable.jsx'
import StatusBadge from '../components/StatusBadge.jsx'
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react'
import { getFeesData } from '../services/dataService.js'
import { formatCurrency, formatDate } from '../utils/helpers.js'

const columns = [
  { key: 'student', label: 'Student' },
  { key: 'class', label: 'Class' },
  { key: 'amount', label: 'Amount' },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'status', label: 'Status' },
  { key: 'paidDate', label: 'Paid Date' },
]

export default function Fees() {
  const { summary, records } = getFeesData()

  return (
    <div className="page">
      <PageHeader title="Fees Management" subtitle="Track fee collection and pending payments" />

      <div className="stats-grid stats-grid--3">
        <StatCard title="Paid Fees" value={formatCurrency(summary.paid)} icon={CheckCircle} color="green" />
        <StatCard title="Pending Fees" value={formatCurrency(summary.pending)} icon={Clock} color="amber" />
        <StatCard title="Overdue Fees" value={formatCurrency(summary.overdue)} icon={AlertTriangle} color="red" />
      </div>

      <div className="card">
        <h3 className="card__title">Fee Records</h3>
        <DataTable
          columns={columns}
          data={records}
          renderRow={(record) => (
            <tr key={record.id}>
              <td><strong>{record.student}</strong></td>
              <td>{record.class}</td>
              <td>{formatCurrency(record.amount)}</td>
              <td>{formatDate(record.dueDate)}</td>
              <td><StatusBadge status={record.status} /></td>
              <td>{formatDate(record.paidDate)}</td>
            </tr>
          )}
          renderMobileCard={(record) => (
            <div className="fee-mobile-card">
              <div className="fee-mobile-card__header">
                <span className="fee-mobile-card__student">{record.student}</span>
                <StatusBadge status={record.status} />
              </div>
              <div className="fee-mobile-card__details">
                <div className="fee-mobile-card__detail">
                  <span className="fee-mobile-card__label">Class:</span>
                  <span className="fee-mobile-card__value">{record.class}</span>
                </div>
                <div className="fee-mobile-card__detail">
                  <span className="fee-mobile-card__label">Amount:</span>
                  <span className="fee-mobile-card__value">{formatCurrency(record.amount)}</span>
                </div>
                <div className="fee-mobile-card__detail">
                  <span className="fee-mobile-card__label">Due Date:</span>
                  <span className="fee-mobile-card__value">{formatDate(record.dueDate)}</span>
                </div>
                {record.paidDate && (
                  <div className="fee-mobile-card__detail">
                    <span className="fee-mobile-card__label">Paid Date:</span>
                    <span className="fee-mobile-card__value">{formatDate(record.paidDate)}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        />
      </div>
    </div>
  )
}
