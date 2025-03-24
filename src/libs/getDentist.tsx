import { BACKEND_URL } from "@/backend-config";

export default async function getDentist( id:string ) {
    const response = await fetch(`${BACKEND_URL}/api/v1/dentists/${id}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch dentist with id: ${id}`);
    }

    return await response.json();
};
