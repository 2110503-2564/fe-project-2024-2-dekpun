import { BACKEND_URL } from "@/backend-config";

export default async function getRoles() {

    const response = await fetch(`${BACKEND_URL}/api/v1/roles`, { next: {tags:['roles']} });

    if (!response.ok) {
        throw new Error("Failed to fetch roles");
    }

    return await response.json();
};
