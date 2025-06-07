import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  // Función para determinar si un enlace está activo
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`flex h-screen bg-black text-white transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'}`}>
      {/* Contenido del sidebar */}
      <div className="flex flex-col w-full">
        {/* Logo y botón de toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {isExpanded && (
            <Link to="/admin" className="text-2xl font-bold">
              <h2>k<span className='mirror'>k</span>armx</h2>
            </Link>
          )}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>

        {/* Menú de navegación */}
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin/AdminUsuarios"
            className={`flex items-center p-3 rounded-lg transition-colors ${isActive('/admin/AdminUsuarios') ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 text-gray-300'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            {isExpanded && <span className="ml-3">Usuarios</span>}
          </Link>

          <Link
            to="/admin/AdminProductos"
            className={`flex items-center p-3 rounded-lg transition-colors ${isActive('/admin/AdminProductos') ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 text-gray-300'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            {isExpanded && <span className="ml-3">Productos</span>}
          </Link>

          <Link
            to="/admin/AdminCategorias"
            className={`flex items-center p-3 rounded-lg transition-colors ${isActive('/admin/AdminCategorias') ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 text-gray-300'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {isExpanded && <span className="ml-3">Categorías</span>}
          </Link>

          <Link
            to="/admin/AdminPromociones"
            className={`flex items-center p-3 rounded-lg transition-colors ${isActive('/admin/AdminPromociones') ? 'bg-gray-800 text-white' : 'hover:bg-gray-800 text-gray-300'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
            </svg>
            {isExpanded && <span className="ml-3">Promociones</span>}
          </Link>
        </nav>

        {/* Botón de salir */}
        <div className="p-4 border-t border-gray-800">
          <Link
            to="/account"
            className={`flex items-center p-3 rounded-lg transition-colors hover:bg-gray-800 text-red-400 hover:text-red-300`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {isExpanded && <span className="ml-3">Salir</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;