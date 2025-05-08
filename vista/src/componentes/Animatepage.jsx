import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';

const AnimatedPage = ({ children }) => {
  const location = useLocation();
  const controls = useAnimationControls();
    
  useEffect(() => {
    const sequence = async () => {
      // Eliminamos la animación de fade out inicial que causaba el "parpadeo"
      await controls.start({ 
        opacity: 1,
        y: 0,
        transition: { 
          duration: 0.5,
          ease: "easeOut" 
        }
      });
    };
    
    // Inicializamos con valores iniciales directamente
    controls.set({ opacity: 0, y: 30 });
    
    // Solo animar si hay un cambio de ruta real
    if (children.key !== location.key) {
      sequence();
    }
  }, [location.key, controls, children.key]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.key}
        initial={{ opacity: 0, y: 30 }}
        animate={controls}
        exit={{ 
          opacity: 0, 
          y: -10,
          transition: { 
            duration: 0.3,
            ease: "easeIn" 
          }
        }}
        style={{
          position: 'relative',
          display: 'block',
          width: '100%',
          minHeight: '100vh', // Usar viewport height para consistencia
          overflow: 'hidden' // Previene scroll durante animación
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedPage;