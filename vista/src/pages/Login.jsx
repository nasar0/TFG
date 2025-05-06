import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {login} = useContext(AuthContext);


  const enviarFormulario = (e) => {
    e.preventDefault();

    fetch('http://localhost/TFG/controlador/c-usuarios.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: "verificar", email, password }),
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          login(email); 
          if (data.rol === 0) {
            navigate('/admin');
          } else {
            navigate('/');
          }
        } else {
          let emailInput = document.querySelector("#email");
          let passwordInput = document.querySelector("#password");

          emailInput.classList.add("animate__animated", "animate__shakeX");
          passwordInput.classList.add("animate__animated", "animate__shakeX");
          setTimeout(() => {
            emailInput.classList.remove("animate__animated", "animate__shakeX");
            passwordInput.classList.remove("animate__animated", "animate__shakeX");
          }, 500);
        }
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md mx-auto">
        {/* Logo con efecto espejo mejorado */}
        <div className="flex justify-center mb-12">
          <h2 className="font-black text-7xl relative">
            <span className="text-black">K</span>
            <span className="mirror text-black opacity-80">K</span>
            <span className="text-black">armx</span>
          </h2>
        </div>
  
        {/* Contenedor del formulario con detalles de lujo */}
        <div className="relative">
          {/* Línea decorativa izquierda (como etiqueta de prenda) */}
          <div className="absolute left-0 top-0 h-full w-px bg-black"></div>
          
          <form onSubmit={enviarFormulario} className="pl-6">
            {/* Inputs con efecto "etiqueta de prenda" */}
            <div className="mb-8 relative group">
              <label 
                htmlFor="email" 
                className="block text-xs uppercase font-medium mb-3 tracking-widest opacity-60 group-focus-within:opacity-100 transition-opacity"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  className="w-full pb-2 bg-transparent border-b border-black/30 focus:border-black outline-none transition-all placeholder:text-gray-400 text-sm tracking-wider group-hover:border-black"
                  placeholder="user@domain.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
  
            <div className="mb-12 relative group">
              <label 
                htmlFor="password" 
                className="block text-xs uppercase font-medium mb-3 tracking-widest opacity-60 group-focus-within:opacity-100 transition-opacity"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  className="w-full pb-2 bg-transparent border-b border-black/30 focus:border-black outline-none transition-all placeholder:text-gray-400 text-sm tracking-wider group-hover:border-black"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute bottom-0 left-0 w-0 h-px bg-black group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
  
            <button
              type="submit"
              className="w-full bg-black text-white py-4 px-6 uppercase text-xs font-bold tracking-widest relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Access Account
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </span>
              <span className="absolute inset-0 bg-gray-900 transition-transform origin-bottom transform scale-y-0 group-hover:scale-y-100 duration-300"></span>
            </button>
          </form>
        </div>
  
        <div className="mt-10 text-center">
          <Link 
            to="/register" 
            className="inline-block text-xs uppercase tracking-widest border-b border-transparent hover:border-black pb-1 transition-all relative group"
          >
            <span className="opacity-80 group-hover:opacity-100">Not registered yet?</span>
            <span className="ml-2 font-medium">Create account →</span>
          </Link>
        </div>
  
        {/* Detalle de diseño: Número de colección (ficticio) */}
        <div className="mt-16 text-center text-xs opacity-40 tracking-widest">
          <p>KKX-0{Math.floor(Math.random() * 10)}.23.4</p>
        </div>
      </div>
    </div>
  );
};

export default Login;