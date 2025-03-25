'use client';

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export default function Services() {
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
      initial={{ scale: 0.9, opacity: 0 }}
      animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="container mx-auto p-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          { title: "General Dentistry", desc: "Routine checkups, cleanings, and fillings." },
          { title: "Orthodontics", desc: "Braces, Invisalign, and teeth alignment." },
          { title: "Cosmetic Dentistry", desc: "Teeth whitening, veneers, and more." },
          { title: "General Dentistry", desc: "Routine checkups, cleanings, and fillings." },
          { title: "Orthodontics", desc: "Braces, Invisalign, and teeth alignment." },
          { title: "Cosmetic Dentistry", desc: "Teeth whitening, veneers, and more." }
        ].map((service, index) => (
          <motion.div
            key={index}
            className="p-6 border rounded-lg shadow-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: isVisible ? index * 0.2 : 0 }}
          >
            <h3 className="text-xl font-semibold">{service.title}</h3>
            <p className="text-gray-600">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
