'use client'

import { Button } from "@mui/material";
import AppointmentForm from "./AppointmentForm";

export default function AppointmentCard(
    { appointmentItem, handleUpdateStatus, handleEditStatus, handleDelete } : 
    { appointmentItem:AppointmentData, handleUpdateStatus:Function, handleEditStatus:Function, handleDelete:Function }
) {

    // console.log(appointmentItem._id)
    // console.log(appointmentItem.user)
    return (
        <div className="w-full bg-[#FDFDFD] rounded-lg shadow-xl  backdrop-blur-lg  pl-[20px] pt-[20px] pr-[15px] pb-[15px]">
            <div className="text-md  text-black">
                <strong>Name </strong>: {appointmentItem.user.name}
            </div>

            <div className="text-md text-black">
                <strong>Time</strong> : {appointmentItem.booking_date}
            </div>

            <div className="text-md  text-black">
                <strong>Dentist</strong> : {appointmentItem.dentist.name}
            </div>

            <div className="text-md text-black">
                <strong>Expertise </strong>: {appointmentItem.dentist.area_of_expertise}
            </div>

            <div className={ `text-xl font-bol d
                ${appointmentItem.booking_status === "booked" ? " text-[#FCC800]" :""}
                ${appointmentItem.booking_status === "completed" ? " text-[#22963D]" :""}
                ${appointmentItem.booking_status === "canceled" ? " text-[#FF0000]" :""}` }
            >
                Status : { appointmentItem.booking_status }
            </div>

            <div className="mt-2 flex justify-center">
                <Button
                    variant="outlined" 
                    onClick={ () => handleUpdateStatus(appointmentItem._id, "completed") }
                    sx={{
                        color: '#22963D',
                        borderRadius: '8px',
                        borderColor: '#22963D', 
                        '&:hover': {
                            backgroundColor: '#22963D',  
                            color: 'white',
                            borderColor: '#22963D',          
                        },
                    }}
                    disabled={appointmentItem.booking_status !== "booked"}
                >
                    Complete
                </Button>

                <Button 
                    variant="outlined" 
                    onClick={ () => handleEditStatus(appointmentItem, "booked") }
                    sx={{
                        marginLeft: '5px',
                        marginRight: '5px',
                        color: '#FCC800',
                        borderRadius: '8px',
                        borderColor: '#FCC800', 
                        '&:hover': {
                            backgroundColor: '#FCC800',  
                            color: 'white',
                            borderColor: '#FCC800',          
                        },
                    }}
                    disabled={ appointmentItem.booking_status !== "booked" }
                >
                    Edit
                </Button>

                <Button 
                    variant="outlined"  
                    color="error"
                    onClick={ () => handleUpdateStatus(appointmentItem._id, "canceled") }
                    sx={{
                        borderRadius: '8px',
                        marginRight: '5px', 
                        '&:hover': {
                            backgroundColor: '#FF0000',  
                            color: 'white',          
                        },
                    }}
                    disabled={ appointmentItem.booking_status !== "booked" }
                >
                    Cancel
                </Button>
                                
                <Button 
                    variant="outlined"  
                    onClick={ () => handleDelete(appointmentItem._id) }
                    sx={{
                        borderRadius: '8px',
                        color: '#000000',
                        borderColor: '#000000', 
                        '&:hover': {
                            backgroundColor: '#000000',  
                            color: 'white',          
                        },
                    }}
                >
                    Remove
                </Button>
            </div>
        </div>
    );
};
