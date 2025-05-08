import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedPage = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.key}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut" 
        }}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          overflow: 'visible' 
        }}
      >
        {/* Contenedor interno para animación de movimiento */}
        <motion.div
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          exit={{ y: -5 }}
          transition={{ 
            type: 'tween',
            ease: "easeInOut",
            duration: 0.3
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedPage;