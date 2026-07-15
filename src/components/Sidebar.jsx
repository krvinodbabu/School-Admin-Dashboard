/**
 * Simplified Minimal Sidebar navigation matching premium enterprise patterns.
 */
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useEduOS } from '../core/EduOSContext.jsx'
import { useRBAC } from '../rbac/RBACContext.jsx'
import { useTenant } from '../context/TenantContext.jsx'
import {
  LayoutDashboard,
  Search,
  BarChart3,
  School,
  Shield,
  Settings,
  Bell,
  Star,
  Clock,
  HelpCircle,
  Users,
  X,
  ChevronUp
} from 'lucide-react'

function NavItem({ to, label, icon: Icon, end, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
      }
      onClick={onClick}
    >
      <span className="sidebar__link-icon">
        <Icon size={18} />
      </span>
      <span>{label}</span>
    </NavLink>
  )
}

export default function Sidebar({ isOpen, onClose }) {
  const { currentRole, institution } = useEduOS()
  const { hasPermission } = useRBAC()
  const { activeInstitution, activeCampus, activeAcademicYear } = useTenant()

  // State trackers for Favorites and Recent Activity
  const [favorites, setFavorites] = useState([])
  const [recentActivity, setRecentActivity] = useState([])

  const loadNavStats = () => {
    const favs = localStorage.getItem('eduos_favorites')
    const recents = localStorage.getItem('eduos_recent_activity')
    setFavorites(favs ? JSON.parse(favs) : [])
    setRecentActivity(recents ? JSON.parse(recents) : [])
  }

  useEffect(() => {
    loadNavStats()
    window.addEventListener('eduos_navigation_change', loadNavStats)
    return () => window.removeEventListener('eduos_navigation_change', loadNavStats)
  }, [])

  const triggerGlobalSearch = () => {
    window.dispatchEvent(new Event('eduos_open_command_palette'))
    onClose()
  }

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />}

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`} aria-label="Main navigation">
        {/* Header / Brand */}
        <div className="sidebar__header" style={{ paddingBottom: '0.5rem' }}>
          <div className="sidebar__brand">
            <div className="sidebar__brand-icon" aria-hidden="true">
              <School size={20} color="#fff" />
            </div>
            <div className="sidebar__brand-text">
              <span className="sidebar__brand-name">EduOS</span>
              <span className="sidebar__brand-tag">Platform Foundation</span>
            </div>
          </div>
          <button
            type="button"
            className="sidebar__close"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Active Context Badge */}
        <div className="active-context-badge">
          <div className="active-context-badge__title">Current Context:</div>
          <div className="active-context-badge__inst">{activeInstitution?.name || institution.name}</div>
          <div className="active-context-badge__camp">{activeCampus?.name || institution.campus}</div>
          <div className="active-context-badge__year">Academic Year {activeAcademicYear}</div>
        </div>

        {/* Nav items */}
        <nav className="sidebar__nav-scroll" aria-label="Site navigation" style={{ paddingBottom: '2rem' }}>
          
          <span className="sidebar__section-label">Main Console</span>
          <NavItem to="/" label="Home Dashboard" icon={LayoutDashboard} end={true} onClick={onClose} />
          
          <button 
            type="button" 
            className="sidebar__link" 
            onClick={triggerGlobalSearch}
            style={{ width: '100%', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer' }}
          >
            <span className="sidebar__link-icon"><Search size={18} /></span>
            <span>Global Search</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.68rem', opacity: 0.7, background: 'var(--color-surface-3)', padding: '0.1rem 0.35rem', borderRadius: '4px' }}>Ctrl+K</span>
          </button>

          {/* Reports Console */}
          {hasPermission('reports.view') && (
            <NavItem to="/reports/enterprise" label="Reports & Analytics" icon={BarChart3} onClick={onClose} />
          )}

          {/* Institution Management */}
          {hasPermission('rbac.view') && (
            <NavItem to="/platform/campuses" label="Institution Management" icon={School} onClick={onClose} />
          )}

          {/* User & Access Control */}
          {hasPermission('rbac.view') && (
            <NavItem to="/system/access" label="User & Access Matrix" icon={Shield} onClick={onClose} />
          )}

          {/* Administration Controls */}
          {hasPermission('rbac.view') && (
            <NavItem to="/settings" label="Administration" icon={Settings} onClick={onClose} />
          )}

          {/* Notifications */}
          <NavItem to="/notifications" label="Notifications Hub" icon={Bell} onClick={onClose} />

          {/* Profile */}
          <NavItem to="/profile" label="My Profile" icon={Users} onClick={onClose} />

          {/* Favorites (Dynamic list) */}
          {favorites.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
              <span className="sidebar__section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Star size={12} style={{ fill: 'var(--color-primary)' }} /> Favorites
              </span>
              {favorites.map((fav, i) => (
                <NavItem key={i} to={fav.to} label={fav.label} icon={Star} onClick={onClose} />
              ))}
            </div>
          )}

          {/* Recent Activity (Dynamic list) */}
          {recentActivity.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
              <span className="sidebar__section-label" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={12} /> Recents
              </span>
              {recentActivity.map((rec, i) => (
                <NavItem key={i} to={rec.to} label={rec.label} icon={Clock} onClick={onClose} />
              ))}
            </div>
          )}

          {/* System Help */}
          <span className="sidebar__section-label">Support</span>
          <NavItem to="/support" label="Help & Support" icon={HelpCircle} onClick={onClose} />

        </nav>

        {/* User profile footer showing currently switched persona */}
        <div className="sidebar__footer">
          <div className="sidebar__user" title={`Persona active: ${currentRole}`}>
            <div className="sidebar__user-avatar" aria-hidden="true">
              {currentRole.slice(0, 2).toUpperCase()}
            </div>
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">Prototype Persona</span>
              <span className="sidebar__user-role">{currentRole}</span>
            </div>
            <ChevronUp size={15} className="sidebar__user-icon" />
          </div>
        </div>
      </aside>
    </>
  )
}
