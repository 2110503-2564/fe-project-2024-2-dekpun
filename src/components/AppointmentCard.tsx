import { Button } from "@mui/material";
import AppointmentForm from "./AppointmentForm";

export default function AppointmentCard(
    { appointmentItem, handleUpdateStatus, handleEditStatus, handleDelete } : 
    { appointmentItem:AppointmentData, handleUpdateStatus:Function, handleEditStatus:Function, handleDelete:Function }
) {
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
                    title="edit button"
                    className="w-[40px] h-[40px]"
                     onClick={() => handleEditStatus(appointmentItem._id, "booked")}
                     disabled={appointmentItem.booking_status !== "booked"}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FCC800" className="size-6">
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                </Button>
                <Button
                    title="compelete button"
                     className="w-[40px] h-[40px]"
                    onClick={ () => handleUpdateStatus(appointmentItem._id, "completed") }
                    disabled={appointmentItem.booking_status !== "booked"}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="green" className="size-6">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                </Button>
                <Button 
                    title="cancel button"
                    className="w-[40px] h-[40px]"
                    onClick={ () => handleUpdateStatus(appointmentItem._id, "canceled") }
                    disabled={appointmentItem.booking_status !== "booked"}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="size-6">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                </Button>
                <Button 
                    title="remove button"
                    className="w-[40px] h-[40px]"
                    onClick={ () => handleDelete(appointmentItem._id) }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="size-6">
                          <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                    </svg>
                </Button>
            </div>
        </div>
    );
};
