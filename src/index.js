import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import {AuthProvider} from './context/Auth'
import { SearchProvider } from './context/Search';
import './index.css';

import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import Navbar from './components/Navbar'
import Login from './pages/Login';
import Post from './pages/Post';
import Home from './pages/Home';
import Add from './pages/Add';
import User from './pages/User';

const Layout = () => {
  return (
  <div className='flex flex-col h-screen'>
    <Navbar />
    <div className='flex-1 container mx-auto px-3'>
      <Outlet />
    </div>
  </div>)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <AuthProvider>
    <SearchProvider>

      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<Layout />}> 
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            
            <Route path='add' element={<PrivateRoute />}>
              <Route index element={<Add />} />
            </Route>

            <Route path='u' element={<PrivateRoute />}>
              <Route path=':uid' element={<User />} />
            </Route>

            <Route path='i' element={<PrivateRoute />}>
              <Route path=':id' element={<Post />} />
            </Route>

          </Route>

        </Routes>
      </BrowserRouter>

    </SearchProvider>
    </AuthProvider>
    
  </React.StrictMode>
);
