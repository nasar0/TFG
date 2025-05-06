import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const MiPerfil = () => {
  const { logout,isAuthenticated } = useContext(AuthContext);
  
  
  const [userEmail, setUserEmail] = useState('');
  useEffect(() => {
    fetch('http://localhost/TFG/controlador/c-usuarios.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "getSesion" }),
      credentials: 'include',
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.email) {
        setUserEmail(data.email); // Aquí seteas el email cuando se recupera la sesión
      }
    });
  }, []);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Redirige a la página de login si no está autenticado
    }
  }, [isAuthenticated]);
  // Cuando el email cambia, cargamos los datos del usuario
  useEffect(() => {
    if (userEmail) { // Solo cargar datos si el email está disponible
      const cargarDatosUsuario = () => {
        fetch('http://localhost/TFG/controlador/c-usuarios.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: "listarEmail", email: userEmail }),
          credentials: 'include',
        })
        .then((response) => response.json())
        .then((data) => {
          setNombre(data.nombre);
          setCorreo(data.correo);
          setDireccion(data.direccion);
          setTelefono(data.telefono);
          setId(data.id_usuario);
          setRol(data.rol);
        })
        .catch((error) => {
          console.error("Error al cargar los datos del usuario:", error);
        });
      };

      cargarDatosUsuario();
    }
  }, [userEmail]);
  const navigate = useNavigate();
  
  // Estados para los datos del usuario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [id, setId] = useState(-1);
  const [rol, setRol] = useState('');

  
  // Estados para la UI
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  // Manejar cierre de sesión
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Cargar datos del usuario
  useEffect(() => {
    const cargarDatosUsuario = () => {
      setIsLoading(true);
      fetch('http://localhost/TFG/controlador/c-usuarios.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: "listarEmail", email: userEmail }),
      })
        .then((response) => response.json())
        .then((data) => {
          setNombre(data.nombre);
          setCorreo(data.correo);
          setDireccion(data.direccion);
          setTelefono(data.telefono);
          setId(data.id_usuario);
          setRol(data.rol);
          setErrorMessage('');
        })
        .catch((error) => {
          console.error('Error:', error);
          setErrorMessage('Error al cargar los datos del perfil');
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    cargarDatosUsuario();
  }, [userEmail]);

  // Función para modificar los datos
  const modificarDatos = () => {
    setIsLoading(true);
    setErrorMessage('');
    
    if (!nombre.trim()) {
      setErrorMessage('El nombre es obligatorio');
      setIsLoading(false);
      return;
    }

    fetch('http://localhost/TFG/controlador/c-usuarios.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        action: "modificar",
        id: id,
        nombre: nombre,
        correo: correo,
        direccion: direccion,
        telefono: telefono
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSuccessMessage('Perfil actualizado correctamente');
          setTimeout(() => setSuccessMessage(''), 3000);
          setIsEditing(false);
        } else {
          throw new Error(data.message || 'Error al actualizar el perfil');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Alternar modo edición
  const toggleEdicion = () => {
    setIsEditing(!isEditing);
    setSuccessMessage('');
    setErrorMessage('');
  };
  
  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex justify-center items-center">
      {/* Líneas de construcción (estilo Virgil Abloh) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-px bg-black/5 left-1/4 absolute"></div>
        <div className="h-full w-px bg-black/5 left-1/2 absolute"></div>
        <div className="h-full w-px bg-black/5 left-3/4 absolute"></div>
        <div className="w-full h-px bg-black/5 top-1/3 absolute"></div>
        <div className="w-full h-px bg-black/5 top-2/3 absolute"></div>
      </div>
  
      <div className="container mx-auto px-4 py-12 relative">
        {/* Tarjeta conceptual con efecto "etiqueta de exhibición" */}
        <div className="border-2 border-black rounded-lg bg-white relative overflow-hidden">
          {/* Encabezado como ficha técnica */}
          <div className="border-b-2 border-black p-5 bg-black text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-black uppercase tracking-tighter">USER PROFILE</h1>
                <p className="text-xs opacity-80 mt-1">KKX-{new Date().getFullYear()}-PROFILE-EDITION</p>
              </div>
              <div className="text-right">
                {rol==0? <Link to="/admin"><span className="inline-block px-2 py-1 bg-white text-black text-xs font-bold uppercase">AdminDashbord</span></Link>:<span className="inline-block px-2 py-1 bg-white text-black text-xs font-bold uppercase">MEMBERSHIP</span>}
              </div>
            </div>
          </div>
          
  
          {/* Cuerpo con grid de museo */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Sección izquierda - Avatar como obra de arte */}
            <div className="lg:border-r-2 border-black p-8 flex flex-col items-center justify-center">
              <div className="relative group">
                <div className="w-40 h-40 rounded-full border-2 border-black overflow-hidden relative z-10">
                  {isLoading ? (
                    <div className="h-full w-full bg-gray-200 animate-pulse"></div>
                  ) : (
                    <img 
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(nombre)}&background=000000&color=fff&bold=true&length=2`}
                      alt="User Avatar" 
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="absolute -inset-2 border-2 border-black rounded-full transform rotate-6 scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="mt-6 text-center">
                <h2 className="text-xl font-black uppercase tracking-tightest">{nombre || 'USER NAME'}</h2>
                <p className="text-xs mt-1 opacity-70">REGISTERED</p>
              </div>
            </div>
  
            {/* Sección central - Datos del usuario */}
            <div className="lg:border-r-2 border-black p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center">
                <span className="w-6 h-px bg-black inline-block mr-2"></span>
                PERSONAL INFORMATION
              </h3>
  
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase font-medium tracking-wider mb-2 opacity-70">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full p-3 border-b border-black focus:outline-none text-sm uppercase tracking-wider bg-transparent"
                      required
                    />
                  ) : (
                    <p className="text-lg font-medium uppercase tracking-tight">{nombre}</p>
                  )}
                </div>
  
                <div>
                  <label className="block text-xs uppercase font-medium tracking-wider mb-2 opacity-70">Email</label>
                  <p className="text-sm uppercase tracking-wider text-gray-700">{correo}</p>
                </div>
              </div>
            </div>
  
            {/* Sección derecha - Datos adicionales */}
            <div className="p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center">
                <span className="w-6 h-px bg-black inline-block mr-2"></span>
                CONTACT DETAILS
              </h3>
  
              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase font-medium tracking-wider mb-2 opacity-70">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      className="w-full p-3 border-b border-black focus:outline-none text-sm uppercase tracking-wider bg-transparent"
                    />
                  ) : (
                    <p className="text-sm uppercase tracking-wider">{telefono || 'NOT PROVIDED'}</p>
                  )}
                </div>
  
                <div>
                  <label className="block text-xs uppercase font-medium tracking-wider mb-2 opacity-70">Address</label>
                  {isEditing ? (
                    <textarea
                      value={direccion}
                      onChange={(e) => setDireccion(e.target.value)}
                      className="w-full p-3 border-b border-black focus:outline-none text-sm uppercase tracking-wider bg-transparent resize-none"
                      rows="2"
                    />
                  ) : (
                    <p className="text-sm uppercase tracking-wider whitespace-pre-line">{direccion || 'NOT PROVIDED'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
  
          {/* Pie de tarjeta - Acciones */}
          <div className="border-t-2 border-black p-5 bg-gray-50">
            {isEditing ? (
              <div className="flex justify-end space-x-3">
                <button
                  onClick={toggleEdicion}
                  className="px-6 py-2 border-2 border-black text-black text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={modificarDatos}
                  disabled={isLoading}
                  className="px-6 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-gray-900 disabled:opacity-50 transition-colors flex items-center"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25"/>
                        <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" fill="currentColor"/>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span>Save Changes →</span>
                  )}
                </button>
              </div>
            ) : (
              <div className="flex justify-between">
                <button
                  onClick={toggleEdicion}
                  className="px-6 py-2 border-2 border-black text-black text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors flex items-center"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit Profile
                </button>
                
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-gray-900 transition-colors flex items-center"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                    <path d="M16 17l5-5-5-5"/>
                    <path d="M21 12H9"/>
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
  
        {/* Nota conceptual al pie */}
        <div className="mt-8 text-center">
          <p className="text-xs uppercase tracking-widest opacity-50">
            KKX-USER-PROFILE-{new Date().getFullYear()} | {nombre || 'USER'} | ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;