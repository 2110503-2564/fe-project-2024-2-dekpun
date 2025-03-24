import { BACKEND_URL } from "@/backend-config";

export default async function getRole( id:string ) {

    const response = await fetch(`${BACKEND_URL}/api/v1/roles/${id}`, { next: {tags:['role']} });

    if (!response.ok) {
        throw new Error(`Failed to fetch role : ${id}`);
    }

    return await response.json();
};
