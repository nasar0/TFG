import React from 'react';
import AdminNavbar from '../componentes/AdminNavbar';
import { Outlet } from 'react-router-dom';

const AdminPlantilla = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminNavbar />

      {/* Contenido principal */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPlantilla;