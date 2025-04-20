import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Virus image sources — '10.jpeg' must be last and centered
const virusImages = [
  "./images/1.jpeg",
  "./images/2.jpeg",
  "./images/3.jpeg",
  "./images/4.jpeg",
  "./images/5.jpeg",
  "./images/6.jpeg",
  "./images/7.jpeg",
  "./images/8.jpeg",
  "./images/9.jpeg",
  "./images/11.jpeg",
  "./images/12.png",
];

const lastImage = "./images/10.jpeg";

interface VirusPopupProps {
  startDelay?: number;
}

interface Popup {
  id: number;
  src: string;
  x: number;
  y: number;
  scale: number;
  isCentered: boolean;
}

export default function VirusPopup({ startDelay = 2000 }: VirusPopupProps) {
  const [popups, setPopups] = useState<Popup[]>([]);

  useEffect(() => {
    const showImagesSequentially = async () => {
      for (let i = 0; i < virusImages.length; i++) {
        const src = virusImages[i];
        const scale = 1 + Math.random() * 0.8;
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        setPopups((prev) => [
          ...prev,
          {
            id: prev.length,
            src,
            scale,
            x,
            y,
            isCentered: false,
          },
        ]);

        await new Promise((res) => setTimeout(res, 300));
      }

      // Add the final centered image
      setTimeout(() => {
        setPopups((prev) => [
          ...prev,
          {
            id: prev.length,
            src: lastImage,
            x: 25,
            y: 30,
            scale: 1.5,
            isCentered: true,
          },
        ]);
      }, 1000);
    };

    const timer = setTimeout(showImagesSequentially, startDelay);

    return () => clearTimeout(timer);
  }, [startDelay]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-visible">
      <AnimatePresence>
        {popups.map((popup) => (
          <motion.div
            key={popup.id}
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: popup.scale }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              left: `${popup.x}%`,
              top: `${popup.y}%`,
              transform: "translate(-50%, -50%)",
              zIndex: popup.isCentered ? 999 : 10,
              maxWidth: popup.isCentered ? "50vw" : "none",
              maxHeight: popup.isCentered ? "50vh" : "none",
            }}
          >
            <img
              src={popup.src}
              alt="popup"
              className="pointer-events-none"
              style={{
                width: popup.isCentered ? "auto" : "auto",
                height: popup.isCentered ? "auto" : "auto",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
