import React, { useEffect, useState } from 'react'
import 'animate.css';
import { Link } from 'react-router-dom';
import Carrusel from '../componentes/Carrusel';
const Home = () => {
  const [exclusive, setExclusive] = useState([]); // Lista de productos
  const [men, setMen] = useState([]);
  const [women, setWomen] = useState([]);

  useEffect(() => {
    cargarProductosExclusive(),
    cargarProductosHombre(),
    cargarProductosMujer()
  }, []); 

  const cargarProductosExclusive = () => {
      fetch('http://localhost/TFG/controlador/c-productos.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: "getProdExclusive" }),
        })
          .then((response) => response.json())
          .then((data) => setExclusive(data))
          .catch((error) => {
              console.error('Error:', error);
          });
  };

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
  console.log(men)
  return (
    <>
      <div className='px-5'>
        <div ><a href="/"><img src="/img/baners/banerinicio.jpg" className='w-full h-[90vh] object-top object-cover' alt="" /></a></div>
        <a href=""><p className="text-[23px] pt-2">"BRB CITY EXCLUSIVES"</p></a>
        <Link to="/tu-ruta" className="relative inline-block pb-1 transition-all duration-300 hover:text-[#afafaf] text-[13px] uppercase underline hover:underline-offset-4">Explore the new collection
          
        </Link>
      </div>
      <Carrusel listar={exclusive}/>
      <div className='p-5'>
        <div ><a href="/"><img src="/img/baners/men.jpg" className='w-full h-[90vh] object-top object-cover' alt="" /></a></div>
        <a href=""><p className="text-[23px] pt-2">SS25 Menswear</p></a>
        <Link to="/tu-ruta" className="relative inline-block pb-1  underline hover:underline-offset-4 transition-all duration-300 hover:text-[#afafaf] text-[13px]">SHOP NOW
        </Link>
      </div>
      <Carrusel listar={men}/>
      <div className='p-5'>
        <div ><a href="/"><img src="/img/baners/woman.jpg" className='w-full h-[90vh] object-top object-cover' alt="" /></a></div>
        <a href=""><p className="text-[23px] pt-2">SS25 Womenswear</p></a>
        <Link to="/tu-ruta" className="relative inline-block pb-1  underline hover:underline-offset-4 transition-all duration-300 hover:text-[#afafaf] text-[13px]">SHOP NOW
        </Link>
      </div>
      <Carrusel listar={women}/>
    </>
  )
}

export default Home