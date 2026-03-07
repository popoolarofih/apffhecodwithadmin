import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [checked,    setChecked]    = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem('apffhecod_admin') === 'true') setIsLoggedIn(true)
    } catch (_) {}
    setChecked(true)
  }, [])

  const login = (username, password) => {
    const validUser = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin'
    const validPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'apffhecod2024'
    if (username === validUser && password === validPass) {
      setIsLoggedIn(true)
      try { sessionStorage.setItem('apffhecod_admin', 'true') } catch (_) {}
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    try { sessionStorage.removeItem('apffhecod_admin') } catch (_) {}
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, checked }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
