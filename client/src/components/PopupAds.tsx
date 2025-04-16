import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { virusMessages } from '@/data/mockData';

// Image paths for popups
const popupImages = [
  '/images/1.jpeg',
  '/images/2.jpeg',
  '/images/3.jpeg',
  '/images/4.jpeg',
  '/images/5.jpeg',
  '/images/6.jpeg',
  '/images/7.jpeg',
  '/images/8.jpeg',
  '/images/9.jpeg',
  '/images/11.jpeg',
  '/images/12.jpeg'
];

const finalPopupImage = '/images/10.jpeg';

interface Popup {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  imageIndex: number;
  messageIndex: number;
  zIndex: number;
  delay: number;
}

export default function PopupAds() {
  const [popups, setPopups] = useState<Popup[]>([]);
  const [showFinalPopup, setShowFinalPopup] = useState(false);
  
  useEffect(() => {
    // Generate random popups that fill the screen
    const generatePopups = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const popupCount = Math.max(8, Math.floor((screenWidth * screenHeight) / 40000)); // Scale with screen size
      const newPopups: Popup[] = [];
      
      for (let i = 0; i < popupCount; i++) {
        newPopups.push({
          id: i,
          x: Math.random() * (screenWidth - 250), // Leave room for popup width
          y: Math.random() * (screenHeight - 200), // Leave room for popup height
          rotation: (Math.random() - 0.5) * 10, // Slight random rotation for visual effect
          scale: 0.6 + Math.random() * 0.5, // Random size between 60% and 110%
          imageIndex: Math.floor(Math.random() * popupImages.length),
          messageIndex: Math.floor(Math.random() * virusMessages.length),
          zIndex: 100 + i, // Stack them on top of each other
          delay: i * 500 // 500ms delay between each popup
        });
      }
      
      setPopups(newPopups);
      
      // Show final centered popup after all popups are displayed
      const totalDelay = (popupCount * 500) + 1000;
      setTimeout(() => {
        setShowFinalPopup(true);
      }, totalDelay);
    };
    
    generatePopups();
    
    // Re-generate on window resize
    const handleResize = () => {
      generatePopups();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {/* Random popups all over the screen */}
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
            delay: popup.delay / 1000, // Convert ms to seconds for animation
            duration: 0.3,
            type: 'spring'
          }}
        >
          <div className="bg-white border-2 border-gray-800 rounded shadow-lg overflow-hidden w-[200px] max-w-[90vw]">
            <div className="bg-blue-700 text-white text-xs px-2 py-1 flex justify-between items-center">
              <span>Attenzione!</span>
              <div className="flex space-x-1">
                <button className="w-3 h-3 bg-gray-300 rounded-full text-[8px] flex items-center justify-center">_</button>
                <button className="w-3 h-3 bg-gray-300 rounded-full text-[8px] flex items-center justify-center">□</button>
                <button className="w-3 h-3 bg-gray-300 rounded-full text-[8px] flex items-center justify-center">×</button>
              </div>
            </div>
            <div className="p-2">
              <img 
                src={popupImages[popup.imageIndex]} 
                alt="Virus Alert" 
                className="w-full h-20 object-cover object-center mb-2"
              />
              <p className="text-red-600 text-xs font-bold text-center mb-1">
                {virusMessages[popup.messageIndex]}
              </p>
              <div className="flex justify-center mt-1 space-x-1">
                <button className="bg-gray-300 text-black text-[8px] px-2 py-1 rounded">OK</button>
                <button className="bg-gray-300 text-black text-[8px] px-2 py-1 rounded">Annulla</button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Final centered popup */}
      {showFinalPopup && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          style={{ zIndex: 150 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', bounce: 0.4 }}
        >
          <div className="bg-white border-4 border-red-600 rounded-lg shadow-2xl overflow-hidden w-[350px] max-w-[90vw]">
            <div className="bg-red-600 text-white font-bold text-sm px-3 py-1 flex justify-between items-center">
              <span>ALLARME CRITICO DI SISTEMA</span>
              <div className="flex space-x-1">
                <button className="w-4 h-4 bg-gray-300 rounded-full text-[10px] flex items-center justify-center">×</button>
              </div>
            </div>
            <div className="p-4">
              <img 
                src={finalPopupImage} 
                alt="Virus di Pasqua" 
                className="w-full h-auto object-contain mb-3"
              />
              <h3 className="text-red-600 font-bold text-center mb-2">SISTEMA COMPROMESSO!</h3>
              <p className="text-gray-700 text-xs text-center mb-3">
                Il tuo sistema è stato infettato da virus multipli di Pasqua. Azione immediata richiesta!
              </p>
              <div className="flex justify-center space-x-2">
                <button className="bg-red-600 text-white text-xs font-bold px-4 py-2 rounded">RIPARA ORA</button>
                <button className="bg-gray-200 text-gray-700 text-xs px-4 py-2 rounded">Annulla</button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}