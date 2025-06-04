import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Listarprods from '../componentes/Listarprods';
import { AuthContext } from '../context/AuthContext';

const Favoritos = () => {
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState([]);
  const { idUser } = useContext(AuthContext)

  // Estilo de comillas OFF-WHITE
  const QuoteMark = ({ position = 'left' }) => (
    <span className={`text-5xl font-serif ${position === 'left' ? 'mr-1' : 'ml-1'}`}>
      {position === 'left' ? '«' : '»'}
    </span>
  );
  if (idUser) {
    useEffect(() => {
      fetch('http://localhost/TFG/controlador/c-productos.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: "getFavoritosByUsuario",id: idUser }),
      })
        .then((response) => response.json())
        .then((data) => setFavoritos(data))
        .catch((error) => {
          console.error('Error:', error);
        });
    }, [])
  }else{
    useEffect(() => {
      const favprods = localStorage.getItem("fav");

      fetch('http://localhost/TFG/controlador/c-productos.php', {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "getprodsFav" ,id: favprods}),
    })
      .then((response) => response.json())
      .then((data) => setFavoritos(data))
      .catch((error) => {
        console.error('Error al cargar favoritos:', error);
      });

  }, [])
  }





  return (
    <div className="bg-white min-h-screen">
      {/* Encabezado */}
      <header className="relative border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-none mb-2">
                <QuoteMark position="left" />
                YOUR FAVORITES
                <QuoteMark position="right" />
              </h1>
              <p className="text-sm uppercase tracking-widest mt-2">
                {favoritos.length} {favoritos.length === 1 ? 'ITEM' : 'ITEMS'}
              </p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="mt-6 md:mt-0 text-xs uppercase tracking-widest border-b border-black hover:border-transparent transition-all"
            >
              ← BACK TO SHOP
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black transform -skew-y-1 origin-left"></div>
      </header>

      {/* Contenido principal */}
      <main>
        {favoritos.length > 0 ? (
          <Listarprods listar={favoritos} />
        ) : (
          <div className="text-center py-24">
            <p className="text-2xl font-light mb-4">YOUR FAVORITES ARE EMPTY</p>
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-8">
              SAVE ITEMS YOU LOVE TO SEE THEM HERE
            </p>
            <div className="mt-8 border-t border-black pt-8 max-w-xs mx-auto">
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-black text-white text-xs uppercase tracking-widest hover:bg-gray-800 transition-all"
              >
                START SHOPPING
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Pie de página */}
      <footer className="border-t-2 border-black mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-center">
            PRIVATE COLLECTION — YOUR CURATED SELECTION
          </p>
          <div className="flex justify-center mt-4">
            <p className="text-sm text-gray-500 text-center lg:text-left">
              © {new Date().getFullYear()} K<span className="mirror">K</span>armx™. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Favoritos;