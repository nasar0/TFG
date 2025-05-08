import React, { useEffect, useState ,useContext} from 'react'
import { Link, useParams } from 'react-router-dom'
import SizeDetail from '../componentes/SizeDetail'
import { AuthContext } from '../context/AuthContext'; 

const ProductPage = () => {
  const { id } = useParams()
  const [listar, setListar] = useState({})
  const [imagenActual, setImagenActual] = useState(0)
  const { isAuthenticated, userEmail, idUser ,login ,logout} = useContext(AuthContext);
  

  const imgList = listar?.img_url?.split(',')?.map(img => img.trim()).filter(Boolean) || []
  const tamano = listar?.tamano?.split('-')?.map(t => t.trim()).filter(Boolean) || []
  const colores = listar?.color?.split(',')?.map(c => c.trim()).filter(Boolean) || []

  const sizeData = [
    { eu: 35, uk: 3, us: 5 },
    { eu: 35.5, uk: "3.5", us: "5.5" },
    { eu: 36, uk: "3.5", us: "5.5" },
    { eu: 36.5, uk: "4.5", us: "6.5" },
    { eu: 37, uk: "4.5", us: "6.5" },
    { eu: 37.5, uk: 5, us: 7 },
    { eu: 38, uk: 5, us: 7 },
    { eu: 38.5, uk: "5.5", us: "7.5" },
    { eu: 39, uk: "5.5", us: "7.5" },
    { eu: 39.5, uk: "6.5", us: "8.5" },
    { eu: 40, uk: "6.5", us: "8.5" },
    { eu: 40.5, uk: 7, us: 9 },
    { eu: 41, uk: 7, us: 9 },
    { eu: 41.5, uk: "7.5", us: 10 },
    { eu: 42, uk: "7.5", us: 10 },
    { eu: 42.5, uk: "8.5", us: 11 },
    { eu: 43, uk: "8.5", us: 11 },
    { eu: 43.5, uk: 9, us: "11.5" },
    { eu: 44, uk: 9, us: "11.5" },
    { eu: 44.5, uk: 10, us: "12.5" },
    { eu: 45, uk: 10, us: "12.5" },
    { eu: 45.5, uk: 11, us: 13 },
    { eu: 46, uk: 11, us: 13 },
    { eu: 46.5, uk: 12, us: "13.5" },
    { eu: 47, uk: 12, us: "13.5" },
    { eu: 47.5, uk: 13, us: 14 },
    { eu: 48, uk: 13, us: 14 },
    { eu: 48.5, uk: "13.5", us: "14.5" },
    { eu: 49, uk: "13.5", us: "14.5" }
  ];
  useEffect(() => {
    cargarProducto()
  }, [])

  const cargarProducto = () => {
    fetch('http://localhost/TFG/controlador/c-productos.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "getProd", id: id })
    })
      .then((response) => response.json())
      .then((data) => setListar(data))
      .catch((error) => {
        console.error('Error:', error)
      })
  }
  // modal
  const siguienteImagen = () => {
    setImagenActual(prev => (prev + 1) % imgList.length)
  }

  const anteriorImagen = () => {
    setImagenActual(prev => (prev - 1 + imgList.length) % imgList.length)
  }
  const [modalAbierto, setModalAbierto] = useState(null);
  
  const modales = {
    shipping: {
      titulo: "Shipping & Returns",
      contenido: (
        <>
          <p className="mb-4">Delivery duties are included in the item price when shipping to all EU countries...</p>
          <p>Need more information? Read our <a href="#" className="underline">Shipping & Delivery conditions</a>.</p>
        </>
      )
    },
    payment: {
      titulo: "Payment Methods",
      contenido: (
        <>
          <p className="mb-4">We accept all major credits cards as well as Paypal.</p>
          <div className="flex flex-wrap gap-4 mb-4 text-xl">
            <svg viewBox="0 0 38 24" width="1.58em" height="1em"><g fill="currentColor" fill-rule="evenodd"><rect width="38" height="24" rx="2"></rect><path fill="#FFF" d="M16.15 10.84a.292.292 0 0 1 .282.21l.58 2 1.37-2a.284.284 0 0 1 .239-.13h1c.09.016.152.1.14.19l-3.3 4.8a.288.288 0 0 1-.24.12h-1a.17.17 0 0 1-.14-.27l1-1.46-1.09-3.23a.171.171 0 0 1 .159-.231zm-4.2-.03c.432-.045.859.109 1.16.42l.07.11v-.28a.19.19 0 0 1 .18-.14h1c.032-.014.066-.019.099-.014a.17.17 0 0 1 .142.194l-.53 3.41a.28.28 0 0 1-.28.24h-.89a.179.179 0 0 1-.17-.19v-.29a1.88 1.88 0 0 1-1.37.57 1.533 1.533 0 0 1-1.25-.5 1.882 1.882 0 0 1-.37-1.53 2.28 2.28 0 0 1 2.21-2zm14.722 0a1.41 1.41 0 0 1 1.159.42l.07.11v-.28a.182.182 0 0 1 .18-.14h1a.17.17 0 0 1 .191.2l-.481 3.39a.28.28 0 0 1-.28.24h-.89l-.02-.002a.169.169 0 0 1-.15-.188v-.29a1.88 1.88 0 0 1-1.37.57 1.533 1.533 0 0 1-1.25-.5 1.882 1.882 0 0 1-.37-1.53 2.28 2.28 0 0 1 2.21-2zM31.382 9l.01.001c.094.011.16.095.148.188l-.839 5.331a.29.29 0 0 1-.28.24h-.85c-.01 0-.022 0-.033-.003a.17.17 0 0 1-.137-.197l.8-5.41a.17.17 0 0 1 .17-.15h1.01zm-23.2.03a1.882 1.882 0 0 1 1.51.53c.276.376.372.856.26 1.31l-.01.125a2.12 2.12 0 0 1-2.34 1.874h-.65a.27.27 0 0 0-.27.25l-.23 1.441a.293.293 0 0 1-.27.2H5.16a.183.183 0 0 1-.16-.2l.85-5.28a.29.29 0 0 1 .28-.25zm14.72 0a1.888 1.888 0 0 1 1.51.53c.257.366.351.822.26 1.26l-.01.126a2.12 2.12 0 0 1-2.34 1.874h-.65a.29.29 0 0 0-.28.25l-.24 1.51a.2.2 0 0 1-.19.18H19.88a.183.183 0 0 1-.16-.2l.85-5.28a.279.279 0 0 1 .27-.25zm3.98 2.82a1.101 1.101 0 0 0-1.102 1 .87.87 0 0 0 .151.7c.17.182.412.278.66.26a1.099 1.099 0 0 0 1.12-.99.867.867 0 0 0-.17-.7.837.837 0 0 0-.66-.27zm-14.721 0a1.11 1.11 0 0 0-1.1 1 .873.873 0 0 0 .15.7c.169.18.409.274.655.259a1.098 1.098 0 0 0 1.125-.989.83.83 0 0 0-.17-.7.838.838 0 0 0-.66-.27zm9.98-1.67h-.14a.17.17 0 0 0-.18.15l-.21 1.39h.412c.508-.003 1.015-.047 1.118-.75v-.02a.683.683 0 0 0-.1-.56c-.18-.21-.53-.21-.9-.21zm-14.73-.03h-.14a.18.18 0 0 0-.17.16l-.21 1.39h.412c.508-.003 1.015-.047 1.118-.75a.69.69 0 0 0-.11-.59c-.18-.21-.53-.21-.9-.21z"></path></g></svg><svg viewBox="0 0 38 24" width="1.58em" height="1em"><g fill="currentColor" fill-rule="evenodd"><rect width="38" height="24" rx="2"></rect><path fill="#FFF" d="M18.26 8.44l-1.46 6.89h-1.74l1.46-6.89h1.74zm7.44 4.45l.93-2.59.57 2.57-1.5.02zm2 2.44h1.64l-1.43-6.89h-1.5a.808.808 0 0 0-.75.51L23 15.33h1.86l.37-1h2.27l.2 1zm-4.61-2.25c0-1.82-2.5-1.92-2.48-2.73 0-.25.24-.51.75-.58a3.305 3.305 0 0 1 1.74.31l.31-1.46a4.73 4.73 0 0 0-1.66-.31c-1.75 0-3 .94-3 2.28 0 1 .88 1.55 1.55 1.88.67.33.92.55.92.86 0 .46-.55.67-1.06.67a3.691 3.691 0 0 1-1.82-.44L18 15.07c.637.25 1.316.376 2 .37 1.86 0 3.07-.92 3.08-2.36h.01zm-7.33-4.64l-2.87 6.89H11L9.61 9.87a.749.749 0 0 0-.42-.61 7.351 7.351 0 0 0-1.75-.59v-.2h3a.83.83 0 0 1 .82.7l.75 4 1.84-4.69 1.91-.04z"></path></g></svg><svg viewBox="0 0 38 24" width="1.58em" height="1em"><g fill="currentColor" fill-rule="evenodd"><rect width="38" height="24" rx="2"></rect><path fill-rule="nonzero" fill="#FFF" d="M22.56 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zM11.868 8.855a4.75 4.75 0 0 1 6.242-.775 5.91 5.91 0 0 0 0 7.84 4.75 4.75 0 0 1-6.242-7.065z"></path></g></svg><svg viewBox="0 0 38 24" width="1.58em" height="1em"><g fill="currentColor" fill-rule="evenodd"><rect width="38" height="24" rx="2"></rect><path d="M24.74 12.26l-1.19-3.21h-.89l1.72 4.25H25l1.77-4.25H26l-1.26 3.21zm-8.35.34c-.162.08-.34.122-.52.12a1.503 1.503 0 0 1-.61-.12 1.41 1.41 0 0 1-.47-.33 1.49 1.49 0 0 1-.31-.5 1.779 1.779 0 0 1-.11-.63c0-.201.037-.401.11-.59.071-.178.176-.341.31-.48.133-.137.293-.246.47-.32.193-.08.4-.121.61-.12.354-.005.692.15.92.42l.6-.43a1.935 1.935 0 0 0-.71-.52 2.187 2.187 0 0 0-.82-.15 2.608 2.608 0 0 0-.93.16 2.12 2.12 0 0 0-.73.45c-.208.2-.37.443-.48.71a2.39 2.39 0 0 0-.17.93c-.005.312.052.622.17.91a2.059 2.059 0 0 0 1.21 1.15c.297.109.613.164.93.16.312.003.622-.058.91-.18.288-.125.536-.325.72-.58l-.64-.44c-.125.158-.28.288-.46.38zm16.37-1.73h-.93V9.7h.98c.1.012.198.039.29.08a.513.513 0 0 1 .21.17c.057.09.085.194.08.3a.543.543 0 0 1-.09.33.519.519 0 0 1-.23.17.994.994 0 0 1-.31.12zm.43.62c.29-.026.557-.162.75-.38.3-.395.35-.925.13-1.37a1.014 1.014 0 0 0-.36-.37 1.59 1.59 0 0 0-.52-.2c-.2-.04-.405-.06-.61-.06H31v4.25h.78v-1.8h.57l1 1.8h.94l-1.1-1.87zm-5.13 0h2v-.68h-2v-1h2.12v-.68h-2.9v4.25h3v-.68h-2.23l.01-1.21zm-15.61-.38a2.046 2.046 0 0 0-.5-.22l-.5-.16a1.5 1.5 0 0 1-.38-.2.39.39 0 0 1-.15-.33.477.477 0 0 1 .22-.42.738.738 0 0 1 .23-.1c.086-.01.173-.01.26 0 .15-.001.3.026.44.08.133.052.25.143.33.26l.57-.58a1.568 1.568 0 0 0-.58-.34 2.238 2.238 0 0 0-1.26-.02c-.186.049-.363.13-.52.24-.148.106-.27.242-.36.4-.097.175-.145.37-.14.57-.012.21.041.42.15.6.098.147.228.27.38.36.157.09.325.162.5.21l.5.17c.137.05.265.12.38.21.103.09.158.224.15.36a.484.484 0 0 1-.07.26.573.573 0 0 1-.18.18.811.811 0 0 1-.25.11c-.09.012-.18.012-.27 0a1.06 1.06 0 0 1-.49-.12.995.995 0 0 1-.37-.33l-.54.57c.174.202.398.354.65.44.251.088.514.132.78.13a2.17 2.17 0 0 0 .61-.08c.184-.05.357-.135.51-.25.147-.112.266-.255.35-.42a1.31 1.31 0 0 0 .13-.6 1.07 1.07 0 0 0-.15-.61 1.24 1.24 0 0 0-.43-.4v.03zm-5.61.76c-.089.176-.22.327-.38.44-.17.118-.36.203-.56.25a2.817 2.817 0 0 1-.69.08h-.58v-2.9h.71c.222-.002.444.024.66.08.188.048.365.133.52.25.15.12.265.274.34.45.086.21.127.434.12.66.01.238-.037.476-.14.69zm.27-2.3a2.008 2.008 0 0 0-.71-.39 2.721 2.721 0 0 0-.83-.13H3.85v4.25h1.63c.275-.001.548-.045.81-.13.257-.088.497-.22.71-.39.23-.177.416-.403.55-.66.147-.294.22-.621.21-.95a2.222 2.222 0 0 0-.19-.94 1.932 1.932 0 0 0-.46-.66zm1.4 3.73h.78V9.05h-.78v4.25zm11.78-4.36a2.24 2.24 0 1 0 .121 4.479 2.241 2.241 0 0 0 2.18-2.24 2.274 2.274 0 0 0-2.3-2.24z" fill="#FFF"></path></g></svg><svg viewBox="0 0 38 24" width="1.58em" height="1em"><g fill="currentColor" fill-rule="evenodd"><rect width="38" height="24" rx="2"></rect><path d="M25 13.87v-.65h-2.8v-.79H25V11.3h-2.8v-.79H25v-.76l1.93 2.12-1.93 2zm1.43-4.5l1.39 1.5 1.42-1.5H31l-2.31 2.5 2.31 2.5h-1.77l-1.44-1.57-1.47 1.57h-5.4v-5h5.51zm-15.35 0L13 13.59V9.37h2l1.5 3.19L18 9.37h2v5h-1.34v-3.3l-1.53 3.3h-1.21l-1.67-3.6v3.6h-2.5l-.47-1.11H8.94l-.45 1.11H7l2.18-5h1.9zm-.99 1.09l-.68 1.66h1.39l-.71-1.66z" fill="#FFF"></path></g></svg><svg viewBox="0 0 38 24" width="1.58em" height="1em"><g fill="currentColor" fill-rule="evenodd"><rect width="38" height="24" rx="2"></rect><path d="M26.67 16.68c1.07 0 1.57-.41 2-1.64l1.92-5.39h-1.13l-1.29 4.16-1.29-4.16h-1.17l1.85 5.13-.1.31a.87.87 0 0 1-.92.73h-.32v.85c.14-.007.28-.023.42-.05l.03.06zm-3.71-2.7c-.58 0-1-.28-1-.71 0-.43.36-.7 1-.74l1.22-.08v.4a1.19 1.19 0 0 1-1.24 1.07l.02.06zm-.29.84a1.809 1.809 0 0 0 1.61-.9v.85h1V11.2c0-1-.81-1.67-2.07-1.67a1.83 1.83 0 0 0-2.05 1.58h1a1 1 0 0 1 1-.72c.67 0 1 .31 1 .89v.39l-1.36.08c-1.27.08-2 .6-2 1.5a1.55 1.55 0 0 0 1.84 1.51l.03.06zM16.8 8.64H18a1.312 1.312 0 0 1 1.49 1.4 1.321 1.321 0 0 1-1.5 1.4h-1.21l.02-2.8zm-1.09-.92v7h1.09v-2.43h1.51a2.24 2.24 0 0 0 2.349-2.319A2.209 2.209 0 0 0 18.34 7.66h-2.66l.03.06zm-3.66 1.24c-.63 0-1.17.36-1.46.36-.29 0-.76-.34-1.26-.33a1.86 1.86 0 0 0-1.58 1 4 4 0 0 0 .48 3.84c.32.47.71 1 1.21 1s.67-.31 1.25-.31.75.31 1.26.3c.51-.01.85-.47 1.18-.94.225-.332.4-.696.52-1.08-.61-.274-1-.882-1-1.55.008-.596.32-1.148.83-1.46a1.79 1.79 0 0 0-1.4-.76l-.03-.07zm-.39-.62a1.418 1.418 0 0 1-1.14.54 1.61 1.61 0 0 1 .41-1.18c.288-.332.693-.54 1.13-.58a1.72 1.72 0 0 1-.4 1.22z" fill="#FFF"></path></g></svg>
          </div>
          <p><a href="#" target="_blank" className="underline">More Info</a></p>
        </>
      )
    },
    help: {
      titulo: "Help and Contact",
      contenido: (
        <>
          <p className="mb-2"><strong>Phone EU:</strong> +44 808 1096 1114</p>
          <p className="mb-4"><strong>Email:</strong> ecommerce@kkarmax.com</p>
          <p className="mb-4">Customer service support...</p>
          <p className="mb-2"><strong>Working Hours:</strong></p>
          <p className="mb-4">Monday-Friday<br/>9AM - 6PM GMT</p>
          <p>Need more information? <a href="#" className="underline">Send us a message</a>.</p>
        </>
      )
    },
    size:{
      titulo: "Help and Contact",
      contenido: (
        <>
          <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold">Size Conversion</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-black text-xl"
              >
                &times;
              </button>
            </div>

            {/* Contenido */}
            <div className="p-4 space-y-4">
              {/* Sección medidas */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="grid grid-cols-2 gap-2">
                  <SizeDetail label="HEIGHT" value="6'2” (189cm)" />
                  <SizeDetail label="BUST" value="32” (83cm)" />
                  <SizeDetail label="WAIST" value="25” (64cm)" />
                  <SizeDetail label="HIPS" value="36” (92cm)" />
                </div>
              </div>

              {/* Encabezados de tallas */}
              <div className="grid grid-cols-3 gap-2 font-medium border-b pb-2">
                <div>EU</div>
                <div>UK</div>
                <div>US</div>
              </div>

              {/* Lista de tallas */}
              <div className="divide-y">
                {sizeData.map((size) => (
                  <div 
                    key={size.eu} 
                    className={`grid grid-cols-3 gap-2 py-2 `}
                  >
                    <div>{size.eu}</div>
                    <div>{size.uk}</div>
                    <div>{size.us}</div>
                  </div>
                ))}
              </div>

              {/* Nota final */}
              <p className="text-gray-500 text-sm pt-2">
                If you need further assistance with your size, please contact Client Service.
              </p>
            </div>
        </>
      )
    }
  };
  //funcion para agregar al carrito 
  const agregar = () => {
    fetch('http://localhost/TFG/controlador/c-usuarios.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        action: "agregar", 
        idUsuario: idUser,
        idProducto: id 
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Aquí puedes manejar la respuesta del servidor
      if (data.success) {
        alert('Producto agregado al carrito correctamente');
        // O podrías usar un toast notification en lugar de alert
      } else {
        alert(data.message || 'Error al agregar el producto');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Ocurrió un error al agregar al carrito');
    });
  }

  return (
    <>
    {/* carrusel para movil  */}
      <div className="lg:flex relative">
        <div className="lg:hidden relative h-[60vh] w-full bg-gray-100 border border-[#EDEDED]">
          <img
            src={`/img/prods/${imgList[imagenActual]}`}
            alt={`Imagen ${imagenActual + 1}`}
            className="w-full h-full object-contain"
          />
          
          <div className="absolute top-2 left-2 text-black text-[13px] px-2 py-1 bg-white/80 rounded">
            [{`${imagenActual + 1} / ${imgList.length}`}]
          </div>
          
          <button
            onClick={anteriorImagen}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow"
          >
            <i className="bx bx-chevron-left text-xl"></i>
          </button>
          
          <button
            onClick={siguienteImagen}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 shadow"
          >
            <i className="bx bx-chevron-right text-xl"></i>
          </button>
        </div>

        <div className="hidden lg:grid w-[70%] grid-cols-2">
          {imgList.map((img, index) => (
            <div key={index} className="bg-gray-100 overflow-hidden border h-full border-[#EDEDED] relative  cursor-crosshair">
              <img 
                src={`/img/prods/${img}`} 
                alt={`Imagen ${index + 1}`}
                className="w-full object-cover"
              />
              <div className="absolute top-2 left-2 text-black text-[13px] px-2 py-1">
                [{`${index + 1} / ${imgList.length}`}]
              </div>
            </div>
          ))}
        </div>
        {/* Div Dos --------------------------------------------------------------------------------- */}
        <div className="lg:w-[30%] lg:sticky lg:top-[25%] lg:pb-[5%] lg:transform  lg:self-start ml-[3%] h-[90vh] lg:h-auto">
          <div className="bg-white p-5 rounded-lg border-gray-100">
            <div className="capitalize font-normal text-[22px] mb-3">
              <h2>{listar.nombre}</h2>
              <p>{listar.precio}€</p>
            </div>
            
            <div className="mb-10">
              <p className="text-sm text-gray-600 leading-relaxed ">{listar.descripcion}</p>
            </div>
            
            {colores.length > 0 && (
              <div className="mb-10">
                <h3 className="text-xs font-semibold uppercase text-gray-900 tracking-wider mb-2">Colores:</h3>
                <div className="flex flex-wrap gap-2">
                  {colores.map((color, index) => (
                    <span 
                      key={index}
                      className={`block w-8 h-8 rounded-full ${color === "black" ? "bg-black" : `bg-${color}-500`} border border-gray-300 cursor-pointer hover:ring-2 hover:ring-gray-400 transition-all`}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {tamano.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-semibold uppercase text-gray-900 tracking-wider mb-2">Tallas (EU):</h3>
                <div className="flex flex-wrap gap-2">
                  {tamano.map((talla, index) => (
                    <button
                      key={index}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm font-medium transition-colors"
                    >
                      {talla}
                    </button>
                  ))}
                </div>
                  {listar.categoria == 1 ?<button className='cursor-pointer underline uppercase hover:no-underline text-[11px] mt-3'onClick={ () => setModalAbierto('size')} >Size Help</button>  :""}
              </div>
            )}
            
            
            {isAuthenticated ? ( // Si está autenticado, mostrar "Mi Perfil"
              listar.stock === 0 ? (
                <button
                  className="w-full flex items-center justify-center gap-2 bg-black/80 text-white font-medium py-3 px-6 rounded-full mt-4 cursor-not-allowed uppercase"
                  disabled
                >
                  <i className="bx bx-cart text-lg"></i>
                  <span>Out of Stock</span>
                </button>
              ) : (
                <button
                  className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-full transition-colors duration-300 mt-4 cursor-pointer uppercase"
                  onClick={agregar}
                >
                  <i className="bx bx-cart text-lg"></i>
                  <span>Add to Bag</span>
                </button>
              )
              ) : ( // Si no está autenticado, mostrar "Login"
                <Link to="/login" className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-full transition-colors duration-300 mt-4 cursor-pointer" >Login or Register</Link>
              )}
            
            <div className='mt-6'>
              <ul className='text-[12px] uppercase'>
                <li 
                  className='cursor-pointer hover:underline'
                  onClick={() => setModalAbierto('shipping')}
                >
                  Shipping & Returns
                </li>
                <li 
                  className='cursor-pointer hover:underline'
                  onClick={() => setModalAbierto('payment')}
                >
                  Payment
                </li>
                <li 
                  className='cursor-pointer hover:underline'
                  onClick={() => setModalAbierto('help')}
                >
                  Methods Help and Contact
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      

      {/* Modal */}
      {modalAbierto && (
          <div className="fixed inset-0 z-50">
            <div 
              className="absolute inset-0 bg-black/0 bg-opacity-30"
              onClick={() => setModalAbierto(null)}
            ></div>
            
            {/* Modal pequeño */}
            <div 
              className="animate__animated animate__fadeInRight animate__faster absolute top-4 right-4 lg:w-[400px] lg:max-h-[80vh] bg-white shadow-xl rounded-lg overflow-hidden border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Cabecera */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold">{modales[modalAbierto].titulo}</h3>
                <button 
                  onClick={() => setModalAbierto(null)}
                  className="text-gray-500 hover:text-black"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
              
              {/* Contenido desplazable */}
              <div className="p-4 text-sm text-gray-700 overflow-y-auto max-h-[calc(80vh-60px)]">
                {modales[modalAbierto].contenido}
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default ProductPage