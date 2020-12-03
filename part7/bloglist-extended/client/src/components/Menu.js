import React from 'react'
import { Link } from 'react-router-dom'

import { Navbar } from 'react-bootstrap'

const Menu = ({ children }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="light"  variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">

        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {children}
      </Navbar.Collapse>

    </Navbar>
  )
}

export default Menu