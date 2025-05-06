import React, { useEffect } from 'react';

const Alert = ({ type = "info", message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const variants = {
    success: {
      bg: "bg-green-100",
      text: "text-green-800",
      icon: <i className='bx bx-check-circle text-green-600 text-xl'></i>,
    },
    error: {
      bg: "bg-red-100",
      text: "text-red-800",
      icon: <i className='bx bx-error-circle text-red-600 text-xl'></i>,
    },
    info: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      icon: <i className='bx bx-info-circle text-blue-600 text-xl'></i>,
    },
    warning: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      icon: <i className='bx bx-error text-yellow-600 text-xl'></i>,
    }
  };

  const { bg, text, icon } = variants[type] || variants.info;

  return (
    <div className={`fixed top-4 left-4 z-50 max-w-xs w-full shadow-md rounded-md ${bg} ${text} p-4 flex items-start justify-between`}>
      <div className="flex gap-2 items-center">
        {icon}
        <span>{message}</span>
      </div>
      <button onClick={onClose}>
        <i className='bx bx-x text-xl hover:text-black transition'></i>
      </button>
    </div>
  );
};

export default Alert;
