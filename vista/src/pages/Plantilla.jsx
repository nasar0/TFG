import React from 'react';
import Navbar from '../componentes/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../componentes/Footer';
import AnimatedPage from '../componentes/Animatepage';
import Totop from '../componentes/Totop';

const Plantilla = () => {
  const location = useLocation();
  
  return (
    <>
      <Totop/>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main>
        <AnimatedPage key={location.pathname}>
          <Outlet />
        </AnimatedPage>
      </main>
      <Footer />
    </>
  );
};

export default Plantilla;
