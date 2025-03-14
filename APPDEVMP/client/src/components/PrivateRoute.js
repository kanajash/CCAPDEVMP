import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
    const userInfo = localStorage.getItem("currentUser")
  return userInfo ? <Outlet/> : <Navigate to={"/login"} replace/>
  
}

export default PrivateRoute