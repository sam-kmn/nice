import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import {AuthProvider} from './context/Auth'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Wrapper from './Wrapper';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Add from './pages/Add';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<Wrapper />}> 
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            
            <Route path='add' element={<PrivateRoute />}>
              <Route index element={<Add />} />
            </Route>

          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
