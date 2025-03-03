import React from 'react'
import Navbar from '../componentes/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../componentes/Footer'

const Plantilla = () => {
  return (
    <>
        <header>
            <Navbar/>
        </header>
        <main>
            <Outlet/>
        </main>
        <Footer/>
    </>
  )
}

export default Plantilla