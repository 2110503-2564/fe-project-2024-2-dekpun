import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export function DentCard({ name, specialty, rating }: { name: string; specialty: string; rating: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: -50 }} // Start from left
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }} // Slide in
      transition={{
        duration: 0.6,
        ease: "easeOut"
      }}
    >
      <div className="p-6 border rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-600">{specialty}</p>
        <p className="text-yellow-500">⭐ {rating}</p>
      </div>
    </motion.div>
  );
}