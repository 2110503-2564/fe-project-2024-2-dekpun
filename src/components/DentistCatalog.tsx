import DentistCard from "./DentistCard";
import getRole from "@/libs/getRole";

export default async function DentistCatalog( { role } : { role:string } ) {

    const AreaOfExpertiseList = [
        { area_name: "Orthodontics", area_id: "orthodontics", image: "/img/role_img/Orthodontics.jpeg" }, 
        { area_name: "Prosthodontics", area_id: "prosthodontics", image: "/img/role_img/Prosthodontics.jpeg" }, 
        { area_name: "Root canal treatment", area_id: "root_canal_treatment", image: "/img/role_img/Root_canal_treatment.jpg" }, 
        { area_name: "Crown", area_id: "crown", image: "/img/role_img/Crown.jpeg" }, 
        { area_name: "Dentistry", area_id: "dentistry", image: "/img/role_img/Dentistry.jpg" }, 
        { area_name: "Endodontics", area_id: "endodontics", image: "/img/role_img/Dentistry.jpg" }, //
        { area_name: "Dental extraction", area_id: "dental_extraction", image: "/img/role_img/Dental_extraction.jpg" }, 
        { area_name: "Pediatric dentistry", area_id: "pediatric_dentistry", image: "/img/role_img/Pediatric_dentistry.jpg" }, 
        { area_name: "Restorative dentistry", area_id: "restorative_dentistry", image: "/img/role_img/Restorative_dentistry.jpg" }, 
        { area_name: "Veneer", area_id: "veneer", image: "/img/role_img/Veneer.jpg" }, 
        { area_name: "X-ray", area_id: "x_ray", image: "/img/role_img/X-ray.jpg" }, 
        { area_name: "Conscious sedation", area_id: "conscious_sedation", image: "/img/role_img/Dentistry.jpg" }, //
        { area_name: "Dental implant", area_id: "dental_implant", image: "/img/role_img/Dental_implant.jpeg" }, 
        { area_name: "Dental restoration", area_id: "dental_restoration", image: "/img/role_img/Dental_restoration.jpg" }, 
        { area_name: "Fluoride treatment", area_id: "fluoride_treatment", image: "/img/role_img/Fluoride_treatment.jpg" }, 
        { area_name: "Oral surgery", area_id: "oral_surgery", image: "/img/role_img/Oral_surgery.jpg" }, 
        { area_name: "Periodontics", area_id: "periodontics", image: "/img/role_img/Periodontics.jpg" },
    ];

    const area = AreaOfExpertiseList.find(item => item.area_id === role);
    const areaName = area ? area.area_name : "Not Found";

    // Fetch dentists
    const dentists:DentistJson[] = (await getRole(role)).data;

    return (
        <main className="flex flex-col items-center px-6 py-12 bg-gradient-to-br from-blue-100 to-gray-200 min-h-screen rounded-3xl">
            <h1 className="text-4xl font-semibold text-blue-800 mb-8 text-center">
                Explore Our Dentist in "{ areaName }" area
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                {
                    dentists.map((dentist:DentistJson) => (
                        <DentistCard 
                          dentist={ dentist } 
                          area_id={ area ? area.area_id : "Not Found" } 
                          imgSrc={"/img/member/TJ.jpg"} />
                    ))
                }
            </div>
        </main>
    );
}
