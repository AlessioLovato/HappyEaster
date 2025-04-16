import { motion } from 'framer-motion';

export default function ScanLine() {
  return (
    <motion.div 
      className="fixed top-0 left-0 w-full h-[2px] bg-blue-400 opacity-20 z-50 pointer-events-none"
      animate={{
        top: ['0%', '100%']
      }}
      transition={{
        duration: 2,
        ease: 'linear',
        repeat: Infinity,
      }}
    />
  );
}