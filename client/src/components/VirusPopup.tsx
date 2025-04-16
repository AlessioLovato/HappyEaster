import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMobile } from "@/hooks/use-mobile";
import { virusImages, virusMessages } from "@/data/mockData";

interface VirusPopupProps {
  startDelay?: number;
  videoElement: HTMLVideoElement | null;
}

export default function VirusPopup({
  startDelay = 4000,
  videoElement,
}: VirusPopupProps) {
  const [popups, setPopups] = useState<
    {
      id: number;
      isImage: boolean;
      content: string;
      x: number;
      y: number;
      color: string;
      scale: number;
    }[]
  >([]);
  const [videoEffectActive, setVideoEffectActive] = useState(false);
  const [effectType, setEffectType] = useState<string>("");
  const isMobile = useMobile();
  const nextId = useRef(0);
  const maxPopups = isMobile ? 3 : 8;

  // Start virus effects when component mounts
  useEffect(() => {
    if (!videoElement) return;

    const timeoutId = setTimeout(() => {
      const interval = setInterval(
        () => {
          createVirusPopup();
        },
        isMobile ? 2000 : 1000,
      );

      // Apply video effects periodically
      setTimeout(() => {
        const effectsInterval = setInterval(() => {
          if (Math.random() > 0.7) {
            applyRandomVideoEffect();
          }
        }, 3000);

        return () => clearInterval(effectsInterval);
      }, 3000);

      return () => clearInterval(interval);
    }, startDelay);

    // Setup click handler for additional popups
    const handleClick = () => {
      if (Math.random() < 0.3) {
        for (let i = 0; i < 2; i++) {
          setTimeout(() => createVirusPopup(), i * 200);
        }
      }
    };

    document.body.addEventListener("click", handleClick);

    return () => {
      clearTimeout(timeoutId);
      document.body.removeEventListener("click", handleClick);
    };
  }, [videoElement, isMobile, startDelay]);

  const createVirusPopup = () => {
    setPopups((currentPopups) => {
      // If we're at max capacity, remove the oldest popup
      if (currentPopups.length >= maxPopups) {
        return [...currentPopups.slice(1), generatePopup()];
      }

      return [...currentPopups, generatePopup()];
    });
  };

  const generatePopup = () => {
    const id = nextId.current++;
    const isImage = Math.random() > 0.3;
    const content = isImage
      ? virusImages[Math.floor(Math.random() * virusImages.length)]
      : virusMessages[Math.floor(Math.random() * virusMessages.length)];

    // Random position (10% to 90% of viewport)
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;

    // Random color from neon palette
    const colors = ["text-[#FF00FF]", "text-[#00FFFF]", "text-[#00FF00]"];
    const borderColors = [
      "border-[#FF00FF]",
      "border-[#00FFFF]",
      "border-[#00FF00]",
    ];
    const color = isImage
      ? borderColors[Math.floor(Math.random() * borderColors.length)]
      : colors[Math.floor(Math.random() * colors.length)];

    // Random scale
    const scale = isMobile
      ? 0.7 + Math.random() * 0.3
      : 0.8 + Math.random() * 0.4;

    return { id, isImage, content, x, y, color, scale };
  };

  const removePopup = (id: number) => {
    setPopups((popups) => popups.filter((popup) => popup.id !== id));
  };

  const applyRandomVideoEffect = () => {
    if (!videoElement) return;

    const effects = [
      "hue-rotate(120deg) contrast(1.2)",
      "saturate(2) brightness(1.3)",
      "invert(0.8)",
      "grayscale(1) contrast(1.5)",
      "sepia(0.8) hue-rotate(180deg)",
    ];

    const selectedEffect = effects[Math.floor(Math.random() * effects.length)];
    setEffectType(selectedEffect);
    setVideoEffectActive(true);

    setTimeout(() => {
      setVideoEffectActive(false);
    }, 500);
  };

  // Effect to apply filters to video
  useEffect(() => {
    if (!videoElement) return;

    if (videoEffectActive && effectType) {
      videoElement.style.filter = effectType;
    } else {
      videoElement.style.filter = "";
    }
  }, [videoEffectActive, effectType, videoElement]);

  return (
    <div id="virus-container">
      <AnimatePresence>
        {popups.map((popup) => (
          <motion.div
            key={popup.id}
            className="virus-popup fixed z-50"
            initial={{
              opacity: 0,
              x: `${popup.x}%`,
              y: `${popup.y}%`,
              scale: popup.scale,
            }}
            animate={{
              opacity: 1,
              x: `${popup.x}%`,
              y: `${popup.y}%`,
              scale: popup.scale,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            style={{
              left: `${popup.x}%`,
              top: `${popup.y}%`,
              filter: "drop-shadow(0 0 10px rgba(0, 255, 255, 0.7))",
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
            onAnimationComplete={() => {
              // Remove popup after a random time
              setTimeout(
                () => {
                  removePopup(popup.id);
                },
                2000 + Math.random() * 3000,
              );
            }}
          >
            {popup.isImage ? (
              <img
                src={popup.content}
                alt="Virus"
                className={`max-w-[150px] max-h-[150px] md:max-w-[300px] md:max-h-[300px] rounded border-4 ${popup.color}`}
              />
            ) : (
              <div
                className={`font-mono text-xl md:text-3xl p-4 bg-black border-4 border-[#00FF00] ${popup.color}`}
              >
                {popup.content}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
