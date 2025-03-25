import { BACKEND_URL } from "@/backend-config";

export default async function getDentists( roleList?:string[], page?:number, limit?:number, searchQuery?:string, sortBy?:string ) {

    let queryString;

    queryString = new URLSearchParams({
        category: roleList?.join(",") || "",
        page: page?.toString() || "",
        limit: limit?.toString() || "",
        search: searchQuery || "", // Include search query
        sort: sortBy || ""
    }).toString()

    const response = await fetch(`${BACKEND_URL}/api/v1/dentists?${queryString}`, { next: {tags:['dentists']} });

    if (!response.ok) {
        throw new Error(
            (!page && !limit) ?
                `Failed to fetch dentists`
            :
                `Failed to fetch dentists with page number: ${page} (${limit} dentists per page)`
        );
    }

    return await response.json();
};
