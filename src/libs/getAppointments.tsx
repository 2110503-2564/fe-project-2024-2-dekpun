import { BACKEND_URL } from "@/backend-config";

export default async function getAppointments(token: string) {
    const response = await fetch(`${BACKEND_URL}/api/v1/bookings`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch appointments");
    }

    return await response.json();
};
