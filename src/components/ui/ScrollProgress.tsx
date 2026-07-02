import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 origin-left z-[9999] bg-gradient-to-r from-[#0B5FFF] via-[#00BFA5] to-[#FF7A00]"
      style={{
        scaleX: scrollYProgress,
      }}
    />
  );
}