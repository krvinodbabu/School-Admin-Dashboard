import { useState } from 'react';
import { Bell, Mail, Smartphone, MessageSquare, Settings } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';

export default function NotificationCenter() {
  const [activeTab, setActiveTab] = useState('templates'); // templates, preferences, logs

  const templates = [
    { id: 1, name: 'Workflow Approved', channels: ['In-App', 'Email'] },
    { id: 2, name: 'SLA Breached Alert', channels: ['In-App', 'Email', 'SMS'] },
    { id: 3, name: 'New Task Assigned', channels: ['In-App'] }
  ];

  return (
    <div className="page">
      <PageHeader
        title="Notification Center"
        subtitle="Manage communication templates and delivery channels."
        eyebrow="Workflow Engine"
      />

      <div className="tabs" style={{ marginBottom: '1.5rem' }}>
        <button className={`tab ${activeTab === 'templates' ? 'active' : ''}`} onClick={() => setActiveTab('templates')}>
          Templates & Channels
        </button>
        <button className={`tab ${activeTab === 'preferences' ? 'active' : ''}`} onClick={() => setActiveTab('preferences')}>
          System Preferences
        </button>
      </div>

      {activeTab === 'templates' && (
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="table-responsive">
            <table className="ap-table">
              <thead>
                <tr>
                  <th>Template Name</th>
                  <th>Channels Enabled</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {templates.map(tpl => (
                  <tr key={tpl.id}>
                    <td style={{ fontWeight: 500 }}>{tpl.name}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {tpl.channels.includes('In-App') && <span className="badge" style={{ background: 'var(--color-bg-secondary)' }}><Bell size={12} style={{ marginRight: '4px' }}/> In-App</span>}
                        {tpl.channels.includes('Email') && <span className="badge" style={{ background: 'var(--color-indigo-bg)', color: 'var(--color-indigo-text)' }}><Mail size={12} style={{ marginRight: '4px' }}/> Email</span>}
                        {tpl.channels.includes('SMS') && <span className="badge" style={{ background: 'var(--color-green-bg)', color: 'var(--color-green-text)' }}><Smartphone size={12} style={{ marginRight: '4px' }}/> SMS</span>}
                        {tpl.channels.includes('WhatsApp') && <span className="badge" style={{ background: 'var(--color-green-bg)', color: 'var(--color-green-text)' }}><MessageSquare size={12} style={{ marginRight: '4px' }}/> WhatsApp</span>}
                      </div>
                    </td>
                    <td>
                      <button className="btn-icon"><Settings size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'preferences' && (
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ margin: '0 0 1.5rem 0' }}>Global Delivery Settings</h3>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" defaultChecked /> Enable Email Delivery
            </label>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: '1.5rem', marginTop: '0.25rem' }}>Allow the system to send emails via SMTP.</p>
          </div>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" defaultChecked /> Enable SMS/WhatsApp Delivery
            </label>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: '1.5rem', marginTop: '0.25rem' }}>Requires active Twilio/Meta integration.</p>
          </div>
        </div>
      )}
    </div>
  );
}
