import React from 'react'
import Navbar from '../components/Navbar'
import FooterBanner from '../components/FooterBanner'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <Navbar />
        <Outlet />
        <FooterBanner />
        <Footer />
    </>
  )
}

export default Layout
