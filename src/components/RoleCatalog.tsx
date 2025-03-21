import Link from "next/link";
import RoleCard from "./RoleCard";

export default async function RoleCatalog() {

    // {roleJson}: {roleJson: Object}

    // const roleJsonReady = await roleJson;

    //Mock Data
    const mockRoleData = [
        {rid: "001", name: "Orthodontics", image: "/img/role_img/Orthodontics.jpeg" },
        {rid: "002", name: "Prosthodontics", image: "/img/role_img/Prosthodontics.jpeg" },
        {rid: "003", name: "Prosthodontics", image: "/img/role_img/Prosthodontics.jpeg" },
        {rid: "004", name: "Dental implant", image: "/img/role_img/Dental_implant.jpeg" },
        {rid: "005", name: "Crown", image: "/img/role_img/Crown.jpeg" },
        {rid: "006", name: "Root canal treatment", image: "/img/role_img/Root_canal_treatment.jpg" },
        {rid: "007", name: "Pediatric dentistry", image: "/img/role_img/Pediatric_dentistry.jpg" },
        {rid: "008", name: "Dental restoration", image: "/img/role_img/Dental_restoration.jpg" },
        {rid: "009", name: "X-ray", image: "/img/role_img/X-ray.jpg" },
        {rid: "010", name: "Dentistry", image: "/img/role_img/Dentistry.jpg" },
        {rid: "011", name: "Veneer", image: "/img/role_img/Veneer.jpg" },
        {rid: "012", name: "Periodontics", image: "/img/role_img/Periodontics.jpg" },
        {rid: "013", name: "Fluoride treatment", image: "/img/role_img/Fluoride_treatment.jpg" },
        {rid: "014", name: "Dental extraction", image: "/img/role_img/Dental_extraction.jpg" },
        {rid: "015", name: "Restorative dentistry", image: "/img/role_img/Restorative_dentistry.jpg" },
        {rid: "016", name: "Oral surgery", image: "/img/role_img/Oral_surgery.jpg" }
    ]

    return (
        <>
        <h1 className="pt-7 text-3xl font-medium">Our professionals in {mockRoleData.length} area of expertise.</h1>
        <div style={{margin:"20px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
        {
            mockRoleData.map((roleItem)=>(
                <Link href={`/roles/${roleItem.rid}`} className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8">
                    <RoleCard roleName={roleItem.name} imgSrc={roleItem.image} />
                </Link>
            ))
        }
        </div>
        </>
    );
}