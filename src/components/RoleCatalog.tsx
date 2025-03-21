import Link from "next/link";
import RoleCard from "./RoleCard";

export default async function RoleCatalog() {
    const mockRoleData = [
        { rid: "001", name: "Orthodontics", image: "/img/role_img/Orthodontics.jpeg" },
        { rid: "002", name: "Prosthodontics", image: "/img/role_img/Prosthodontics.jpeg" },
        { rid: "003", name: "Prosthodontics", image: "/img/role_img/Prosthodontics.jpeg" },
        { rid: "004", name: "Dental implant", image: "/img/role_img/Dental_implant.jpeg" },
        { rid: "005", name: "Crown", image: "/img/role_img/Crown.jpeg" },
        { rid: "006", name: "Root canal treatment", image: "/img/role_img/Root_canal_treatment.jpg" },
        { rid: "007", name: "Pediatric dentistry", image: "/img/role_img/Pediatric_dentistry.jpg" },
        { rid: "008", name: "Dental restoration", image: "/img/role_img/Dental_restoration.jpg" },
        { rid: "009", name: "X-ray", image: "/img/role_img/X-ray.jpg" },
        { rid: "010", name: "Dentistry", image: "/img/role_img/Dentistry.jpg" },
        { rid: "011", name: "Veneer", image: "/img/role_img/Veneer.jpg" },
        { rid: "012", name: "Periodontics", image: "/img/role_img/Periodontics.jpg" },
        { rid: "013", name: "Fluoride treatment", image: "/img/role_img/Fluoride_treatment.jpg" },
        { rid: "014", name: "Dental extraction", image: "/img/role_img/Dental_extraction.jpg" },
        { rid: "015", name: "Restorative dentistry", image: "/img/role_img/Restorative_dentistry.jpg" },
        { rid: "016", name: "Oral surgery", image: "/img/role_img/Oral_surgery.jpg" }
    ];

    return (
        <main className="flex flex-col items-center px-6 py-12 bg-gradient-to-br from-blue-100 to-gray-200 min-h-screen rounded-3xl">
            <h1 className="text-4xl font-semibold text-blue-800 mb-8 text-center">
                Explore Our {mockRoleData.length} Areas of Expertise
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                {mockRoleData.map((roleItem) => (
                    <Link key={roleItem.rid} href={`/roles/${roleItem.rid}`} className="transition-transform duration-300 hover:scale-105">
                        <RoleCard roleName={roleItem.name} imgSrc={roleItem.image} />
                    </Link>
                ))}
            </div>
        </main>
    );
}
