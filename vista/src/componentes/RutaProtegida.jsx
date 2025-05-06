import React from 'react';
import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ children }) => {
  // Verifica si la cookie de validación está presente
  const isAuthenticated = document.cookie.includes('rol=0');

  if (!isAuthenticated) {
    return <Navigate to="/account" replace />;
  }

  // Si está autenticado, renderiza el componente hijo (en este caso, AdminDashboard)
  return children;
};

export default RutaProtegida;
