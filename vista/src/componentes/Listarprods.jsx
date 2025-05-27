import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import 'animate.css';

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
  
  // Estado de favoritos inicializado desde localStorage
  const [favoritos, setFavoritos] = useState(() => {
    const saved = localStorage.getItem('fav');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorito = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setFavoritos(prev => {
      const newFavoritos = prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id];
      return newFavoritos;
    });
  };

  // Guardar en localStorage cuando cambien los favoritos
  useEffect(() => {
    localStorage.setItem('fav', JSON.stringify(favoritos));
  }, [favoritos]);

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

  //guardar en base de datos si existe el id del usuario 
   
    useEffect(() => {
      fetch('http://localhost/TFG/controlador/c-productos.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: "addAFav" }),
        })
          .then((response) => response.json())
          .then((data) => setExclusive(data))
          .catch((error) => {
              console.error('Error:', error);
          });
    }, [favoritos])
    


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
        {productosFiltrados.map((art) => (
          <article
            key={art.id}
            className="border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow relative"
          >
            <button
              onClick={(e) => toggleFavorito(art.id, e)}
              className="absolute top-2 right-2 z-10 p-2 bg-white/80 rounded-full"
              aria-label="Añadir a favoritos"
            >
              <i className={
                favoritos.includes(art.id) 
                  ? 'bx bxs-heart text-red-500 text-[20px]' 
                  : 'bx bx-heart text-gray-500 text-[20px]'
              }></i>
            </button>
            <Link to={`/product/${art.id}`} className="block">
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
        ))}
      </div>
    </>
  );
};

export default Listarprods;