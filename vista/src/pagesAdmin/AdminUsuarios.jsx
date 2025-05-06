import React, { useEffect, useState } from 'react';

const AdminUsuarios = () => {
  const [listar, setListar] = useState([]);
  const [editando, setEditando] = useState(null);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [rol, setRol] = useState('');

  useEffect(() => {
    fetch('http://localhost/TFG/controlador/c-usuarios.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "listar"  }),
    })
      .then((response) => response.json())
      .then((data) => setListar(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const eliminar = (id) => {
    fetch('http://localhost/TFG/controlador/c-usuarios.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "eliminar", id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setListar(listar.filter(usuario => usuario.id_usuario !== id));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const iniciarEdicion = (usuario) => {
    setEditando(usuario.id_usuario);
    setNombre(usuario.nombre);
    setCorreo(usuario.correo);
    setDireccion(usuario.direccion);
    setTelefono(usuario.telefono);
    setRol(usuario.rol);
  };

  const formularioCambios = (setter) => (e) => {
    setter(e.target.value);
  };

  const guardarEdicion = (id) => {
    const datosActualizados = {
      action: "modificar",
      id,
      nombre,
      correo,
      direccion,
      telefono,
      rol,
    };
  
    fetch('http://localhost/TFG/controlador/c-usuarios.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosActualizados),
    })
      .then((response) => response.json())
      .then((data) => {
        setListar(listar.map(usuario => usuario.id_usuario === id ? { ...usuario, ...datosActualizados } : usuario));
        setEditando(null);
        // Resetear los estados
        setNombre('');
        setCorreo('');
        setDireccion('');
        setTelefono('');
        setRol('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="overflow-hidden bg-white shadow-xl rounded-2xl border border-gray-300">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              {['ID', 'Nombre', 'Correo', 'Dirección', 'Teléfono', 'Rol', 'Acciones'].map((header) => (
                <th key={header} className="px-6 py-4 text-left font-semibold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {listar.map((usuario) => (
              <tr key={usuario.id_usuario} className="border-b hover:bg-blue-50 transition duration-300">
                <td className="px-6 py-4 font-medium">{usuario.id_usuario}</td>
                <td className="px-6 py-4">
                  {editando === usuario.id_usuario ? (
                    <input type="text" value={nombre} onChange={formularioCambios(setNombre)} className="border rounded px-3 py-1 w-full" />
                  ) : (
                    usuario.nombre
                  )}
                </td>
                <td className="px-6 py-4">
                  {editando === usuario.id_usuario ? (
                    <input type="email" value={correo} onChange={formularioCambios(setCorreo)} className="border rounded px-3 py-1 w-full" />
                  ) : (
                    usuario.correo
                  )}
                </td>
                <td className="px-6 py-4">
                  {editando === usuario.id_usuario ? (
                    <input type="text" value={direccion} onChange={formularioCambios(setDireccion)} className="border rounded px-3 py-1 w-full" />
                  ) : (
                    usuario.direccion
                  )}
                </td>
                <td className="px-6 py-4">
                  {editando === usuario.id_usuario ? (
                    <input type="text" value={telefono} onChange={formularioCambios(setTelefono)} className="border rounded px-3 py-1 w-full" />
                  ) : (
                    usuario.telefono
                  )}
                </td>
                <td className="px-6 py-4">
                  {editando === usuario.id_usuario ? (
                    <select value={rol} onChange={formularioCambios(setRol)} className="border rounded px-3 py-1 w-full">
                      <option value={0}>Admin</option>
                      <option value={1}>Usuario</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${usuario.rol === 0 ? 'bg-blue-200 text-blue-700' : 'bg-green-200 text-green-700'}`}>
                      {usuario.rol === 0 ? 'Admin' : 'Usuario'}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  {editando === usuario.id_usuario ? (
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition" onClick={() => guardarEdicion(usuario.id_usuario)}>
                      Guardar
                    </button>
                  ) : (
                    <button className="bg-green-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-600 transition" onClick={() => iniciarEdicion(usuario)}>
                      Modificar
                    </button>
                  )}
                  <button
                    disabled={usuario.rol === 0}
                    className={`bg-red-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-red-600 transition ${usuario.rol === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => eliminar(usuario.id_usuario)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsuarios;