import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/authOptions";
import AppointmentForm from "@/components/AppointmentForm";

export default async function EditAppointmentPage({ searchParams }: { searchParams: { booking_id?: string, UserJson: UserJson } }) {
    
    const session = await getServerSession(authOptions)
    const bookingId = searchParams.booking_id || "";
    const user = searchParams.UserJson || "";

    const editProp = {booking_id: bookingId, user}

    return(
        <AppointmentForm session={session} option="edit" Prop={editProp} />
    )
}