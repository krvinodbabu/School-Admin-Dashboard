import { useState } from 'react'
import PageHeader from '../components/PageHeader.jsx'
import Card from '../components/Card.jsx'
import StatCard from '../components/StatCard.jsx'
import BarChart from '../components/BarChart.jsx'
import { GraduationCap, Sparkles, BookOpen, Compass, Award, Heart, MessageSquare } from 'lucide-react'

export default function StudentSuccessDashboard() {
  const [activeTab, setActiveTab] = useState('academic')
  const [chatText, setChatText] = useState('')
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: 'Hello Alex! I am your AI Study Copilot. How can I help you prepare today?' }
  ])

  const skillGaps = [
    { skill: 'Data Structures (Python)', status: 'Acquiring', progress: 75 },
    { skill: 'Linear Algebra', status: 'Completed', progress: 100 },
    { skill: 'Technical Writing', status: 'Gap Identified', progress: 20 },
    { skill: 'Public Speaking', status: 'In Progress', progress: 50 }
  ]

  const internships = [
    { title: 'Junior Data Analyst', company: 'TechNova India', duration: '2 Months', stipend: '₹15,000/mo' },
    { title: 'Web Development Intern', company: 'Sprint Solutions', duration: '3 Months', stipend: '₹12,000/mo' }
  ]

  const handleSendChat = (e) => {
    e.preventDefault()
    if (!chatText.trim()) return
    const userMsg = { role: 'user', text: chatText }
    setChatHistory(prev => [...prev, userMsg])
    setChatText('')

    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        role: 'ai',
        text: `Based on your Grade 8 Math profile, I recommend revising standard algebraic expressions before attempting mock tests. Let's schedule a 15-minute revision block.`
      }])
    }, 800)
  }

  return (
    <div className="page animate-fadeIn">
      <PageHeader 
        title="Student Success Workspace" 
        subtitle="Explore your personalized curriculum pathways, career roadmaps, and mental wellness check-ins."
        eyebrow="My Success"
      />

      {/* Tabs */}
      <div className="tabs" style={{ marginBottom: '1.5rem' }}>
        <button className={`tab ${activeTab === 'academic' ? 'active' : ''}`} onClick={() => setActiveTab('academic')}>
          <BookOpen size={16} style={{ marginRight: '0.5rem' }} /> Academic Workspace
        </button>
        <button className={`tab ${activeTab === 'career' ? 'active' : ''}`} onClick={() => setActiveTab('career')}>
          <Compass size={16} style={{ marginRight: '0.5rem' }} /> Career & Placement
        </button>
        <button className={`tab ${activeTab === 'wellbeing' ? 'active' : ''}`} onClick={() => setActiveTab('wellbeing')}>
          <Heart size={16} style={{ marginRight: '0.5rem' }} /> Health & Wellbeing
        </button>
      </div>

      {activeTab === 'academic' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '1.5rem' }}>
          
          {/* Left panel: Plan & Progress */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="stats-grid">
              <StatCard title="Placement Readiness" value="84%" icon={GraduationCap} color="blue" trend="Top 15% of Batch" />
              <StatCard title="Weekly Study Goal" value="12 hrs" icon={Sparkles} color="green" trend="8.5 hrs completed" />
              <StatCard title="Upcoming Deadlines" value="3 Tasks" icon={BookOpen} color="amber" trend="Next: Algebra Quiz" />
            </div>

            <Card title="My Personal Study & Revision Planner">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'var(--color-surface-3)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.9rem' }}>Algebra Quick Review</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Due today · Expected time: 30m</span>
                  </div>
                  <button className="btn btn-primary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>Start Revision</button>
                </div>
                <div style={{ padding: '1rem', background: 'var(--color-surface-3)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.9rem' }}>Physics Lab Prep — Light waves</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Due tomorrow · Expected time: 45m</span>
                  </div>
                  <button className="btn btn-outline" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>Mark Ready</button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right panel: AI Assistant */}
          <Card title="AI Study Assistant" subtitle="Real-time curriculum and math query resolver.">
            <div style={{ display: 'flex', flexDirection: 'column', height: '360px' }}>
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem', paddingRight: '0.25rem' }}>
                {chatHistory.map((chat, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      alignSelf: chat.role === 'user' ? 'flex-end' : 'flex-start',
                      background: chat.role === 'user' ? 'var(--color-primary-light)' : 'var(--color-surface-3)',
                      color: chat.role === 'user' ? 'var(--color-primary)' : 'var(--color-text)',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      maxWidth: '85%',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      lineHeight: 1.4
                    }}
                  >
                    {chat.text}
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendChat} style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  className="ap-input" 
                  placeholder="Ask a question..."
                  value={chatText}
                  onChange={e => setChatText(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}><MessageSquare size={16} /></button>
              </form>
            </div>
          </Card>

        </div>
      )}

      {activeTab === 'career' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          
          {/* Skill Gap */}
          <Card title="Curriculum Skill Gap Analytics" subtitle="Required competencies mapping dashboard">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {skillGaps.map((sg, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    <strong>{sg.skill}</strong>
                    <span className="badge" style={{ background: sg.progress === 100 ? 'var(--color-green-bg)' : 'var(--color-amber-bg)', color: sg.progress === 100 ? 'var(--color-green-text)' : 'var(--color-amber-text)', fontSize: '0.72rem' }}>
                      {sg.status} ({sg.progress}%)
                    </span>
                  </div>
                  <div style={{ height: '8px', borderRadius: '4px', background: 'var(--color-surface-3)', overflow: 'hidden' }}>
                    <div style={{ width: `${sg.progress}%`, height: '100%', borderRadius: '4px', background: sg.progress === 100 ? 'var(--color-green)' : 'var(--color-primary)' }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Internships & Certifications */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card title="Recommended Industry Internships">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {internships.map((intern, i) => (
                  <div key={i} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.9rem' }}>{intern.title}</h4>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{intern.company} · {intern.duration}</span>
                    </div>
                    <strong style={{ fontSize: '0.88rem', color: 'var(--color-green)' }}>{intern.stipend}</strong>
                  </div>
                ))}
              </div>
            </Card>
          </div>

        </div>
      )}

      {activeTab === 'wellbeing' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>
          
          <Card title="Mental Wellness & Counselling Desk">
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Your mental health is extremely important to us. Access free, anonymous counselling requests and regular wellness check-ins.
            </p>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={e => { e.preventDefault(); alert('Counselling request submitted anonymously.') }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 500, marginBottom: '0.5rem' }}>Reason for Consultation</label>
                <select className="ap-select">
                  <option>Academic/Exam Stress</option>
                  <option>Career Guidance/Anxiety</option>
                  <option>Peer Conflict</option>
                  <option>Personal Issues</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 500, marginBottom: '0.5rem' }}>Preferred Consultation Mode</label>
                <select className="ap-select">
                  <option>In-Person (Counseling Center)</option>
                  <option>Online Video Session</option>
                  <option>Anonymous Chat Interface</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Submit Appointment Request</button>
            </form>
          </Card>

          <Card title="Wellness Telemetry Log">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: 'var(--color-surface-3)', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Reported Stress Index</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)' }}>Low (2/10)</div>
              </div>
              <div style={{ padding: '1rem', background: 'var(--color-surface-3)', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Physical Activity Log</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-green)' }}>Active (45m)</div>
              </div>
            </div>
          </Card>

        </div>
      )}
    </div>
  )
}
