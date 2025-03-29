import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Importar el AuthProvider
import Home from './pages/Home';
import Men from './pages/Men';
import Women from './pages/Women';
import Clothing from './pages/Clothing';
import Shoes from './pages/Shoes';
import Bags from './pages/Bags';
import Accessories from './pages/Accessories';
import Jewelry from './pages/Jewelry';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pagesAdmin/AdminDashboard';
import AdminCategorias from './pagesAdmin/AdminCategorias';
import AdminPromociones from './pagesAdmin/AdminPromociones';
import AdminProductos from './pagesAdmin/AdminProductos';
import AdminUsuarios from './pagesAdmin/AdminUsuarios';
import NotFound from './pages/NotFound';
import Plantilla from './pages/Plantilla';
import Buscador from './componentes/Buscador';
import RutaProtegida from './componentes/RutaProtegida';
import AdminPlantilla from './pages/AdminPlantilla';
import MiPerfil from './pages/MiPerfil';

function App() {
  return (
    <AuthProvider> {/* Envolver la aplicación con AuthProvider */}
      <Router>
        <Routes>
          {/* Plantilla como layout principal */}
          <Route path="/" element={<Plantilla />}>
            <Route index element={<Home />} />
            <Route path="/men" element={<Men />}>
              <Route path="clothing" element={<Clothing />} />
              <Route path="shoes" element={<Shoes />} />
              <Route path="bags" element={<Bags />} />
              <Route path="accessories" element={<Accessories />} />
              <Route path="jewelry" element={<Jewelry />} />
            </Route>
            <Route path="/women" element={<Women />}>
              <Route path="clothing" element={<Clothing />} />
              <Route path="shoes" element={<Shoes />} />
              <Route path="bags" element={<Bags />} />
              <Route path="accessories" element={<Accessories />} />
              <Route path="jewelry" element={<Jewelry />} />
            </Route>
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/buscador" element={<Buscador />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/account" element={<MiPerfil/>} />
          </Route>
         
          {/* Rutas de administrador */}
          <Route
            path="/admin"
            element={
              <RutaProtegida>
                <AdminPlantilla />
              </RutaProtegida>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="AdminCategorias" element={<AdminCategorias />} />
            <Route path="AdminPromociones" element={<AdminPromociones />} />
            <Route path="AdminProductos" element={<AdminProductos />} />
            <Route path="AdminUsuarios" element={<AdminUsuarios />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;