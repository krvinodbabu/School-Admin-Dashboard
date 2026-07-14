/**
 * Future Campus Integrations — Integration readiness dashboard for
 * smart classroom, biometric, IoT, AR/VR, and digital twin technologies.
 */
import { useState } from 'react';
import { Wifi, Fingerprint, Scan, Radio, Monitor, Glasses, Box, Cpu, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';

const INTEGRATIONS = [
  { id: 1, name: 'Smart Classroom Devices', icon: Monitor, description: 'Interactive displays, digital whiteboards, and connected projectors for immersive learning.', status: 'ready', readiness: 90, features: ['Screen sharing', 'Interactive quizzes', 'Real-time annotations', 'Recording'], category: 'Classroom' },
  { id: 2, name: 'Biometric Attendance', icon: Fingerprint, description: 'Fingerprint-based attendance marking for students and staff.', status: 'ready', readiness: 85, features: ['Fingerprint scan', 'Auto-sync with LMS', 'Fraud prevention', 'Bulk processing'], category: 'Security' },
  { id: 3, name: 'Face Recognition', icon: Scan, description: 'AI-powered facial recognition for contactless attendance and campus security.', status: 'pilot', readiness: 60, features: ['Contactless check-in', 'Visitor management', 'Security alerts', 'Mask detection'], category: 'Security' },
  { id: 4, name: 'RFID Systems', icon: Radio, description: 'RFID-enabled ID cards for access control, library, and transport tracking.', status: 'ready', readiness: 95, features: ['Campus access', 'Library checkout', 'Bus tracking', 'Cafeteria payments'], category: 'Infrastructure' },
  { id: 5, name: 'IoT Sensors', icon: Wifi, description: 'Environmental monitoring for classrooms — temperature, humidity, air quality, and occupancy.', status: 'planned', readiness: 35, features: ['Temperature monitoring', 'Air quality index', 'Occupancy counting', 'Energy optimization'], category: 'Infrastructure' },
  { id: 6, name: 'Smart Boards', icon: Monitor, description: 'Next-generation interactive boards with AI-powered content suggestions and gesture control.', status: 'pilot', readiness: 70, features: ['Touch interaction', 'AI content suggestions', 'Gesture recognition', 'Cloud save'], category: 'Classroom' },
  { id: 7, name: 'AR/VR Learning Labs', icon: Glasses, description: 'Augmented and Virtual Reality labs for immersive science, history, and geography education.', status: 'planned', readiness: 25, features: ['Virtual field trips', '3D anatomy models', 'Historical recreations', 'Physics simulations'], category: 'Innovation' },
  { id: 8, name: 'Digital Twins', icon: Box, description: 'Real-time digital replicas of campus facilities for simulation, planning, and maintenance.', status: 'concept', readiness: 10, features: ['Campus visualization', 'Maintenance prediction', 'Space planning', 'Emergency simulation'], category: 'Innovation' },
];

const STATUS_CONFIG = {
  ready: { label: 'Production Ready', color: 'var(--color-green-text)', bg: 'var(--color-green-bg)', icon: CheckCircle },
  pilot: { label: 'Pilot Phase', color: 'var(--color-blue-text)', bg: 'var(--color-blue-bg)', icon: Clock },
  planned: { label: 'Planned', color: 'var(--color-amber-text)', bg: 'var(--color-amber-bg)', icon: Clock },
  concept: { label: 'Concept Stage', color: 'var(--color-text-muted)', bg: 'var(--color-surface-3)', icon: AlertCircle },
};

export default function FutureCampus() {
  const [filterStatus, setFilterStatus] = useState('');

  const filtered = INTEGRATIONS.filter(i => !filterStatus || i.status === filterStatus);
  const readyCount = INTEGRATIONS.filter(i => i.status === 'ready').length;
  const overallReadiness = Math.round(INTEGRATIONS.reduce((a, i) => a + i.readiness, 0) / INTEGRATIONS.length);

  return (
    <div className="page">
      <PageHeader
        title="Future Campus Integrations"
        subtitle="Integration readiness dashboard for next-generation campus technologies (2025–2035)."
        eyebrow="Future Campus"
      />

      {/* Readiness Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Cpu size={22} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{INTEGRATIONS.length}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Total Integrations</div>
          </div>
        </div>
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-green-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-green-text)' }}>
            <CheckCircle size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{readyCount}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Production Ready</div>
          </div>
        </div>
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-blue-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-blue-text)' }}>
            <Clock size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{INTEGRATIONS.filter(i => i.status === 'pilot').length}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>In Pilot</div>
          </div>
        </div>
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ position: 'relative', width: '48px', height: '48px' }}>
            <svg width="48" height="48" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" fill="none" stroke="var(--color-surface-3)" strokeWidth="4" />
              <circle cx="24" cy="24" r="20" fill="none" stroke="var(--color-primary)" strokeWidth="4"
                strokeDasharray={`${overallReadiness * 1.257} ${125.7 - overallReadiness * 1.257}`}
                strokeDashoffset="31.4" strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '0.72rem', fontWeight: 700 }}>{overallReadiness}%</div>
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 700 }}>Overall Readiness</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Platform-wide</div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="tabs" style={{ marginBottom: '1.5rem' }}>
        {['', 'ready', 'pilot', 'planned', 'concept'].map(s => (
          <button key={s} className={`tab ${filterStatus === s ? 'active' : ''}`} onClick={() => setFilterStatus(s)}>
            {s ? STATUS_CONFIG[s].label : 'All Technologies'}
          </button>
        ))}
      </div>

      {/* Integration Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        {filtered.map(item => {
          const Icon = item.icon;
          const statusCfg = STATUS_CONFIG[item.status];
          const StatusIcon = statusCfg.icon;
          return (
            <div key={item.id} className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--color-surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1rem' }}>{item.name}</h3>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{item.category}</span>
                  </div>
                </div>
                <span className="badge" style={{ background: statusCfg.bg, color: statusCfg.color, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <StatusIcon size={12} /> {statusCfg.label}
                </span>
              </div>

              <p style={{ margin: '0 0 1rem', fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{item.description}</p>

              {/* Readiness bar */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.35rem' }}>
                  <span>Integration Readiness</span>
                  <span style={{ fontWeight: 600 }}>{item.readiness}%</span>
                </div>
                <div style={{ height: '8px', borderRadius: '4px', background: 'var(--color-surface-3)', overflow: 'hidden' }}>
                  <div style={{ width: `${item.readiness}%`, height: '100%', borderRadius: '4px', background: item.readiness >= 80 ? 'var(--color-green)' : item.readiness >= 50 ? 'var(--color-blue)' : item.readiness >= 25 ? 'var(--color-amber)' : 'var(--color-surface-3)', transition: 'width 0.5s ease' }} />
                </div>
              </div>

              {/* Features */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {item.features.map(f => (
                  <span key={f} className="badge" style={{ background: 'var(--color-surface-3)', fontSize: '0.72rem' }}>{f}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
