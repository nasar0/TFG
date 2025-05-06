import React, { useEffect, useState } from 'react'
import 'animate.css';
import Listarprods from '../componentes/Listarprods';

const Men = () => {
  const [men, setMen] = useState([]);
  
  useEffect(() => {
      cargarProductosHombre()
    }, []); 
  
    const cargarProductosHombre = () => {
    fetch('http://localhost/TFG/controlador/c-productos.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: "getProdHombre" }),
    })
        .then((response) => response.json())
        .then((data) => setMen(data))
        .catch((error) => {
            console.error('Error:', error);
        });
  };

  return (
    <>
      <h2 className="pt-5 px-5 text-2xl font-semibold mb-4">Welcome to MENSWEAR</h2>
      <div className="p-5 space-y-2 text-base leading-relaxed">
        <p>Where function meets <span className="italic">"form"</span> a study in identity, motion, and intention. not defined by tradition. designed for movement — built for meaning. rethinking classics through a lens of progress. built for those rewriting the rules — in sport, in style, in self.</p>
      </div>
      <Listarprods listar={men}/>
    </>
  )
}

export default Men