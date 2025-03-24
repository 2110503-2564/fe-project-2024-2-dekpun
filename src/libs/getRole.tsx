import { BACKEND_URL } from "@/backend-config";

export default async function getRole( id:string, page?:number, limit?:number ) {

    if (!page || !limit) {
        const response = await fetch(`${BACKEND_URL}/api/v1/roles/${id}`, { next: {tags:['role']} });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch role: ${id}`);
        }
    
        return await response.json();
    } else {
        const response = await fetch(`${BACKEND_URL}/api/v1/roles/${id}?page=${page}&limit=${limit}`, { next: {tags:['role']} });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch role: ${id} with page number: ${page} (${limit} dentists per page)`);
        }
    
        return await response.json();
    }


};
