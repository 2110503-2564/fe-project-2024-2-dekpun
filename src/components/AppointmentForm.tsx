'use client'

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers"; 
import { Select, MenuItem, TextField, FormControl, InputLabel, Card, CardContent, Button, Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import getRole from "@/libs/getRole"; // Import backend function
import getRoles from "@/libs/getRoles";
import addAppointment from "@/libs/addAppointment";
import getUserProfile from "@/libs/getUserProfile";
import { SelectChangeEvent } from "@mui/material";
import { useSearchParams } from "next/navigation";

export default function AppointmentForm({ session, dentist }: { session: any, dentist?:DentistJson }) {

    //State 1
    const [userProfile, setUserProfile] = useState<any>();
    const [purposes, setPurposes] = useState<{ area_id: string, area_name: string }[]>([]);
    const [dentists, setDentists] = useState<{ _id: string, name: string, area_of_expertise: string, year_of_experience: number, clinic_branch: string, id: string }[]>([]);
    const [showDentistSelection, setShowDentistSelection] = useState(false);
    
    //State 2
    const [formData, setFormData] = useState({
        nameLastname: "",
        tel: "",
        gender: "",
        purpose: "",
        dentistId: "",
        birthday: null as Dayjs | null,
        appointmentDate: null as Dayjs | null,
    });
    
    //Const value
    const token = session?.user?.token;
    const clinic = "Dekpun Clinic";

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
        const fetchDentists = async () => {
            if (formData.purpose) {
                const fetchedDentists = await getRole(formData.purpose);
                setDentists(fetchedDentists.data);
                setFormData(prev => ({ ...prev, dentistId: "" }));
                setShowDentistSelection(true);
            }
        };
        fetchDentists();
    }, [formData.purpose]);

    //Event handler when items is changed
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>, field: string) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    useEffect(() => {
        if (dentist) {
            setFormData(prev => ({
                ...prev,
                dentistId: dentist._id,
                purpose: dentist.area_of_expertise,
            }));
        }
    }, [dentist]);

    //Fetch data to Backend
    //Make Appointment
    //usage: POST new Appointment
    const makeAppointment = async () => {
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
            const appointmentData = {
                uid: userProfile.id,
                booking_date: formData.appointmentDate ? formData.appointmentDate.format("YYYY-MM-DD") : "",
            };
            await addAppointment(token, formData.dentistId, appointmentData);
            alert("Appointment successfully booked!");
        } catch (error) {
            console.error("Error booking appointment:", error);
            alert("Failed to book appointment.");
        }
    };

    console.log(dentist)

    return (
        <main className="flex flex-col items-center w-full min-h-screen py-10 bg-gray-100">
            <div className="text-4xl font-bold text-blue-800 mb-6">New Appointment</div>
            <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg space-y-6">
                <TextField label="Full Name" fullWidth required value={formData.nameLastname} onChange={(e) => handleInputChange(e, "nameLastname")} />
                <TextField label="Contact Number" fullWidth required value={formData.tel} onChange={(e) => handleInputChange(e, "tel")} />

                <div className="flex justify-between">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker 
                            label="Birth Date" 
                            value={formData.birthday} 
                            onChange={(value) => setFormData(prev => ({ ...prev, appointmentDate: value }))} 
                            className="w-[50%] bg-white" 
                        />
                    </LocalizationProvider>

                    <FormControl className="w-[45%]">
                        <InputLabel>Gender</InputLabel>
                        <Select value={formData.gender} onChange={(e) => handleInputChange(e, "gender")} required>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Unidentified">Unidentified</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <TextField label="Clinic" fullWidth required value={clinic} disabled />

                <FormControl fullWidth>
                    <InputLabel>Purpose</InputLabel>
                    <Select value={formData.purpose} onChange={(e) => handleInputChange(e, "purpose")} required>
                        {purposes.map(purpose => (
                            <MenuItem key={purpose.area_id} value={purpose.area_id}>{purpose.area_name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {formData.dentistId && (
                    <TextField label="Selected Dentist" fullWidth required value={dentists.find(d => d._id === formData.dentistId)?.name || ''} onClick={() => setShowDentistSelection(true)} disabled />
                )}

                {showDentistSelection && (
                    <div className="w-full max-h-60 overflow-y-auto border p-2 rounded-lg shadow-inner">
                        {dentists.map(dentistInfo => (
                            <Card key={dentistInfo._id} variant="outlined" className="flex justify-between items-center p-4">
                                <div>
                                    <h3 className="text-lg font-semibold">{dentistInfo.name}</h3>
                                    <p className="text-gray-600">Year of Experience: {dentistInfo.year_of_experience}</p>
                                </div>
                                <Button variant="contained" color="primary" onClick={() => { setFormData(prev => ({ ...prev, dentistId: dentistInfo._id })); setShowDentistSelection(false); }}>
                                    Select
                                </Button>
                            </Card>
                        ))}
                    </div>
                )}

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Appointment Date" value={formData.appointmentDate} onChange={(value) => setFormData(prev => ({ ...prev, appointmentDate: value }))} className="w-full bg-white" />
                </LocalizationProvider>

                <button className="w-full py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300" onClick={makeAppointment}>
                    Confirm Appointment
                </button>
            </div>
        </main>
    );
}
