'use client';

import { useState, useEffect, useRef } from 'react';
import { DentCard } from './DentCard';
import styles from './dentcatalog.module.css';

export default function DentCatalog() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const catalogRef = useRef(null);

    const dentists = [
        { name: "Dr. John Doe", specialty: "Orthodontist", rating: 4.9 },
        { name: "Dr. Jane Smith", specialty: "Pediatric Dentist", rating: 4.8 },
        { name: "Dr. Emily White", specialty: "General Dentist", rating: 4.7 },
        { name: "Dr. Mark Brown", specialty: "Cosmetic Dentist", rating: 4.6 },
        { name: "Dr. John Doe2", specialty: "Orthodontist", rating: 4.9 },
        { name: "Dr. Jane Smith2", specialty: "Pediatric Dentist", rating: 4.8 },
        { name: "Dr. Emily White2", specialty: "General Dentist", rating: 4.7 },
        { name: "Dr. Mark Brown2    ", specialty: "Cosmetic Dentist", rating: 4.6 },
    ];

    const changeGroup = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(dentists.length / 4));
    };

    useEffect(() => {
        const interval = setInterval(changeGroup, 3500); // Change group every 3.5 seconds
        return () => clearInterval(interval);
    }, []);

    // Split the dentists into groups of 4
    const groupedDentists = [];
    for (let i = 0; i < dentists.length; i += 4) {
        groupedDentists.push(dentists.slice(i, i + 4));
    }

    return (
        <div ref={catalogRef} className="overflow-hidden">
            {groupedDentists[currentIndex] && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {groupedDentists[currentIndex].map((dentist, index) => (
                        <div
                            key={index}
                            className={`${styles.card} ${styles.fadeIn}`}
                            style={{
                                animation: `fadeIn 1s ease-out ${index * 0.2}s forwards`,
                            }}
                        >
                            <DentCard name={dentist.name} specialty={dentist.specialty} rating={dentist.rating} />                            </div>
                    ))}
                </div>
            )}
        </div>
    );
}
