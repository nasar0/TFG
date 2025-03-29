import React, { useEffect, useState } from 'react';

const AdminPromociones = () => {
  const [listar, setListar] = useState([]);
  const [editando, setEditando] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [descuento, setDescuento] = useState(0.0);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [nombreNuevo, setNombreNuevo] = useState('');
  const [descripcionNuevo, setDescripcionNuevo] = useState('');
  const [descuentoNuevo, setDescuentoNuevo] = useState(0.0);
  const [fechaInicioNuevo, setFechaInicioNuevo] = useState('');
  const [fechaFinNuevo, setFechaFinNuevo] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);

  // Cargar las promociones al iniciar
  useEffect(() => {
    cargarPromociones();
  }, []);

  const cargarPromociones = () => {
    fetch('http://localhost/TFG/controlador/c-promociones.php', {
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

  const iniciarEdicion = (promocion) => {
    setEditando(promocion.id);
    setNombre(promocion.nombre);
    setDescripcion(promocion.descripcion);
    setDescuento(promocion.descuento);
    setFechaInicio(promocion.fechaInicio);
    setFechaFin(promocion.fechaFin);
  };

  const guardarEdicion = (id) => {
    const datosActualizados = {
      action: "modificar",
      id,
      nombre,
      descripcion,
      descuento,
      fechaInicio,
      fechaFin,
    };

    fetch('http://localhost/TFG/controlador/c-promociones.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosActualizados),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListar(listar.map(promocion => promocion.id === id ? { ...promocion, ...datosActualizados } : promocion));
        setEditando(null);
        setNombre('');
        setDescripcion('');
        setDescuento(0.0);
        setFechaInicio('');
        setFechaFin('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const eliminar = (id) => {
    fetch('http://localhost/TFG/controlador/c-promociones.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "eliminar", id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListar(listar.filter(promocion => promocion.id !== id));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const agregarPromocion = () => {
    const nuevaPromocion = {
      action: "agregar",
      nombre: nombreNuevo,
      descripcion: descripcionNuevo,
      descuento: descuentoNuevo,
      fechaInicio: fechaInicioNuevo,
      fechaFin: fechaFinNuevo,
    };

    fetch('http://localhost/TFG/controlador/c-promociones.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaPromocion),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListar([...listar, data]); // Agrega la nueva promoción a la lista
        setNombreNuevo('');
        setDescripcionNuevo('');
        setDescuentoNuevo(0.0);
        setFechaInicioNuevo('');
        setFechaFinNuevo('');
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
              {['ID', 'Nombre', 'Descripción', 'Descuento', 'Fecha Inicio', 'Fecha Fin', 'Acciones'].map((header) => (
                <th key={header} className="px-6 py-4 text-left font-semibold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {listar.map((promocion) => (
              <tr key={promocion.id} className="border-b hover:bg-blue-50 transition duration-300">
                <td className="px-6 py-4 font-medium">{promocion.id}</td>
                <td className="px-6 py-4">
                  {editando === promocion.id ? (
                    <input type="text" value={nombre} onChange={formularioCambios(setNombre)} className="border rounded px-3 py-1 w-full" />
                  ) : (
                    promocion.nombre
                  )}
                </td>
                <td className="px-6 py-4">
                  {editando === promocion.id ? (
                    <input type="text" value={descripcion} onChange={formularioCambios(setDescripcion)} className="border rounded px-3 py-1 w-full" />
                  ) : (
                    promocion.descripcion
                  )}
                </td>
                <td className="px-6 py-4">
                  {editando === promocion.id ? (
                    <input type="number" step="0.01" value={descuento} onChange={formularioCambios(setDescuento)} className="border rounded px-3 py-1 w-full" />
                  ) : (
                    `${promocion.descuento}%`
                  )}
                </td>
                <td className="px-6 py-4">
                  {editando === promocion.id ? (
                    <input type="date" value={fechaInicio} onChange={formularioCambios(setFechaInicio)} className="border rounded px-3 py-1 w-full" />
                  ) : (
                    promocion.fechaInicio
                  )}
                </td>
                <td className="px-6 py-4">
                  {editando === promocion.id ? (
                    <input type="date" value={fechaFin} onChange={formularioCambios(setFechaFin)} className="border rounded px-3 py-1 w-full" />
                  ) : (
                    promocion.fechaFin
                  )}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  {editando === promocion.id ? (
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition" onClick={() => guardarEdicion(promocion.id)}>
                      Guardar
                    </button>
                  ) : (
                    <button className="bg-green-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-600 transition" onClick={() => iniciarEdicion(promocion)}>
                      Modificar
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-red-600 transition"
                    onClick={() => eliminar(promocion.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón para abrir el modal de agregar promoción */}
      <button
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-600 transition"
        onClick={() => setMostrarModal(true)}
      >
        Agregar Promoción
      </button>

      {/* Modal para agregar una nueva promoción */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Agregar Nueva Promoción</h2>
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
              <input
                type="number"
                step="0.01"
                placeholder="Descuento"
                value={descuentoNuevo}
                onChange={formularioCambios(setDescuentoNuevo)}
                className="border rounded px-3 py-2 w-full"
                required
              />
              <input
                type="date"
                placeholder="Fecha Inicio"
                value={fechaInicioNuevo}
                onChange={formularioCambios(setFechaInicioNuevo)}
                className="border rounded px-3 py-2 w-full"
                required
              />
              <input
                type="date"
                placeholder="Fecha Fin"
                value={fechaFinNuevo}
                onChange={formularioCambios(setFechaFinNuevo)}
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
                  onClick={agregarPromocion}
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

export default AdminPromociones;