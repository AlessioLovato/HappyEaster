import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Image paths for popups
const popupImages = [
  './images/1.jpeg',
  './images/2.jpeg',
  './images/3.jpeg',
  './images/4.jpeg',
  './images/5.jpeg',
  './images/6.jpeg',
  './images/7.jpeg',
  './images/8.jpeg',
  './images/9.jpeg',
  './images/11.jpeg',
  './images/12.jpeg'
];

const finalPopupImage = './images/10.jpeg';

interface Popup {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  imageIndex: number;
  zIndex: number;
  delay: number;
}

export default function PopupAds() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [showFinalPopup, setShowFinalPopup] = useState(false);

  useEffect(() => {
    const generatePopups = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const popupCount = Math.max(8, Math.floor((screenWidth * screenHeight) / 40000));
      const newPopups: Popup[] = [];

      for (let i = 0; i < popupCount; i++) {
        newPopups.push({
          id: i,
          x: Math.random() * (screenWidth - 250),
          y: Math.random() * (screenHeight - 200),
          rotation: (Math.random() - 0.5) * 20,
          scale: 0.6 + Math.random() * 0.5,
          imageIndex: Math.floor(Math.random() * popupImages.length),
          zIndex: 100 + i,
          delay: i * 200
        });
      }

      setPopups(newPopups);

      const totalDelay = (popupCount * 500) + 1000;
      setTimeout(() => {
        setShowFinalPopup(true);
      }, totalDelay);
    };

    generatePopups();

    const handleResize = () => {
      generatePopups();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {popups.map((popup) => (
        <motion.div
          key={popup.id}
          className="absolute pointer-events-auto"
          style={{ 
            left: popup.x,
            top: popup.y,
            zIndex: popup.zIndex
          }}
          initial={{ opacity: 0, scale: 0.5, rotate: popup.rotation * 2 }}
          animate={{ 
            opacity: 1, 
            scale: popup.scale,
            rotate: popup.rotation
          }}
          transition={{ 
            delay: popup.delay / 1000,
            duration: 0.3,
            type: 'spring'
          }}
        >
          <img 
            src={popupImages[popup.imageIndex]} 
            alt="Virus Alert" 
            className="w-[200px] h-auto object-contain shadow-lg"
          />
        </motion.div>
      ))}

      {showFinalPopup && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          style={{ zIndex: 150 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', bounce: 0.4 }}
        >
          <img 
            src={finalPopupImage} 
            alt="Final Virus Alert" 
            className="w-[350px] max-w-[90vw] h-auto object-contain shadow-2xl"
          />
        </motion.div>
      )}
    </div>
  );
}