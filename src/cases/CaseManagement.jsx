import { useState } from 'react';
import { Briefcase, FileText, AlertCircle, Eye, Search, Plus } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';

export default function CaseManagement() {
  const [activeTab, setActiveTab] = useState('active'); // active, closed

  const cases = [
    { id: 'CASE-101', title: 'Student Disciplinary - Class 10A', category: 'Disciplinary', status: 'Under Investigation', assignedTo: 'Principal', date: '2023-10-25' },
    { id: 'CASE-102', title: 'Teacher HR Dispute', category: 'HR', status: 'Pending Review', assignedTo: 'HR Head', date: '2023-11-01' }
  ];

  return (
    <div className="page">
      <PageHeader
        title="Case Management"
        subtitle="Track complex, longitudinal cases (Disciplinary, HR, Academic)."
        eyebrow="Workflow Engine"
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div className="tabs">
          <button className={`tab ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}>Active Cases</button>
          <button className={`tab ${activeTab === 'closed' ? 'active' : ''}`} onClick={() => setActiveTab('closed')}>Closed Cases</button>
        </div>
        <button className="btn btn--primary">
          <Plus size={16} /> Open New Case
        </button>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table className="ap-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Opened Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cases.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600, color: 'var(--color-indigo-text)' }}>{c.id}</td>
                  <td>{c.title}</td>
                  <td><span className="badge" style={{ background: 'var(--color-bg-secondary)' }}>{c.category}</span></td>
                  <td><span className="badge" style={{ background: 'var(--color-amber-bg)', color: 'var(--color-amber-text)' }}>{c.status}</span></td>
                  <td>{c.assignedTo}</td>
                  <td>{c.date}</td>
                  <td>
                    <button className="btn-icon"><Eye size={16} /></button>
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
