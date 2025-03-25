"use client" 

import { useState } from "react";
import { Button } from "@mui/material";
import deleteAppointment from "@/libs/deleteAppointment";
import updateAppointment from "@/libs/updateAppointment";
import getUserProfile from "@/libs/getUserProfile";
import getAppointments from "@/libs/getAppointments";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AppointmentCard from "./AppointmentCard";


export default function MyAppointment({ appointmentsJson, session }: MyAppointmentProps) {

    const router = useRouter();
    const token = session?.user.token
    const uid = session?.user._id
    
    const [appointments, setAppointments] = useState(appointmentsJson?.data || []);
    const [status, setStatus] = useState("booked");
    const [userProfile,setUserProfile] = useState<UserData|null>(null);
    

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
            console.error("Error while editing status appointment:", error);
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

    useEffect(() => {
        if (token) {
            const fetchUserProfile = async () => {
                try {
                    const profileData = await getUserProfile(await token);
                    setUserProfile(profileData.data);

                } catch (error) {
                    console.error("Failed to fetch user profile:", error);
                }
            };
            fetchUserProfile();
        }
    },[]);

    return (
     <main className="flex flex-col items-center px-6 py-12 min-h-screen rounded-3xl">
        
        { 
            userProfile?.role === "admin" ?
                ( <>
                    <h1 className="text-3xl font-bold text-blue-800 mb-5">All Appointments </h1>
                    {
                        appointments.length === 0 ?
                            ( <p className="text-gray-500">No upcoming appointments.</p> )
                        :
                            (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full bg-white-200 max-w-7xl">
                                    {
                                        appointments.map( (appointmentItem) => ( 
                                            <AppointmentCard
                                                appointmentItem={ appointmentItem }
                                                handleUpdateStatus={ handleUpdateStatus }
                                                handleEditStatus={ handleEditStatus }
                                                handleDelete={ handleDelete }
                                            />
                                        ))
                                    }
                                </div>
                            )
                    }
                </> )
            :
                ( <>
                <h1 className="text-3xl font-bold text-blue-800">My Appointment </h1>
                {appointments.length === 0 ? (<p className="text-gray-500">No upcoming appointments.</p>):(<div className="mt-[20px] w-[960px] bg-[#FDFDFD] rounded-2xl shadow-xl  backdrop-blur-lg  pl-[35px] pt-[20px] pr-[15px] pb-[15px]">
                    {appointments.map((appointmentItem) => (
                        <>
                        {
                            appointmentItem.booking_status === 'booked'?(<>
                            <>
                    <div className={`text-3xl font-bold mb-[20px]
                    ${appointmentItem.booking_status === "booked" ? " text-[#FCC800]" :""}`}>
                    Status : {appointmentItem.booking_status}
                </div>
                <div className=" flex flex-row items-center">
                <div className=" w-[480px] bg-[#FDFDFD] rounded-xl shadow-xl backdrop-blur-lg  pl-[35px] pt-[20px] pr-[15px] pb-[15px] mx-[10px]">
                    <div className="text-xl text-black">
                            <strong>Name</strong> : {appointmentItem.user.name}
                    </div>
                    <div className="text-xl text-black">
                    <strong>Time</strong> : {appointmentItem.booking_date}
                    </div>
                    <div className="text-xl text-black">
                        <strong>Purpose </strong>: {appointmentItem.dentist.area_of_expertise}
                    </div>
                </div>
                <div className=" w-[480px] bg-[#FDFDFD] rounded-xl shadow-xl backdrop-blur-lg  pl-[35px] pt-[20px] pr-[15px] pb-[15px] mx-[10px]">
                    <div className="text-xl  text-black">
                    <strong>Dentist</strong> : {appointmentItem.dentist.name}
                    </div>
                    <div className="text-xl  text-black">
                    <strong>Branch</strong> : Dekpun Clinic
                    </div>
                    <div className="text-xl text-black">
                        <strong>Experience</strong> : {appointmentItem.dentist.year_of_experience}
                    </div>
                </div>
                </div>
                <div className="flex justify-center items-center mt-[20px] ">
                <Button 
                     variant="outlined" 
                     color="primary"
                     onClick={() => handleEditStatus(appointmentItem._id, "booked")}
                      sx={{
                        fontWeight : "bold",
                        marginRight: '15px',
                        color: '#FCC800',
                        borderRadius: '8px',
                    borderColor: '#FCC800', 
                    '&:hover': {
                      backgroundColor: '#FCC800',  
                     color: 'white',
                     borderColor: '#FCC800',          
           },
     }}>
                    Edit
                    </Button>
                        <Button 
                    variant="outlined"  
                    color="error"
                    onClick={() => handleUpdateStatus(appointmentItem._id, "canceled")}
                    sx={{
                        fontWeight : "bold",
                    borderRadius: '8px', 
                    '&:hover': {
                     backgroundColor: '#FF0000',  
                         color: 'white',          
                                            },
                                          }}
                                    >
                                    Cancel
                         </Button>
                </div>
                    </>
                            </>):""
                        }
                        </>
                    )
            )}
                </div>)
                    
                }

                <h1 className="text-3xl font-bold text-blue-800 my-[50px] ">History</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full bg-white-200 max-w-6xl">
                {appointments.map((appointmentItem) => (
                    <>
                    {
                        appointmentItem.booking_status !== 'booked'?(<>
                        <div className="w-full bg-[#FDFDFD] rounded-lg shadow-xl  backdrop-blur-lg  pl-[20px] pt-[20px] pr-[15px] pb-[15px]">
                        <div className="text-md  text-black">
                    <strong>Dentist</strong> : {appointmentItem.dentist.name}
                    </div>
                    <div className="text-md text-black">
                        <strong>Expertise </strong>: {appointmentItem.dentist.area_of_expertise}
                    </div>
                    <div className="text-md text-black">
                    <strong>Time</strong> : {appointmentItem.booking_date}
                    </div>
                    <div className={`text-xl font-bold
                    ${appointmentItem.booking_status === "completed" ? " text-[#22963D]" :"text-[#FF0000]"}
                    `}>
                    Status : {appointmentItem.booking_status}
                </div>
                    </div>
                        
                        </>) :""
                    } </>))}
                </div>
                
                    </>)
                    }
            
        </main>
    );
};
