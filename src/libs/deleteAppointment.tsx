export default async function deleteAppointment(token: string, id: string) {
    const response = await fetch(`http://localhost:5000/api/v1/bookings/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to fetch appointments");
    }
    return await response.json();
}
