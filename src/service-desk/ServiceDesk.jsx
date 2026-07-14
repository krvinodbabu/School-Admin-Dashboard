import { useState } from 'react';
import { LifeBuoy, Tag, MessageSquare, Clock, Filter, Plus } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';

export default function ServiceDesk() {
  const [activeTab, setActiveTab] = useState('open'); // open, resolved

  const tickets = [
    { id: 'TKT-2001', subject: 'Smartboard not working in Lab 2', type: 'IT Support', priority: 'High', status: 'Open', requester: 'John Doe', time: '2 hours ago' },
    { id: 'TKT-2002', subject: 'Air conditioning issue in Library', type: 'Maintenance', priority: 'Medium', status: 'In Progress', requester: 'Jane Smith', time: '1 day ago' },
    { id: 'TKT-2003', subject: 'Need access to Financial Reports', type: 'Access Request', priority: 'Low', status: 'Open', requester: 'Emily Clark', time: '3 hours ago' }
  ];

  return (
    <div className="page">
      <PageHeader
        title="Service Desk"
        subtitle="IT & Operational ticketing system with SLA tracking."
        eyebrow="Workflow Engine"
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div className="tabs">
          <button className={`tab ${activeTab === 'open' ? 'active' : ''}`} onClick={() => setActiveTab('open')}>Open Tickets</button>
          <button className={`tab ${activeTab === 'resolved' ? 'active' : ''}`} onClick={() => setActiveTab('resolved')}>Resolved</button>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn--secondary"><Filter size={16} /> Filter</button>
          <button className="btn btn--primary"><Plus size={16} /> New Ticket</button>
        </div>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="ap-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Subject</th>
                <th>Type</th>
                <th>Priority</th>
                <th>Requester</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(t => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 600, color: 'var(--color-blue-text)' }}>{t.id}</td>
                  <td style={{ fontWeight: 500 }}>{t.subject}</td>
                  <td>{t.type}</td>
                  <td>
                    <span className="badge" style={{ 
                      background: t.priority === 'High' ? 'var(--color-red-bg)' : 
                                  t.priority === 'Medium' ? 'var(--color-amber-bg)' : 'var(--color-green-bg)',
                      color: t.priority === 'High' ? 'var(--color-red-text)' : 
                             t.priority === 'Medium' ? 'var(--color-amber-text)' : 'var(--color-green-text)'
                    }}>
                      {t.priority}
                    </span>
                  </td>
                  <td>{t.requester}</td>
                  <td><span className="badge" style={{ background: 'var(--color-bg-secondary)' }}>{t.status}</span></td>
                  <td style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} /> {t.time}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
