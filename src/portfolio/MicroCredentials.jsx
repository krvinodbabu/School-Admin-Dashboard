/**
 * Micro Credentials — Skill badges, certificates, competency achievements,
 * and learning milestone tracking with beautiful badge displays.
 */
import { useState } from 'react';
import { Award, Star, Shield, Zap, CheckCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';

const BADGE_CATEGORIES = [
  { id: 'tech', name: 'Technology', color: '#6366f1' },
  { id: 'comm', name: 'Communication', color: '#8b5cf6' },
  { id: 'stem', name: 'STEM', color: '#3b82f6' },
  { id: 'arts', name: 'Arts & Creativity', color: '#f59e0b' },
  { id: 'leadership', name: 'Leadership', color: '#22c55e' },
  { id: 'sports', name: 'Sports', color: '#ef4444' },
];

const BADGES = [
  { id: 1, name: 'Python Basics', category: 'tech', level: 'Beginner', earned: true, earnedDate: '2023-10-01', icon: '🐍', progress: 100, criteria: 'Complete 10 Python exercises and pass the quiz with 80%+' },
  { id: 2, name: 'Public Speaking', category: 'comm', level: 'Intermediate', earned: true, earnedDate: '2023-09-15', icon: '🎤', progress: 100, criteria: 'Deliver 3 presentations and participate in 2 debates' },
  { id: 3, name: 'Robotics Level 1', category: 'stem', level: 'Beginner', earned: true, earnedDate: '2023-08-20', icon: '🤖', progress: 100, criteria: 'Build and program a basic robot with 3 functions' },
  { id: 4, name: 'STEM Explorer', category: 'stem', level: 'Intermediate', earned: true, earnedDate: '2023-07-10', icon: '🔬', progress: 100, criteria: 'Complete 20 hands-on STEM experiments with lab reports' },
  { id: 5, name: 'Creative Writer', category: 'arts', level: 'Beginner', earned: false, earnedDate: null, icon: '✍️', progress: 72, criteria: 'Write 5 original pieces (story, poem, essay, journal, review)' },
  { id: 6, name: 'Team Captain', category: 'leadership', level: 'Advanced', earned: false, earnedDate: null, icon: '👑', progress: 45, criteria: 'Lead a team project, organize an event, mentor 2 peers' },
  { id: 7, name: 'Data Analyst Jr.', category: 'tech', level: 'Intermediate', earned: false, earnedDate: null, icon: '📊', progress: 30, criteria: 'Complete data collection, visualization, and analysis project' },
  { id: 8, name: 'Sports Champion', category: 'sports', level: 'Advanced', earned: true, earnedDate: '2023-11-01', icon: '🏅', progress: 100, criteria: 'Win district-level sports competition' },
  { id: 9, name: 'Eco Warrior', category: 'leadership', level: 'Beginner', earned: true, earnedDate: '2023-06-15', icon: '🌱', progress: 100, criteria: 'Lead 3 environmental initiatives and plant 50 trees' },
  { id: 10, name: 'Digital Artist', category: 'arts', level: 'Intermediate', earned: false, earnedDate: null, icon: '🎨', progress: 60, criteria: 'Create 10 digital artworks using design tools' },
  { id: 11, name: 'Math Wizard', category: 'stem', level: 'Advanced', earned: false, earnedDate: null, icon: '🧮', progress: 88, criteria: 'Score 90%+ in 3 consecutive math assessments' },
  { id: 12, name: 'Web Developer', category: 'tech', level: 'Advanced', earned: false, earnedDate: null, icon: '🌐', progress: 15, criteria: 'Build 3 web pages with HTML, CSS, and JavaScript' },
];

const LEVEL_COLORS = {
  Beginner: { bg: 'var(--color-green-bg)', text: 'var(--color-green-text)' },
  Intermediate: { bg: 'var(--color-blue-bg)', text: 'var(--color-blue-text)' },
  Advanced: { bg: 'var(--color-purple-bg)', text: 'var(--color-purple-text)' },
};

export default function MicroCredentials() {
  const [filterCat, setFilterCat] = useState('');
  const [showEarned, setShowEarned] = useState('all'); // all, earned, in-progress

  const filtered = BADGES.filter(b => {
    if (filterCat && b.category !== filterCat) return false;
    if (showEarned === 'earned' && !b.earned) return false;
    if (showEarned === 'in-progress' && b.earned) return false;
    return true;
  });

  const earnedCount = BADGES.filter(b => b.earned).length;

  return (
    <div className="page">
      <PageHeader
        title="Micro Credentials & Badges"
        subtitle={`${earnedCount} of ${BADGES.length} badges earned · Track skill achievements and learning milestones.`}
        eyebrow="Student Development"
      />

      {/* Progress Summary */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ position: 'relative', width: '64px', height: '64px' }}>
            <svg width="64" height="64" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="var(--color-surface-3)" strokeWidth="5" />
              <circle cx="32" cy="32" r="28" fill="none" stroke="var(--color-primary)" strokeWidth="5"
                strokeDasharray={`${(earnedCount / BADGES.length) * 175.9} ${175.9 - (earnedCount / BADGES.length) * 175.9}`}
                strokeDashoffset="44" strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 700 }}>
              {earnedCount}/{BADGES.length}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Badge Collection</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{Math.round((earnedCount / BADGES.length) * 100)}% complete</div>
          </div>
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', flex: 1 }}>
          <button className={`tab ${filterCat === '' ? 'active' : ''}`} onClick={() => setFilterCat('')} style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>All</button>
          {BADGE_CATEGORIES.map(cat => (
            <button key={cat.id} className={`tab ${filterCat === cat.id ? 'active' : ''}`} onClick={() => setFilterCat(cat.id)} style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
              {cat.name}
            </button>
          ))}
        </div>

        <div className="tabs">
          {['all', 'earned', 'in-progress'].map(f => (
            <button key={f} className={`tab ${showEarned === f ? 'active' : ''}`} onClick={() => setShowEarned(f)} style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', textTransform: 'capitalize' }}>
              {f === 'in-progress' ? 'In Progress' : f === 'all' ? 'All' : 'Earned'}
            </button>
          ))}
        </div>
      </div>

      {/* Badge Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
        {filtered.map(badge => {
          const levelStyle = LEVEL_COLORS[badge.level];
          return (
            <div key={badge.id} className="card" style={{ padding: '1.5rem', textAlign: 'center', opacity: badge.earned ? 1 : 0.85, position: 'relative', overflow: 'hidden' }}>
              {badge.earned && (
                <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
                  <CheckCircle size={18} style={{ color: 'var(--color-green)' }} />
                </div>
              )}

              {/* Badge Icon */}
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%', margin: '0 auto 1rem',
                background: badge.earned ? 'var(--gradient-brand)' : 'var(--color-surface-3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem',
                boxShadow: badge.earned ? '0 4px 20px rgba(99,102,241,0.3)' : 'none',
                border: badge.earned ? 'none' : '2px dashed var(--color-border)',
              }}>
                {badge.icon}
              </div>

              <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.95rem' }}>{badge.name}</h3>
              <span className="badge" style={{ background: levelStyle.bg, color: levelStyle.text, fontSize: '0.7rem', marginBottom: '0.75rem', display: 'inline-block' }}>
                {badge.level}
              </span>

              {/* Progress */}
              {!badge.earned && (
                <div style={{ marginTop: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Progress</span>
                    <span style={{ fontWeight: 600 }}>{badge.progress}%</span>
                  </div>
                  <div style={{ height: '6px', borderRadius: '3px', background: 'var(--color-surface-3)', overflow: 'hidden' }}>
                    <div style={{ width: `${badge.progress}%`, height: '100%', borderRadius: '3px', background: 'var(--color-primary)', transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              )}

              {badge.earned && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  Earned {new Date(badge.earnedDate).toLocaleDateString()}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
