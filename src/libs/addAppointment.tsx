export default async function addAppointment(
  token: string, 
  did: string, 
  appointmentData:AppointmentItem) 
  {
    const response = await fetch(`http://localhost:5000/api/v1/dentists/${did}/bookings`, {
        method: "POST",
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
}
