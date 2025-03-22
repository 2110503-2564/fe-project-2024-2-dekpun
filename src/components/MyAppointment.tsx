"use client"  // Ensure this is a Client Component

import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { removeAppointment } from "@/redux/features/appointmentSlice";
import { Card, CardContent, Button } from "@mui/material";

// Type definition for the props

export default function MyAppointment({ appointmentsJson }: MyAppointmentProps) {
    const dispatch = useDispatch<AppDispatch>();
    // const userItems = useAppSelector((state) => state.appointmentSlice.appointmentItems);

    // Handle loading state if appointmentsJson is null
    if (!appointmentsJson) {
        return <p>No appointments available.</p>;
    }

    console.log(appointmentsJson)

    return (
        <main className="w-full flex flex-col items-center space-y-6 p-6">
            <h1 className="text-3xl font-bold text-blue-800">My Appointments</h1>

            {appointmentsJson.data.length === 0 ? (
                <p className="text-gray-500">No upcoming appointments.</p>
            ) : (
                appointmentsJson.data.map((appointmentItem) => (
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
                                    variant="contained" 
                                    color="primary"
                                    onClick={() => alert("Edit feature coming soon!")}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    color="error"
                                    onClick={() => dispatch(removeAppointment(appointmentItem))}
                                >
                                    Cancel 
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
        </main>
    );
}
