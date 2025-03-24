"use client"  // Ensure this is a Client Component

import { useState } from "react";
import { Card, CardContent, Button } from "@mui/material";
import deleteAppointment from "@/libs/deleteAppointment";
import updateAppointment from "@/libs/updateAppointment";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import getAppointments from "@/libs/getAppointments";
import Link from "next/link";

// Type definition for the props

export default function MyAppointment({ appointmentsJson, session }: MyAppointmentProps) {

    const router = useRouter();
    const token = session?.user.token
    const uid = session?.user._id

    const [appointments, setAppointments] = useState(appointmentsJson?.data || []);

    useEffect(() => {
            const fetchAppointment = async () => {
                try {
                    const profileData = await getAppointments(await token);
                    setAppointments(profileData.data)
                    
                } catch (error) {
                    console.error("Failed to fetch user profile:", error);
                }
            };
            fetchAppointment;
    }, [appointments]);

    // Handle loading state if appointmentsJson is null
    if (!appointmentsJson) {
        return <p>No appointments available.</p>;  
    }

    const handleEditStatus = (appointmentId: string, status: string) => {
        if(appointments) {
            const queryString = new URLSearchParams({
                booking_id: appointmentId
            }).toString();   
            router.push(`../../appointment/manage?${queryString}`)
        }
    }

    const handleUpdateStatus = async (appointmentsId: string, status: string) => {
        try {
            const success = await updateAppointment(appointmentsId, status, token)
            if (success) {
                alert(status + " Appointment successfully!.");
                setAppointments((prevAppointments) =>
                    prevAppointments.map((item) =>
                        item._id === appointmentsId ? { ...item, booking_status: status } : item
                    )
                );
            } else {
                alert("Failed to " + status + " appointment.");
            }
        } catch (error) {
            console.error("Error deleting appointment:", error);
            alert("An error occurred while " + status + " the appointment.");
        }
    }

    const handleDelete = async (appointmentId: string) => {
        try {
            const success = await deleteAppointment(appointmentId, token);
            if (success) {
                setAppointments((prev) => prev.filter((item) => item._id !== appointmentId));
                alert("Remove Appointment successfully!.");
            } else {
                alert("Failed to delete appointment.");
            }
        } catch (error) {
            console.error("Error deleting appointment:", error);
            alert("An error occurred while deleting the appointment.");
        }
    };

    return (
        <main className="w-full flex flex-col items-center space-y-6 p-6">
            <h1 className="text-3xl font-bold text-blue-800">My Appointments</h1>

            {appointments.length === 0 ? (
                <p className="text-gray-500">No upcoming appointments.</p>
            ) : (
                appointments.map((appointmentItem) => (
                    <Card key={appointmentItem._id} className="w-[90%] md:w-[60%] shadow-lg">
                        <CardContent className="p-6 flex flex-col space-y-4">
                            <div className="text-xl font-semibold text-gray-800">
                                {appointmentItem.user.name}
                            </div>
                            <div className="text-xl font-semibold text-gray-800">
                                Dentist: {appointmentItem.dentist.name}
                            </div>
                            <div className="text-lg text-blue-600 font-medium">
                                {appointmentItem.booking_date}
                            </div>
                            <div className="text-gray-700">
                                <strong>Clinic:</strong> {"DekPun Clinic"}
                            </div>
                            <div className="text-gray-700">
                                <strong>Purpose:</strong> {appointmentItem.dentist.area_of_expertise}
                            </div>
                            <div className={`text-sm font-semibold 
                                ${appointmentItem.booking_status === "booked" ? "text-green-600" : "text-red-600"}`}>
                                {appointmentItem.booking_status}
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Button 
                                    variant="outlined"  
                                    color="primary"
                                    onClick={() => handleEditStatus(appointmentItem._id, "canceled")}>
                                    Edit
                                </Button>
                            { 
                                appointmentItem.booking_status !== "canceled" && (
                                <Button 
                                    variant="outlined"  
                                    color="error"
                                    onClick={() => handleUpdateStatus(appointmentItem._id, "canceled")}>
                                    Cancel Booking
                                </Button>
                                )
                            }
                                <Button 
                                    variant="outlined"  
                                    color="error"
                                    onClick={() => handleDelete(appointmentItem._id)}>
                                    Remove
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
        </main>
    );
}
