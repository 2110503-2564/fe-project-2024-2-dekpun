import getAppointments from "@/libs/getAppointments";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DentistCard from "./DentistCard";

export default async function DentistCatalog( { role } : { role:string|undefined } ) {

    const session = await getServerSession(authOptions)
    const token = session?.user?.token || ""; // Ensure you're using the correct token

    // Fetch dentists with the token
    const dentists = await getAppointments(token);

    return (
        <main className="flex flex-col items-center px-6 py-12 bg-gradient-to-br from-blue-100 to-gray-200 min-h-screen rounded-3xl">
            <h1 className="text-4xl font-semibold text-blue-800 mb-8 text-center">
                Explore Our Dentist in { role } area
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-6xl">
                {
                    dentists.map((dentist) => (
                        <DentistCard dentistName={dentist.name} imgSrc={} />
                    ))
                }
            </div>
        </main>
    );
}
