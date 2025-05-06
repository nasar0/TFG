import React from 'react'

const Listarprods = ({listar}) => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  px-5">
                {listar.map((art) => (
                    <article
                        key={art.id}
                        className="border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => window.location.href = `/product/${art.id}`}
                    >
                        <img
                            src={`/img/prods/${art.img_url.split(",")[0].trim()}`}
                            alt={art.nombre}
                            className="w-full object-cover"
                            draggable="false"
                            onMouseOver={(e) => e.currentTarget.src = `/img/prods/${art.img_url.split(",")[1].trim()}`}
                            onMouseOut={(e) => e.currentTarget.src = `/img/prods/${art.img_url.split(",")[0].trim()}`}
                        />
                        <div className='pb-3'>
                            <h3 className="product-name px-5 capitalize">{art.nombre}</h3>
                            <p className="product-price px-5">€{art.precio}</p>
                        </div>
                    </article>
                ))}
            </div>
        </>
    )
}

export default Listarprods