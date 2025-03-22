import MyAppointment from "@/components/MyAppointment";
import getAppointments from "@/libs/getAppointments";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function MyAppointmentPage() {
  const session = await getServerSession(authOptions)
  const token = session?.user?.token || ""; // Ensure you're using the correct token

  // Fetch appointments with the token
  const appointments = await getAppointments(token);

  return (
    <main>
      <MyAppointment appointmentsJson={appointments} session={session} />
    </main>
  );
}
