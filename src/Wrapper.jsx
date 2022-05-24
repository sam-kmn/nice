
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'

const Wrapper = () => {
  return (
    <div className='container mx-auto'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Wrapper