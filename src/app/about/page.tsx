'use client'

import Member from "@/components/Member";
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export default function About() {

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

    return(
        <main className="h-[70  %]">
            <div className="block text-center font-verdana text-[#01169C] font-bold my-[15px]">
                <div className="text-3xl mt-10">About Us</div>
                <div className="text-xl mt-[5px]">Powered By Dekpun</div>
            </div>
        
            <motion.div
                ref={cardRef}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="container mx-auto mt-0 pt-0"
                >
                <div className="m-5 flex flex-row justify-around space-x-1">
                    {[
                        { sid:"6733037621", name: "Jedsada Meesuk", img: '/img/member/TJ.jpg' },
                        { sid:"6733172621", name: "Patthadon Phengpinij", img: '/img/member/Pun.jpg' },
                        { sid:"6733169821", name: "Patcharapon Srisuwan", img: '/img/member/Boom.jpg' }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="p-6 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: isVisible ? index * 0.4 : 0 }}>

                            <Member img={item.img} sid={item.sid} name={item.name}/>

                            
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </main>
    );
}

