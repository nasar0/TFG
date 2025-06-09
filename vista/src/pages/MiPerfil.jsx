import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const MiPerfil = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState('');
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

  // Estados para el cambio de contraseña
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Cargar datos de sesión
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
          setUserEmail(data.email);
        }
      });
  }, []);

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Cargar datos del usuario cuando cambia el email
  useEffect(() => {
    if (userEmail) {
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
            setErrorMessage('');
          })
          .catch((error) => {
            console.error("Error al cargar los datos del usuario:", error);
          });
      };

      cargarDatosUsuario();
    }
  }, [userEmail]);

  // Manejar cierre de sesión
  const handleLogout = () => {
    logout();
    navigate('/');
  };

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

  // Función para cambiar la contraseña
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('The password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);
    setPasswordError('');

    fetch('http://localhost/TFG/controlador/c-usuarios.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: "cambiarContrasena",
        id: id,
        contrasenna: newPassword
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSuccessMessage('Password changed successfully');
          setTimeout(() => {
            setSuccessMessage('');
            setShowChangePassword(false);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
          }, 3000);
        } else {
          throw new Error(data.message || 'Error changing password');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setPasswordError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
        setShowChangePassword(false)
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
                {rol == 0 ? <Link to="/admin"><span className="inline-block px-2 py-1 bg-white text-black text-xs font-bold uppercase">AdminDashbord</span></Link> : <span className="inline-block px-2 py-1 bg-white text-black text-xs font-bold uppercase">MEMBERSHIP</span>}
              </div>
            </div>
          </div>

          {/* Cuerpo con grid de museo */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Sección izquierda - Avatar como obra de arte */}
            <div className="lg:border-r-2 border-black p-8 flex flex-col items-center justify-center">
              <div className="relative group">
                <div className="w-40 h-40 rounded-full border-2 border-black overflow-hidden relative z-10">

                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(nombre)}&background=000000&color=fff&bold=true&length=2`}
                    alt="User Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -inset-2 border-2 border-black rounded-full transform rotate-6 scale-105 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="mt-6 text-center">
                <h2 className="text-xl font-black uppercase tracking-tightest">{nombre || 'USER NAME'}</h2>
                <p className="text-xs mt-1 opacity-70">REGISTERED</p>
              </div>

              {/* Botón para cambiar contraseña */}
              <button
                onClick={() => setShowChangePassword(!showChangePassword)}
                className={` ${showChangePassword ? 'btn' : 'btn-i'} mt-6 px-4 py-2 text-xs font-bold uppercase tracking-wider `}
              >
                {showChangePassword ? 'Cancel' : 'Change Password'}
              </button>
            </div>

            {/* Sección central - Datos del usuario */}
            <div className="lg:border-r-2 border-black p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center">
                <span className="w-6 h-px bg-black inline-block mr-2"></span>
                PERSONAL INFORMATION
              </h3>

              {showChangePassword ? (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase">CHANGE PASSWORD</h4>
                  {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}

                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider mb-1 opacity-70">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full p-2 border-b border-black focus:outline-none text-sm tracking-wider bg-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-medium tracking-wider mb-1 opacity-70">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full p-2 border-b border-black focus:outline-none text-sm tracking-wider bg-transparent"
                      required
                    />
                  </div>

                  <button
                    onClick={handleChangePassword}
                    className="mt-4 px-4 py-2 btn text-xs font-bold uppercase tracking-wider  disabled:opacity-50  flex items-center justify-center"
                  >
                    <span>Save New Password</span>
                  </button>
                </div>
              ) : (
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
              )}
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
                  className="px-6 py-2 btn-i text-xs font-bold uppercase tracking-wider "
                >
                  Cancel
                </button>
                <button
                  onClick={modificarDatos}
                  className="px-6 py-2 btn text-xs font-bold uppercase tracking-wider  disabled:opacity-50  flex items-center"
                >
                    <span>Save Changes →</span>
                </button>
              </div>
            ) : (
              <div className="flex justify-between">
                <button
                  onClick={toggleEdicion}
                  className="px-6 py-2 border-2 btn-i text-xs font-bold uppercase tracking-wider flex items-center"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="px-6 py-2 btn text-xs font-bold uppercase tracking-wider transition-colors flex items-center"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                    <path d="M16 17l5-5-5-5" />
                    <path d="M21 12H9" />
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