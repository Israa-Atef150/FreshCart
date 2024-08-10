import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { Toaster } from 'react-hot-toast'

const Layout = () => {
  return (
    <div className='d-flex flex-column min-vh-100'>
        <Navbar/>
        <div className="container flex-grow-1">
            <Outlet/>
        </div>
        <Toaster/>
        <Footer/>
    </div>
  )
}

export default Layout