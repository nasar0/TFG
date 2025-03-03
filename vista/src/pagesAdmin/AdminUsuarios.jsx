import React, { useEffect, useState } from 'react';

const AdminUsuarios = () => {
  const [listar, setListar] = useState([]);

  useEffect(() => {
    fetch('http://localhost/TFG/controlador/c-usuarios.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "listar" }),
    })
      .then((response) => response.json())
      .then((data) => setListar(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const elimnar = (id)=>{
    fetch('http://localhost/TFG/controlador/c-usuarios.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "eliminar",id }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="overflow-x-auto bg-white shadow-xl rounded-lg border border-gray-200">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Nombre</th>
              <th className="px-6 py-3 text-left">Correo</th>
              <th className="px-6 py-3 text-left">Dirección</th>
              <th className="px-6 py-3 text-left">Teléfono</th>
              <th className="px-6 py-3 text-left">Rol</th>
              <th className="px-6 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {listar.map((usuario) => (
              <tr key={usuario.id_usuario} className="border-b hover:bg-blue-50 transition duration-300">
                <td className="px-6 py-4">{usuario.id_usuario}</td>
                <td className="px-6 py-4">{usuario.nombre}</td>
                <td className="px-6 py-4">{usuario.correo}</td>
                <td className="px-6 py-4">{usuario.direccion}</td>
                <td className="px-6 py-4">{usuario.telefono}</td>
                <td className="px-6 py-4">{usuario.rol === 0 ? "Admin" : "Usuario"}</td>
                <td className="px-6 py-4">
                  <button className="bg-green-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-600 transition duration-300 mr-2">
                    Modificar
                  </button>
                  <button
                    disabled={usuario.rol === 0}
                    className={`bg-red-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-red-600 transition duration-300 ${
                      usuario.rol === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={()=>elimnar(usuario.id_usuario)}
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