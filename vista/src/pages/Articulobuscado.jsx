import React from 'react';
import Listarprods from '../componentes/Listarprods';
import { useLocation, useNavigate } from 'react-router-dom';

const Articulobuscado = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const productos = location.state?.productos || [];
  const searchQuery = location.state?.query || '';

  // OFF-WHITE style quotation marks
  const QuoteMark = ({ position = 'left' }) => (
    <span className={`text-5xl font-serif ${position === 'left' ? 'mr-1' : 'ml-1'}`}>
      {position === 'left' ? '«' : '»'}
    </span>
  );
  return (
    <div className="bg-white min-h-screen">
      {/* Hero header with industrial references */}
      <header className="relative border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold leading-none mb-2">
                <QuoteMark position="left" />
                {searchQuery || 'SEARCH'}
                <QuoteMark position="right" />
              </h1>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="mt-6 md:mt-0 text-xs uppercase tracking-widest border-b border-black hover:border-transparent transition-all"
            >
              ← RETURN TO PREVIOUS
            </button>
          </div>
        </div>

        {/* OFF-WHITE style diagonal stripe */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black transform -skew-y-1 origin-left"></div>
      </header>

      {/* Main content with industrial grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {productos.length > 0 ? (

          <Listarprods listar={productos} />
        ) : (
          <div className="text-center py-24">
            <p className="text-2xl font-light mb-4">NO PRODUCTS MATCHING</p>
            <p className="text-sm uppercase tracking-widest text-gray-500">
              " {searchQuery} "
            </p>
            <div className="mt-8 border-t border-black pt-8 max-w-xs mx-auto">
              <p className="text-xs mb-4">TRY DIFFERENT KEYWORDS OR</p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-black text-white text-xs uppercase tracking-widest hover:bg-gray-800 transition-all"
              >
                EXPLORE COLLECTIONS
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Industrial footer */}
      <footer className="border-t-2 border-black mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-center">
            SEARCH RESULTS ARE NOT FILTERED — SHOWING RAW MATCHES
          </p>
          <div className="flex justify-center mt-4">
            <p className="text-sm text-gray-500 text-center lg:text-left">© {new Date().getFullYear()} K<span className="mirror">K</span>armx™. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Articulobuscado;