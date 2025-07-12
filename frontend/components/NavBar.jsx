import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  const activeClass = 'text-green-300 font-semibold'

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="logo" src="logo.png" />
        </div>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Re-Wear</a>
      </div>
      <div className='flex gap-10 font-extralight'>
        <NavLink to="/" className={({ isActive }) => isActive ? activeClass : ''}>
          Home
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? activeClass : ''}>
          Products
        </NavLink>
        <NavLink to="/requests" className={({ isActive }) => isActive ? activeClass : ''}>
          Requests
        </NavLink>
      </div>
    </div>
  )
}

export default NavBar
