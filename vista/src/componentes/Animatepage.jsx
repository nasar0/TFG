import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Importación correcta
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';

const AnimatedPage = ({ children }) => {
  const location = useLocation();
  const controls = useAnimationControls();
    
  useEffect(() => {
    const sequence = async () => {
      await controls.start({ 
        opacity: 0,
        transition: { duration: 1 } 
      });
      
      await controls.start({ 
        opacity: 1,
        y: 0,
        transition: { 
          duration: 0.75, 
          ease: "easeOut" 
        }
      });
    };
    sequence();
  }, [location.key, controls]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.key}
        initial={{ opacity: 0, y: 30 }}
        animate={controls}
        exit={{ 
          opacity: 0, 
          y: -10,
          transition: { duration: 0.3 } 
        }}
        style={{
          display: 'block', // Siempre mantiene el layout
          width: '100%' // Previene saltos
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedPage;