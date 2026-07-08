import { useState } from 'react'
import { useEduOS } from '../core/EduOSContext.jsx'
import { INSTITUTION_TYPES } from '../config/eduOSConfig.js'
import { School, ArrowRight, Sparkles } from 'lucide-react'

export default function OnboardingScreen() {
  const { completeOnboarding, institution } = useEduOS()
  
  const [type, setType] = useState(institution?.type || 'School')
  const [name, setName] = useState(institution?.name || '')
  const [academicYear, setAcademicYear] = useState(institution?.academicYear || '2025-26')
  const [campus, setCampus] = useState(institution?.campus || '')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Institution Name is required')
      return
    }
    if (!campus.trim()) {
      setError('Campus/Branch name is required')
      return
    }
    completeOnboarding({
      type,
      name,
      academicYear,
      campus
    })
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-card card">
        <div className="onboarding-card__header">
          <div className="onboarding-card__logo" aria-hidden="true">
            <School size={28} color="#fff" />
          </div>
          <h1 className="onboarding-card__title">Welcome to EduOS</h1>
          <p className="onboarding-card__subtitle">
            Configure your Educational Institution Operating System to get started.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="onboarding-form">
          {error && <div className="onboarding-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="inst-type">Institution Type</label>
            <div className="onboarding-grid">
              {INSTITUTION_TYPES.map(t => (
                <button
                  type="button"
                  key={t}
                  className={`onboarding-type-btn ${type === t ? 'onboarding-type-btn--active' : ''}`}
                  onClick={() => setType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inst-name">Institution Name</label>
            <input
              type="text"
              id="inst-name"
              placeholder="e.g. Green Valley Public School"
              value={name}
              onChange={e => { setName(e.target.value); setError(''); }}
              className="onboarding-input"
            />
          </div>

          <div className="onboarding-row">
            <div className="form-group">
              <label htmlFor="inst-year">Academic Year</label>
              <select
                id="inst-year"
                value={academicYear}
                onChange={e => setAcademicYear(e.target.value)}
                className="onboarding-select"
              >
                <option value="2025-26">2025-26</option>
                <option value="2026-27">2026-27</option>
                <option value="2027-28">2027-28</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="inst-campus">Campus / Branch</label>
              <input
                type="text"
                id="inst-campus"
                placeholder="e.g. Mumbai Main Campus"
                value={campus}
                onChange={e => { setCampus(e.target.value); setError(''); }}
                className="onboarding-input"
              />
            </div>
          </div>

          <button type="submit" className="btn btn--primary onboarding-submit">
            Launch Platform <ArrowRight size={16} />
          </button>
        </form>
        
        <div className="onboarding-footer">
          <Sparkles size={12} className="onboarding-footer-icon" /> Supported entity hierarchy: Platform Provider → Institution Group → Institution → Campus → Department → Users
        </div>
      </div>
    </div>
  )
}
