import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import AppointmentForm from "@/components/AppointmentForm";

export default async function AppointmentPage() {
    
    const session = await getServerSession(authOptions)
    // const token = session?.user?.token || ""

    return(
        <AppointmentForm session={session} />
    )
}