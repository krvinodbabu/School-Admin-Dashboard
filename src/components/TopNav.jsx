import { Menu, Search, Bell, School } from 'lucide-react'

export default function TopNav({ onMenuClick, title }) {
  return (
    <header className="topnav">
      <div className="topnav__left">
        <button type="button" className="topnav__menu-btn" onClick={onMenuClick} aria-label="Open menu">
          <Menu size={22} />
        </button>
        
        <div className="topnav__brand mobile-only">
          <School size={20} className="topnav__brand-icon" />
          <span className="topnav__brand-name">EduAdmin</span>
        </div>

        <h2 className="topnav__title desktop-only">{title}</h2>
      </div>

      <div className="topnav__search desktop-only">
        <Search size={18} className="topnav__search-icon" />
        <input type="search" placeholder="Search students, teachers, classes…" className="topnav__search-input" />
      </div>

      <div className="topnav__right">
        <button type="button" className="topnav__icon-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="topnav__badge">3</span>
        </button>
        <div className="topnav__profile">
          <div className="topnav__avatar">AD</div>
          <div className="topnav__profile-info desktop-only">
            <span className="topnav__profile-name">Admin User</span>
            <span className="topnav__profile-role">Principal</span>
          </div>
        </div>
      </div>
    </header>
  )
}

