import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importar el contexto de autenticación


const AdminNavbar = () => {
  const { logout } = useContext(AuthContext); // Usar la función logout del contexto
  const navigate = useNavigate();
  navigate
  const handleLogout = () => {
    logout(); // Cerrar sesión
    navigate('/'); // Redirigir al inicio
  };
  return (
    <nav className="bg-black p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo o título */}
        <div className="text-white text-2xl font-bold">
          <Link to="/admin"><h2>k<span className='mirror'>k</span>armx-Admin</h2>  </Link>
        </div>

        {/* Enlaces */}
        <ul className="flex space-x-8">
          <li>
            <Link
              to="/admin/AdminUsuarios"
              className="text-white hover:text-gray-400 transition duration-300"
            >
              Usuarios
            </Link>
          </li>
          <li>
            <Link
              to="/admin/AdminProductos"
              className="text-white hover:text-gray-400 transition duration-300"
            >
              Productos
            </Link>
          </li>
          <li>
            <Link
              to="/admin/AdminCategorias"
              className="text-white hover:text-gray-400 transition duration-300"
            >
              Categorías
            </Link>
          </li>
          <li>
            <Link
              to="/admin/AdminPromociones"
              className="text-white hover:text-gray-400 transition duration-300"
            >
              Promociones
            </Link>
          </li>
          <li>
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-700 transition duration-300"
          >
            Salir
          </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default AdminNavbar