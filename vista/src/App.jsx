import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Importar el AuthProvider
import Home from './pages/Home';
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
import LegalPage from './pages/LegalPage';
import Catalogo from './componentes/Catalogo';
import Articulobuscado from './pages/Articulobuscado';
import ChatBot from './pages/ChatBot';
import Favoritos from './pages/Favoritos';

function App() {
  return (
    <AuthProvider> {/* Envolver la aplicación con AuthProvider */}
      <Router>
        <Routes>
          {/* Plantilla como layout principal */}
          <Route path="/" element={<Plantilla />}>
            <Route index element={<Home />} />
            <Route path="/catalog/:gender/:category?" element={<Catalogo/>} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/privacy-policy/:activeSection" element={<LegalPage/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<MiPerfil />} />
            <Route path="/search" element={<Buscador />} />  
            <Route path="/prod" element={<Articulobuscado />} />
            <Route path="/fav" element={<Favoritos />} />
          </Route>
          <Route path="/chatBot" element={<ChatBot/>} />
          <Route path="*" element={<NotFound />} />


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