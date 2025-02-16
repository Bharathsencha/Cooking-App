import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorSize = 10;

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50"
      animate={{
        x: mousePosition.x - cursorSize / 2,
        y: mousePosition.y - cursorSize / 2,
      }}
      transition={{
        type: 'spring',
        mass: 0.1,
        stiffness: 150,
        damping: 15,
      }}
      style={{
        width: `${cursorSize}px`,
        height: `${cursorSize}px`,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #ff0080, #ff8c00, #ff0, #0f0, #00f, #8000ff)',
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
        mixBlendMode: 'difference',
      }}
    />
  );
};
