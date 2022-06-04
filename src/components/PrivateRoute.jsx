
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/Auth'

const PrivateRoute = () => {
  const {currentUser} = useAuth()

  return currentUser ? <Outlet /> : <Navigate to={'/login'} replace={true} />
}

export default PrivateRoute