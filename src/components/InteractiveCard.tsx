"use client";
import React from "react";

export default function InteractiveCard({ children, contentName }: { children: React.ReactNode; contentName: string }) {
    function onCardSelected() {
        alert("You selected " + contentName);
    }

    return (
        <div
            className="w-full rounded-lg shadow-xl overflow-hidden transition-all transform hover:shadow-2xl hover:scale-105 bg-white/40 backdrop-blur-lg border border-gray-300 cursor-pointer"
            onClick={onCardSelected}
        >
            {children}
        </div>
    );
}
