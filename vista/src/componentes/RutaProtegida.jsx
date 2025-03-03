import React from 'react';
import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ children }) => {
  // Verifica si la cookie de validación está presente
  const isAuthenticated = document.cookie.includes('validacion=true');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderiza el componente hijo (en este caso, AdminDashboard)
  return children;
};

export default RutaProtegida;
