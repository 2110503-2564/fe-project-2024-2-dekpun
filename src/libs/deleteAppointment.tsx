import { BACKEND_URL } from "@/backend-config";

export default async function deleteAppointment(bid: string, token?: string) {
    const response = await fetch(`${BACKEND_URL}/api/v1/bookings/${bid}`, {
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
};
