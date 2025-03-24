import { BACKEND_URL } from "@/backend-config";

export default async function editAppointment(
    token: string, 
    bid: string, 
    appointmentData:AppointmentItemUpdate
){
    const response = await fetch(`${BACKEND_URL}/api/v1/bookings/${bid}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
        throw new Error("Failed to create new Appointment");
    }

    return await response.json();
};
