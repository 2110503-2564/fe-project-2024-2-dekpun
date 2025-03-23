'use client'

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers"; 
import { Select, MenuItem, TextField, FormControl, InputLabel, Card, CardContent, Button, Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import getRole from "@/libs/getRole"; // Import backend function
import addAppointment from "@/libs/addAppointment";
import getUserProfile from "@/libs/getUserProfile";
import { SelectChangeEvent } from "@mui/material";
import { Alexandria } from "next/font/google";

export default function AppointmentForm({ session }: { session: any }) {

    const [userProfile, setUserProfile] = useState<any>();
    
    const token = session?.user?.token

    useEffect(() => {
        if (token) {
            // Fetch the user profile
            const fetchUserProfile = async () => {
                try {
                    const profileData = await getUserProfile(await token);
                    setUserProfile(profileData.data); // Save the user profile data (including _id)
                } catch (error) {
                    console.error("Failed to fetch user profile:", error);
                }
            };
            fetchUserProfile();
        }
    }, [token]);

    const [formData, setFormData] = useState({
        nameLastname: "",
        tel: "",
        gender: "",
        purpose: "",
        dentistId: "67de7f690b84b1a7a8455ca4",
        birthday: null as Dayjs | null,
        appointmentDate: null as Dayjs | null,
    });

    const [dentists, setDentists] = useState<{ name: string; area_of_expertise: string; _id: string }[]>([]);
    const clinic = "Dekpun Clinic";

    // Fetch dentists when purpose changes
    useEffect(() => {
        const fetchDentists = async () => {
            if (formData.purpose) {
                const fetchedDentists = await getRole(formData.purpose);
                setDentists(fetchedDentists);
                setFormData(prev => ({ ...prev, dentist: "" })); // Reset selected dentist
            }
        };
        fetchDentists();
    }, [formData.purpose]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>, field: string) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };
    

    const makeAppointment = async () => {

        console.log("token: " + token)
        console.log("userId: " + userProfile?.id)

        if (!formData.nameLastname || !formData.tel || !formData.gender || !formData.purpose || !formData.appointmentDate) {
            alert("Please fill in all fields.");
            return;
        }
        
        if (token === undefined) {
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

    return (
        <main className="flex flex-col items-center w-full min-h-screen py-10 bg-gray-100">
            <div className="text-4xl font-bold text-blue-800 mb-6">New Appointment</div>

            <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg space-y-6">
                <TextField label="Full Name" fullWidth required value={formData.nameLastname} onChange={(e) => handleInputChange(e, "nameLastname")} />
                <TextField label="Contact Number" fullWidth required value={formData.tel} onChange={(e) => handleInputChange(e, "tel")} />

                <div className="flex space-x-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Date of Birth" value={formData.birthday} onChange={(value) => setFormData(prev => ({ ...prev, birthday: value }))} className="w-full bg-white" />
                    </LocalizationProvider>

                    <FormControl fullWidth>
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
                        <MenuItem value="Orthodontics">Orthodontics</MenuItem>
                        <MenuItem value="Prosthodontics">Prosthodontics</MenuItem>
                        <MenuItem value="Dental implant">Dental implant</MenuItem>
                        <MenuItem value="Crown">Crown</MenuItem>
                        <MenuItem value="Root canal treatment">Root canal treatment</MenuItem>
                        <MenuItem value="Pediatric dentistry">Pediatric dentistry</MenuItem>
                        <MenuItem value="Dentistry">Dentistry</MenuItem>
                        <MenuItem value="Veneer">Veneer</MenuItem>
                        <MenuItem value="Periodontics">Periodontics</MenuItem>
                        <MenuItem value="Fluoride treatment">Fluoride treatment</MenuItem>
                    </Select>
                </FormControl>

                {/* Dentist Selection */}
                {dentists.length > 0 && (
                    <div className="w-full">
                        <TextField label="Dentist" fullWidth required value={formData.dentistId} disabled />
                        <div className="mt-4 max-h-80 overflow-y-auto border p-2 rounded-lg shadow-inner">
                            <Grid container spacing={2} direction="column">
                                {dentists.map((dentistInfo) => (
                                    <Grid item xs={12} key={dentistInfo._id}>
                                        <Card variant="outlined">
                                            <CardContent className="flex justify-between items-center">
                                                <div>
                                                        <h3 className="text-lg font-semibold">{dentistInfo.name}</h3>
                                                    <p className="text-gray-600">Expert in {dentistInfo.area_of_expertise}</p>
                                                </div>
                                                <Button variant="contained" color="primary" onClick={() => setFormData(prev => ({ ...prev, dentist: dentistInfo._id }))}>
                                                    Select
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </div>
                )}

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Appointment Date" value={formData.appointmentDate} onChange={(value) => setFormData(prev => ({ ...prev, appointmentDate: value }))} className="w-full bg-white" />
                </LocalizationProvider>

                <button className="w-full py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300" 
                  onClick={makeAppointment}>
                    Confirm Appointment
                </button>
            </div>
        </main>
    );
}
