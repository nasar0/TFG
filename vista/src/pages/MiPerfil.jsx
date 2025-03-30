import React, { useContext, useEffect, useState } from 'react';
import { data, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importar el contexto de autenticación

const MiPerfil = () => {
  const { logout } = useContext(AuthContext); // Usar la función logout del contexto
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Cerrar sesión
    navigate('/'); // Redirigir al inicio
  };
  
    const [listar, setListar] = useState([]);
    const [editando, setEditando] = useState(null);
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');

    const correoIncio = localStorage.getItem("userEmail");
    useEffect(() => {
      fetch('http://localhost/TFG/controlador/c-usuarios.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: "listarEmail" ,email:correoIncio }),
      })
        .then((response) => response.json())
        .then((data) => {
          setNombre(data.nombre);
          setCorreo(data.correo);
          setDireccion(data.direccion);
          setTelefono(data.telefono);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, []);
    console.log(listar)
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl animate__animated animate__fadeIn">
        <h1 className="text-3xl font-bold text-center mb-6 animate__animated animate__fadeInDown">
          Mi Perfil
        </h1>

        {/* Información del usuario */}
        <div className="space-y-6">
          <div className="animate__animated animate__fadeInLeft">
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <p className="mt-1 p-2 bg-gray-50 rounded-md">{nombre}</p>
          </div>

          <div className="animate__animated animate__fadeInRight">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 p-2 bg-gray-50 rounded-md">{correo}</p>
          </div>

          <div className="animate__animated animate__fadeInLeft">
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <p className="mt-1 p-2 bg-gray-50 rounded-md">{telefono}</p>
          </div>

          <div className="animate__animated animate__fadeInRight">
            <label className="block text-sm font-medium text-gray-700">Dirección</label>
            <p className="mt-1 p-2 bg-gray-50 rounded-md">{direccion}</p>
          </div>
        </div>

        {/* Botón de Logout */}
        <div className="mt-8 flex justify-center animate__animated animate__fadeInUp">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;