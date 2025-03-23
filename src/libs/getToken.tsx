import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function getToken() {
    
    const session = await getServerSession(authOptions)
    const token = session?.user?.token

    return token
}