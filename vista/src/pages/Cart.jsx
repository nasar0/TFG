import React, { useState, useEffect, useRef } from 'react';

const Cart = ({onClose}) => {
  const [userEmail, setUserEmail] = useState('');
  const [idUser, setIdUser] = useState(0);
  const [listar, setListar] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const modalRef = useRef(null);

  const cargarProductosCart = () => {
    fetch('http://localhost/TFG/controlador/c-productos.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "getCarrito", id: idUser }),
    })
      .then((response) => response.json())
      .then((data) => {
        setListar(data);
        // Inicializar cantidades y tallas seleccionadas
        const initialQuantities = {};
        const initialSizes = {};
        data.forEach(item => {
          initialQuantities[item.ID_Productos] = item.Cantidad;
          // Seleccionar la primera talla disponible por defecto
          const sizes = item.Tamano.split('-');
          initialSizes[item.ID_Productos] = sizes[0];
        });
        setQuantities(initialQuantities);
        setSelectedSizes(initialSizes);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          onClose();
        }
      };

      const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [onClose]);
  const cargarUsuario = () => {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');

    if (storedIsAuthenticated === 'true') {
      fetch('http://localhost/TFG/controlador/c-usuarios.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: "getSesion" }),
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.email) {
            setUserEmail(data.email);
            setIdUser(data.id);
          }
        })
        .catch((error) => {
          console.error("Error al cargar la sesión:", error);
        });
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const product = listar.find(item => item.ID_Productos === productId);
    const maxQuantity = product.Stock;

    if (newQuantity > maxQuantity) {
      newQuantity = maxQuantity;
    } else if (newQuantity < 1) {
      newQuantity = 1;
    }

    setQuantities(prev => ({
      ...prev,
      [productId]: newQuantity
    }));
  };

  const handleSizeChange = (productId, newSize) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: newSize
    }));
  };

  const removeItem = (productId) => {
    setListar(prev => prev.filter(item => item.ID_Productos !== productId));
    fetch('http://localhost/TFG/controlador/c-productos.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "eliminarProdCarrito", idUser, productId }),
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          // Esto detecta errores como 500 o 404
          return response.text().then(text => {
            throw new Error(`Server error ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta del backend:", data);
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
      });

  };

  const calculateTotal = () => {
    return listar.reduce((total, item) => {
      return total + (item.Precio * quantities[item.ID_Productos]);
    }, 0).toFixed(2);
  };

  useEffect(() => {
    cargarUsuario();
  }, []);

  useEffect(() => {
    if (idUser !== 0) {
      cargarProductosCart();
    }
  }, [idUser]);
  const [menorLg, setMenorLg] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const handleResize = () => setMenorLg(mediaQuery.matches);

    handleResize();
    mediaQuery.addEventListener('change', handleResize);

    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

    if (menorLg) {
      return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-black mb-8 text-center border-b-2 border-black pb-2">
              SHOPPING CART
            </h1>

            {listar.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl">YOUR CART IS EMPTY</p>
                <p className="text-gray-500 mt-2">Continue browsing <a href="/" className="underline">here</a></p>
              </div>
            ) : (
              <div className="bg-white shadow-md rounded-md overflow-hidden">
                {/* Lista de productos */}
                <div className="divide-y divide-gray-200">
                  {listar.map((producto) => {
                    const sizes = producto.Tamano.split('-');
                    return (
                      <div key={producto.ID_Productos} className="p-6 flex flex-col sm:flex-row">
                        {/* Imagen del producto */}
                        <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                          <img
                            src={`/img/prods/${producto.Img_URL.split(',')[0]}`}
                            alt={producto.Nombre_Producto}
                            className="w-full h-48 object-contain border border-gray-200"
                          />
                        </div>

                        {/* Detalles del producto */}
                        <div className="w-full sm:w-2/3 sm:pl-6 flex flex-col">
                          <div className="flex justify-between items-start">
                            <div>
                              <h2 className="text-xl font-bold text-black">{producto.Nombre_Producto}</h2>
                              <p className="text-gray-600 text-sm mt-1">{producto.Color}</p>
                              <p className="text-black font-bold mt-2">${producto.Precio}</p>
                            </div>
                            <button
                              onClick={() => removeItem(producto.ID_Productos)}
                              className="text-gray-500 hover:text-black"
                            >
                              ✕
                            </button>
                          </div>

                          {/* Selector de talla */}
                          <div className="mt-3">
                            <span className="text-sm text-gray-600 mr-2">SIZE:</span>
                            <div className="inline-flex flex-wrap gap-2 mt-1">
                              {sizes.map(size => (
                                <button
                                  key={size}
                                  onClick={() => handleSizeChange(producto.ID_Productos, size)}
                                  className={`px-3 py-1 text-sm border ${selectedSizes[producto.ID_Productos] === size
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white text-black border-gray-300 hover:border-black'
                                    }`}
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Selector de cantidad */}
                          <div className="mt-4 flex items-center">
                            <span className="mr-3 text-sm text-gray-600">QUANTITY:</span>
                            <div className="flex items-center border border-black">
                              <button
                                onClick={() => handleQuantityChange(producto.ID_Productos, quantities[producto.ID_Productos] - 1)}
                                className="px-3 py-1 bg-white text-black hover:bg-gray-100"
                                disabled={quantities[producto.ID_Productos] <= 1}
                              >
                                -
                              </button>
                              <span className="px-3 py-1 border-x border-black">
                                {quantities[producto.ID_Productos]}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(producto.ID_Productos, quantities[producto.ID_Productos] + 1)}
                                className="px-3 py-1 bg-white text-black hover:bg-gray-100"
                                disabled={quantities[producto.ID_Productos] >= producto.Stock}
                              >
                                +
                              </button>
                            </div>
                            <span className="ml-3 text-sm text-gray-500">
                              {producto.Stock} available
                            </span>
                          </div>

                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600">{producto.Descripcion}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Resumen del pedido */}
                <div className="p-6 bg-gray-50 border-t border-black">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">SUBTOTAL</p>
                      <p className="text-lg font-bold">${calculateTotal()}</p>
                    </div>
                    <button className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors">
                      PROCEED TO CHECKOUT
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <>
           <div className="fixed inset-0 z-50">
          {/* Overlay de fondo */}
          <div
            className="absolute inset-0 bg-gray-400/75 backdrop-blur-sm animate__animated animate__fadeIn"
            onClick={onClose}
          />

          {/* Contenedor principal del carrito */}
          <div
            ref={modalRef}
            className="absolute top-0 right-0 right-0 bg-white z-60 w-1/2 h-[100vh] animate__animated animate__slideInRight p-6 rounded-b-xl shadow-xl"
          >
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-black mb-8 text-center border-b-2 border-black pb-2">
                SHOPPING CART
              </h1>

              {listar.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl">YOUR CART IS EMPTY</p>
                  <p className="text-gray-500 mt-2">Continue browsing <a href="/" className="underline">here</a></p>
                </div>
              ) : (
                <div className="bg-white shadow-md rounded-md overflow-hidden">
                  {/* Lista de productos */}
                  <div className="divide-y divide-gray-200 max-h-[70vh] overflow-y-auto"> 
                    {listar.map((producto) => {
                      const sizes = producto.Tamano.split('-');
                      return (
                        <div key={producto.ID_Productos} className="p-6 flex flex-col sm:flex-row">
                          {/* Imagen del producto */}
                          <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                            <img
                              src={`/img/prods/${producto.Img_URL.split(',')[0]}`}
                              alt={producto.Nombre_Producto}
                              className="w-full h-48 object-contain border border-gray-200"
                            />
                          </div>

                          {/* Detalles del producto */}
                          <div className="w-full sm:w-2/3 sm:pl-6 flex flex-col">
                            <div className="flex justify-between items-start">
                              <div>
                                <h2 className="text-xl font-bold text-black">{producto.Nombre_Producto}</h2>
                                <p className="text-gray-600 text-sm mt-1">{producto.Color}</p>
                                <p className="text-black font-bold mt-2">${producto.Precio}</p>
                              </div>
                              <button
                                onClick={() => removeItem(producto.ID_Productos)}
                                className="text-gray-500 hover:text-black"
                              >
                                ✕
                              </button>
                            </div>

                            {/* Selector de talla */}
                            <div className="mt-3">
                              <span className="text-sm text-gray-600 mr-2">SIZE:</span>
                              <div className="inline-flex flex-wrap gap-2 mt-1">
                                {sizes.map(size => (
                                  <button
                                    key={size}
                                    onClick={() => handleSizeChange(producto.ID_Productos, size)}
                                    className={`px-3 py-1 text-sm border ${selectedSizes[producto.ID_Productos] === size
                                      ? 'bg-black text-white border-black'
                                      : 'bg-white text-black border-gray-300 hover:border-black'
                                      }`}
                                  >
                                    {size}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Selector de cantidad */}
                            <div className="mt-4 flex items-center">
                              <span className="mr-3 text-sm text-gray-600">QUANTITY:</span>
                              <div className="flex items-center border border-black">
                                <button
                                  onClick={() => handleQuantityChange(producto.ID_Productos, quantities[producto.ID_Productos] - 1)}
                                  className="px-3 py-1 bg-white text-black hover:bg-gray-100"
                                  disabled={quantities[producto.ID_Productos] <= 1}
                                >
                                  -
                                </button>
                                <span className="px-3 py-1 border-x border-black">
                                  {quantities[producto.ID_Productos]}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(producto.ID_Productos, quantities[producto.ID_Productos] + 1)}
                                  className="px-3 py-1 bg-white text-black hover:bg-gray-100"
                                  disabled={quantities[producto.ID_Productos] >= producto.Stock}
                                >
                                  +
                                </button>
                              </div>
                              <span className="ml-3 text-sm text-gray-500">
                                {producto.Stock} available
                              </span>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <p className="text-sm text-gray-600">{producto.Descripcion}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Resumen del pedido */}
                  <div className="p-6 bg-gray-50 border-t border-black sticky bottom-0 bg-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">SUBTOTAL</p>
                        <p className="text-lg font-bold">${calculateTotal()}</p>
                      </div>
                      <button className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors">
                        PROCEED TO CHECKOUT
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        </>
      );
    }
  };

  export default React.memo(Cart);