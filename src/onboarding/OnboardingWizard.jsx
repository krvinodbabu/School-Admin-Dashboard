import { useState } from 'react'
import { useTenant } from '../context/TenantContext.jsx'
import { INSTITUTION_TYPES } from '../config/eduOSConfig.js'
import { DEFAULT_MODULES } from '../config/eduOSConfig.js'
import { 
  Building, 
  Layers, 
  MapPin, 
  UserCheck, 
  CheckSquare, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  School
} from 'lucide-react'

export default function OnboardingWizard() {
  const { completeWizard } = useTenant()
  const [step, setStep] = useState(1)

  // Step States
  const [institutionType, setInstitutionType] = useState('School')
  const [groupName, setGroupName] = useState('')
  const [institutionName, setInstitutionName] = useState('')
  const [campusName, setCampusName] = useState('')
  const [campusAddress, setCampusAddress] = useState('')
  const [campusContact, setCampusContact] = useState('')
  const [enabledModules, setEnabledModules] = useState(DEFAULT_MODULES.map(m => ({ ...m })))
  const [administratorName, setAdministratorName] = useState('')
  const [administratorEmail, setAdministratorEmail] = useState('')
  
  const [error, setError] = useState('')

  const handleNext = () => {
    setError('')
    if (step === 2 && !groupName.trim()) {
      setError('Institution Group name is required.')
      return
    }
    if (step === 3 && !institutionName.trim()) {
      setError('Institution name is required.')
      return
    }
    if (step === 4) {
      if (!campusName.trim()) {
        setError('Campus/Branch name is required.')
        return
      }
      if (!campusAddress.trim()) {
        setError('Campus physical address is required.')
        return
      }
    }
    if (step === 6) {
      if (!administratorName.trim()) {
        setError('Administrator full name is required.')
        return
      }
      if (!administratorEmail.trim()) {
        setError('Administrator email is required.')
        return
      }
      // Submit complete configuration
      completeWizard({
        institutionType,
        groupName,
        institutionName,
        campusName,
        campusAddress,
        campusContact,
        administratorName,
        administratorEmail,
        modules: enabledModules
      })
      return
    }

    setStep(prev => prev + 1)
  }

  const handleBack = () => {
    setError('')
    setStep(prev => prev - 1)
  }

  const toggleModuleSelection = (moduleName) => {
    setEnabledModules(prev =>
      prev.map(m => m.name === moduleName ? { ...m, enabled: !m.enabled } : m)
    )
  }

  const renderStepIndicator = () => {
    return (
      <div className="wizard-indicators">
        {[1, 2, 3, 4, 5, 6].map(num => (
          <div 
            key={num} 
            className={`wizard-indicator ${step === num ? 'wizard-indicator--active' : step > num ? 'wizard-indicator--completed' : ''}`}
            title={`Step ${num}`}
          >
            {num}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="onboarding-page">
      <div className="onboarding-card card" style={{ maxWidth: '640px' }}>
        
        {/* Step Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="onboarding-card__logo" style={{ margin: 0, width: '36px', height: '36px', borderRadius: '10px' }} aria-hidden="true">
              <School size={18} color="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--color-text)' }}>EduOS Workspace Wizard</span>
          </div>
          {renderStepIndicator()}
        </div>

        {error && <div className="onboarding-error" style={{ marginBottom: '1rem' }}>{error}</div>}

        {/* STEP 1: Institution Type */}
        {step === 1 && (
          <div className="wizard-step animate-fadeIn">
            <h2 className="onboarding-card__title" style={{ fontSize: '1.35rem', textAlign: 'left' }}>Step 1: Select Institution Type</h2>
            <p className="onboarding-card__subtitle" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              Choose the organizational class that fits your operational entity.
            </p>
            <div className="onboarding-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              {INSTITUTION_TYPES.map(t => (
                <button
                  type="button"
                  key={t}
                  className={`onboarding-type-btn ${institutionType === t ? 'onboarding-type-btn--active' : ''}`}
                  onClick={() => setInstitutionType(t)}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem' }}
                >
                  <Building size={16} />
                  <span>{t}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Create Group */}
        {step === 2 && (
          <div className="wizard-step animate-fadeIn">
            <h2 className="onboarding-card__title" style={{ fontSize: '1.35rem', textAlign: 'left' }}>Step 2: Create Institution Group</h2>
            <p className="onboarding-card__subtitle" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              Define the parent platform provider or educational group name.
            </p>
            <div className="form-group">
              <label htmlFor="w-grp-name">Education Group Name</label>
              <input
                type="text"
                id="w-grp-name"
                placeholder="e.g. ABC Education Group or Global Trust"
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                className="onboarding-input"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Create Institution */}
        {step === 3 && (
          <div className="wizard-step animate-fadeIn">
            <h2 className="onboarding-card__title" style={{ fontSize: '1.35rem', textAlign: 'left' }}>Step 3: Register Institution</h2>
            <p className="onboarding-card__subtitle" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              Enter the official name of the specific school, college, or center.
            </p>
            <div className="form-group">
              <label htmlFor="w-inst-name">Institution Name</label>
              <input
                type="text"
                id="w-inst-name"
                placeholder={`e.g. ABC International ${institutionType}`}
                value={institutionName}
                onChange={e => setInstitutionName(e.target.value)}
                className="onboarding-input"
              />
            </div>
          </div>
        )}

        {/* STEP 4: Create Campus */}
        {step === 4 && (
          <div className="wizard-step animate-fadeIn">
            <h2 className="onboarding-card__title" style={{ fontSize: '1.35rem', textAlign: 'left' }}>Step 4: Register Primary Campus</h2>
            <p className="onboarding-card__subtitle" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              Add details for the primary local branch or campus.
            </p>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label htmlFor="w-camp-name">Campus Name</label>
              <input
                type="text"
                id="w-camp-name"
                placeholder="e.g. Hyderabad Campus, Gachibowli Hub"
                value={campusName}
                onChange={e => setCampusName(e.target.value)}
                className="onboarding-input"
              />
            </div>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label htmlFor="w-camp-addr">Physical Address</label>
              <input
                type="text"
                id="w-camp-addr"
                placeholder="e.g. 123 Tech Lane, Hyderabad, India"
                value={campusAddress}
                onChange={e => setCampusAddress(e.target.value)}
                className="onboarding-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="w-camp-phone">Contact Phone (Optional)</label>
              <input
                type="tel"
                id="w-camp-phone"
                placeholder="e.g. +91 40 4455 6677"
                value={campusContact}
                onChange={e => setCampusContact(e.target.value)}
                className="onboarding-input"
              />
            </div>
          </div>
        )}

        {/* STEP 5: Enable Modules */}
        {step === 5 && (
          <div className="wizard-step animate-fadeIn">
            <h2 className="onboarding-card__title" style={{ fontSize: '1.35rem', textAlign: 'left' }}>Step 5: Enable System Modules</h2>
            <p className="onboarding-card__subtitle" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
              Select which subsystems should be enabled inside the sidebar navigation workspace.
            </p>
            <div className="settings-modules-list" style={{ maxHeight: '280px', overflowY: 'auto', paddingRight: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {enabledModules.map((m) => (
                <label 
                  key={m.name} 
                  className="checkbox-label"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: '0.5rem 0.75rem',
                    background: 'var(--color-surface-2)',
                    borderRadius: 'var(--radius)',
                    cursor: 'pointer',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <input 
                    type="checkbox" 
                    checked={m.enabled} 
                    onChange={() => toggleModuleSelection(m.name)} 
                  />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text)' }}>{m.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: First Administrator */}
        {step === 6 && (
          <div className="wizard-step animate-fadeIn">
            <h2 className="onboarding-card__title" style={{ fontSize: '1.35rem', textAlign: 'left' }}>Step 6: Create Primary Administrator</h2>
            <p className="onboarding-card__subtitle" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
              Set up the credential details for the first administrative operator.
            </p>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label htmlFor="w-admin-name">Administrator Name</label>
              <input
                type="text"
                id="w-admin-name"
                placeholder="e.g. Dr. Ramesh Rao"
                value={administratorName}
                onChange={e => setAdministratorName(e.target.value)}
                className="onboarding-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="w-admin-email">Administrator Email</label>
              <input
                type="email"
                id="w-admin-email"
                placeholder="e.g. admin@eduos.org"
                value={administratorEmail}
                onChange={e => setAdministratorEmail(e.target.value)}
                className="onboarding-input"
              />
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          {step > 1 ? (
            <button type="button" onClick={handleBack} className="btn btn--secondary">
              <ArrowLeft size={16} /> Back
            </button>
          ) : (
            <div />
          )}

          <button type="button" onClick={handleNext} className="btn btn--primary">
            {step === 6 ? 'Finalize Platform Setup' : 'Next Step'} <ArrowRight size={16} />
          </button>
        </div>

        <div className="onboarding-footer" style={{ marginTop: '1.5rem' }}>
          <Sparkles size={12} className="onboarding-footer-icon" /> Selected Context: {institutionType} · {groupName || 'No Group Specified'}
        </div>
      </div>
    </div>
  )
}
