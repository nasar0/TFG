import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [idUser, setIdUser] = useState(0);
  const [cartCount, setCartCount] = useState(0); // Nuevo estado para el carrito

  // Función para actualizar el contador del carrito
  const updateCartCount = () => {
    if (idUser > 0) {
      fetch('http://localhost/TFG/controlador/c-usuarios.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: "n_carrito",
        id: idUser
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setCartCount(data)
        console.log(cartCount)
      })
      .catch((error) => {
      });
    }
  };

  // Actualizar el carrito cuando cambie idUser
  useEffect(() => {
    updateCartCount();
  }, [idUser]);

  useEffect(() => {
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');

    if (storedIsAuthenticated === 'true') {
      // Si la sesión está activa, hacemos una solicitud para obtener los datos del usuario
      fetch('http://localhost/TFG/controlador/c-usuarios.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: "getSesion" }),
        credentials: 'include', // Asegura que las cookies se manden
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.email) {
            setUserEmail(data.email);
            setIdUser(data.id);
            setIsAuthenticated(true);

          }
        })
        .catch((error) => {
          console.error("Error al cargar la sesión:", error);
        });
    }
  }, []);

  const login = (email) => {

    fetch('http://localhost/TFG/controlador/c-usuarios.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "listarEmail", email: email }),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        //  Establecer idUser con la respuesta
        setIdUser(data.id_usuario);

        //Establecer los valores en el estado
        setUserEmail(email);
        setIsAuthenticated(true);

        //  Guardar isAuthenticated en el localStorage
        localStorage.setItem('isAuthenticated', 'true');

        // Paso 5: Crear sesión en el servidor
        return fetch('http://localhost/TFG/controlador/c-usuarios.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: "crearSesion", email: email, id: data.id_usuario }), // Usamos el id_usuario de la respuesta
          credentials: 'include',
        });
      })
  };


  const logout = () => {
    // 1. Limpiar el estado ANTES de hacer la petición
    setIsAuthenticated(false);
    setUserEmail('');
    setIdUser(0);
    localStorage.removeItem('isAuthenticated');

    // 2. Luego hacer la petición al servidor
    fetch('http://localhost/TFG/controlador/c-usuarios.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "logout" }),
      credentials: 'include',
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        userEmail, 
        idUser, 
        cartCount,  // Exportar cartCount
        updateCartCount,  // Exportar función para actualizar
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
