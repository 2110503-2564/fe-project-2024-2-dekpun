"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Logout() {
    return (
        <div className="flex h-[80vh] items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 px-10 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold mb-4">Logout</h1>
                <p className="text-gray-700 mb-6">Are you sure you want to log out?</p>
                
                {/* Logout Button */}
                <button
                    onClick={() => signOut({ callbackUrl: "/" })} 
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                >
                    Logout
                </button>

                <p className="pt-5 text-center text-blue-600">
                    Changed your mind? <Link href={"/"} className="underline hover:text-blue-900 transition">Go Back</Link>
                </p>
            </div>
        </div>
    );
};
