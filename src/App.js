import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './pages/LoginPage/LoginPage'
import PrivateRoutes from './utils/PrivateRoutes'
import HospitalPages from './pages/HospitalPages/HospitalPages'
import StaffPages from './pages/StaffPages/StaffPages'
import {AuthProvider} from './context/AuthContext'

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path = '/' element = {<LoginPage/>}/>
          <Route element = {<PrivateRoutes/>}>
            <Route path='/hospital/:username/*' element={<HospitalPages/>}/>
          </Route>
          <Route path = '/staff//*' element = {<StaffPages/>}/>
        </Routes>
      </AuthProvider>

    </>
  )
}

export default App