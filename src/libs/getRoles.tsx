export default async function getRoles() {

    // await new Promise( (resolve)=>{ setTimeout(resolve, 5000)});
    const response = await fetch("http://localhost:5000/api/v1/roles", { next: {tags:['roles']} });

    if (!response.ok) {
        throw new Error("Failed to fetch roles");
    }

    return await response.json();
};
