import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
  }, [])

  if (loading) return null

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}
