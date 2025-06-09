import React, { useState } from 'react';

const Checkout = ({ onPay, onClose }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const formatExpiry = (value) => {
    // Quitar todo excepto números
    const v = value.replace(/[^0-9]/g, '');

    if (v.length === 0) return ''; // vacío si nada

    if (v.length <= 2) {
      return v; // sólo meses, sin barra aún
    }

    // Si hay más de 2 dígitos, añadimos la barra
    return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
  };


  const handleExpiryChange = (e) => {
    setExpiry(formatExpiry(e.target.value));
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40 p-4 w-full">
      {/* Tarjeta conceptual con efecto "etiqueta de exhibición" */}
      <div className="border-2 border-black rounded-lg bg-white relative w-full max-w-md lg:max-w-[800px]">
        {/* Encabezado como ficha técnica */}
        <div className="border-b-2 border-black p-5 bg-black text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tighter">PAYMENT GATEWAY</h1>
              <p className="text-xs opacity-80 mt-1">KKX-{new Date().getFullYear()}-SECURE-PAYMENT</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2 py-1 bg-white text-black text-xs font-bold uppercase">SECURE</span>
            </div>
          </div>
        </div>

        {/* Cuerpo del formulario */}
        <div className="p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onPay({
                cardNumber: cardNumber.replace(/\s/g, ''),
                expiry,
                cvv,
                name: name.toUpperCase()
              });
            }}
          >
            {/* Número de tarjeta */}
            <div className="mb-6">
              <label className="block text-xs uppercase font-medium tracking-wider mb-2 opacity-70">
                CARD NUMBER
              </label>
              <input
                type="text"
                name='fake_number'
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength={19}
                className="w-full p-3 border-b-2 border-black focus:outline-none text-sm uppercase tracking-wider bg-transparent"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>

            {/* Fila de fecha y CVV */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs uppercase font-medium tracking-wider mb-2 opacity-70">
                  EXPIRATION
                </label>
                <input
                  type="text"
                  name="cfake"
                  value={expiry}
                  onChange={handleExpiryChange}
                  maxLength={5}
                  className="w-full p-3 border-b-2 border-black focus:outline-none text-sm uppercase tracking-wider bg-transparent"
                  placeholder="MM/AA"
                  required
                  autoComplete="off"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-medium tracking-wider mb-2 opacity-70">
                  CVV
                </label>
                <input
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                  maxLength={4}
                  className="w-full p-3 border-b-2 border-black focus:outline-none text-sm uppercase tracking-wider bg-transparent"
                  placeholder="•••"
                  required
                />
              </div>
            </div>

            {/* Nombre en la tarjeta */}
            <div className="mb-8">
              <label className="block text-xs uppercase font-medium tracking-wider mb-2 opacity-70">
                CARDHOLDER NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border-b-2 border-black focus:outline-none text-sm uppercase tracking-wider bg-transparent"
                placeholder="FULL NAME"
                required
              />
            </div>

            {/* Botones de acción */}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="btn-i px-6 py-2 border-2 text-xs font-bold uppercase tracking-wider  transition-colors flex items-center"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 btn text-xs font-bold uppercase tracking-wider transition-colors flex items-center"
              >
                Pay Now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Pie de tarjeta - Seguridad */}
        <div className="border-t-2 border-black p-4 bg-gray-50">
          <div className="flex items-center justify-center space-x-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-xs uppercase tracking-wider">Secure encrypted payment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;