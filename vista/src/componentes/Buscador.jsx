import React, { useState, useEffect, useRef } from 'react';
import 'animate.css';

const Buscador = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  // Cargar búsquedas recientes y enfocar el input
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
    inputRef.current?.focus();
  }, []);

  // Manejadores de eventos para cerrar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      const updatedSearches = [
        searchTerm.trim(),
        ...recentSearches.filter(item =>
          item.toLowerCase() !== searchTerm.trim().toLowerCase()
        )
      ].slice(0, 5);

      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      setSearchTerm('');
    }
  };

  const removeSearch = (index) => {
    const updatedSearches = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Overlay de fondo */}
      <div
        className="absolute inset-0 bg-gray-400/75 backdrop-blur-sm animate__animated animate__fadeIn"
        onClick={onClose}
      />

      {/* Contenedor principal del buscador */}
      <div
        ref={modalRef}
        className="absolute top-0 left-0 right-0 bg-white z-[70] h-[30vh] animate__animated animate__slideInDown p-6 rounded-b-xl shadow-xl"
      >
        <div className="max-w-4xl mx-auto">
          {/* Barra de búsqueda */}
          <div className="flex items-center gap-2 mb-6">
            <img
              src="/img/icons8-search-50.png"
              alt="Buscar"
              className="w-6 h-6"
            />
            <input
              ref={inputRef}
              type="search"
              placeholder="Search..."
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleSearch}
              autoFocus
            />
            <button
              onClick={onClose}
              className="ml-2 text-gray-500 hover:text-black text-xl font-bold"
              aria-label="Cerrar buscador"
            >
              ✕
            </button>
          </div>

          {/* Búsquedas recientes */}
          {recentSearches.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">Recent searches</h3>
              <ul className="space-y-2">
                {recentSearches.map((search, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-2 hover:bg-gray-100 rounded"
                  >
                    <span
                      className="cursor-pointer flex-grow"
                      onClick={() => {
                        setSearchTerm(search);
                        inputRef.current?.focus();
                      }}
                    >
                      {search}
                    </span>
                    <button
                      onClick={() => removeSearch(index)}
                      className="text-gray-500 hover:text-red-500"
                      aria-label={`Eliminar ${search}`}
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500">No recent searches</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Buscador);