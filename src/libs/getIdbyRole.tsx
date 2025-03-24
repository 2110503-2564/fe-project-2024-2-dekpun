export const AreaOfExpertiseList = [
    { area_name: "Conscious sedation", area_id: "conscious_sedation", image: "/img/role_img/Conscious_sedation.JPG" },
    { area_name: "Crown", area_id: "crown", image: "/img/role_img/Crown.jpeg" },
    { area_name: "Dental extraction", area_id: "dental_extraction", image: "/img/role_img/Dental_extraction.jpg" },
    { area_name: "Dental implant", area_id: "dental_implant", image: "/img/role_img/Dental_implant.jpeg" },
    { area_name: "Dental restoration", area_id: "dental_restoration", image: "/img/role_img/Dental_restoration.jpg" },
    { area_name: "Dentistry", area_id: "dentistry", image: "/img/role_img/Dentistry.jpg" },
    { area_name: "Endodontics", area_id: "endodontics", image: "/img/role_img/Endodontics.JPG" },
    { area_name: "Fluoride treatment", area_id: "fluoride_treatment", image: "/img/role_img/Fluoride_treatment.jpg" }, 
    { area_name: "Oral surgery", area_id: "oral_surgery", image: "/img/role_img/Oral_surgery.jpg" }, 
    { area_name: "Orthodontics", area_id: "orthodontics", image: "/img/role_img/Orthodontics.jpeg" },
    { area_name: "Pediatric dentistry", area_id: "pediatric_dentistry", image: "/img/role_img/Pediatric_dentistry.jpg" },
    { area_name: "Periodontics", area_id: "periodontics", image: "/img/role_img/Periodontics.jpg" },
    { area_name: "Prosthodontics", area_id: "prosthodontics", image: "/img/role_img/Prosthodontics.jpeg" }, 
    { area_name: "Restorative dentistry", area_id: "restorative_dentistry", image: "/img/role_img/Restorative_dentistry.jpg" }, 
    { area_name: "Root canal treatment", area_id: "root_canal_treatment", image: "/img/role_img/Root_canal_treatment.jpg" }, 
    { area_name: "Veneer", area_id: "veneer", image: "/img/role_img/Veneer.jpg" }, 
    { area_name: "X-ray", area_id: "x_ray", image: "/img/role_img/X-ray.jpg" }, 
];

export default function getIdbyRole(areaName: string) {
    
    const item = AreaOfExpertiseList.find(item => item.area_name === areaName)
    const itemJson = {
        area_name: item?.area_name || "Not found: area_name",
        area_id: item?.area_id || "Not found: area_id"
    }

    return (
        itemJson
    )
}