'use client'
import { VlogPlayer } from "./VlogPlayer";
import { useState, useEffect, useRef } from "react";
import { Rating } from "@mui/material";
import { useWindowListener } from "@/hooks/useWindowListener";
import { motion } from "framer-motion";

export function TravelCard() {
    const [playing, setPlaying] = useState(true);
    const [rating, setRating] = useState(0);
    const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement | null>(null);

    useWindowListener("pointermove", (e) => {
        setPointerPosition({ x: (e as PointerEvent).clientX, y: (e as PointerEvent).clientY });
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
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
            className="w-[80%] shadow-lg mx-[10%] my-10 p-2 rounded bg-gray-200 flex flex-row"
        >
            <VlogPlayer vdoSrc="/video/ThailandNatural.mp4" isPlaying={playing}></VlogPlayer>
            <div className="m-5">
                Thailand Natural ( {pointerPosition.x}, {pointerPosition.y} )
                <button
                    className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                    onClick={() => {
                        setPlaying(!playing);
                    }}
                >
                    {playing ? "Pause" : "Play"}
                </button>
                <Rating
                    className="w-full h-[10%]"
                    value={rating || 0}
                    onChange={(e, newValue) => {
                        if (newValue != null) setRating(newValue);
                    }}
                />
            </div>
        </motion.div>
    );
}
