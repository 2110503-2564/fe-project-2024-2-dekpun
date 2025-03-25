'use client'

import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export function FAQ() {

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
        className="container"
      >
        <div className="space-y-0.5">

          {[
            {question: "How do I book an appointment?", answer: "Simply select a dentist and choose a time slot that works for you."},
            {question: "Can I reschedule my appointment?", answer: "Yes, you can reschedule up to 24 hours in advance."},
            {question: "How do I book an appointment?", answer: "Simply select a dentist and choose a time slot that works for you."},
            {question: "Can I reschedule my appointment?", answer: "Yes, you can reschedule up to 24 hours in advance."}
          ].map((item, index) => (
            <motion.div
            key={index}
            className="p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: isVisible ? index * 0.4 : 0 }}
            >

            <div className="p-4 border rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">{item.question}</h3>
              <p className="text-gray-600">{item.answer}</p>
            </div>

            </motion.div>
          ))}
        </div>

      </motion.div>
    );
  }