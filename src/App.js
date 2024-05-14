
import React from 'react'
import { Header } from './Components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage/Homepage'
import DoctorDetails from './Pages/Doctors/DoctorDetail/DoctorDetails'

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/doctor-details/:id' element={<DoctorDetails />} />
      </Routes>
    </div>
  )
}

export default App