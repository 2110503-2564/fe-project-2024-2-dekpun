"use client";
import { useState, useEffect } from "react";
import DentistCard from "./DentistCard";
import getRole from "@/libs/getRole";
import { AreaOfExpertiseList } from "@/libs/getIdbyRole";
import getDentists from "@/libs/getDentists";

export default function DentistCatalog({ role }: { role?: string }) {
    const [dentists, setDentists] = useState<DentistJson[]>([]);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 12; // 12 dentists per page

    const [searchQuery, setSearchQuery] = useState(""); // Search state
    const [sortBy, setSortBy] = useState("name"); // name | experience
    const [sortOrder, setSortOrder] = useState("ascending"); // ascending | descending

    const area = AreaOfExpertiseList.find(item => item.area_id === role);
    const areaName = area ? area.area_name : "Not Found";

    // Fetch dentists whenever the page or search query changes
    useEffect(() => {
        console.log(searchQuery);

        const fetchDentists = async () => {
            try {
                let response

                role ?
                    response = await getRole(
                        role || "",
                        currentPage,
                        pageSize,
                        searchQuery,
                        (sortOrder === "ascending" ? "" : "-") + (sortBy === "name" ? "name" : "year_of_experience"),
                    ) // Include searchQuery
                :
                    response = await getDentists(
                        currentPage,
                        pageSize,
                        searchQuery,
                        (sortOrder === "ascending" ? "" : "-") + (sortBy === "name" ? "name" : "year_of_experience"),
                    )

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
    }, [role, currentPage, searchQuery, sortBy, sortOrder]);

    const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleOption = (option: string) => {
        setSelectedOptions((prev) =>
            prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
        );
    };

    return (
        <main className="flex flex-col items-center px-6 py-12 bg-gradient-to-br from-blue-100 to-gray-200 min-h-screen rounded-3xl">
            <h1 className="text-4xl font-semibold text-blue-800 mb-8 text-center">
                Explore Our Dentists{role ? ` in ${areaName} Area` : ""}
            </h1>

            {/* Search and Sort Controls */}
            <div className="flex items-center justify-center w-full mb-6 space-x-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search Dentist by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[60%] px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md"
                />

                {/* Sort By Dropdown */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-[15%] px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md cursor-pointer"
                >
                    <option value="name">Name</option>
                    <option value="experience">Year of Experience</option>
                </select>

                {/* Sort Order Dropdown */}
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-[15%] px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:shadow-md cursor-pointer"
                >
                    <option value="ascending">{sortBy ==="name" ? "A → Z" : "Ascending"}</option>
                    <option value="descending">{sortBy ==="name" ? "Z → A" : "Descending"}</option>
                </select>
            </div>

            {/* Display Selected Options */}
            <input
                type="text"
                value={selectedOptions.join(", ")}
                readOnly
                placeholder="Selected options..."
                className="w-[60%] px-4 py-2 border rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500"
            />

            {/* Dropdown Menu */}
            <div className="relative w-[40%]">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full px-4 py-2 border rounded-md bg-white focus:ring-2 focus:ring-blue-500 transition-all hover:shadow-md"
                >
                    Select Options ⏷
                </button>

                {dropdownOpen && (
                    <div className="absolute left-0 mt-2 w-full bg-white border rounded-md shadow-lg z-10">
                        {options.map((option) => (
                            <label key={option} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => toggleOption(option)}
                                    className="mr-2"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {
                (totalPages !== 0) ?
                    /* Dentist Cards */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                        {dentists.map((dentist: DentistJson) => (
                            <DentistCard 
                                key={dentist.id} 
                                dentist={dentist} 
                                area_name={area ? "" : dentist.area_of_expertise} 
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
