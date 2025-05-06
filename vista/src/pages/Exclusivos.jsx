import React, { useEffect, useState } from 'react'
import 'animate.css';
import Listarprods from '../componentes/Listarprods';

const Exclusivos = () => {
  const [Exclusivos, setExclusivos] = useState([]);
  
  useEffect(() => {
      cargarProductosHombre()
    }, []); 
  
    const cargarProductosHombre = () => {
    fetch('http://localhost/TFG/controlador/c-productos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: "getProdExclusive" }),
    })
        .then((response) => response.json())
        .then((data) => setExclusivos(data))
        .catch((error) => {
            console.error('Error:', error);
        });
  };

  return (
    <>
      <h2 className="pt-5 px-5 text-2xl font-semibold mb-4">Welcome to EXCLUSIVESWEAR</h2>
      <div className="p-5 space-y-2 text-base leading-relaxed">
        <p>
          Crafted beyond trends — shaped by intention.
          A space where rarity meets “relevance”.
          For those who move differently.
          Precision in every stitch. Purpose in every piece.
          Designed for the few, not the many.
          Built for moments that aren't repeated.
        </p>
      </div>
      <Listarprods listar={Exclusivos}/>
    </>
  )
}

export default Exclusivos