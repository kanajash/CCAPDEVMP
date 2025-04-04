import React from 'react'
import { Link } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'
import { FaUser } from "react-icons/fa6"

export default function Navbar() {

  const user = JSON.parse(localStorage.getItem("currentUser"))

  const logOut = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login"
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Co-Working Space</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{ marginRight: "8%" }}>

              {/* Always show About */}
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>

              {user ? (
                <>
                  <NavDropdown title={<FaUser />} id="basic-nav-dropdown" className='mx-2'>
                    <NavDropdown.Item>
                      <Link to="/bookings" className='text-dark text-decoration-none'>Profile</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logOut}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </>
              )}

              {user?.isAdmin &&
                <NavDropdown title="Admin" id="basic-nav-dropdown" className='mx-2'>
                  <NavDropdown.Item>
                    <Link to="/admin/bookings" className='text-dark text-decoration-none'>Bookings</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/admin/rooms" className='text-dark text-decoration-none'>Rooms</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/admin/users" className='text-dark text-decoration-none'>Users</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              }

            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
