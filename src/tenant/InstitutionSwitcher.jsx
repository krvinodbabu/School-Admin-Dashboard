import { useState, useRef, useEffect } from 'react'
import { useTenant } from '../context/TenantContext.jsx'
import { Building, ChevronDown, Layers, Calendar, Globe, Settings } from 'lucide-react'

export default function InstitutionSwitcher() {
  const {
    groups,
    activeGroup,
    activeInstitution,
    activeCampus,
    activeAcademicYear,
    setActiveGroup,
    setActiveInstitution,
    setActiveCampus,
    setActiveAcademicYear,
    resetWizard
  } = useTenant()

  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleGroupChange = (e) => {
    const selected = groups.find(g => g.id === e.target.value)
    if (selected) {
      setActiveGroup(selected)
    }
  }

  const handleInstChange = (e) => {
    const insts = activeGroup?.institutions || []
    const selected = insts.find(i => i.id === e.target.value)
    if (selected) {
      setActiveInstitution(selected)
    }
  }

  const handleCampusChange = (e) => {
    const camps = activeInstitution?.campuses || []
    const selected = camps.find(c => c.id === e.target.value)
    if (selected) {
      setActiveCampus(selected)
    }
  }

  return (
    <div className="institution-switcher-container" ref={dropdownRef}>
      <button 
        type="button" 
        onClick={() => setIsOpen(!isOpen)} 
        className="institution-switcher-trigger"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Open Workspace Switcher"
      >
        <Building size={16} className="institution-switcher-trigger__icon" />
        <div className="institution-switcher-trigger__info">
          <span className="institution-switcher-trigger__title">
            {activeInstitution ? activeInstitution.name : 'Select Institution'}
          </span>
          <span className="institution-switcher-trigger__subtitle">
            {activeCampus ? activeCampus.name : 'Select Campus'} · {activeAcademicYear}
          </span>
        </div>
        <ChevronDown size={14} className="institution-switcher-trigger__chevron" />
      </button>

      {isOpen && (
        <div className="institution-switcher-dropdown">
          <div className="institution-switcher-dropdown__header">
            <Layers size={14} style={{ color: 'var(--color-brand)' }} />
            <span>Switch Workspace Context</span>
          </div>

          <div className="institution-switcher-dropdown__body">
            {/* Group Selector */}
            <div className="form-group">
              <label htmlFor="sw-group" style={{ fontSize: '0.72rem', fontWeight: 700 }}>Institution Group</label>
              <select 
                id="sw-group"
                value={activeGroup?.id || ''} 
                onChange={handleGroupChange}
                className="onboarding-select"
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
              >
                {groups.map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>

            {/* Institution Selector */}
            <div className="form-group">
              <label htmlFor="sw-inst" style={{ fontSize: '0.72rem', fontWeight: 700 }}>Institution Name</label>
              <select 
                id="sw-inst"
                value={activeInstitution?.id || ''} 
                onChange={handleInstChange}
                className="onboarding-select"
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
              >
                {(activeGroup?.institutions || []).map(inst => (
                  <option key={inst.id} value={inst.id}>{inst.name}</option>
                ))}
              </select>
            </div>

            {/* Campus Selector */}
            <div className="form-group">
              <label htmlFor="sw-campus" style={{ fontSize: '0.72rem', fontWeight: 700 }}>Campus Branch</label>
              <select 
                id="sw-campus"
                value={activeCampus?.id || ''} 
                onChange={handleCampusChange}
                className="onboarding-select"
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
              >
                {(activeInstitution?.campuses || []).map(camp => (
                  <option key={camp.id} value={camp.id}>{camp.name}</option>
                ))}
              </select>
            </div>

            {/* Academic Year Selector */}
            <div className="form-group">
              <label htmlFor="sw-year" style={{ fontSize: '0.72rem', fontWeight: 700 }}>Academic Year</label>
              <select 
                id="sw-year"
                value={activeAcademicYear} 
                onChange={(e) => setActiveAcademicYear(e.target.value)}
                className="onboarding-select"
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.8rem' }}
              >
                <option value="2025-26">2025-26</option>
                <option value="2026-27">2026-27</option>
                <option value="2027-28">2027-28</option>
              </select>
            </div>
          </div>

          <div className="institution-switcher-dropdown__footer">
            <button 
              type="button" 
              className="btn btn--secondary btn--sm" 
              onClick={() => { resetWizard(); setIsOpen(false); }}
              style={{ width: '100%', justifyContent: 'center', gap: '0.35rem' }}
            >
              <Settings size={13} /> Onboard New Entity
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
