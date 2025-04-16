import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PopupAds from './PopupAds';

interface WatchdogsOverlayProps {
  startDelay?: number;
}

export default function WatchdogsOverlay({ startDelay = 3000 }: WatchdogsOverlayProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [glitchText, setGlitchText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [showPopups, setShowPopups] = useState(false);

  const glitchMessages = [
    "INIZIALIZZAZIONE SEQUENZA HACK...",
    "AGGIRANDO SISTEMI DI SICUREZZA...",
    "INIEZIONE CODICE MALEVOLO...",
    "SISTEMA COMPROMESSO",
    "DOWNLOAD DATI UTENTE IN CORSO...",
    "CARICAMENTO VIRUS IN CORSO...",
    "DIROTTAMENTO FLUSSO VIDEO...",
    "PROTOCOLLO PASQUALE ATTIVATO"
  ];

  useEffect(() => {
    // Show overlay after shorter delay
    const timeout = setTimeout(() => {
      setShowOverlay(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [startDelay]);

  // Typewriter effect for hacker text
  useEffect(() => {
    if (!showOverlay) return;

    let currentText = '';
    let currentMessageIndex = 0;
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentMessageIndex >= glitchMessages.length) {
        clearInterval(typeInterval);
        // Show popups when text sequence finishes
        setTimeout(() => {
          setShowPopups(true);
        }, 1000);
        return;
      }

      const message = glitchMessages[currentMessageIndex];

      if (charIndex <= message.length) {
        currentText = message.substring(0, charIndex);
        setGlitchText(currentText);
        charIndex++;
      } else {
        // Finished typing current message
        setTimeout(() => {
          currentMessageIndex++;
          charIndex = 0;
          setTextIndex(currentMessageIndex);
        }, 800); // Pause before next message
      }
    }, 60); // Speed of typing

    return () => clearInterval(typeInterval);
  }, [showOverlay]);

  if (!showOverlay) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 overflow-hidden bg-black bg-opacity-80 flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Digital noise overlay */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="w-full h-full" 
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              filter: 'contrast(170%) brightness(1000%)'
            }}
          />
        </div>

        {/* Easter bunny animation */}
        <div className="relative z-10 w-[250px] h-[250px] md:w-[350px] md:h-[350px]">
          <object 
            data="./src/assets/easter-bunny.svg" 
            type="image/svg+xml"
            className="w-full h-full"
            aria-label="Easter Bunny Hack"
          />
        </div>

        {/* Watchdogs-style terminal text */}
        <motion.div 
          className="hack-text relative z-10 font-mono text-green-500 text-lg md:text-2xl font-bold px-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="inline-block min-h-[30px]">{glitchText}</span>
          <span className="animate-pulse ml-1">|</span>
        </motion.div>

        {/* Progress bar */}
        {textIndex >= 3 && (
          <motion.div 
            className="mt-4 w-[80%] max-w-[600px] h-2 bg-gray-800 rounded-full overflow-hidden"
            initial={{ opacity: 0, width: "60%" }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <motion.div 
              className="h-full bg-red-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 2.5, duration: 4 }}
            />
          </motion.div>
        )}

        {/* Floating code elements */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none text-[10px] text-green-500 opacity-40">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute font-mono whitespace-nowrap"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: -100,
                opacity: 0.3 + Math.random() * 0.7,
              }}
              animate={{ 
                y: window.innerHeight + 100,
                opacity: 0
              }}
              transition={{ 
                duration: 10 + Math.random() * 15,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
            >
              {`01${i}010101110101010101 PASQUA 1101010${i}01010101 VIRUS 01010101010`}
            </motion.div>
          ))}
        </div>

        {/* Popup ads overlay */}
        {showPopups && <PopupAds />}
      </motion.div>
    </AnimatePresence>
  );
}