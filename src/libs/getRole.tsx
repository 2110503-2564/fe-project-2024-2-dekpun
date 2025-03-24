import { BACKEND_URL } from "@/backend-config";

export default async function getRole( role:string, page?:number, limit?:number, searchQuery?:string ) {

    let queryString;

    queryString = new URLSearchParams({
        page: page?.toString() || "",
        limit: limit?.toString() || "",
        search: searchQuery || "", // Include search query
    }).toString()

    const response = await fetch(`${BACKEND_URL}/api/v1/roles/${role}?${queryString}`);

    if (!response.ok) {
        throw new Error(
            (!page && !limit) ?
                `Failed to fetch role: ${role}`
            :
                `Failed to fetch role: ${role} with page number: ${page} (${limit} dentists per page)`
        );
    }

    return await response.json();
};
