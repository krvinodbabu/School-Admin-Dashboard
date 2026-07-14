import { createContext, useContext, useState, useEffect } from 'react'

const DEMO_USERS = [
  { email: 'principal@eduos.demo', password: 'Principal@123', role: 'Principal', name: 'Dr. Sarah Jenkins', department: 'Administration' },
  { email: 'admin@eduos.demo', password: 'Admin@123', role: 'System Administrator', name: 'IT Admin', department: 'IT' },
  { email: 'teacher@eduos.demo', password: 'Teacher@123', role: 'Teacher', name: 'Mark Robinson', department: 'Mathematics' },
  { email: 'parent@eduos.demo', password: 'Parent@123', role: 'Parent', name: 'Lisa Taylor', department: 'Parent Community' },
  { email: 'student@eduos.demo', password: 'Student@123', role: 'Student', name: 'Alex Taylor', department: 'Grade 8' },
  { email: 'finance@eduos.demo', password: 'Finance@123', role: 'Finance Administrator', name: 'Robert Chen', department: 'Finance' },
  { email: 'hr@eduos.demo', password: 'HR@123', role: 'HR Manager', name: 'Emily Davis', department: 'Human Resources' },
  { email: 'transport@eduos.demo', password: 'Transport@123', role: 'Transport Manager', name: 'James Wilson', department: 'Operations' },
  { email: 'admissions@eduos.demo', password: 'Admissions@123', role: 'Admissions Officer', name: 'Sarah Connor', department: 'Admissions' },
  { email: 'sports@eduos.demo', password: 'Sports@123', role: 'Sports Director', name: 'Mike Johnson', department: 'Athletics' },
  { email: 'marketing@eduos.demo', password: 'Marketing@123', role: 'Marketing Head', name: 'Anna Lee', department: 'Communications' },
  { email: 'housekeeping@eduos.demo', password: 'Housekeeping@123', role: 'Housekeeping Supervisor', name: 'David Smith', department: 'Facilities' },
  { email: 'support@eduos.demo', password: 'Support@123', role: 'Support Agent', name: 'Tech Support', department: 'IT Service Desk' },
  { email: 'escalation@eduos.demo', password: 'Escalation@123', role: 'Escalation Manager', name: 'Escalation Team', department: 'IT Service Desk' },
]

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('eduos_session_user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('eduos_session_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('eduos_session_user')
    }
  }, [user])

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = DEMO_USERS.find(u => u.email === email && u.password === password)
        if (foundUser) {
          const sessionUser = {
            ...foundUser,
            lastLogin: new Date().toISOString()
          }
          setUser(sessionUser)
          resolve(sessionUser)
        } else {
          reject(new Error('Invalid email or password'))
        }
      }, 800) // simulate network latency
    })
  }

  const logout = () => {
    setUser(null)
  }

  const switchRole = (role) => {
    const foundUser = DEMO_USERS.find(u => u.role === role)
    if (foundUser) {
      setUser({
        ...foundUser,
        lastLogin: new Date().toISOString()
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, switchRole, DEMO_USERS }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
