import React, { useState, useEffect } from 'react';
import Navbar from '../componentes/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../componentes/Footer';

const Plantilla = () => {

  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar/>  {/* Pasar el estado al Navbar */}
      </header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Plantilla;
