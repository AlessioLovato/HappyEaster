import { motion } from "framer-motion";

export default function ScanLine() {
  return (
    <motion.div 
      className="fixed top-0 left-0 w-full h-[5px] bg-[rgba(0,255,255,0.2)] z-[999]"
      animate={{
        top: ["0%", "100%"]
      }}
      transition={{
        duration: 8,
        ease: "linear",
        repeat: Infinity,
      }}
    />
  );
}
