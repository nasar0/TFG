import React from 'react';
import AdminNavbar from '../componentes/AdminNavbar';
import { Outlet } from 'react-router-dom';

const AdminPlantilla = () => {
  return (
    <>
      <header>
        <AdminNavbar />
      </header>
      <main>
        <Outlet /> 
      </main>
    </>
  );
};

export default AdminPlantilla;