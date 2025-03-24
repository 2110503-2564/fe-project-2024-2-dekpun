import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import AppointmentForm from "@/components/AppointmentForm";

export default async function AppointmentPage({ searchParams }: { searchParams: { [key: string]: string } }) {
    
    const session = await getServerSession(authOptions)

    const dentist = {
        _id: searchParams._id || "Not found: _id",
        name: searchParams.name || "Not found: name",
        area_of_expertise: searchParams.area_of_expertise || "Not found: area_of_expertise",
        year_of_experience: Number(searchParams.year_of_experience) || 0,
        clinic_branch: searchParams.clinic_branch || "Not found: clinic_branch",
        id: searchParams.id || "Not found: id",
    };

    return(
        <AppointmentForm session={session} dentist={dentist}/>
    )
}