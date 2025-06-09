import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Buscador from './Buscador';
import Cart from '../pages/Cart';

function Navbar() {
  const [isMenOpen, setIsMenOpen] = useState(false);
  const [isWomenOpen, setIsWomenOpen] = useState(false);
  const [isExclusiveOpen, setIsExclusiveOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBuscador, setShowBuscador] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate()
  const { idUser,cartCount } = useContext(AuthContext);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
   if (showBuscador) {
    document.body.style.overflow = 'hidden';
   }else{
    document.body.style.overflow = 'auto';
   }
  }, [showBuscador]);

  return (
    <>
      <nav className="bg-white shadow-md uppercase text-[15px] font-[400] w-full transition-all duration-300 pb-0 fixed z-50">
        {/* Top Section - Logo, Contact, Login */}
        <div className="flex justify-between items-center px-4 py-2">
          {/* Contact Link - hidden on mobile */}
          <div className="hidden md:block md:w-1/4">
            <Link to="/contact" className="text-[11px]">Contact us</Link>
          </div>

          {/* Logo - Centered */}
          <div className="md:w-2/4 flex justify-center">
            <Link to="/">
              <h2 className={`font-black ${!hasScrolled ? "text-5xl md:text-7xl" : "text-3xl md:text-4xl"} transition-[font-size] duration-500 ease-in-out`}>
                K<span className="mirror">k</span>armx
              </h2>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setShowBuscador(true)}
              className="w-5"
            >
              <img src="/img/icons8-search-50.png" alt="Search" />
            </button>
            <Link to="/cart" className="w-5 relative">
              <img src="../../public/img/icons8-cart-50.png" alt="Cart" />
              {cartCount > 0 && (
                <span className="
                absolute -bottom-[2px] -right-[2px]
                inline-flex items-center justify-center
                min-w-[12px] h-[15px] 
                text-[10px] leading-none font-medium text-white 
                bg-black rounded-full
                transform transition-transform duration-150
                shadow-sm
              ">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
            <Link to={"/fav"}><i className='bx bx-heart text-black text-[20px]'></i></Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex md:w-1/4 items-center gap-5 justify-end">
            {isAuthenticated ? (
              <Link to="/account" className="text-[11px]">Account</Link>
            ) : (
              <Link to="/login" className="text-[11px]">Login</Link>
            )}
            <button
              onClick={() => setShowBuscador(true)}
              className="w-5"
            >
              <img src="/img/icons8-search-50.png" alt="Search" />
            </button>
            <button
              onClick={() => setShowCart(true)}
              className="relative p-1 transition-all duration-200"
              aria-label="Carrito de compras"
            >
              {/* Icono del carrito */}
              <img
                src="../../public/img/icons8-cart-50.png"
                alt="Icono de carrito"
                className="w-6 h-6 object-contain"
              />

              {/* Notificación de cantidad */}
              {cartCount > 0 && (
                <span className="
                absolute -bottom-[2px] -right-[2px]
                inline-flex items-center justify-center
                min-w-[18px] h-[18px] 
                text-[10px] leading-none font-medium text-white 
                bg-black rounded-full
                transform transition-transform duration-150
                shadow-sm
              ">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>
            <Link to={"/fav"}><i className='bx bx-heart text-black text-[20px]'></i></Link>
          </div>
        </div>

        {/* Category Navigation - Desktop */}
        <div className="hidden md:block">
          <ul className="flex justify-center space-x-6 p-4">
            <li
              onMouseEnter={() => setIsMenOpen(true)}
              onMouseLeave={() => setIsMenOpen(false)}
              className="relative"
            >
              <Link
                to="/catalog/men"
                className="px-4 py-2 hover:bg-gray-100 rounded"
              >
                Men
              </Link>
              {isMenOpen && (
                <ul className="absolute top-full left-0 bg-white shadow-lg rounded mt-1 w-48 animate__animated animate__fadeIn">
                  {['Clothing', 'Shoes', 'Bags', 'Accessories', 'Jewelry'].map((item) => (
                    <li key={item}>
                      <Link
                        to={`/catalog/men/${item.toLowerCase()}`}
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li
              onMouseEnter={() => setIsWomenOpen(true)}
              onMouseLeave={() => setIsWomenOpen(false)}
              className="relative"
            >
              <Link
                to="/catalog/women"
                className="px-4 py-2 hover:bg-gray-100 rounded"
              >
                Women
              </Link>
              {isWomenOpen && (
                <ul className="absolute top-full left-0 bg-white shadow-lg rounded mt-1 w-48 animate__animated animate__fadeIn">
                  {['Clothing', 'Shoes', 'Bags', 'Accessories', 'Jewelry'].map((item) => (
                    <li key={item}>
                      <Link
                        to={`/catalog/women/${item.toLowerCase()}`}
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li
              onMouseEnter={() => setIsExclusiveOpen(true)}
              onMouseLeave={() => setIsExclusiveOpen(false)}
              className="relative"
            >
              <Link
                to="/catalog/exclusive"
                className="px-4 py-2 hover:bg-gray-100 rounded"
              >
                Exclusive
              </Link>
              {isExclusiveOpen && (
                <ul className="absolute top-full left-0 bg-white shadow-lg rounded mt-1 w-48 animate__animated animate__fadeIn">
                  {['Clothing', 'Shoes', 'Bags', 'Accessories', 'Jewelry'].map((item) => (
                    <li key={item}>
                      <Link
                        to={`/catalog/exclusive/${item.toLowerCase()}`}
                        className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      {/* Mobile Menu Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-48 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className="p-4">
          <div className="flex justify-end mb-4">
            <button onClick={() => setMobileMenuOpen(false)} className="text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4 py-6">
            <Link to="/contact" className="block py-2 text-[12px]" onClick={() => setMobileMenuOpen(false)}>
              Contact us
            </Link>

            {isAuthenticated ? (
              <Link to="/account" className="block py-2 text-[12px]" onClick={() => setMobileMenuOpen(false)}>
                Account
              </Link>
            ) : (
              <Link to="/login" className="block py-2 text-[12px]" onClick={() => setMobileMenuOpen(false)}>
                Login
              </Link>
            )}

            <div className="border-t border-gray-200 pt-4">
              <div className="space-y-2">
                <div>
                  <button
                    onClick={() => setIsMenOpen(!isMenOpen)}
                    className="w-full flex justify-between items-center py-2 uppercase"
                  >
                    <span>Men</span>
                    <svg className={`w-4 h-4 transition-transform ${isMenOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isMenOpen && (
                    <div className="pl-4 py-2 space-y-2 animate__animated animate__fadeIn">
                      {['All', 'Clothing', 'Shoes', 'Bags', 'Accessories', 'Jewelry'].map((item) => (
                        (item == "All" ?
                          <Link
                            key={item}
                            to={`/catalog/men`}
                            className="block py-1 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item}
                          </Link>
                          :
                          <Link
                            key={item}
                            to={`/catalog/men/${item.toLowerCase()}`}
                            className="block py-1 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => setIsWomenOpen(!isWomenOpen)}
                    className="w-full flex justify-between items-center py-2 uppercase"
                  >
                    <span>Women</span>
                    <svg className={`w-4 h-4 transition-transform ${isWomenOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isWomenOpen && (
                    <div className="pl-4 py-2 space-y-2 animate__animated animate__fadeIn">
                      {['All', 'Clothing', 'Shoes', 'Bags', 'Accessories', 'Jewelry'].map((item) => (
                        (item == "All" ?
                          <Link
                            key={item}
                            to={`/catalog/women`}
                            className="block py-1 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item}
                          </Link>
                          :
                          <Link
                            key={item}
                            to={`/catalog/women/${item.toLowerCase()}`}
                            className="block py-1 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <button
                    onClick={() => setIsExclusiveOpen(!isExclusiveOpen)}
                    className="w-full flex justify-between items-center py-2 uppercase"
                  >
                    <span>Exclusive</span>
                    <svg className={`w-4 h-4 transition-transform ${isExclusiveOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isExclusiveOpen && (
                    <div className="pl-4 py-2 space-y-2 animate__animated animate__fadeIn">
                      {['All', 'Clothing', 'Shoes', 'Bags', 'Accessories', 'Jewelry'].map((item) => (
                        (item == "All" ?
                          <Link
                            key={item}
                            to={`/catalog/exclusive`}
                            className="block py-1 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item}
                          </Link>
                          :
                          <Link
                            key={item}
                            to={`/catalog/exclusive/${item.toLowerCase()}`}
                            className="block py-1 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {showBuscador && <Buscador onClose={() => setShowBuscador(false)} />}
      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </>
  );
}

export default Navbar;