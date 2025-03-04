import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';

const AdminDashboard = () => {
  const [estas, setEstas] = useState([])
  useEffect(() => {
    fetch('http://localhost/TFG/controlador/c-usuarios.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "estadisticas" })
    })
    .then(response => response.json())
    .then(data => setEstas(data))
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []); 
  console.log(estas)
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center">Panel de Administración</h1>

     {
      estas.map((estas,index)=>(
        <div key={index} className="flex justify-evenly items-center">
        <div className=''>
          <div className="bg-white p-6 rounded-lg shadow-md mb-3">
            <Link to="/admin/AdminUsuarios">
              <h2 className="text-lg font-semibold">Usuarios</h2>
            </Link>
            <p className="text-3xl font-bold">{estas.Usuarios}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Link to="/admin/AdminProductos" >
              <h2 className="text-lg font-semibold">Productos</h2>
            </Link>
            <p className="text-3xl font-bold">{estas.Productos}</p>
          </div>
        </div>
        <div className=''>
          <div className="bg-white p-6 rounded-lg shadow-md mb-3">
            <h2 className="text-lg font-semibold">Ventas</h2>
            <p className="text-3xl font-bold">{estas.Ventas}$</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md"> 
            <Link to="/admin/AdminCategorias" >
              <h2 className="text-lg font-semibold">Categorías</h2>
            </Link>
            <p className="text-3xl font-bold">{estas.Categorias}</p>
          </div>
        </div>
      </div>
      ))
     }
      
    </div>
  );
};

export default AdminDashboard;