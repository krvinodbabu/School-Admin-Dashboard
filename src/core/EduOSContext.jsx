import { createContext, useContext, useState, useEffect } from 'react'
import { DEFAULT_MODULES, ROLES } from '../config/eduOSConfig.js'
import { useAuth } from '../auth/AuthContext.jsx'

const EduOSContext = createContext(null)

export function EduOSProvider({ children }) {
  // Load initial state from localStorage if present
  const [institution, setInstitution] = useState(() => {
    const saved = localStorage.getItem('eduos_institution')
    return saved ? JSON.parse(saved) : {
      type: 'School',
      name: 'Green Valley Public School',
      academicYear: '2025-26',
      campus: 'Mumbai Main Campus'
    }
  })

  const [modules, setModules] = useState(() => {
    const saved = localStorage.getItem('eduos_modules')
    return saved ? JSON.parse(saved) : DEFAULT_MODULES
  })

  const { user } = useAuth()
  const currentRole = user?.role || 'Guest'

  const [isOnboarded, setIsOnboarded] = useState(() => {
    return localStorage.getItem('eduos_is_onboarded') === 'true'
  })

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('eduos_institution', JSON.stringify(institution))
  }, [institution])

  useEffect(() => {
    localStorage.setItem('eduos_modules', JSON.stringify(modules))
  }, [modules])

  useEffect(() => {
    localStorage.setItem('eduos_is_onboarded', isOnboarded ? 'true' : 'false')
  }, [isOnboarded])

  const updateInstitution = (updated) => {
    setInstitution(prev => ({ ...prev, ...updated }))
  }

  const toggleModule = (moduleName) => {
    setModules(prev =>
      prev.map(m => m.name === moduleName ? { ...m, enabled: !m.enabled } : m)
    )
  }

  const resetOnboarding = () => {
    setIsOnboarded(false)
  }

  const completeOnboarding = (data) => {
    setInstitution(data)
    setIsOnboarded(true)
  }

  return (
    <EduOSContext.Provider value={{
      institution,
      modules,
      currentRole,
      isOnboarded,
      updateInstitution,
      toggleModule,
      resetOnboarding,
      completeOnboarding
    }}>
      {children}
    </EduOSContext.Provider>
  )
}

export function useEduOS() {
  const context = useContext(EduOSContext)
  if (!context) {
    throw new Error('useEduOS must be used within an EduOSProvider')
  }
  return context
}
