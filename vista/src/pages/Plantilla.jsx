import React, { useState, useEffect } from 'react';
import Navbar from '../componentes/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../componentes/Footer';

const Plantilla = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true);  // Se activa en el primer scroll
      } else {
        setHasScrolled(false); // Se restaura si vuelve arriba
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  return (
    <>
      <header className="sticky top-0 z-50">
        <Navbar hasScrolled={hasScrolled} />  {/* Pasar el estado al Navbar */}
      </header>
      <main className="mt-[80px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Plantilla;
