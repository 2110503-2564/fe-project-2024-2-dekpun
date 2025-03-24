import { BACKEND_URL } from "@/backend-config";

export default async function userRegister(
    user: {
        name:string,
        tel:string,
        gender:string,
        birthdate:string,
        email:string,
        password:string
    }
) {
    
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error("Failed to register");
    }

    return await response.json();
};
