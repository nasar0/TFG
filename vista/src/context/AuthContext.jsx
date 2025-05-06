import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [idUser, setIdUser] = useState(0);

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
    fetch('http://localhost/TFG/controlador/c-usuarios.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "logout" }),
      credentials: 'include',
    })
    .then(() => {
      setIsAuthenticated(false);
      setUserEmail('');
      setIdUser(0);

      // Eliminar el estado de autenticación de localStorage
      localStorage.removeItem('isAuthenticated');
    })
    .catch((error) => {
      console.error('Error al cerrar sesión:', error);
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, idUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
