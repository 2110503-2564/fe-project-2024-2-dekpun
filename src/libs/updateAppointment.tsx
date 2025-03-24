import { BACKEND_URL } from "@/backend-config";

export default async function updateAppointment(bid: string, status:string, token?: string) {
    const response = await fetch(`${BACKEND_URL}/api/v1/bookings/${bid}/${status}`, {
        method: "PUT",
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
