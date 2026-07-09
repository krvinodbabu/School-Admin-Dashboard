import { createContext, useContext, useState, useEffect } from 'react'
import { INSTITUTION_GROUPS } from '../tenant/tenantData.js'

const TenantContext = createContext(null)

export function TenantProvider({ children }) {
  // Load configuration groups from localStorage or defaults
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem('eduos_tenant_groups')
    return saved ? JSON.parse(saved) : INSTITUTION_GROUPS
  })

  // Selected Group
  const [activeGroup, setActiveGroup] = useState(() => {
    const saved = localStorage.getItem('eduos_active_group_id')
    const found = saved ? groups.find(g => g.id === saved) : null
    return found || groups[0]
  })

  // Selected Institution
  const [activeInstitution, setActiveInstitution] = useState(() => {
    const saved = localStorage.getItem('eduos_active_institution_id')
    const currentInsts = activeGroup?.institutions || []
    const found = saved ? currentInsts.find(i => i.id === saved) : null
    return found || currentInsts[0] || null
  })

  // Selected Campus
  const [activeCampus, setActiveCampus] = useState(() => {
    const saved = localStorage.getItem('eduos_active_campus_id')
    const currentCamps = activeInstitution?.campuses || []
    const found = saved ? currentCamps.find(c => c.id === saved) : null
    return found || currentCamps[0] || null
  })

  // Selected Academic Year
  const [activeAcademicYear, setActiveAcademicYear] = useState(() => {
    return localStorage.getItem('eduos_active_year') || '2025-26'
  })

  // Wizard onboarding state
  const [isWizardCompleted, setIsWizardCompleted] = useState(() => {
    return localStorage.getItem('eduos_wizard_completed') === 'true'
  })

  // Auto-align selections when activeGroup changes
  useEffect(() => {
    const currentInsts = activeGroup?.institutions || []
    const nextInst = currentInsts[0] || null
    setActiveInstitution(nextInst)
    
    const currentCamps = nextInst?.campuses || []
    const nextCamp = currentCamps[0] || null
    setActiveCampus(nextCamp)

    localStorage.setItem('eduos_active_group_id', activeGroup?.id || '')
  }, [activeGroup])

  // Auto-align selections when activeInstitution changes
  useEffect(() => {
    const currentCamps = activeInstitution?.campuses || []
    const nextCamp = currentCamps[0] || null
    setActiveCampus(nextCamp)

    localStorage.setItem('eduos_active_institution_id', activeInstitution?.id || '')
  }, [activeInstitution])

  // Track activeCampus change
  useEffect(() => {
    localStorage.setItem('eduos_active_campus_id', activeCampus?.id || '')
  }, [activeCampus])

  // Track activeAcademicYear change
  useEffect(() => {
    localStorage.setItem('eduos_active_year', activeAcademicYear)
  }, [activeAcademicYear])

  // Sync groups list changes
  useEffect(() => {
    localStorage.setItem('eduos_tenant_groups', JSON.stringify(groups))
  }, [groups])

  // Sync Wizard State
  useEffect(() => {
    localStorage.setItem('eduos_wizard_completed', isWizardCompleted ? 'true' : 'false')
  }, [isWizardCompleted])

  // Add Campus method
  const addCampus = (institutionId, newCampus) => {
    const campusId = 'camp-' + Date.now()
    const campusWithId = {
      id: campusId,
      students: 0,
      staff: 0,
      ...newCampus
    }

    setGroups(prevGroups => {
      return prevGroups.map(grp => ({
        ...grp,
        institutions: grp.institutions.map(inst => {
          if (inst.id === institutionId) {
            return {
              ...inst,
              campuses: [...(inst.campuses || []), campusWithId]
            }
          }
          return inst
        })
      }))
    })

    // Update active selections
    setTimeout(() => {
      setGroups(latest => {
        const foundGroup = latest.find(g => g.id === activeGroup.id)
        if (foundGroup) {
          setActiveGroup(foundGroup)
          const foundInst = foundGroup.institutions.find(i => i.id === activeInstitution.id)
          if (foundInst) {
            setActiveInstitution(foundInst)
            const createdCamp = foundInst.campuses.find(c => c.id === campusId)
            if (createdCamp) {
              setActiveCampus(createdCamp)
            }
          }
        }
        return latest
      })
    }, 50)
  }

  // Add Institution method
  const addInstitution = (groupId, newInst) => {
    const instId = 'inst-' + Date.now()
    const instWithId = {
      id: instId,
      campuses: [],
      ...newInst
    }

    setGroups(prevGroups => {
      return prevGroups.map(grp => {
        if (grp.id === groupId) {
          return {
            ...grp,
            institutions: [...(grp.institutions || []), instWithId]
          }
        }
        return grp
      })
    })

    setTimeout(() => {
      setGroups(latest => {
        const foundGroup = latest.find(g => g.id === activeGroup.id)
        if (foundGroup) {
          setActiveGroup(foundGroup)
          const createdInst = foundGroup.institutions.find(i => i.id === instId)
          if (createdInst) {
            setActiveInstitution(createdInst)
          }
        }
        return latest
      })
    }, 50)
  }

  // Complete onboarding wizard
  const completeWizard = (wizardConfig) => {
    const groupId = 'grp-' + Date.now()
    const instId = 'inst-' + Date.now()
    const campusId = 'camp-' + Date.now()

    const newGroupNode = {
      id: groupId,
      name: wizardConfig.groupName,
      institutions: [
        {
          id: instId,
          name: wizardConfig.institutionName,
          type: wizardConfig.institutionType,
          campuses: [
            {
              id: campusId,
              name: wizardConfig.campusName,
              code: wizardConfig.campusName.slice(0, 3).toUpperCase(),
              address: wizardConfig.campusAddress || 'Address details',
              contact: wizardConfig.campusContact || 'Contact details',
              head: wizardConfig.administratorName || 'Principal Director',
              capacity: 1000,
              students: 0,
              staff: 1
            }
          ]
        }
      ]
    }

    setGroups(prev => [newGroupNode, ...prev])
    
    // Auto switch to newly onboarded workspace
    setActiveGroup(newGroupNode)
    setActiveInstitution(newGroupNode.institutions[0])
    setActiveCampus(newGroupNode.institutions[0].campuses[0])
    setIsWizardCompleted(true)
  }

  const resetWizard = () => {
    setIsWizardCompleted(false)
  }

  return (
    <TenantContext.Provider value={{
      groups,
      activeGroup,
      activeInstitution,
      activeCampus,
      activeAcademicYear,
      isWizardCompleted,
      setActiveGroup,
      setActiveInstitution,
      setActiveCampus,
      setActiveAcademicYear,
      addCampus,
      addInstitution,
      completeWizard,
      resetWizard
    }}>
      {children}
    </TenantContext.Provider>
  )
}

export default TenantContext

export function useTenant() {
  const context = useContext(TenantContext)
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider')
  }
  return context
}
