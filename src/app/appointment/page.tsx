'use client'

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DatePicker } from "@mui/x-date-pickers"; 
import { Select, MenuItem, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";

import { useState } from "react";
import { useDispatch, UseDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addAppointment } from "@/redux/features/appointmentSlice";


export default function Appointment() {

    // const urlParams = useSearchParams()
    // const cid = urlParams.get('id')
    // const model = urlParams.get('model')

    const dispatch = useDispatch<AppDispatch>() 

    const makeAppointment = () => {
        if(nameLastname && tel && birthday && gender && clinic && purpose && appointmentDate) {
            const item:AppointmentItem = { 
                nameLastname: nameLastname,
                tel: tel,
                birthday: dayjs(birthday).format('DD/MM/YYYY'),
                gender: gender,
                clinic: clinic,
                purpose: purpose,
                appointmentDate: dayjs(appointmentDate).format('DD/MM/YYYY')
            }
            dispatch(addAppointment(item))
        }
    }

    const [nameLastname, setNameLastname] = useState<string>()
    const [tel, setTel] = useState<string>()
    const [birthday, setBirthday ] = useState<Dayjs | null>(null)
    const [gender, setGender] = useState<string>()
    const [purpose, setPurpose ] = useState<string>()
    const [appointmentDate, setAppointmentDate ] = useState<Dayjs | null>(null)

    const clinic = "Dekpun Clinic"

    return(
        <main className="w-[100%] flex flex-col items-center space-y-4">
            {/* <div className="bg-slate-100 rounded-lg w-[500px] px-6 py-6 flex flex-col items-center gap-4 shadow-lg"></div> */}
            <div className="text-4xl font-bold mt-10 text-blue-800">New Appointment</div>

            <div className="w-[60%]">

            <TextField name="Name-Lastname" label="Name-Lastname" id="outlined-required" fullWidth required
              onChange={(e)=>setNameLastname(e.target.value)}/>

            <TextField name="Contact-Number" label="Contact-Number" id="outlined-required" fullWidth required
              onChange={(e)=>setTel(e.target.value)}/>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white" value={birthday} onChange={(value)=>setBirthday(value)}/>
            </LocalizationProvider>

            <Select variant="standard" name="gender" id="gender" value={gender} required onChange={ (e)=>setGender(e.target.value)}
              className="h-[2em] w-[200px]">
                <MenuItem value="BKK">Male</MenuItem>
                <MenuItem value="CNX">Female</MenuItem>
                <MenuItem value="HKT">Unidentified</MenuItem>
            </Select>

            <TextField name="Clinic" label="clinic" id="outlined-disable" fullWidth required
              defaultValue={"DekPun Clinic"}/>

            <Select variant="standard" name="gender" id="gender" value={gender} required onChange={ (e)=>setGender(e.target.value)}
              className="h-[2em] w-[200px]">
                <MenuItem value="Orthodontics">Orthodontics</MenuItem>
                <MenuItem value="Conscious_sedation">Conscious sedation</MenuItem>
                <MenuItem value="Prosthodontics">Prosthodontics</MenuItem>
                <MenuItem value="Dental_implant">Dental implant</MenuItem>
                <MenuItem value="Crown">Crown</MenuItem>
                <MenuItem value="Root_canal_treatment">Root canal treatment</MenuItem>
                <MenuItem value="Pediatric_dentistry">Pediatric dentistry</MenuItem>
                <MenuItem value="Dental_restoration">Dental restoration</MenuItem>
                <MenuItem value="X-ray">X-ray</MenuItem>
                <MenuItem value="Dentistry">Dentistry</MenuItem>
                <MenuItem value="Veneer">Veneer</MenuItem>
                <MenuItem value="Periodontics">Periodontics</MenuItem>
                <MenuItem value="Fluoride_treatment">Fluoride treatment</MenuItem>
                <MenuItem value="Dental_extraction">Dental extraction</MenuItem>
                <MenuItem value="Restorative_dentistry">Restorative dentistry</MenuItem>
                <MenuItem value="Oral_surgery">Oral surgery</MenuItem>
            </Select>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white" value={appointmentDate} onChange={(value)=>setAppointmentDate (value)}/>
            </LocalizationProvider>

            </div>

            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                onClick={makeAppointment}>
                    Confirm Appointment
            </button>
        </main>
    );
}