"use client";

import { useState } from "react";
import { Button } from "@mui/material";
import deleteAppointment from "@/libs/deleteAppointment";
import updateAppointment from "@/libs/updateAppointment";
import getUserProfile from "@/libs/getUserProfile";
import getAppointments from "@/libs/getAppointments";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AppointmentCard from "./AppointmentCard";

export default function MyAppointment({
  appointmentsJson,
  session,
}: MyAppointmentProps) {


  const router = useRouter();
  const token = session?.user.token
  const uid = session?.user._id
  
  const [appointments, setAppointments] = useState(appointmentsJson?.data || []);
  const [status, setStatus] = useState("booked");
  const [userProfile,setUserProfile] = useState<UserData|null>(null);
  

  if (!appointmentsJson) {
      return <p>No appointments available.</p>;  
  }

    const handleEditStatus = (appointment: AppointmentData) => {
      if(appointments) {
        const queryString = new URLSearchParams({
            booking_id: appointment._id,
            UserJson: JSON.stringify(appointment.user)
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
        setAppointments((prev) =>
          prev.filter((item) => item._id !== appointmentId)
        );
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
  }, []);

  return (
    <main className="flex flex-col items-center px-6 py-12 min-h-screen rounded-3xl">
      {
        userProfile ?(<>
              {userProfile?.role === "admin" ? (
        <>
          <h1 className="text-3xl font-bold text-blue-800 mb-5">
            All Appointments{" "}
          </h1>
          {appointments.length === 0 ? (
            <p className="text-gray-500">No upcoming appointments.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full bg-white-200 max-w-7xl">
              {appointments.map((appointmentItem) => (
                <AppointmentCard
                  appointmentItem={appointmentItem}
                  handleUpdateStatus={handleUpdateStatus}
                  handleEditStatus={handleEditStatus}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-blue-800">My Appointment </h1>
          {appointments.length === 0 ? (
            <p className="text-gray-500">No upcoming appointments.</p>
          ) : (
            <div className="mt-[20px] w-[960px] bg-[#FDFDFD] rounded-2xl shadow-xl  backdrop-blur-lg  pl-[35px] pt-[20px] pr-[15px] pb-[15px]">
              {appointments.map((appointmentItem) => (
                <>
                  {appointmentItem.booking_status === "booked" ? (
                    <>
                      <>
                        <div
                          className={`text-3xl font-bold mb-[20px]
                    ${
                      appointmentItem.booking_status === "booked"
                        ? " text-[#FCC800]"
                        : ""
                    }`}
                        >
                          Status : {appointmentItem.booking_status}
                        </div>
                        <div className=" flex flex-row items-center">
                          <div className=" w-[480px] bg-[#FDFDFD] rounded-xl shadow-xl backdrop-blur-lg  pl-[35px] pt-[20px] pr-[15px] pb-[15px] mx-[10px]">
                            <div className="text-xl text-black">
                              <strong>Name</strong> :{" "}
                              {appointmentItem.user.name}
                            </div>
                            <div className="text-xl text-black">
                              <strong>Time</strong> :{" "}
                              {appointmentItem.booking_date}
                            </div>
                            <div className="text-xl text-black">
                              <strong>Purpose </strong>:{" "}
                              {appointmentItem.dentist.area_of_expertise}
                            </div>
                          </div>
                          <div className=" w-[480px] bg-[#FDFDFD] rounded-xl shadow-xl backdrop-blur-lg  pl-[35px] pt-[20px] pr-[15px] pb-[15px] mx-[10px]">
                            <div className="text-xl  text-black">
                              <strong>Dentist</strong> :{" "}
                              {appointmentItem.dentist.name}
                            </div>
                            <div className="text-xl  text-black">
                              <strong>Branch</strong> : Dekpun Clinic
                            </div>
                            <div className="text-xl text-black">
                              <strong>Experience</strong> :{" "}
                              {appointmentItem.dentist.year_of_experience}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center items-center mt-[20px] ">
                          <Button
                            title="edit button"
                            className="w-[40px] h-[40px]"
                            onClick={() =>
                              handleEditStatus(appointmentItem)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="#FCC800"
                              className="size-6"
                            >
                              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                              <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                            </svg>
                          </Button>
                          <Button
                            title="cancel button"
                            className="w-[40px] h-[40px]"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="red"
                              className="size-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Button>
                          <Button
                            title="remove button"
                            className="w-[40px] h-[40px]"
                            onClick={() => handleDelete(appointmentItem._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="black"
                              className="size-6"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </Button>
                        </div>
                      </>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </div>
          )}

          <h1 className="text-3xl font-bold text-blue-800 my-[50px] ">
            History
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full bg-white-200 max-w-6xl">
            {appointments.map((appointmentItem) => (
              <>
                {appointmentItem.booking_status !== "booked" ? (
                  <>
                    <div className="w-full bg-[#FDFDFD] rounded-lg shadow-xl  backdrop-blur-lg  pl-[20px] pt-[20px] pr-[15px] pb-[15px] scale-100 hover:scale-110 hover: bg-[#FFFFFF]">
                      <div className="text-md  text-black">
                        <strong>Dentist</strong> :{" "}
                        {appointmentItem.dentist.name}
                      </div>
                      <div className="text-md text-black">
                        <strong>Expertise </strong>:{" "}
                        {appointmentItem.dentist.area_of_expertise}
                      </div>
                      <div className="text-md text-black">
                        <strong>Time</strong> : {appointmentItem.booking_date}
                      </div>
                      <div
                        className={`text-xl font-bold
                    ${
                      appointmentItem.booking_status === "completed"
                        ? " text-[#22963D]"
                        : "text-[#FF0000]"
                    }
                    `}
                      >
                        Status : {appointmentItem.booking_status}
                      </div>
                      <div className="flex justify-center items-center ">
                        <Button
                          title="remove button"
                          className="w-[40px] h-[40px]"
                          onClick={() => handleDelete(appointmentItem._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="black"
                            className="size-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}{" "}
              </>
            ))}
          </div>
        </>
      )}
        </>):
        (<></>)
      }
    </main>
  );
}
