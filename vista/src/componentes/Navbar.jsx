import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importar el contexto

function Navbar({scrollCount}) {
  const location = useLocation();
  const [isMenOpen, setIsMenOpen] = useState(false);
  const [isWomenOpen, setIsWomenOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext); // Usar el contexto
  const [hasScrolled, setHasScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Verifica si el usuario ha scrolleado más de 50px (ajusta este valor según necesites)
      if (window.scrollY > 1) {
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
  return (
    <nav className="bg-white shadow-md uppercase text-[15px] font-[400] w-full transition-all duration-300 pb-0" id='navbar'>
      <div className="flex justify-evenly text-[11px] items-center">
        <div>
          <Link to="/contact">Contact us</Link>
        </div>
        <Link to="/">
          <h2 className={`font-black  ${!hasScrolled ? "text-7xl" : "text-3xl"}`} >
            K<span className="mirror">k</span>armx
          </h2>
        </Link>
        <div className="flex items-center gap-5">
          {isAuthenticated ? ( // Si está autenticado, mostrar "Mi Perfil"
            <Link to="/account">Mi Perfil</Link>
          ) : ( // Si no está autenticado, mostrar "Login"
            <Link to="/login">Login</Link>
          )}
          <Link to="/buscador" className="w-5">
            <img src="../../public/img/icons8-search-50.png" alt="" />
          </Link>
          <Link to="/cart" className="w-5">
            <img src="../../public/img/icons8-cart-50.png" alt="" />
          </Link>
        </div>
      </div>
      {/* Resto del código del navbar */}
      <ul className="flex justify-center space-x-6 p-4 ">
        <li
          onMouseEnter={() => setIsMenOpen(true)}
          onMouseLeave={() => setIsMenOpen(false)}
          className="relative"
        >
          <Link
            to="/men"
            className="px-4 py-2 hover:bg-gray-100 rounded"
          >
            Men
          </Link>
          {isMenOpen && (
            <ul className="absolute top-full left-0 bg-white shadow-lg rounded mt-1 w-48">
              <li>
                <Link
                  to="/men/clothing"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Clothing
                </Link>
              </li>
              <li>
                <Link
                  to="/men/shoes"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Shoes
                </Link>
              </li>
              <li>
                <Link
                  to="/men/bags"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Bags
                </Link>
              </li>
              <li>
                <Link
                  to="/men/accessories"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/men/jewelry"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Jewelry
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li
          onMouseEnter={() => setIsWomenOpen(true)}
          onMouseLeave={() => setIsWomenOpen(false)}
          className="relative"
        >
          <Link
            to="/women"
            className="px-4 py-2 hover:bg-gray-100 rounded"
          >
            Women
          </Link>
          {isWomenOpen && (
            <ul className="absolute top-full left-0 bg-white shadow-lg rounded mt-1 w-48">
              <li>
                <Link
                  to="/women/clothing"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Clothing
                </Link>
              </li>
              <li>
                <Link
                  to="/women/shoes"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Shoes
                </Link>
              </li>
              <li>
                <Link
                  to="/women/bags"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Bags
                </Link>
              </li>
              <li>
                <Link
                  to="/women/accessories"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/women/jewelry"
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                >
                  Jewelry
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;