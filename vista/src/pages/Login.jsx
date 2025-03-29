import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importar el contexto

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Usar la función login del contexto

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
          login(email); // Guardar el correo en el contexto y en localStorage
          if (data.rol === 0) {
            navigate('/admin');
          } else {
            navigate('/');
          }
        } else {
          let emailInput = document.querySelector("#email");
          let passwordInput = document.querySelector("#password");
          emailInput.style.border = "3px solid red";
          passwordInput.style.border = "3px solid red";
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
    <div className="h-[80vh] bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <h2 className="font-black text-3xl">
            k<span className="mirror">k</span>armX
          </h2>
        </div>

        <form onSubmit={enviarFormulario}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email@email.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;