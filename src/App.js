
import React from 'react'
import { Header } from './Components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Pages/Homepage/Homepage'

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
      </Routes>
    </div>
  )
}

export default App