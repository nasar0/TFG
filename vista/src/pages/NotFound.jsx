import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const imageList = [
    '/1.webp', '/2.webp', '/3.webp', '/4.webp', '/5.webp', '/6.webp',
    '/7.webp', '/8.webp', '/9.webp', '/10.webp', '/11.webp', '/12.webp',
  ];
  const navigate = useNavigate();
  // Generar 50 elementos aleatorios distribuidos
  const chaosImages = Array.from({ length: 100 }, (_, i) => {
    const src = imageList[Math.floor(Math.random() * imageList.length)];
    const top = Math.random() * 90; // vh
    const size = 60 + Math.random() * 100;
    const maxLeft = 100 - (size / window.innerWidth) * 100;
    const left = Math.random() * maxLeft;
    const rotate = Math.floor(Math.random() * 45) * 180;
    const z = Math.floor(Math.random() * 20);

    return (
      <img
        key={i}
        src={`/cositas${src}`}
        alt={`img-${i}`}
        className="absolute pointer-events-none transition-transform duration-100"
        style={{
          top: `${top}vh`,
          left: `${left}vw`,
          width: `${size}px`,
          transform: `rotate(${rotate}deg)`,
          zIndex: z,
        }}
      />
    );
  });

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="relative h-[100vh] bg-white overflow-hidden">
        {chaosImages}

        {/* Botón */}
        <div className="absolute inset-0 flex items-center justify-center z-40">
          <div>
            <h1 className="text-white text-6xl font-bold text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              ERROR 404
            </h1>

            <button
              onClick={() => setShowModal(true)}
              className="bg-pink-600 hover:bg-pink-800 text-white font-bold px-6 py-3 rounded-full text-lg shadow-lg"
            >
              Pulsa para solucionar el error
            </button>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md text-center relative">
            <button
                onClick={()=>navigate("/")}
                className="mb-6 px-5 py-2 bg-white-600  "
              >
                VOLVER AL TFG →
              </button>
            <img
                src="/cositas/modal.jpg"
                alt="ayuda"
                className="w-full max-h-[400px] object-contain rounded-lg mb-4"
              />
              <button
                onClick={() => setShowModal(false)}
                className="mt-6 px-5 py-2 bg-red-600 text-white rounded-full font-bold hover:bg-red-800"
              >
                Volver
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NotFound;
