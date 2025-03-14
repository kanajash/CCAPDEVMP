import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function AdminRoute() {
    const userInfo = JSON.parse(localStorage.getItem("currentUser"))

  return userInfo.isAdmin ? <Outlet/> : <Navigate to={"/login"} replace/>
  
}

export default AdminRoute