import React, { useEffect, useState } from 'react';

const AdminCategorias = () => {
  const [listar, setListar] = useState([]);
  const [editando, setEditando] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [nombreNuevo, setNombreNuevo] = useState('');
  const [descripcionNuevo, setDescripcionNuevo] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para mostrar/ocultar el modal

  // Cargar las categorías al iniciar
  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = () => {
    fetch('http://localhost/TFG/controlador/c-categorias.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "listar" }),
    })
      .then((response) => response.json())
      .then((data) => {
        setListar(Array.isArray(data) ? data : [data]); // Asegúrate de que siempre sea un array
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const formularioCambios = (setter) => (e) => {
    setter(e.target.value);
  };

  const iniciarEdicion = (categoria) => {
    setEditando(categoria.id);
    setNombre(categoria.nombre);
    setDescripcion(categoria.descripcion);
  };

  const guardarEdicion = (id) => {
    const datosActualizados = {
      action: "modificar",
      id,
      nombre,
      descripcion,
    };

    fetch('http://localhost/TFG/controlador/c-categorias.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosActualizados),
    })
      .then((response) => response.json())
      .then((data) => {
        setListar(listar.map(categoria => categoria.id === id ? { ...categoria, ...datosActualizados } : categoria));
        setEditando(null);
        setNombre('');
        setDescripcion('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const eliminar = (id) => {
    fetch('http://localhost/TFG/controlador/c-categorias.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "eliminar", id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setListar(listar.filter(categoria => categoria.id !== id));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const agregarCategoria = () => {
    const nuevaCategoria = {
      action: "agregar",
      nombre: nombreNuevo, // Usar nombreNuevo
      descripcion: descripcionNuevo, // Usar descripcionNuevo
    };

    fetch('http://localhost/TFG/controlador/c-categorias.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaCategoria),
    })
      .then((response) => response.json())
      .then((data) => {
        setListar([...listar, data]); // Agrega la nueva categoría a la lista
        setNombreNuevo(''); // Limpiar el campo nombreNuevo
        setDescripcionNuevo(''); // Limpiar el campo descripcionNuevo
        setMostrarModal(false); // Cierra el modal después de agregar
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
              {['ID', 'Nombre', 'Descripción', 'Acciones'].map((header) => (
                <th key={header} className="px-6 py-4 text-left font-semibold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {listar.map((categoria, index) => (
              <tr key={index} className="border-b hover:bg-blue-50 transition duration-300">
                <td className="px-6 py-4 font-medium">{categoria.id}</td>
                <td className="px-6 py-4">
                  {editando === categoria.id ? (
                    <input type="text" value={nombre} onChange={formularioCambios(setNombre)} className="border rounded px-3 py-1 w-full" />
                  ) : (
                    categoria.nombre
                  )}
                </td>
                <td className="px-6 py-4">
                  {editando === categoria.id ? (
                    <input type="text" value={descripcion} onChange={formularioCambios(setDescripcion)} className="border rounded px-3 py-1 w-full" />
                  ) : (
                    categoria.descripcion
                  )}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  {editando === categoria.id ? (
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition" onClick={() => guardarEdicion(categoria.id)}>
                      Guardar
                    </button>
                  ) : (
                    <button className="bg-green-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-600 transition" onClick={() => iniciarEdicion(categoria)}>
                      Modificar
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-red-600 transition"
                    onClick={() => eliminar(categoria.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón para abrir el modal de agregar categoría */}
      <button
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-600 transition"
        onClick={() => setMostrarModal(true)}
      >
        Agregar Categoría
      </button>

      {/* Modal para agregar una nueva categoría */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Agregar Nueva Categoría</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombre"
                value={nombreNuevo}
                onChange={formularioCambios(setNombreNuevo)}
                className="border rounded px-3 py-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="Descripción"
                value={descripcionNuevo}
                onChange={formularioCambios(setDescripcionNuevo)}
                className="border rounded px-3 py-2 w-full"
                required
              />
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-600 transition"
                  onClick={() => setMostrarModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition"
                  onClick={agregarCategoria}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategorias;