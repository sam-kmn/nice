import { auth } from '../firebase'

import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const signIn = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password)
  }

  const signUp = async (name, email, password) => {
    const response = await auth.createUserWithEmailAndPassword(email, password)
    await response.user.updateProfile({displayName: name})
  }

  const signOut = () => auth.signOut()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe

  }, [])
  

  const value = {
    currentUser, signUp, signOut, signIn
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>)
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) throw Error('Context must be used within Provider')
  return context
}
