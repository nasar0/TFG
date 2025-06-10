import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import 'animate.css';
import { AuthContext } from '../context/AuthContext';
import Select from 'react-select';

const Listarprods = ({ listar }) => {
  // Estados para los filtros
  const [showFilter, setShowFilter] = useState(false)
  const [filtros, setFiltros] = useState({
    colores: [],
    genero: '',
    tamano: '',
    precioMin: '',
    precioMax: '',
    orden: ''
  });

  const { idUser } = useContext(AuthContext)
  const [openFilter, setOpenFilter] = useState(null);
  const [favoritos, setFavoritos] = useState([])
  const [loadingFavoritos, setLoadingFavoritos] = useState(false)

  // Manejar cambios en los filtros (actualizado para colores múltiples)
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'color') {
      setFiltros(prev => {
        if (checked) {
          return { ...prev, colores: [...prev.colores, value] };
        } else {
          return { ...prev, colores: prev.colores.filter(c => c !== value) };
        }
      });
    } else {
      setFiltros(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Función para limpiar filtros (actualizada)
  const clearFilters = () => {
    setFiltros({
      colores: [],
      genero: '',
      tamano: '',
      precioMin: '',
      precioMax: '',
      orden: ''
    });
  }

  // Obtener valores únicos para los filtros
  const coloresUnicos = [...new Set(listar.map(art => art.color))]
  const generosUnicos = [...new Set(listar.map(art => art.genero))]
  const tamanosUnicos = Array.from(
    new Set(listar.flatMap(art => art.tamano.split('-')).map(t => t.trim()))
  ).sort((a, b) => a - b)

  // Filtrar y ordenar productos
  const productosFiltrados = listar
    .filter(art => {
      return (
        (filtros.colores.length === 0 || filtros.colores.includes(art.color)) &&
        (filtros.genero === '' || art.genero.toLowerCase().includes(filtros.genero.toLowerCase())) &&
        (filtros.tamano === '' || art.tamano.includes(filtros.tamano)) &&
        (filtros.precioMin === '' || parseFloat(art.precio) >= parseFloat(filtros.precioMin)) &&
        (filtros.precioMax === '' || parseFloat(art.precio) <= parseFloat(filtros.precioMax))
      );
    }) // ← Paréntesis de cierre añadido AQUÍ
    .sort((a, b) => {
      if (filtros.orden === 'asc') {
        return parseFloat(a.precio) - parseFloat(b.precio);
      } else if (filtros.orden === 'desc') {
        return parseFloat(b.precio) - parseFloat(a.precio);
      }
      return 0;
    });

  // Estados para los filtros


  useEffect(() => {
    const cargarFavoritos = async () => {
      setLoadingFavoritos(true);

      // Limpiar favoritos si no hay usuario
      if (!idUser) {
        setFavoritos([]);
        setFavoritos(JSON.parse(localStorage.getItem("fav") || "[]"))
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

    const isFavorite = favoritos.includes(id);

    // Actualización optimista SIEMPRE
    setFavoritos(prev =>
      isFavorite
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );

    if (!idUser) {
      // Para no logueados: usar localStorage directamente
      const saved = JSON.parse(localStorage.getItem('fav') || "[]");
      const newFavoritos = isFavorite
        ? saved.filter(item => item !== id)
        : [...saved, id];
      localStorage.setItem('fav', JSON.stringify(newFavoritos));
      return;
    }

    if (loadingFavoritos) return;
    setLoadingFavoritos(true);

    try {
      if (isFavorite) {
        await eliminarFavorito(id);
      } else {
        await agregarFavorito(id);
      }
      // NO revertimos el cambio nunca, porque confiamos en el backend
    } catch (error) {
      // Solo logueamos el error, pero no revertimos el cambio visual
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

  useEffect(() => {
    if (showFilter) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showFilter]);


  return (
    <>
      {/* Filter button */}
      <div className='w-full flex justify-between items-center px-5'>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-600 capitalize">
            {productosFiltrados.length} Products Found
          </p>
        </div>
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

                    {/* Ordenación (nuevo filtro) */}
                    {/* Ordenación */}
                    <div className="relative">
                      <button
                        onClick={() => setOpenFilter(openFilter === 'order' ? null : 'order')}
                        className={"w-full flex justify-between items-center p-2 hover:bg-gray-100 transition-colors border border-gray-300 rounded " + (openFilter === 'order' ? ' border-b-0' : ' ')}
                      >
                        <span className="font-medium">Sort by</span>
                        <p className='text-xl'>
                          {openFilter === 'order' ? '-' : '+'}
                        </p>
                      </button>

                      {openFilter === 'order' && (
                       <div className="mt-2 space-y-2 pl-4 border-l-2 border-gray-200 animate__animated animate__fadeIn animate__faster">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="orden"
                              checked={filtros.orden === 'desc'}
                              onChange={() => setFiltros(prev => ({ ...prev, orden: 'desc' }))}
                              className="rounded text-gray-700"
                            />
                            <span>Most expensive</span>
                          </label>

                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="orden"
                              checked={filtros.orden === 'asc'}
                              onChange={() => setFiltros(prev => ({ ...prev, orden: 'asc' }))}
                              className="rounded text-gray-700"
                            />
                            <span>Less expensive</span>
                          </label>

                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="orden"
                              checked={filtros.orden === ''}
                              onChange={() => setFiltros(prev => ({ ...prev, orden: '' }))}
                              className="rounded text-gray-700"
                            />
                            <span>None</span>
                          </label>
                        </div>
                      )}
                    </div>

                    {/* Color - Selección múltiple */}
                    <div className="relative">
                      <button
                        onClick={() => setOpenFilter(openFilter === 'color' ? null : 'color')}
                        className={"w-full flex justify-between items-center p-2 hover:bg-gray-100 transition-colors border border-gray-300 rounded " + (openFilter === 'color' ? ' border-b-0' : ' ')}
                      >
                        <span className="font-medium">Colors</span>
                        <p className='text-xl'>
                          {openFilter === 'color' ? '-' : '+'}
                        </p>
                      </button>

                      {openFilter === 'color' && (
                        <div className="mt-2 space-y-2 pl-4 border-l-2 border-gray-200 animate__animated animate__fadeIn animate__faster">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={filtros.colores.length === 0}
                              onChange={() => setFiltros(prev => ({ ...prev, colores: [] }))}
                              className="rounded text-gray-700"
                            />
                            <span>Todos los colores</span>
                          </label>

                          {coloresUnicos.map(color => (
                            <label key={color} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={filtros.colores.includes(color)}
                                onChange={(e) => handleFilterChange({
                                  target: {
                                    name: 'color',
                                    value: color,
                                    checked: e.target.checked
                                  }
                                })}
                                className="rounded text-gray-700"
                              />
                              <span>{color}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Filtro de Género - Versión Cascada */}
                    <div className="relative">
                      <button
                        onClick={() => setOpenFilter(openFilter === 'genero' ? null : 'genero')}
                        className={"w-full flex justify-between items-center p-2 hover:bg-gray-100 transition-colors border border-gray-300 rounded " + (openFilter === 'genero' ? ' border-b-0' : ' ')}
                      >
                        <span className="font-medium">Gender</span>
                        <p className='text-xl'>
                          {openFilter === 'genero' ? '-' : '+'}
                        </p>
                      </button>

                      {openFilter === 'genero' && (
                        <div className="mt-2 space-y-2 pl-4 border-l-2 border-gray-200 animate__animated animate__fadeIn animate__faster">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              checked={!filtros.genero}
                              onChange={() => handleFilterChange({ target: { name: 'genero', value: '' } })}
                              className="rounded text-gray-700"
                            />
                            <span>Todos los géneros</span>
                          </label>

                          {generosUnicos.map(genero => (
                            <label key={genero} className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="radio"
                                checked={filtros.genero === genero}
                                onChange={() => handleFilterChange({ target: { name: 'genero', value: genero } })}
                                className="rounded text-gray-700"
                              />
                              <span className='capitalize'>{genero}</span>
                            </label>
                          ))}
                        </div>
                      )}
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
                    <div className="text-sm text-gray-600">
                      {productosFiltrados.length} products found
                    </div>
                  </div>
                </div>

                {/* Bottom action button */}
                <div className="p-4 border-t bg-white flex justify-around">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 btn-i hover:cursor-pointer transition-colors"
                  >
                    Clear Filters
                  </button>
                  <button
                    onClick={() => setShowFilter(false)}
                    className="px-4 py-2 btn hover:cursor-pointer transition-colors"
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

