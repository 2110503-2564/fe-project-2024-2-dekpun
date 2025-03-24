"use client";
import { useState, useEffect } from "react";
import DentistCard from "./DentistCard";
import getRole from "@/libs/getRole";
import { AreaOfExpertiseList } from "@/libs/getIdbyRole";

export default function DentistCatalog({ role }: { role: string }) {
    const [dentists, setDentists] = useState<DentistJson[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState(""); // Search state
    const pageSize = 12; // 12 dentists per page

    const area = AreaOfExpertiseList.find(item => item.area_id === role);
    const areaName = area ? area.area_name : "Not Found";

    // Fetch dentists whenever the page or search query changes
    useEffect(() => {
        console.log(searchQuery);

        const fetchDentists = async () => {
            try {
                const response = await getRole(role, currentPage, pageSize, searchQuery); // Include searchQuery

                setDentists(response.data);
                setTotalPages(response.totalPages);

                if (response.totalPages < currentPage) {
                    setCurrentPage(response.totalPages);
                } else if (currentPage === 0 && response.totalPages !== 0) {
                    setCurrentPage(1);
                }

            } catch (error) {
                console.error("Failed to fetch dentists:", error);
            }
        };
        fetchDentists();
    }, [role, currentPage, searchQuery]);

    return (
        <main className="flex flex-col items-center px-6 py-12 bg-gradient-to-br from-blue-100 to-gray-200 min-h-screen rounded-3xl">
            <h1 className="text-4xl font-semibold text-blue-800 mb-8 text-center">
                Explore Our Dentists in "{areaName}" Area
            </h1>

            {/* Search Bar */}
            <div className="mb-6 w-full max-w-3xl">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search dentist by name..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {
                (totalPages !== 0) ?
                    /* Dentist Cards */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                        {dentists.map((dentist: DentistJson) => (
                            <DentistCard 
                                key={dentist.id} 
                                dentist={dentist} 
                                area_id={area ? area.area_id : "Not Found"} 
                                imgSrc={"/img/member/TJ.jpg"} 
                            />
                        ))}
                    </div>
                :
                    <p className="font-2xl text-black text-center">Do not found any dentist with these filter.</p>
            }

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-4 mt-6">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage <= 1}
                    className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${currentPage <= 1 && "opacity-50 cursor-not-allowed"}`}
                >
                    ←
                </button>

                <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>

                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition ${currentPage === totalPages && "opacity-50 cursor-not-allowed"}`}
                >
                    →
                </button>
            </div>

        </main>
    );
}
