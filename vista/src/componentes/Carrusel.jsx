import React, { useState, useEffect, useContext, useRef } from 'react'
import { AuthContext } from '../context/AuthContext';



const Carrusel = ({ listar }) => {
    const carruselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const { idUser } = useContext(AuthContext)
    // Estado de favoritos
    const [favoritos, setFavoritos] = useState([])
    const [loadingFavoritos, setLoadingFavoritos] = useState(false)
  
    useEffect(() => {
      const cargarFavoritos = async () => {
        setLoadingFavoritos(true);
  
        // Limpiar favoritos si no hay usuario
        if (!idUser) {
          setFavoritos([]);
          setFavoritos(JSON.parse(localStorage.getItem("fav") || "[]"))
          setLoadingFavoritos(false);
          return;
        }
  
        // Cargar de BD solo si hay usuario
        try {
          const response = await fetch('http://localhost/TFG/controlador/c-productos.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: "getFavoritosByUsuario", id: idUser }),
          });
          const data = await response.json();
          const favoriteIds = data.map(item => item.id_productos || item.id);
          setFavoritos(favoriteIds);
        } catch (error) {
          console.error('Error al cargar favoritos:', error);
        }
        setLoadingFavoritos(false);
      };
  
      cargarFavoritos();
    }, [idUser]); // Solo depende de idUser
  
  
  const toggleFavorito = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
  
    const isFavorite = favoritos.includes(id);
  
    // Actualización optimista SIEMPRE
    setFavoritos(prev =>
      isFavorite
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  
    if (!idUser) {
      // Para no logueados: usar localStorage directamente
      const saved = JSON.parse(localStorage.getItem('fav') || "[]");
      const newFavoritos = isFavorite
        ? saved.filter(item => item !== id)
        : [...saved, id];
      localStorage.setItem('fav', JSON.stringify(newFavoritos));
      return;
    }
  
    if (loadingFavoritos) return;
    setLoadingFavoritos(true);
  
    try {
      if (isFavorite) {
        await eliminarFavorito(id);
      } else {
        await agregarFavorito(id);
      }
      // NO revertimos el cambio nunca, porque confiamos en el backend
    } catch (error) {
      // Solo logueamos el error, pero no revertimos el cambio visual
      console.error("Error al actualizar favoritos:", error);
    } finally {
      setLoadingFavoritos(false);
    }
  };
  
    const agregarFavorito = async (id) => {
      if (!idUser) return true // Para usuarios no registrados, retornamos éxito directamente
  
      try {
        const response = await fetch('http://localhost/TFG/controlador/c-productos.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: "addAFav", id: idUser, ids: [id] }),
        })
        const data = await response.json()
        return data.success
      } catch (error) {
        console.error('Error al agregar favorito:', error)
        return false
      }
    }
  
    const eliminarFavorito = async (id) => {
      if (!idUser) return true // Para usuarios no registrados, retornamos éxito directamente
  
      try {
        const response = await fetch('http://localhost/TFG/controlador/c-productos.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: "removeFromFavoritos", id: idUser, ids: id }),
        })
        const data = await response.json()
        return data.success
      } catch (error) {
        console.error('Error al eliminar favorito:', error)
        return false
      }
    }


    // Eventos para el arrastre del carrusel
    const startDrag = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - carruselRef.current.offsetLeft);
        setScrollLeft(carruselRef.current.scrollLeft);
    };

    const duringDrag = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carruselRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        carruselRef.current.scrollLeft = scrollLeft - walk;
    };


    const endDrag = () => {
        setIsDragging(false);
    };


    return (
        <div
            ref={carruselRef}
            className='mt-10 flex overflow-x-auto scroll-smooth cursor-grab select-none px-0'
            style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                paddingLeft: '0',
                paddingRight: '0'
            }}
            onMouseDown={startDrag}
            onMouseMove={duringDrag}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
        >
            {listar.map((art, index) => {
                const productId = art.id_productos || art.id || index;
                const esFavorito = favoritos.includes(productId);
                return (
                    <article
                        key={productId}
                        className="flex-shrink-0 w-85 mx-0 border border-gray-200 overflow-hidden relative"
                        style={{
                            userSelect: 'none',
                            marginLeft: '0',
                            marginRight: '0',
                            borderRight: 'none'
                        }}
                    >
                        <div className="product-container">
                            <button
                                onClick={(e) => toggleFavorito(productId, e)}
                                className="absolute top-2 right-2 z-10 p-2 rounded-full transition-colors duration-200"
                                aria-label={esFavorito ? "Quitar de favoritos" : "Añadir a favoritos"}
                                disabled={loadingFavoritos}
                            >
                                <i className={
                                    `text-[20px] transition-colors duration-200 ${esFavorito
                                        ? 'bx bxs-heart text-red-500 animate__animated animate__bounceIn'
                                        : 'bx bx-heart text-gray-500'
                                    }`
                                }></i>
                            </button>

                            <div onClick={() => window.location.href = `/product/${art.id}`}>
                                <img
                                    src={`/img/prods/${art.img_url.split(",")[0].trim()}`}
                                    alt={art.nombre}
                                    className="w-full h-100 object-cover"
                                    draggable="false"
                                    onMouseOver={(e) => e.currentTarget.src = `/img/prods/${art.img_url.split(",")[1].trim()}`}
                                    onMouseOut={(e) => e.currentTarget.src = `/img/prods/${art.img_url.split(",")[0].trim()}`}
                                />
                                <div className='py-3'>
                                    <h3 className="product-name px-5 capitalize">{art.nombre}</h3>
                                    <p className="product-price px-5">€{art.precio}</p>
                                </div>
                            </div>
                        </div>
                    </article>
                );
            })}

        </div>
    );
};


export default Carrusel;
