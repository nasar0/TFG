import React, { useState, useEffect, useRef } from 'react';
import Alert from '../componentes/Alert';
import { useNavigate } from 'react-router-dom';
import Checkout from './Checkout';

const Cart = ({ onClose }) => {
  const [userEmail, setUserEmail] = useState('');
  const [idUser, setIdUser] = useState(0);
  const [listar, setListar] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();
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
        console.log("Datos recibidos:", data);
        setListar(data);
        // Inicializar cantidades y tallas seleccionadas
        const initialQuantities = {};
        const initialSizes = {};
        data.forEach(item => {
          initialQuantities[item.id_productos] = item.cantidad;
          const sizes = item.tamano.split('-');
          initialSizes[item.id_productos] = sizes[0];
        });
        setQuantities(initialQuantities);
        setSelectedSizes(initialSizes);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  useEffect(() => {
    // Si hay productos en listar que no están en quantities, añádelos con cantidad 1 o la cantidad que tengan
    setQuantities(prev => {
      const newQuantities = { ...prev };
      listar.forEach(item => {
        if (newQuantities[item.id_productos] === undefined) {
          newQuantities[item.id_productos] = item.cantidad ?? 1;
        }
      });
      // También podrías limpiar cantidades de productos que ya no estén, si quieres máxima limpieza
      Object.keys(newQuantities).forEach(id => {
        if (!listar.some(item => String(item.id_productos) === String(id))) {
          delete newQuantities[id];
        }
      });
      return newQuantities;
    });
  }, [listar]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCheckoutModal) return;
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
  
    const handleKeyDown = (event) => {
      if (showCheckoutModal) return;
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
  }, [onClose, showCheckoutModal]);
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
    const product = listar.find(item => item.id_productos === productId);
    const maxQuantity = product.stock;
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
    setListar(prev => {
      const newList = prev.filter(item => item.id_productos !== productId);

      // Limpiar también quantities y selectedSizes
      setQuantities(prevQuantities => {
        const { [productId]: _, ...rest } = prevQuantities;
        return rest;
      });
      setSelectedSizes(prevSizes => {
        const { [productId]: _, ...rest } = prevSizes;
        return rest;
      });

      // Recalcular el total y descuento aquí
      const newTotal = newList.reduce((total, item) => {
        // Si quantities[item.id_productos] es undefined, usa 1 como fallback
        const cantidad = Number(quantities[item.id_productos] ?? 1);
        return total + (Number(item.precio) * cantidad);
      }, 0);

      // Asumiendo que tienes el porcentaje de descuento guardado en algún estado o variable:
      // Si no lo tienes, deberías guardarlo en un estado para poder recalcularlo.
      if (discountCode.trim() !== "") {
        fetch('http://localhost/TFG/controlador/c-promociones.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: "encontrarPromocion", nombre: discountCode.trim() }),
        })
          .then(res => res.json())
          .then(data => {
            if (data && data.length > 0) {
              const promocion = data[0];
              const descuento = Number(promocion.Descuento);
              if (!isNaN(descuento)) {
                setDiscount(newTotal * (descuento / 100));
              } else {
                setDiscount(0);
              }
            } else {
              setDiscount(0);
            }
          })
          .catch(() => setDiscount(0));
      } else {
        setDiscount(0);
      }

      return newList;
    });

    // Además, haces el fetch para eliminar el producto en el backend:
    fetch('http://localhost/TFG/controlador/c-productos.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: "eliminarProdCarrito", idUser, productId }),
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
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

  const checkout = () => {
    const precio = calculateTotal() - discount;
    const id_carrito = listar[0].ID_Carrito;
    // Crear un array con los productos y sus cantidades
    const productos = listar.map(producto => ({
      id: producto.id_productos,
      cantidad: quantities[producto.id_productos]
    }));

    fetch('http://localhost/TFG/controlador/c-productos.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: "pagoProd",
        id_carrito,
        precio,
        id: idUser,
        productos // Enviamos el array de productos con sus cantidades
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setListar([]);
        // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito
      })
      .catch((error) => {
        console.error('Error en el checkout:', error);
      }).finally(() => {
        onClose();
      });
  };
  // cantProd:
  // Estados para manejar el descuento
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const [promoId, setPromoId] = useState(0);

  // Función para aplicar el descuento
  const handleApplyDiscount = () => {
    fetch('http://localhost/TFG/controlador/c-promociones.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "encontrarPromocion", nombre: discountCode.trim() }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
  
        if (data && data.length > 0) {
          const promocion = data[0];
  
          // Comprobar fechas
          const hoy = new Date();
          const fechaInicio = new Date(promocion.Fecha_Inicio);
          const fechaFin = new Date(promocion.Fecha_Fin);
  
          // Ajuste por zona horaria si es necesario
          hoy.setHours(0,0,0,0);
          fechaInicio.setHours(0,0,0,0);
          fechaFin.setHours(0,0,0,0);
  
          if (hoy < fechaInicio || hoy > fechaFin) {
            setType("error");
            setMessage("The promotion is not valid on this date.");
            setDiscount(0);
            return;
          }
  
          const total = calculateTotal();
          const descuento = Number(promocion.Descuento);
  
          if (!isNaN(descuento)) {
            setDiscount(total * (descuento / 100));
            setType("success");
            setMessage("Promotion applied!");
          } else {
            setType("error");
            setMessage("The promotion discount is not valid.");
            setDiscount(0);
          }
        } else {
          setType("error");
          setMessage("Invalid promotion code.");
          setDiscount(0);
        }
      })
      .catch((error) => {
        setType("error");
        setMessage("Invalid promotion code.");
        setDiscount(0);
      });
  };

  // Tu función calculateTotal permanece igual
  const calculateTotal = () => {
    return listar.reduce((total, item) => {
      const cantidad = Number(quantities[item.id_productos] ?? 1);
      const precio = Number(item.precio ?? 0);
      return total + (precio * cantidad);
    }, 0);
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

  return (
    <>
      {message && (
        <Alert
          type={type}
          message={message}
          onClose={() => setMessage('')}
        />
      )}

      <div className="fixed inset-0 z-50 backdrop-blur-sm">
        {/* Overlay de fondo - solo visible en móvil/tablet */}
        <div
          className="absolute inset-0 bg-gray-400/75 backdrop-blur-sm animate__animated animate__fadeIn md:hidden"
          onClick={showCheckoutModal ? undefined : onClose}
        />

        {/* Contenedor principal del carrito */}
        <div
          ref={modalRef}
          className="absolute top-0 right-0 h-full w-full md:w-1/2 lg:w-1/3 bg-white z-50 animate__animated animate__slideInRight p-4 sm:p-6 rounded-b-xl shadow-xl overflow-y-auto"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-black">
                SHOPPING CART
              </h1>
              <button
                onClick={() => navigate(-1)} // Asegúrate de llamar a onClose así
                className="text-gray-500 hover:text-black text-2xl"
              >
                &times;
              </button>
            </div>

            {listar.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl">YOUR CART IS EMPTY</p>
                <p className="text-gray-500 mt-2">
                  Continue browsing <a href="/" className="underline">here</a>
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-md overflow-hidden">
                {/* Lista de productos */}
                <div className="divide-y divide-gray-200 max-h-[60vh] overflow-y-auto">
                  {listar.map((producto) => {
                    const sizes = producto.tamano.split('-');
                    if (producto.stock != 0) {
                      return (
                        <div key={producto.id_productos} className="py-4 sm:py-6 flex flex-col sm:flex-row">
                          {/* Imagen del producto */}
                          <div className="w-full sm:w-1/3 mb-3 sm:mb-0">
                            <img
                              src={`/img/prods/${producto.img_url.split(',')[0]}`}
                              alt={producto.nombre}
                              className="w-full h-32 sm:h-40 object-contain border border-gray-200"
                            />
                          </div>

                          {/* Detalles del producto */}
                          <div className="w-full sm:w-2/3 sm:pl-4 flex flex-col">
                            <div className="flex justify-between items-start">
                              <div>
                                <h2 className="text-lg sm:text-xl font-bold text-black">{producto.nombre}</h2>
                                <p className="text-gray-600 text-xs sm:text-sm mt-1">{producto.color}</p>
                                <p className="text-black font-bold mt-2">{producto.precio}€</p>
                              </div>
                              <button
                                onClick={() => removeItem(producto.id_productos)}
                                className="text-gray-500 hover:text-black ml-2"
                              >
                                ✕
                              </button>
                            </div>

                            {/* Selector de talla */}
                            <div className="mt-2 sm:mt-3">
                              <span className="text-xs sm:text-sm text-gray-600 mr-2">SIZE:</span>
                              <div className="inline-flex flex-wrap gap-1 sm:gap-2 mt-1">
                                {sizes.map(size => (
                                  <button
                                    key={size}
                                    onClick={() => handleSizeChange(producto.id_productos, size)}
                                    className={`px-2 sm:px-3 py-1 text-xs sm:text-sm border ${selectedSizes[producto.id_productos] === size
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
                            <div className="mt-3 sm:mt-4 flex items-center">
                              <span className="mr-2 sm:mr-3 text-xs sm:text-sm text-gray-600">QUANTITY:</span>
                              <div className="flex items-center border border-black">
                                <button
                                  onClick={() => handleQuantityChange(producto.id_productos, quantities[producto.id_productos] - 1)}
                                  className="px-2 sm:px-3 py-1 bg-white text-black hover:bg-gray-100 text-sm"
                                  disabled={quantities[producto.id_productos] <= 1}
                                >
                                  -
                                </button>
                                <span className="px-2 sm:px-3 py-1 border-x border-black text-sm">
                                  {quantities[producto.id_productos]}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(producto.id_productos, quantities[producto.id_productos] + 1)}
                                  className="px-2 sm:px-3 py-1 bg-white text-black hover:bg-gray-100 text-sm"
                                  disabled={quantities[producto.id_productos] >= producto.stock}
                                >
                                  +
                                </button>
                              </div>
                              <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-500">
                                {producto.stock} available
                              </span>
                            </div>

                            <div className="mt-3 sm:mt-4 pt-2 sm:pt-4 border-t border-gray-200">
                              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                                {producto.descripcion}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      removeItem(producto.id_productos)
                    }

                  })}
                </div>

                {/* Resumen del pedido */}
                <div className="p-4 sm:p-6 bg-gray-50 border-t border-black sticky bottom-0 bg-white">
                  <div className="mb-4">
                    <label htmlFor="discount-code" className="block text-sm font-medium text-gray-700 mb-1">
                      DISCOUNT CODE
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="discount-code"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        className="flex-1 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                        placeholder="Enter discount code"
                      />
                      <button
                        className="ml-2 bg-gray-200 text-black px-3 sm:px-4 py-2 text-sm hover:bg-gray-300 transition-colors"
                        onClick={handleApplyDiscount}
                      >
                        APPLY
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">SUBTOTAL</p>
                      <p className="text-lg font-bold">
                        {(calculateTotal() - discount).toFixed(2)}€
                        {discount > 0 && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {calculateTotal()}€
                          </span>
                        )}
                      </p>
                      {discount > 0 && (
                        <p className="text-sm text-green-600">
                          Discount applied: -{discount.toFixed(2)}€
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => setShowCheckoutModal(true)}
                      className="bg-black text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base hover:bg-gray-800 transition-colors"
                    >
                      PROCEED TO CHECKOUT
                    </button>
                    {showCheckoutModal && (
                      <Checkout onClose={() => setShowCheckoutModal(false)} onPay={checkout} />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showCheckoutModal && (
        <Checkout onClose={() => setShowCheckoutModal(false)} onPay={checkout} />
      )}
    </>
  );
};

export default Cart;