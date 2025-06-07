import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../componentes/Alert';
const Register = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [type, setType] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    direccion:"",
    telefono:"",
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'REQUIRED FIELD';
    if (!formData.lastName) newErrors.lastName = 'REQUIRED FIELD';
    if (!formData.email.includes('@')) newErrors.email = 'INVALID EMAIL';
    if (formData.password.length < 8) newErrors.password = 'MIN 8 CHARACTERS';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'PASSWORDS MUST MATCH';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      fetch('http://localhost/TFG/controlador/c-usuarios.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: "crearUser",
          nombre: formData.firstName+" "+formData.lastName,
          correo: formData.email,
          contrasenna: formData.password,
          direccion: formData.direccion,
          telefono: formData.telefono,
        })
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            setErrorMsg("REGISTRATION SUCCESSFUL")
            setType("success")
            agregarFavorito(data.id)
            setTimeout(() => {
              navigate(-1)
            }, 2000);
          }else{
            setErrorMsg(data.message);
            setType("error")
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          setType("error")
          setErrorMsg('AN ERROR OCCURRED');
        });
      setTimeout(() => {
        setIsSubmitting(false);
      }, 200);
    }
  };
  const agregarFavorito = async (id) => {

    try {
      const response = await fetch('http://localhost/TFG/controlador/c-productos.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: "addAFav", id: id, ids: Array.from(JSON.parse(localStorage.getItem("fav") || "[]")) }),
      })
      const data = await response.json()
      return data.success
    } catch (error) {
      console.error('Error al agregar favorito:', error)
      return false
    }
  }
  


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {errorMsg && (
        <Alert
          type={type}
          message={errorMsg}
          onClose={() => setErrorMsg('')}
        />
      )}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 h-full w-px bg-black/5"></div>
        <div className="absolute left-1/2 top-0 h-full w-px bg-black/5"></div>
        <div className="absolute top-1/3 left-0 w-full h-px bg-black/5"></div>
      </div>

      <div className="w-full max-w-md mx-auto relative z-10">
        <div className="border-b-2 border-black mb-8 pb-4">
          <h1 className="text-3xl font-black uppercase tracking-tighter">CREATE ACCOUNT</h1>
          <p className="text-xs uppercase tracking-widest mt-1 opacity-70">
            KKX-MEMBER-{new Date().getFullYear()}
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase font-bold tracking-wider mb-2">
                FIRST NAME <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full p-3 border-b ${errors.firstName ? 'border-red-500' : 'border-black'} focus:outline-none text-sm uppercase tracking-wider`}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase font-bold tracking-wider mb-2">
                LAST NAME <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full p-3 border-b ${errors.lastName ? 'border-red-500' : 'border-black'} focus:outline-none text-sm uppercase tracking-wider`}
              />
              {errors.lastName && (
                <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase font-bold tracking-wider mb-2">
            ADDRESS <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className={`w-full p-3 border-b ${errors.direccion ? 'border-red-500' : 'border-black'} focus:outline-none text-sm uppercase tracking-wider`}
            />
            {errors.direccion && (
              <p className="text-xs text-red-500 mt-1">{errors.direccion}</p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase font-bold tracking-wider mb-2">
            PHONE <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={`w-full p-3 border-b ${errors.telefono ? 'border-red-500' : 'border-black'} focus:outline-none text-sm uppercase tracking-wider`}
            />
            {errors.telefono && (
              <p className="text-xs text-red-500 mt-1">{errors.telefono}</p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase font-bold tracking-wider mb-2">
              EMAIL <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border-b ${errors.email ? 'border-red-500' : 'border-black'} focus:outline-none text-sm uppercase tracking-wider`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase font-bold tracking-wider mb-2">
              PASSWORD <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full p-3 border-b ${errors.password ? 'border-red-500' : 'border-black'} focus:outline-none text-sm uppercase tracking-wider`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase font-bold tracking-wider mb-2">
              CONFIRM PASSWORD <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full p-3 border-b ${errors.confirmPassword ? 'border-red-500' : 'border-black'} focus:outline-none text-sm uppercase tracking-wider`}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-3 px-4 uppercase text-xs font-bold tracking-wider hover:bg-gray-900 transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75" fill="currentColor" />
                  </svg>
                  CREATING ACCOUNT...
                </>
              ) : (
                <>
                  REGISTER →
                </>
              )}
            </button>
          </div>
        </form>

        {/* Enlace a login */}
        <div className="mt-8 text-center border-t border-black pt-6">
          <p className="text-xs uppercase tracking-wider">
            ALREADY HAVE AN ACCOUNT?{' '}
            <Link to="/login" className="font-bold underline hover:opacity-80">
              LOG IN
            </Link>
          </p>
        </div>

        {/* Nota legal */}
        <div className="mt-10 text-center">
          <p className="text-[10px] uppercase tracking-widest opacity-50">
            BY REGISTERING YOU AGREE TO OUR TERMS AND CONDITIONS
          </p>
          <p className="text-[8px] uppercase tracking-widest opacity-30 mt-1">
            KKX-{new Date().getFullYear()}-REGISTER-FORM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register