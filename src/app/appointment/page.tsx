'use client'

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers"; 
import { Select, MenuItem, TextField, FormControl, InputLabel, Card, CardContent, Button, Grid } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addAppointment } from "@/redux/features/appointmentSlice";

export default function Reservations() {
    const dispatch = useDispatch<AppDispatch>();

    const [nameLastname, setNameLastname] = useState<string>("");
    const [tel, setTel] = useState<string>("");
    const [birthday, setBirthday] = useState<Dayjs | null>(null);
    const [gender, setGender] = useState<string>("");
    const [purpose, setPurpose] = useState<string>("");
    const [appointmentDate, setAppointmentDate] = useState<Dayjs | null>(null);
    const [dentist, setDentist] = useState<string>("");

    const clinic = "Dekpun Clinic";

    // 15 Mock Dentists
    const dentists = Array.from({ length: 15 }, (_, i) => ({
        name: `Dr. Dentist ${i + 1}`,
        info: `Expert in specialty #${i + 1}`
    }));

    const makeAppointment = () => {
        if(nameLastname && tel && birthday && gender && clinic && purpose && appointmentDate && dentist) {
            const item: AppointmentItem = { 
                nameLastname: nameLastname,
                tel: tel,
                birthday: dayjs(birthday).format('DD/MM/YYYY'),
                gender: gender,
                clinic: clinic,
                purpose: purpose,
                appointmentDate: dayjs(appointmentDate).format('DD/MM/YYYY'),
                dentist: dentist
            };
            dispatch(addAppointment(item));
        }
    };

    return (
        <main className="flex flex-col items-center w-full min-h-screen py-10 bg-gray-100">
            <div className="text-4xl font-bold text-blue-800 mb-6">New Appointment</div>

            <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg space-y-6">
                {/* Name & Contact */}
                <TextField label="Full Name" fullWidth required value={nameLastname} onChange={(e) => setNameLastname(e.target.value)} />
                <TextField label="Contact Number" fullWidth required value={tel} onChange={(e) => setTel(e.target.value)} />

                {/* Birthday & Gender */}
                <div className="flex space-x-4">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker label="Date of Birth" value={birthday} onChange={(value) => setBirthday(value)} className="w-full bg-white" />
                    </LocalizationProvider>

                    <FormControl fullWidth>
                        <InputLabel>Gender</InputLabel>
                        <Select label="Gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Unidentified">Unidentified</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                {/* Clinic */}
                <TextField label="Clinic" fullWidth required value={clinic} disabled />

                {/* Purpose */}
                <FormControl fullWidth>
                    <InputLabel>Purpose</InputLabel>
                    <Select label="Purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} required>
                        <MenuItem value="Dentistry">Dentistry</MenuItem>
                        <MenuItem value="Orthodontics">Orthodontics</MenuItem>
                        <MenuItem value="Root_canal_treatment">Root canal treatment</MenuItem>
                        <MenuItem value="Pediatric_dentistry">Pediatric dentistry</MenuItem>
                    </Select>
                </FormControl>

                {/* Dentist Selection */}
                {purpose === "Dentistry" && (
                    <div className="w-full">
                        <TextField label="Dentist" fullWidth required value={dentist} disabled />

                        {/* Scrollable Dentist List */}
                        <div className="mt-4 max-h-80 overflow-y-auto border p-2 rounded-lg shadow-inner">
                            <Grid container spacing={2} direction="column">
                                {dentists.map((dentistInfo, index) => (
                                    <Grid item xs={12} key={index}>
                                        <Card variant="outlined">
                                            <CardContent className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-lg font-semibold">{dentistInfo.name}</h3>
                                                    <p className="text-gray-600">{dentistInfo.info}</p>
                                                </div>
                                                <Button variant="contained" color="primary" onClick={() => setDentist(dentistInfo.name)}>
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

                {/* Appointment Date */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Appointment Date" value={appointmentDate} onChange={(value) => setAppointmentDate(value)} className="w-full bg-white" />
                </LocalizationProvider>

                {/* Confirm Button */}
                <button className="w-full py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300" onClick={makeAppointment}>
                    Confirm Appointment
                </button>
            </div>
        </main>
    );
}
