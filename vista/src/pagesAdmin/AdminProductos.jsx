import React, { useState, useEffect } from 'react';

const AdminProductos = () => {
  const [listar, setListar] = useState([]);
  const [editando, setEditando] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);
  const [tamano, setTamano] = useState('');
  const [color, setColor] = useState('');
  const [img_url, setImg_url] = useState('');
  const [genero, setGenero] = useState('');
  const [categoria, setCategoria] = useState(0);


  useEffect(() => {
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
  }, []);

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
        setListar(listar.filter(producto => producto.id_producto !== id));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

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
    setCategoria(producto.categoria)
  };

  const formularioCambios = (setter) => (e) => {
    setter(e.target.value);
  };

  const guardarEdicion = (id) => {
    const datosActualizados = {
      action: "modificar",
      id,
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
      body: JSON.stringify(datosActualizados),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListar(listar.map(producto => producto.id_producto === id ? { ...producto, ...datosActualizados } : producto));
        setEditando(null);
        // Resetear los estados
        setNombre('');
        setDescripcion('');
        setPrecio(0);
        setStock(0);
        setTamano('');
        setColor('');
        setImg_url('');
        setGenero('');
        setCategoria('');
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
              {['ID', 'Nombre', 'Descripción', 'Precio', 'Stock', 'Tamaño', 'Color', 'Imagen', 'Género', 'Acciones'].map((header) => (
                <th key={header} className="px-6 py-4 text-left font-semibold">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {listar.map((producto) => (
              <tr key={producto.id_producto} className="border-b hover:bg-blue-50 transition duration-300">
                <td className="px-6 py-4 font-medium">{producto.id_producto}</td>
                <td className="px-6 py-4">
                  {editando === producto.id_producto ? (
                    <input type="text" value={nombre} onChange={formularioCambios(setNombre)} className="border rounded px-3 py-1 w-full" />
                  ) : (
                    producto.nombre
                  )}
                </td>
                <td className="px-6 py-4">
                  {editando === producto.id_producto ? (
                    <input type="text" value={descripcion} onChange={formularioCambios(setDescripcion)} className="border rounded px-3 py-1 w-full" />
                  ) : (
                    producto.descripcion
                  )}
                </td>
                <td className="px-6 py-4">
                  {editando === producto.id_producto ? (
                    <input type="number" value={precio} onChange={formularioCambios(setPrecio)} className="border rounded px-3 py-1 w-full" />
                  ) : (
                    producto.precio
                  )}
                </td>
                <td className="px-6 py-4">
                  {editando === producto.id_producto ? (
                    <input type="number" value={stock} onChange={formularioCambios(setStock)} className="border rounded px-3 py-1 w-full" />
                  ) : (
                    producto.stock
                  )}
                </td>
                <td className="px-6 py-4">
                  {editando === producto.id_producto ? (
                    <input type="text" value={tamano} onChange={formularioCambios(setTamano)} className="border rounded px-3 py-1 w-full" />
                  ) : (
                    producto.tamano
                  )}
                </td>
                <td className="px-6 py-4">
                  {editando === producto.id_producto ? (
                    <input type="text" value={color} onChange={formularioCambios(setColor)} className="border rounded px-3 py-1 w-full" />
                  ) : (
                    producto.color
                  )}
                </td>
                <td className="px-6 py-4">
                  {editando === producto.id_producto ? (
                    <textarea name="" id="" value={img_url} onChange={formularioCambios(setImg_url)} className="border rounded px-3 py-1 w-full" ></textarea>
                  ) : (
                    producto.img_url.split(',')[0] 
                  )}
                </td>
                <td className="px-6 py-4">
                  {editando === producto.id_producto ? (
                    <select value={genero} onChange={formularioCambios(setGenero)} className="border rounded px-3 py-1 w-full">
                      <option value="men">Masculino</option>
                      <option value="women">Femenino</option>
                    </select>
                  ) : (
                    producto.genero
                  )}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  {editando === producto.id_producto ? (
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition" onClick={() => guardarEdicion(producto.id_producto)}>
                      Guardar
                    </button>
                  ) : (
                    <button className="bg-green-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-600 transition" onClick={() => iniciarEdicion(producto)}>
                      Modificar
                    </button>
                  )}
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
    </div>
  );
}

export default AdminProductos;
