import React, { useState, useEffect } from 'react';

const AdminProductos = () => {
  const [listar, setListar] = useState([]);
  const [editando, setEditando] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [tamano, setTamano] = useState('');
  const [color, setColor] = useState('');
  const [img_url, setImg_url] = useState('');
  const [genero, setGenero] = useState('');
  const [categoria, setCategoria] = useState(0);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null); // Estado para la imagen seleccionada

  // Cargar la lista de productos al inicio
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    fetch('http://localhost/TFG/controlador/c-productos.php', {
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
  };

  // Eliminar un producto
  const eliminar = (id) => {
    fetch('http://localhost/TFG/controlador/c-productos.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "eliminar", id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListar(listar.filter((producto) => producto.id_producto !== id));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // Iniciar la edición de un producto
  const iniciarEdicion = (producto) => {
    setEditando(producto.id_producto);
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio);
    setStock(producto.stock);
    setTamano(producto.tamano);
    setColor(producto.color);
    setImg_url(producto.img_url);
    setGenero(producto.genero);
    setCategoria(producto.categoria);
    setModalAbierto(true); // Abrir el modal
  };

  // Función para manejar la selección de archivos
  const manejarSeleccionArchivo = (e) => {
    const archivo = e.target.files[0]; // Obtener el archivo seleccionado
    if (archivo) {
      setImagenSeleccionada(archivo); // Guardar el archivo en el estado
    }
  };

  // Función para subir la imagen al backend
  const subirImagen = async () => {
    if (!imagenSeleccionada) {
      alert("Por favor, selecciona una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append('imagen', imagenSeleccionada); // Agregar la imagen al FormData


    fetch('http://localhost/TFG/controlador/c-productos.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formData }),
    }).then((response) => response.json())
      .then((data) => {
        setImg_url(data.url); 
        alert("Imagen subida correctamente.");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al subir la imagen.");
      });
  };

  // Guardar los cambios (editar o agregar)
  const guardarCambios = () => {
    const datos = {
      action: editando ? "modificar" : "agregar",
      id: editando,
      nombre,
      descripcion,
      precio,
      stock,
      tamano,
      color,
      img_url,
      genero,
      categoria,
    };

    fetch('http://localhost/TFG/controlador/c-productos.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        cargarProductos(); // Recargar la lista de productos
        cerrarModal(); // Cerrar el modal
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // Cerrar el modal y resetear los estados
  const cerrarModal = () => {
    setModalAbierto(false);
    setEditando(null);
    setNombre('');
    setDescripcion('');
    setPrecio(0);
    setStock(0);
    setTamano('');
    setColor('');
    setImg_url('');
    setGenero('');
    setCategoria(0);
    setImagenSeleccionada(null); // Limpiar la imagen seleccionada
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="overflow-hidden bg-white shadow-xl rounded-2xl border border-gray-300">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <tr>
                {['ID', 'Nombre', 'Descripción', 'Precio', 'Stock', 'Tamaño', 'Color', 'Imagen', 'Género', 'Acciones'].map((header) => (
                  <th key={header} className="px-6 py-4 text-left font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {listar.map((producto) => (
                <tr key={producto.id_producto} className="border-b hover:bg-blue-50 transition duration-300">
                  <td className="px-6 py-4 font-medium">{producto.id_producto}</td>
                  <td className="px-6 py-4">{producto.nombre}</td>
                  <td className="px-6 py-4">{producto.descripcion}</td>
                  <td className="px-6 py-4">{producto.precio}</td>
                  <td className="px-6 py-4">{producto.stock}</td>
                  <td className="px-6 py-4">{producto.tamano}</td>
                  <td className="px-6 py-4">{producto.color}</td>
                  <td className="px-6 py-4">{producto.img_url.split(',')[0]}</td>
                  <td className="px-6 py-4">{producto.genero}</td>
                  <td className="px-6 py-4 flex gap-2 items-center">
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-600 transition"
                      onClick={() => iniciarEdicion(producto)}
                    >
                      Modificar
                    </button>
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-red-600 transition"
                      onClick={() => eliminar(producto.id_producto)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition"
          onClick={() => {
            setEditando(null); 
            setModalAbierto(true); 
          }}
        >
          Agregar Producto
        </button>
      </div>

      {/* Modal */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">
              {editando ? "Modificar Producto" : "Agregar Producto"}
            </h2>
            <form>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <textarea
                  placeholder="Descripción"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Precio"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Tamaño"
                  value={tamano}
                  onChange={(e) => setTamano(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                {/* Input para subir imágenes */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={manejarSeleccionArchivo}
                  className="w-full p-2 border rounded"
                />
                <button
                  type="button"
                  onClick={subirImagen}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition"
                >
                  Subir Imagen
                </button>
                {img_url && (
                  <p className="text-sm text-gray-600">URL de la imagen: {img_url}</p>
                )}
                <input
                  type="text"
                  placeholder="Género"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Categoría"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-600 transition"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition"
                  onClick={guardarCambios}
                >
                  {editando ? "Guardar Cambios" : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProductos;