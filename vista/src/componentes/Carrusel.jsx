import React, { useEffect, useState, useRef } from 'react';

const Carrusel = ({listar}) => {
    const carruselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    
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
    console.log(listar)
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
            <style>{`
                .flex::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
            
            {listar.map((art) => (
                <article 
                    key={art.id} 
                    className="flex-shrink-0 w-85 mx-0 border border-gray-200 overflow-hidden"
                    style={{ 
                        userSelect: 'none',
                        marginLeft: '0',
                        marginRight: '0',
                        borderRight: 'none' // Elimina el borde derecho excepto en el último elemento
                    }}
                    onClick={() => window.location.href = `/product/${art.id}`}
                >
                    <img 
                        src={`/img/prods/${art.img_url.split(",")[0].trim()}`}
                        alt={art.nombre}
                        className="w-full h-100 object-cover"
                        draggable="false"
                        onMouseOver={(e) => e.currentTarget.src = `/img/prods/${art.img_url.split(",")[1].trim()}`}
                        onMouseOut={(e) => e.currentTarget.src = `/img/prods/${art.img_url.split(",")[0].trim()}`}
                    />
                    <div className='pb-3'>
                        <h3 className="product-name px-5 capitalize">{art.nombre}</h3>
                        <p className="product-price px-5">{art.precio}€</p>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default Carrusel;