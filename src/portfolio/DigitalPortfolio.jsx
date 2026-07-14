/**
 * Digital Portfolio — Student portfolio with Timeline, Gallery, and Achievement views.
 */
import { useState } from 'react';
import { Award, Calendar, Image, Star, Trophy, FileText, ExternalLink } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';

const PORTFOLIO_ITEMS = [
  { id: 1, type: 'Project', title: 'Solar System 3D Model', subject: 'Science', date: '2023-10-15', description: 'Built a scale model of the solar system using recycled materials.', badge: '🏆 Best Project Award', category: 'project' },
  { id: 2, type: 'Certificate', title: 'National Math Olympiad — Silver', subject: 'Mathematics', date: '2023-09-20', description: 'Secured 2nd place in district-level Math Olympiad.', badge: '🥈 Silver Medal', category: 'certificate' },
  { id: 3, type: 'Competition', title: 'Inter-School Debate Championship', subject: 'English', date: '2023-08-12', description: 'Represented school in the inter-school debate on climate change.', badge: '🎤 Best Speaker', category: 'competition' },
  { id: 4, type: 'Activity', title: 'Community Clean-up Drive', subject: 'Social Service', date: '2023-07-25', description: 'Organized and led a community clean-up with 30 volunteers.', badge: '🌱 Green Leader', category: 'volunteer' },
  { id: 5, type: 'Achievement', title: '100% Attendance — Term 1', subject: 'Discipline', date: '2023-07-01', description: 'Perfect attendance throughout Term 1.', badge: '⭐ Perfect Attendance', category: 'achievement' },
  { id: 6, type: 'Internship', title: 'Summer Coding Bootcamp', subject: 'Computer Science', date: '2023-06-10', description: 'Completed a 2-week coding bootcamp learning Python and web development.', badge: '💻 Coder Badge', category: 'internship' },
  { id: 7, type: 'Project', title: 'Historical Newsletter', subject: 'Social Studies', date: '2023-05-20', description: 'Created a newspaper from the perspective of 1947 India.', badge: '📰 Creative Writing', category: 'project' },
  { id: 8, type: 'Certificate', title: 'STEM Explorer Certification', subject: 'Science', date: '2023-04-15', description: 'Completed 20 hands-on STEM experiments with lab reports.', badge: '🔬 STEM Explorer', category: 'certificate' },
];

const VIEW_TABS = [
  { id: 'timeline', label: 'Timeline View', icon: Calendar },
  { id: 'gallery', label: 'Gallery View', icon: Image },
  { id: 'achievements', label: 'Achievement View', icon: Trophy },
];

const CATEGORY_COLORS = {
  project: { bg: 'var(--color-blue-bg)', text: 'var(--color-blue-text)' },
  certificate: { bg: 'var(--color-green-bg)', text: 'var(--color-green-text)' },
  competition: { bg: 'var(--color-purple-bg)', text: 'var(--color-purple-text)' },
  volunteer: { bg: 'var(--color-amber-bg)', text: 'var(--color-amber-text)' },
  achievement: { bg: 'var(--color-indigo-bg)', text: 'var(--color-indigo-text)' },
  internship: { bg: 'var(--color-red-bg)', text: 'var(--color-red-text)' },
};

export default function DigitalPortfolio() {
  const [view, setView] = useState('timeline');

  return (
    <div className="page">
      <PageHeader
        title="Digital Portfolio"
        subtitle="Comprehensive student portfolio — projects, certificates, competitions, and more."
        eyebrow="Student Development"
      />

      {/* Stats Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Total Items', value: PORTFOLIO_ITEMS.length, icon: FileText, color: 'var(--color-blue-bg)', iconColor: 'var(--color-blue-text)' },
          { label: 'Badges Earned', value: PORTFOLIO_ITEMS.filter(p => p.badge).length, icon: Award, color: 'var(--color-green-bg)', iconColor: 'var(--color-green-text)' },
          { label: 'Competitions', value: PORTFOLIO_ITEMS.filter(p => p.type === 'Competition').length, icon: Trophy, color: 'var(--color-purple-bg)', iconColor: 'var(--color-purple-text)' },
          { label: 'Projects', value: PORTFOLIO_ITEMS.filter(p => p.type === 'Project').length, icon: Star, color: 'var(--color-amber-bg)', iconColor: 'var(--color-amber-text)' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: stat.iconColor }}>
                <Icon size={18} />
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>{stat.value}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View Tabs */}
      <div className="tabs" style={{ marginBottom: '1.5rem' }}>
        {VIEW_TABS.map(tab => {
          const Icon = tab.icon;
          return (
            <button key={tab.id} className={`tab ${view === tab.id ? 'active' : ''}`} onClick={() => setView(tab.id)}>
              <Icon size={16} style={{ marginRight: '0.5rem' }} /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Timeline View */}
      {view === 'timeline' && (
        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          <div style={{ position: 'absolute', left: '10px', top: 0, bottom: 0, width: '2px', background: 'var(--color-border)' }} />
          {PORTFOLIO_ITEMS.map((item, i) => {
            const colors = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.project;
            return (
              <div key={item.id} style={{ position: 'relative', marginBottom: '1.5rem' }}>
                <div style={{ position: 'absolute', left: '-1.55rem', top: '1rem', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-primary)', border: '2px solid var(--color-surface)' }} />
                <div className="card" style={{ padding: '1.25rem', marginLeft: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div>
                      <span className="badge" style={{ background: colors.bg, color: colors.text, marginBottom: '0.5rem', display: 'inline-block' }}>{item.type}</span>
                      <h3 style={{ margin: '0.25rem 0', fontSize: '1rem' }}>{item.title}</h3>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{item.subject} · {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    {item.badge && (
                      <span style={{ padding: '0.35rem 0.75rem', borderRadius: '20px', background: 'var(--gradient-brand)', color: '#fff', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Gallery View */}
      {view === 'gallery' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
          {PORTFOLIO_ITEMS.map(item => {
            const colors = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.project;
            return (
              <div key={item.id} className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: colors.bg, margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>
                  {item.badge ? item.badge.split(' ')[0] : '📄'}
                </div>
                <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.9rem' }}>{item.title}</h4>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>{item.subject}</p>
                <span className="badge" style={{ background: colors.bg, color: colors.text, fontSize: '0.7rem' }}>{item.type}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Achievement View */}
      {view === 'achievements' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
          {PORTFOLIO_ITEMS.filter(p => p.badge).map(item => {
            const colors = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.project;
            return (
              <div key={item.id} className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0 }}>
                  {item.badge.split(' ')[0]}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem', fontSize: '1rem' }}>{item.badge.split(' ').slice(1).join(' ')}</h3>
                  <p style={{ margin: '0 0 0.35rem', fontSize: '0.88rem', fontWeight: 500 }}>{item.title}</p>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{item.subject} · {new Date(item.date).toLocaleDateString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
