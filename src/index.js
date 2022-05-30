import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import {AuthProvider} from './context/Auth'
import './index.css';

import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import Navbar from './components/Navbar'
import Login from './pages/Login';
import Place from './pages/Place';
import Home from './pages/Home';
import Add from './pages/Add';

const Layout = () => {
  return (<>
    <Navbar />
    <div className='container mx-auto px-3'>
      <Outlet />
    </div>
  </>)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<Layout />}> 
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            
            <Route path='add' element={<PrivateRoute />}>
              <Route index element={<Add />} />
            </Route>

            <Route path='profile' element={<PrivateRoute />}>
              <Route index element={<Add />} />
            </Route>

            <Route path='i' element={<PrivateRoute />}>
              <Route path=':id' element={<Place />} />
            </Route>

          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
