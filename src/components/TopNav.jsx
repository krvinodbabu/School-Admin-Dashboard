/**
 * TopNav — glassmorphism header with theme toggle, search, notifications.
 */
import { Menu, Search, Bell, School, Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext.jsx'
import InstitutionSwitcher from '../tenant/InstitutionSwitcher.jsx'
import UserMenu from './UserMenu.jsx'

export default function TopNav({ onMenuClick, title }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="topnav">
      <div className="topnav__left">
        {/* Mobile hamburger */}
        <button
          type="button"
          className="topnav__menu-btn"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          id="topnav-menu-btn"
        >
          <Menu size={20} />
        </button>

        {/* Mobile brand (hidden on desktop via CSS) */}
        <div className="topnav__brand mobile-only">
          <School size={18} className="topnav__brand-icon" />
          <span className="topnav__brand-name">EduAdmin</span>
        </div>

        {/* Desktop page title */}
        <h2 className="topnav__title desktop-only">{title}</h2>
        
        {/* Workspace Switcher */}
        <div style={{ marginLeft: '1rem' }}>
          <InstitutionSwitcher />
        </div>
      </div>

      {/* Search bar */}
      <div className="topnav__search desktop-only">
        <Search size={16} className="topnav__search-icon" aria-hidden="true" />
        <input
          type="search"
          id="topnav-search"
          placeholder="Search students, teachers, classes…"
          className="topnav__search-input"
          aria-label="Global search"
        />
      </div>

      <div className="topnav__right">
        {/* Persona Selector Dropdown */}
        <UserMenu />

        {/* Theme toggle */}
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          id="theme-toggle-btn"
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Notification bell */}
        <button
          type="button"
          className="topnav__icon-btn"
          aria-label="View notifications (3 unread)"
          id="topnav-notifications-btn"
        >
          <Bell size={18} />
          <span className="topnav__badge" aria-hidden="true">3</span>
        </button>

        {/* Profile chip */}
        <div className="topnav__profile" role="button" tabIndex={0} aria-label="User profile" id="topnav-profile">
          <div className="topnav__avatar" aria-hidden="true">AD</div>
          <div className="topnav__profile-info desktop-only">
            <span className="topnav__profile-name">Admin User</span>
            <span className="topnav__profile-role">Principal</span>
          </div>
        </div>
      </div>
    </header>
  )
}

