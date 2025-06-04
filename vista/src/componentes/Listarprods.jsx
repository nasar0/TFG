import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import 'animate.css';
import { AuthContext } from '../context/AuthContext';

const Listarprods = ({ listar }) => {
  // Estados para los filtros
  const [showFilter, setShowFilter] = useState(false)
  const [filtros, setFiltros] = useState({
    color: '',
    genero: '',
    tamano: '',
    precioMin: '',
    precioMax: ''
  })
  const { idUser } = useContext(AuthContext)

  // Estado de favoritos
  const [favoritos, setFavoritos] = useState([])
  const [loadingFavoritos, setLoadingFavoritos] = useState(false)

  useEffect(() => {
    const cargarFavoritos = async () => {
      setLoadingFavoritos(true);

      // Limpiar favoritos si no hay usuario
      if (!idUser) {
        setFavoritos([]);
        setFavoritos(localStorage.getItem("fav"))
        setLoadingFavoritos(false);
        return;
      }

      // Cargar de BD solo si hay usuario
      try {
        const response = await fetch('http://localhost/TFG/controlador/c-productos.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: "getFavoritosByUsuario", id: idUser }),
        });
        const data = await response.json();
        const favoriteIds = data.map(item => item.id_productos || item.id);
        setFavoritos(favoriteIds);
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
      }
      setLoadingFavoritos(false);
    };

    cargarFavoritos();
  }, [idUser]); // Solo depende de idUser


  const toggleFavorito = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!idUser) {
      // Para no logueados: usar localStorage directamente
      const saved = JSON.parse(localStorage.getItem('fav') || "[]");
      const isFavorite = saved.includes(id);

      const newFavoritos = isFavorite
        ? saved.filter(item => item !== id)
        : [...saved, id];

      localStorage.setItem('fav', JSON.stringify(newFavoritos));
      setFavoritos(newFavoritos);
      return;
    }
    if (loadingFavoritos) return;

    const isFavorite = favoritos.includes(id);
    setLoadingFavoritos(true);

    try {
      if (idUser) {
        // Usuario registrado: operación en base de datos
        let success;
        if (isFavorite) {
          success = await eliminarFavorito(id);
        } else {
          success = await agregarFavorito(id);
        }

        if (success) {
          setFavoritos(prev =>
            isFavorite
              ? prev.filter(item => item !== id)
              : [...prev, id]
          );
        }
      } else {
        // Usuario no registrado: operación en localStorage
        setFavoritos(prev =>
          isFavorite
            ? prev.filter(item => item !== id)
            : [...prev, id]
        );
      }
    } catch (error) {
      console.error("Error al actualizar favoritos:", error);
    } finally {
      setLoadingFavoritos(false);
    }
  };

  const agregarFavorito = async (id) => {
    if (!idUser) return true // Para usuarios no registrados, retornamos éxito directamente

    try {
      const response = await fetch('http://localhost/TFG/controlador/c-productos.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: "addAFav", id: idUser, ids: [id] }),
      })
      const data = await response.json()
      return data.success
    } catch (error) {
      console.error('Error al agregar favorito:', error)
      return false
    }
  }

  const eliminarFavorito = async (id) => {
    if (!idUser) return true // Para usuarios no registrados, retornamos éxito directamente

    try {
      const response = await fetch('http://localhost/TFG/controlador/c-productos.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: "removeFromFavoritos", id: idUser, ids: id }),
      })
      const data = await response.json()
      return data.success
    } catch (error) {
      console.error('Error al eliminar favorito:', error)
      return false
    }
  }
  // Obtener valores únicos para los filtros
  const coloresUnicos = [...new Set(listar.map(art => art.color))]
  const generosUnicos = [...new Set(listar.map(art => art.genero))]
  const tamanosUnicos = Array.from(
    new Set(listar.flatMap(art => art.tamano.split('-')).map(t => t.trim()))
  ).sort((a, b) => a - b)

  // Función para manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Función para limpiar filtros
  const clearFilters = () => {
    setFiltros({
      color: '',
      genero: '',
      tamano: '',
      precioMin: '',
      precioMax: ''
    })
  }

  // Filtrar productos
  const productosFiltrados = listar.filter(art => {
    return (
      (filtros.color === '' || art.color.toLowerCase().includes(filtros.color.toLowerCase())) &&
      (filtros.genero === '' || art.genero.toLowerCase().includes(filtros.genero.toLowerCase())) &&
      (filtros.tamano === '' || art.tamano.includes(filtros.tamano)) &&
      (filtros.precioMin === '' || parseFloat(art.precio) >= parseFloat(filtros.precioMin)) &&
      (filtros.precioMax === '' || parseFloat(art.precio) <= parseFloat(filtros.precioMax))
    )
  })

  return (
    <>
      {/* Filter button */}
      <div className='w-full flex justify-end'>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="px-4 py-2 rounded-md flex items-center hover:cursor-pointer transition-colors duration-300"
        >
          <img src="../../public/img/icons8-filter-50.png" className="transform rotate-90 w-[20%]" alt="" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filter modal */}
      {showFilter && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-gray-400/75 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShowFilter(false)}
          ></div>

          {/* Sidebar panel with animation */}
          <div className="absolute inset-y-0 left-0 max-w-full flex animate__animated animate__slideInLeft">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">

                {/* Header */}
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-xl font-bold">Filter Products</h2>
                  <button
                    onClick={() => setShowFilter(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Filter content */}
                <div className="p-5 bg-gray-50 flex-grow">
                  <div className="grid grid-cols-1 gap-4">

                    {/* Color */}
                    <div>
                      <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">
                        Color
                      </label>
                      <select
                        id="color"
                        name="color"
                        value={filtros.color}
                        onChange={handleFilterChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-gray-500 focus:ring-gray-500"
                      >
                        <option value="">All colors</option>
                        {coloresUnicos.map(color => (
                          <option key={color} value={color}>{color}</option>
                        ))}
                      </select>
                    </div>

                    {/* Gender */}
                    <div>
                      <label htmlFor="genero" className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <select
                        id="genero"
                        name="genero"
                        value={filtros.genero}
                        onChange={handleFilterChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-gray-500 focus:ring-gray-500"
                      >
                        <option value="">All genders</option>
                        {generosUnicos.map(genero => (
                          <option key={genero} value={genero}>{genero}</option>
                        ))}
                      </select>
                    </div>

                    {/* Size */}
                    <div>
                      <label htmlFor="tamano" className="block text-sm font-medium text-gray-700 mb-1">
                        Size
                      </label>
                      <select
                        id="tamano"
                        name="tamano"
                        value={filtros.tamano}
                        onChange={handleFilterChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-gray-500 focus:ring-gray-500"
                      >
                        <option value="">All sizes</option>
                        {tamanosUnicos.map(tamano => (
                          <option key={tamano} value={tamano}>{tamano}</option>
                        ))}
                      </select>
                    </div>

                    {/* Minimum Price */}
                    <div>
                      <label htmlFor="precioMin" className="block text-sm font-medium text-gray-700 mb-1">
                        Minimum Price
                      </label>
                      <input
                        type="number"
                        id="precioMin"
                        name="precioMin"
                        value={filtros.precioMin}
                        onChange={handleFilterChange}
                        placeholder="€"
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>

                    {/* Maximum Price */}
                    <div>
                      <label htmlFor="precioMax" className="block text-sm font-medium text-gray-700 mb-1">
                        Maximum Price
                      </label>
                      <input
                        type="number"
                        id="precioMax"
                        name="precioMax"
                        value={filtros.precioMax}
                        onChange={handleFilterChange}
                        placeholder="€"
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-gray-500 focus:ring-gray-500"
                      />
                    </div>
                  </div>

                  {/* Footer controls */}
                  <div className="mt-8 flex justify-between items-center">
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 hover:cursor-pointer transition-colors"
                    >
                      Clear Filters
                    </button>
                    <div className="text-sm text-gray-600">
                      {productosFiltrados.length} products found
                    </div>
                  </div>
                </div>

                {/* Bottom action button */}
                <div className="p-4 border-t bg-white">
                  <button
                    onClick={() => setShowFilter(false)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-md hover:cursor-pointer transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-5 mt-6">
        {productosFiltrados.map((art, index) => {
          const productId = art.id_productos || art.id || index;
          const esFavorito = favoritos?.includes(productId);

          return (
            <article
              key={`product-${productId}`}
              className="border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow relative"
            >
              <button
                onClick={(e) => toggleFavorito(productId, e)}
                className="absolute top-2 right-2 z-10 p-2 rounded-full transition-colors duration-200"
                aria-label={esFavorito ? "Quitar de favoritos" : "Añadir a favoritos"}
                disabled={loadingFavoritos}
              >
                <i className={
                  `text-[20px] transition-colors duration-200 ${esFavorito
                    ? 'bx bxs-heart text-red-500 animate__animated animate__bounceIn'
                    : 'bx bx-heart text-gray-500'
                  }`
                }></i>
              </button>


              <Link
                to={`/product/${productId}`}
                className="block"
              >
                <img
                  src={`/img/prods/${art.img_url.split(",")[0].trim()}`}
                  alt={art.nombre}
                  className="w-full object-cover"
                  draggable="false"
                  onMouseOver={(e) => e.currentTarget.src = `/img/prods/${art.img_url.split(",")[1].trim()}`}
                  onMouseOut={(e) => e.currentTarget.src = `/img/prods/${art.img_url.split(",")[0].trim()}`}
                />
                <div className="pb-3">
                  <h3 className="product-name px-5 capitalize">{art.nombre}</h3>
                  <p className="product-price px-5">€{art.precio}</p>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </>
  )
}
export default Listarprods;

