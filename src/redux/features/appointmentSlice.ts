import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppointmentState = {
    appointmentItems: AppointmentItem[]
}

const initialState:AppointmentState = { appointmentItems:[] };

export const appointmentSlice = createSlice ({
    name: "appointment",
    initialState,
    reducers: {
        addAppointment: (state, action:PayloadAction<AppointmentItem>)=>{
            state.appointmentItems.push(action.payload);
        },
        removeAppointment: (state, action:PayloadAction<AppointmentItem>)=>{
            const remainItems = state.appointmentItems.filter( obj => {
                return (
                    (obj.nameLastname !== action.payload.nameLastname) ||
                    (obj.tel !== action.payload.tel) ||
                    (obj.birthday !== action.payload.birthday) ||
                    (obj.gender !== action.payload.gender) ||
                    (obj.clinic !== action.payload.clinic) ||
                    (obj.purpose !== action.payload.purpose) ||
                    (obj.appointmentDate !== action.payload.appointmentDate)
                )
            });

            state.appointmentItems = remainItems;
        }
    }
})

export const { addAppointment, removeAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
