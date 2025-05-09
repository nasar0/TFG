import React, { useEffect } from 'react';

const Alert = ({ type = "info", message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  const variants = {
    success: {
      bg: "bg-black",
      border: "border-l-4 border-gray-800",
      text: "text-white",
      icon: <i></i>,
    },
    error: {
      bg: "bg-white",
      border: "border-l-4 border-gray-800",
      text: "text-gray-800",
      icon: <i className='bx bx-error-circle text-gray-800 text-xl'></i>,
    },
    info: {
      bg: "bg-white",
      border: "border-l-4 border-gray-800",
      text: "text-gray-800",
    },
    warning: {
      bg: "bg-white",
      border: "border-l-4 border-gray-800",
      text: "text-gray-800",
      icon: <i className='bx bx-error text-gray-800 text-xl'></i>,
    }
  };

  const { bg, text, icon } = variants[type] || variants.info;

  return (
    <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-50 max-w-xs w-full shadow-lg rounded-lg ${bg} ${text} p-4 flex items-center justify-between space-x-3`}>
      <div className="flex items-center m-auto space-x-3">
        {icon}
        <span className="text-sm text-center">{message}</span>
      </div>
      <button onClick={onClose} className="p-1 hover:bg-opacity-80 transition duration-150">
        <i className='bx bx-x text-xl hover:text-white'></i>
      </button>
    </div>
  );
};

export default Alert;
