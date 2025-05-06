import React, { useState, useEffect } from 'react';

const AdminProductos = () => {
  const [listar, setListar] = useState([]); // Lista de productos
  const [modalProductoAbierto, setModalProductoAbierto] = useState(false); // Modal para datos del producto
  const [modalImagenesAbierto, setModalImagenesAbierto] = useState(false); // Modal para imágenes
  const [productoActual, setProductoActual] = useState(null); // Producto seleccionado
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [tamano, setTamano] = useState('');
  const [color, setColor] = useState('');
  const [genero, setGenero] = useState('');
  const [categoria, setCategoria] = useState(0);
  const [imagenesSeleccionadas, setImagenesSeleccionadas] = useState([]); // Imágenes seleccionadas
  const [imagenesActuales, setImagenesActuales] = useState([]); // Imágenes actuales del producto
  const [busqueda, setBusqueda] = useState('');

  // 2. Manejar el cambio en el input
  const busquedaSave = (e) => {
    setBusqueda(e.target.value);
  };
  // Cargar la lista de productos al inicio
  useEffect(() => {
    cargarProductos();
  }, []);

  // Función para cargar los productos
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

  // Función para abrir el modal de datos del producto
  const abrirModalProducto = (producto = null) => {
    if (producto) {
      // Si se está editando un producto, llenar los campos con sus datos
      setProductoActual(producto);
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      setPrecio(producto.precio);
      setStock(producto.stock);
      setTamano(producto.tamano);
      setColor(producto.color);
      setGenero(producto.genero);
      setCategoria(producto.categoria);
    } else {
      // Si se está añadiendo un nuevo producto, resetear los campos
      setProductoActual(null);
      setNombre('');
      setDescripcion('');
      setPrecio(0);
      setStock(0);
      setTamano('');
      setColor('');
      setGenero('');
      setCategoria(0);
    }
    setModalProductoAbierto(true);
  };

  // Función para abrir el modal de imágenes
  const abrirModalImagenes = (producto) => {
    setProductoActual(producto); // Establecer el producto actual
    setImagenesActuales(producto.img_url.split(',')); // Guardar las imágenes actuales
    setModalImagenesAbierto(true); // Abrir el modal de imágenes
  };

  // Función para manejar la selección de archivos
  // Función para manejar la selección de archivos
const manejarSeleccionArchivo = (e) => {
  const archivos = Array.from(e.target.files); // Convertir FileList a un array
  setImagenesSeleccionadas(archivos); // Guardar los archivos en el estado
};

// Función para subir las imágenes al backend
const subirImagenes = () => {
  const formData = new FormData();
  
  // Solo añadir imágenes si el usuario seleccionó alguna
  if (imagenesSeleccionadas.length > 0) {
    imagenesSeleccionadas.forEach((imagen) => {
      formData.append('imagen[]', imagen); // Agregar cada imagen al FormData
    });
  }

  formData.append('id', productoActual.id); // Añadir el ID del producto
  formData.append('imagenesActuales', imagenesActuales.join(',')); // Enviar las imágenes actuales
  formData.append('action', 'subirImagenes'); // Especificar la acción

  fetch('http://localhost/TFG/controlador/c-productos.php', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Imágenes actualizadas correctamente.");
        cargarProductos(); // Recargar la lista de productos
        cerrarModalImagenes(); // Cerrar el modal de imágenes
      } else {
        throw new Error("Error al subir las imágenes: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(error.message);
    });
};

  // Función para eliminar una imagen actual
  const eliminarImagenActual = (index) => {
    const nuevasImagenes = [...imagenesActuales];
    nuevasImagenes.splice(index, 1); // Eliminar la imagen en el índice especificado
    setImagenesActuales(nuevasImagenes); // Actualizar el estado
  };



  // Función para guardar los cambios del producto (añadir o modificar)
  const guardarProducto = () => {
    const datos = {
      action: productoActual ? "modificar" : "agregar",
      id: productoActual ? productoActual.id : null,
      nombre,
      descripcion,
      precio,
      stock,
      tamano,
      color,
      genero,
      categoria,
      img_url: productoActual ? productoActual.img_url : '', // Mantener las imágenes existentes
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
        cargarProductos(); // Recargar la lista de productos
        cerrarModalProducto(); // Cerrar el modal de datos
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // Función para cerrar el modal de datos del producto
  const cerrarModalProducto = () => {
    setModalProductoAbierto(false);
    setProductoActual(null);
    setNombre('');
    setDescripcion('');
    setPrecio(0);
    setStock(0);
    setTamano('');
    setColor('');
    setGenero('');
    setCategoria(0);
  };

  // Función para cerrar el modal de imágenes
  const cerrarModalImagenes = () => {
    setModalImagenesAbierto(false);
    setImagenesSeleccionadas([]);
    setImagenesActuales([]);
    setProductoActual(null);
  };
  //Select de la categoria
  const [listarCat, setListarCat] = useState([]); // Lista de productos
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
        setListarCat(Array.isArray(data) ? data : [data]); // Asegúrate de que siempre sea un array
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }; 
  useEffect(() => {
    cargarCategorias();
  }, []);
  return (
    <>
     <div className="flex justify-between items-center mb-6">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition"
        onClick={() => abrirModalProducto()}
      >
        Agregar Producto
      </button>
      <input 
        type="text" 
        className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500" 
        placeholder="Buscar producto..." 
        value={busqueda}
        onChange={busquedaSave}
      />
    </div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden bg-white shadow-xl rounded-2xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <tr>
                {['ID', 'Nombre', 'Descripción', 'Precio', 'Stock', 'Tamaño', 'Color', 'Género', 'Categoría', 'Acciones'].map((header) => (
                  <th 
                    key={header} 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {listar.filter(producto => producto.nombre.toLowerCase().includes(busqueda.toLowerCase())).map((producto, index) => (
                <tr 
                  key={index} 
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{producto.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{producto.nombre}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{producto.descripcion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{producto.precio}€</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{producto.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{producto.tamano}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: producto.color}}></span>
                      {producto.color}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{producto.genero}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{producto.categoria}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        className="bg-green-500 text-white py-1 px-3 rounded text-xs hover:bg-green-600 transition"
                        onClick={() => abrirModalProducto(producto)}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-yellow-500 text-white py-1 px-3 rounded text-xs hover:bg-yellow-600 transition"
                        onClick={() => abrirModalImagenes(producto)}
                      >
                        Imágenes
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded text-xs hover:bg-red-600 transition"
                        onClick={() => eliminarProducto(producto.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

      {/* Modal para datos del producto */}
      {modalProductoAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">
              {productoActual ? "Modificar Producto" : "Agregar Producto"}
            </h2>
            <form>
              <div className="space-y-2">
                <label className="block">
                  Nombre:
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                  />
                </label>
                <label className="block">
                  Descripción:
                  <textarea
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                  />
                </label>
                <label className="block">
                  Precio:
                  <input
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                  />
                </label>
                <label className="block">
                  Stock:
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                  />
                </label>
                <label className="block">
                  Tamaño:
                  <input
                    type="text"
                    placeholder="Tamaño"
                    value={tamano}
                    onChange={(e) => setTamano(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                  />
                </label>
                <label className="block">
                  Color:
                  <input
                    type="text"
                    placeholder="Color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                  />
                </label>
                <label className="block">
                  Género:
                  <select
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                  >
                    <option value="">Selecciona un género</option>
                    <option value="woman">Woman</option>
                    <option value="men">Men</option>
                    <option value="exclusive">Exclusive</option>
                  </select>
                </label>
                <label className="block">
                  Categoría:
                  <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="w-full p-2 border rounded mt-1"
                  >
                    <option value="">Seleccione una categoría</option>
                    {listarCat.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-600 transition"
                  onClick={cerrarModalProducto}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition"
                  onClick={guardarProducto}
                >
                  {productoActual ? "Guardar Cambios" : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para imágenes del producto */}
      {modalImagenesAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">
              Gestionar Imágenes del Producto
            </h2>
            <form>
              <div className="space-y-2">
                {/* Mostrar imágenes actuales con opción de eliminar */}
                <div className="grid grid-cols-3 gap-4">
                  {imagenesActuales.filter(url => url.trim() !== '').map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={"../../public/img/prods/"+url}
                        alt={`Imagen ${index}`}
                        className="w-full h-[200px] object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => eliminarImagenActual(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>

                {/* Seleccionar nuevas imágenes */}
                <label className="block">
                  Seleccionar nuevas imágenes (opcional):
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={manejarSeleccionArchivo}
                    className="w-full p-2 border rounded mt-1"
                  />
                </label>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-600 transition"
                  onClick={cerrarModalImagenes}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition"
                  onClick={subirImagenes}
                >
                  Guardar Cambios
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