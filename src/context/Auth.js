import { auth } from '../firebase'

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const signUp = async (name, email, password) => {
    const response = await auth.createUserWithEmailAndPassword(email, password)
    await response.user.updateProfile({displayName: name})
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe

  }, [])
  

  const value = {
    currentUser, signUp
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>)
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) throw Error('Context must be used within Provider')
  return context
}

export default useAuth