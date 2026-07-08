import { useEduOS } from '../core/EduOSContext.jsx'
import { Building, Settings2 } from 'lucide-react'

export default function InstitutionSelector() {
  const { institution, resetOnboarding } = useEduOS()

  return (
    <div className="institution-selector" title={`${institution.name} (${institution.type})`}>
      <div className="institution-selector__icon" aria-hidden="true">
        <Building size={16} />
      </div>
      <div className="institution-selector__info">
        <div className="institution-selector__name">{institution.name}</div>
        <div className="institution-selector__meta">
          <span>{institution.type}</span>
          <span className="institution-selector__divider">·</span>
          <span>{institution.campus}</span>
          <span className="institution-selector__divider">·</span>
          <span>AY {institution.academicYear}</span>
        </div>
      </div>
      <button 
        type="button" 
        className="institution-selector__reset-btn" 
        onClick={resetOnboarding}
        title="Configure Platform / Re-run Onboarding"
        aria-label="Re-run platform setup wizard"
      >
        <Settings2 size={14} />
      </button>
    </div>
  )
}
