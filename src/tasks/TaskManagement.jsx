import { useState } from 'react';
import { Plus, GripVertical, Calendar, CheckSquare, List, Columns } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';

export default function TaskManagement() {
  const [view, setView] = useState('kanban');

  const tasks = [
    { id: 1, title: 'Review Q3 Budget', assignee: 'Jane Doe', status: 'To Do', dueDate: '2023-11-15' },
    { id: 2, title: 'Setup New Campus IT', assignee: 'IT Dept', status: 'In Progress', dueDate: '2023-11-10' },
    { id: 3, title: 'Teacher Orientation', assignee: 'HR Dept', status: 'Done', dueDate: '2023-11-01' }
  ];

  return (
    <div className="page">
      <PageHeader
        title="Task Management"
        subtitle="Organization-wide operational task tracker."
        eyebrow="Workflow Engine"
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div className="tabs">
          <button className={`tab ${view === 'kanban' ? 'active' : ''}`} onClick={() => setView('kanban')}>
            <Columns size={16} style={{ marginRight: '0.5rem' }} /> Kanban
          </button>
          <button className={`tab ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>
            <List size={16} style={{ marginRight: '0.5rem' }} /> List View
          </button>
        </div>
        <button className="btn btn--primary">
          <Plus size={16} /> New Task
        </button>
      </div>

      {view === 'kanban' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {['To Do', 'In Progress', 'Done'].map(column => (
            <div key={column} className="card" style={{ padding: '1rem', background: 'var(--color-bg-secondary)' }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: 'var(--color-text-muted)' }}>{column}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tasks.filter(t => t.status === column).map(task => (
                  <div key={task.id} style={{ background: 'var(--color-bg-primary)', padding: '1rem', borderRadius: '8px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h4 style={{ margin: 0, fontSize: '0.9rem' }}>{task.title}</h4>
                      <GripVertical size={14} style={{ color: 'var(--color-text-muted)', cursor: 'grab' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>
                      <div className="badge" style={{ background: 'var(--color-indigo-bg)', color: 'var(--color-indigo-text)' }}>
                        {task.assignee}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={12} /> {task.dueDate}
                      </div>
                    </div>
                  </div>
                ))}
                <button className="btn btn--secondary" style={{ width: '100%', borderStyle: 'dashed' }}>
                  <Plus size={14} /> Add Task
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="table-responsive">
            <table className="ap-table">
              <thead>
                <tr>
                  <th><CheckSquare size={16} /></th>
                  <th>Task Title</th>
                  <th>Assignee</th>
                  <th>Status</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id}>
                    <td><input type="checkbox" checked={task.status === 'Done'} readOnly /></td>
                    <td style={{ fontWeight: 500 }}>{task.title}</td>
                    <td>{task.assignee}</td>
                    <td><span className="badge" style={{ background: 'var(--color-bg-secondary)' }}>{task.status}</span></td>
                    <td>{task.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
