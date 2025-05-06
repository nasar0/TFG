import React, { useEffect, useState } from 'react'
import 'animate.css';
import Listarprods from '../componentes/Listarprods';

const Women = () => {
  const [women, setWomen] = useState([]);

  useEffect(() => {
    cargarProductosMujer()
  }, []);

  const cargarProductosMujer = () => {
    fetch('http://localhost/TFG/controlador/c-productos.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "getProdMujer" }),
    })
      .then((response) => response.json())
      .then((data) => setWomen(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <h2 className="pt-5 px-5 text-2xl font-semibold mb-4">Welcome to WOMENSWEAR</h2>
      <div className="p-5 space-y-2 text-base leading-relaxed">
        <p>
          Where function meets <span className="italic">"form"</span>.
          A study in strength, fluidity, and self-expression.
          Not defined by tradition.
          Designed for movement — built for meaning.
          Rethinking classics through a lens of progress.
          Built for those rewriting the rules — in sport, in style, in self.
        </p>
      </div>
      <Listarprods listar={women}/>
    </>
  )
}

export default Women