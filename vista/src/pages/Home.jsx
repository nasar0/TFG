import React, { useEffect, useState } from 'react'
import 'animate.css';
import { Link } from 'react-router-dom';
import Carrusel from '../componentes/Carrusel';
const Home = () => {
  const [listar, setListar] = useState([]); // Lista de productos
  
  useEffect(() => {
    cargarProductos()
  }, []);

  const cargarProductos = () => {
      fetch('http://localhost/TFG/controlador/c-productos.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: "listar" }),
      })
          .then((response) => response.json())
          .then((data) => setListar(data))
          .catch((error) => {
              console.error('Error:', error);
          });
  };
  return (
    <>
      <div className='p-5'>
        <div ><a href="/"><img src="/img/baners/banerinicio.jpg" className='w-full h-[90vh] object-top object-cover' alt="" /></a></div>
        <a href=""><p className="text-[23px] pt-2">"BRB CITY EXCLUSIVES"</p></a>
        <Link to="/tu-ruta" className="relative inline-block pb-1 hover:pb-2 transition-all duration-300 hover:text-[#afafaf] text-[13px] uppercase">Explore the new collection
          <span className="absolute bottom-1 left-0 w-full h-[1px] bg-current hover:translate-y-0 transition-transform duration-300"></span>
        </Link>
      </div>
      <Carrusel listar={listar}/>
      <div className='p-5'>
        <div ><a href="/"><img src="/img/baners/men.jpg" className='w-full h-[90vh] object-top object-cover' alt="" /></a></div>
        <a href=""><p className="text-[23px] pt-2">SS25 Menswear</p></a>
        <Link to="/tu-ruta" className="relative inline-block pb-1 hover:pb-2 transition-all duration-300 hover:text-[#afafaf] text-[13px]">SHOP NOW
          <span className="absolute bottom-1 left-0 w-full h-[1px] bg-current hover:translate-y-0 transition-transform duration-300"></span>
        </Link>
      </div>
      <Carrusel listar={listar}/>
      <div className='p-5'>
        <div ><a href="/"><img src="/img/baners/woman.jpg" className='w-full h-[90vh] object-top object-cover' alt="" /></a></div>
        <a href=""><p className="text-[23px] pt-2">SS25 Womenswear</p></a>
        <Link to="/tu-ruta" className="relative inline-block pb-1 hover:pb-2 transition-all duration-300 hover:text-[#afafaf] text-[13px]">SHOP NOW
          <span className="absolute bottom-1 left-0 w-full h-[1px] bg-current hover:translate-y-0 transition-transform duration-300"></span>
        </Link>
      </div>
      <Carrusel listar={listar}/>
    </>
  )
}

export default Home