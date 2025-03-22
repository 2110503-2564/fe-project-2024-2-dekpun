export default async function getRole( id:string ) {

    // await new Promise( (resolve)=>{ setTimeout(resolve, 5000)});
    const response = await fetch(`http://localhost:5000/api/v1/roles/${id}`, { next: {tags:['role']} });

    if (!response.ok) {
        throw new Error(`Failed to fetch role : ${id}`);
    }

    return await response.json();
};
