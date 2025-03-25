'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers"; 
import { Select, MenuItem, TextField, FormControl, InputLabel, Card, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material";

import getRole from "@/libs/getRole";
import getRoles from "@/libs/getRoles";
import addAppointment from "@/libs/addAppointment";
import getUserProfile from "@/libs/getUserProfile";
import getIdbyRole from "@/libs/getIdbyRole";
import editAppointment from "@/libs/editAppointment";

import Swal from "sweetalert2";

export default function AppointmentForm({ session, option, booking_id, dentist }: { session: any, option:string, booking_id:string, dentist?:DentistJson}) {

    const router = useRouter();

    //State 1
    //Use for fetched data
    const [userProfile, setUserProfile] = useState<UserData>();
    const [purposes, setPurposes] = useState<{ area_id: string, area_name: string }[]>([]);
    const [dentists, setDentists] = useState<{ _id: string, name: string, area_of_expertise: string, year_of_experience: number, clinic_branch: string, id: string }[]>([]);
    
    //State 2
    //Use for filled data
    const [formData, setFormData] = useState({
        nameLastname: userProfile?.name || "",
        tel: userProfile?.tel || "",
        gender: userProfile?.gender || "",
        purpose: getIdbyRole(dentist?.area_of_expertise || "")?.area_id || "",
        dentistId: dentist?._id || "",
        dentistName: dentist?.name || "",
        birthday: null as Dayjs | null,
        appointmentDate: null as Dayjs | null,
    });
    
    //Const value
    const token = session?.user?.token;
    const clinic = "Dekpun Clinic";
    
/* ========================================== Data Fetching ========================================== */

/* ++++++++++++++++++ BackEnd ===> FrontEnd ++++++++++++++++++ */

    //Fetch User Profile
    //usage: makeAppointment
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
    }, [token]);

    
    //Fetch All Roles
    //usage: purpose drowdown content
    useEffect(() => {
        const fetchPurposes = async () => {
            try {
                const response = await getRoles();
                const filteredPurposes = response.data.filter((item: any) => item.area_existence).map((item: any) => ({ area_id: item.area_id, area_name: item.area_name }));
                setPurposes(filteredPurposes);
            } catch (error) {
                console.error("Failed to fetch purposes:", error);
            }
        };
        fetchPurposes();
    }, []);
    
    //Fetch dentists in specific role.
    //usage: dentist selection menu.
    useEffect(() => {
        console.log(formData.purpose)
        const fetchDentists = async () => {
            const fetchedDentists = await getRole(formData.purpose);
            setDentists(fetchedDentists.data);
            // setShowDentistSelection(true);
        };
        fetchDentists();
    }, [formData.purpose]);

/* ------------- Initialize Value ------------- */
    
    //Initialize Data in state
    useEffect(() => {
        if (userProfile) {
            setFormData((prev) => ({
                ...prev,
                nameLastname: userProfile.name || "",
                tel: userProfile.tel || "",
                gender: userProfile.gender || "",
                birthday: userProfile.birthdate ? dayjs(userProfile.birthdate) : null,
            }));
        }
    }, [userProfile]);

/* ++++++++++++++++++ BackEnd ===> FrontEnd ++++++++++++++++++ */

    //Fetch data to Backend
    //Make Appointment
    //usage: POST new Appointment
    const makeAppointment = async (option:string) => {
        if (!formData.nameLastname || !formData.tel || !formData.gender || !formData.purpose || !formData.appointmentDate) {
            alert("Please fill in all fields.");
            return;
        }
        
        if (!token) {
            alert("User is not authenticated! (token)");
            return;
        }
    
        if (!userProfile) {
            alert("User is not authenticated! (uid)");
            return;
        }
    
        try {
    
            if(option === "edit"){
    
                console.log(formData.dentistId)
    
                const appointmentData = {
                    booking_date: formData.appointmentDate ? formData.appointmentDate.format("YYYY-MM-DD") : "",
                    dentist: formData.dentistId,
                };
    
                await editAppointment(token, booking_id, appointmentData);
    
                Swal.fire({
                    title: "Edit Appointment successfully!",
                    icon: "success",
                    draggable: true
                }).then( () => {
                    router.push("/appointmentlist")
                });
    
            } else {
    
                const appointmentData = {
                    uid: userProfile.id,
                    booking_date: formData.appointmentDate ? formData.appointmentDate.format("YYYY-MM-DD") : "",
                };
    
                await addAppointment(token, formData.dentistId, appointmentData);
    
                Swal.fire({
                    title: "Appointment successfully booked!",
                    icon: "success",
                    draggable: true
                }).then( () => {
                    router.push("/appointmentlist")
                });
            }
        } catch (error) {
            console.error("Error booking appointment:", error);
    
            Swal.fire({
                title: "Failed to book appointment.",
                icon: "error",
                draggable: true
            });
        }
    };
    
    console.log(dentist)

/* ========================================== Event Handler ========================================== */
    
    //Event handler when items is changed
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<String>, field: string) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value as string }));
    };
    


    return (
        <main className="flex flex-col items-center w-full min-h-screen py-10 bg-gray-100">
            <div className="text-4xl font-bold text-blue-800 mb-6">New Appointment</div>
            <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg space-y-6">

{/* -------------------------- Name - Lastname -------------------------- */}
                
                <TextField label="Full Name" fullWidth required value={formData.nameLastname} onChange={(e) => handleInputChange(e, "nameLastname")} disabled/>

{/* -------------------------- Contact Number -------------------------- */}

                <TextField label="Contact Number" fullWidth required value={formData.tel} onChange={(e) => handleInputChange(e, "tel")} disabled/>

{/* -------------------------- BirthDate -------------------------- */}

                <div className="flex justify-between">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            label="Birth Date" 
                            value={formData.birthday} 
                            onChange={(value) => setFormData(prev => ({ ...prev, appointmentDate: value }))} 
                            className="w-[50%] bg-white" 
                            disabled
                        />
                    </LocalizationProvider>

{/* -------------------------- BirthDate -------------------------- */}

            {/* Gender */}
                    <FormControl className="w-[45%]">
                        <InputLabel>Gender</InputLabel>
                        <Select value={formData.gender} onChange={(e) => handleInputChange(e, "gender")} label="Gender" required disabled>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Unidentified">Unidentified</MenuItem>
                        </Select>
                    </FormControl>
                </div>

{/* -------------------------- Gender -------------------------- */}

                <TextField label="Clinic" fullWidth required value={clinic} disabled />

{/* -------------------------- Purpose -------------------------- */}

                <FormControl fullWidth>
                    <InputLabel>Purpose</InputLabel>
                    <Select value={formData.purpose} onChange={(e) => handleInputChange(e, "purpose")} label="Purpose" required>
                        {purposes.map(purpose => (
                            <MenuItem key={purpose.area_id} value={purpose.area_id}>{purpose.area_name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            
{/* -------------------------- Selected Dentist -------------------------- */}

                {formData.dentistId && (
                    <TextField label="Selected Dentist" fullWidth required value={dentists.find(d => d._id === formData.dentistId)?.name || ''}  disabled />
                )}

                <div className="w-full max-h-60 overflow-y-auto border p-2 rounded-lg shadow-inner">
                    {dentists.map(dentistInfo => (
                        <Card key={dentistInfo._id} variant="outlined" className="flex justify-between items-center p-4">
                            <div>
                                <h3 className="text-lg font-semibold">{dentistInfo.name}</h3>
                                <p className="text-gray-600">Year of Experience: {dentistInfo.year_of_experience}</p>
                            </div>
                            <Button variant="contained" color="primary" onClick={() => { setFormData(prev => ({ ...prev, dentistId: dentistInfo._id })); }}>
                                Select
                            </Button>
                        </Card>
                    ))}
                </div>
            
{/* -------------------------- Appointment Date -------------------------- */}

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Appointment Date" value={formData.appointmentDate} onChange={(value) => setFormData(prev => ({ ...prev, appointmentDate: value }))} className="w-full bg-white" />
                </LocalizationProvider>
            
{/* -------------------------- Confirmation Button -------------------------- */}

                <button className="w-full py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300" 
                  onClick={() => {
                    Swal.fire({
                        title: "Do you want to save this appointment?",
                        icon: "warning",
                        draggable: true,
                        showCancelButton: true,
                        confirmButtonColor: "#155dfc",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Save!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            makeAppointment(option);
                        }
                    });
                  }}>
                    { option === "edit" ? "Edit Appointment" : "Confirm Appointment" }
                </button>
            </div>
        </main>
    );
}
