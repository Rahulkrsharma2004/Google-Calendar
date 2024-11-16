
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default AllRoutes
