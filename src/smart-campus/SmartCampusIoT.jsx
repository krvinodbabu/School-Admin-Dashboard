import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import StatCard from '../components/StatCard.jsx'
import { Wifi, BookOpen, Monitor, ShieldAlert, Cpu } from 'lucide-react'

export default function SmartCampusIoT() {

  const sensors = [
    { name: 'Block A Library CO2 Sensor', value: '420 ppm', status: 'Optimal', color: 'green' },
    { name: 'Block B Physics Lab Temp', value: '23.4 °C', status: 'Normal', color: 'green' },
    { name: 'Campus Main Entrance Humid', value: '62%', status: 'Normal', color: 'green' },
    { name: 'Server Rack Temperature', value: '28.9 °C', status: 'Optimal (Fan: 100%)', color: 'green' }
  ]

  const classrooms = [
    { room: 'Room 302 (Grade 8-A)', display: 'Solar System Study', lights: 'ON (75%)', activeDevices: 3 },
    { room: 'Lab 4 (Chemistry)', display: 'Periodic Table AI Study', lights: 'ON (100%)', activeDevices: 5 }
  ]

  return (
    <div className="page animate-fadeIn">
      <PageHeader 
        title="Smart Campus IoT Telemetry" 
        subtitle="Real-time sensor logs, smart classroom configurations, and digital signage boards."
        eyebrow="IoT & Infrastructure"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <StatCard title="IoT Devices Online" value="142 / 145" icon={Cpu} color="blue" trend="98.2% healthy" />
        <StatCard title="Smart Boards active" value="18" icon={Monitor} color="green" trend="Class sharing active" />
        <StatCard title="Locker logs (RFID)" value="824 scans" icon={BookOpen} color="indigo" trend="Student locks audit active" />
        <StatCard title="Energy Offsets" value="480 kWh" icon={Wifi} color="purple" trend="Smart grids saving 12% today" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Sensor Logs */}
        <Card title="IoT Telemetry & Ambient Conditions" subtitle="Updated every 5 seconds">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sensors.map((sen, idx) => (
              <div key={idx} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.9rem' }}>{sen.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Status: {sen.status}</span>
                </div>
                <strong style={{ fontSize: '1.1rem', color: 'var(--color-primary)' }}>{sen.value}</strong>
              </div>
            ))}
          </div>
        </Card>

        {/* Classroom states */}
        <Card title="Active Smart Classrooms Device Status" subtitle="Interactive screen logs & lighting controls">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {classrooms.map((cr, idx) => (
              <div key={idx} style={{ padding: '1.25rem', background: 'var(--color-surface-3)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <strong style={{ fontSize: '0.95rem' }}>{cr.room}</strong>
                  <span className="badge" style={{ background: 'var(--color-green-bg)', color: 'var(--color-green-text)', fontSize: '0.72rem' }}>Online</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  <div>Active Screen: <strong style={{ color: 'var(--color-text)' }}>{cr.display}</strong></div>
                  <div>Ambient Lights: <strong style={{ color: 'var(--color-text)' }}>{cr.lights}</strong></div>
                  <div>Total Connected IoT Devices: <strong style={{ color: 'var(--color-text)' }}>{cr.activeDevices}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  )
}
