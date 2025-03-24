import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/authOptions";
import AppointmentForm from "@/components/AppointmentForm";

export default async function EditAppointmentPage({ searchParams }: { searchParams: { booking_id?: string } }) {
    
    const session = await getServerSession(authOptions)
    const bookingId = searchParams.booking_id || "";

    return(
        <AppointmentForm session={session} option="edit" booking_id={bookingId} />
    )
}