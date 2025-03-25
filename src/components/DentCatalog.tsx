'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { DentCard } from './DentCard';

export default function DentCatalog() {
  const [isVisible, setIsVisible] = useState(false);
  const catalogRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (catalogRef.current) observer.observe(catalogRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={catalogRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[
        { name: "Dr. John Doe", specialty: "Orthodontist", rating: 4.9 },
        { name: "Dr. Jane Smith", specialty: "Pediatric Dentist", rating: 4.8 },
        { name: "Dr. Emily White", specialty: "General Dentist", rating: 4.7 },
        { name: "Dr. Mark Brown", specialty: "Cosmetic Dentist", rating: 4.6 },
        { name: "Dr. John Doe", specialty: "Orthodontist", rating: 4.9 },
        { name: "Dr. Jane Smith", specialty: "Pediatric Dentist", rating: 4.8 },
        { name: "Dr. Emily White", specialty: "General Dentist", rating: 4.7 },
        { name: "Dr. Mark Brown", specialty: "Cosmetic Dentist", rating: 4.6 }
      ].map((dentist, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }} // Start from left
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }} // Slide in
          transition={{
            duration: 0.6,
            delay: isVisible ? index * 0.2 : 0, // Delay each card based on its index
            ease: "easeOut"
          }}
        >
          <DentCard name={dentist.name} specialty={dentist.specialty} rating={dentist.rating} />
        </motion.div>
      ))}
    </div>
  );
}