import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppointmentState = {
    carItems: AppointmentItem[]
}

const initialState:AppointmentState = { carItems:[] };

export const cartSlice = createSlice ({
    name: "appointment",
    initialState,
    reducers: {
        addReservation: (state, action:PayloadAction<AppointmentItem>)=>{
            state.carItems.push(action.payload);
        },
        removeReservation: (state, action:PayloadAction<AppointmentItem>)=>{
            const remainItems = state.carItems.filter( obj => {
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

            state.carItems = remainItems;
        }
    }
})

export const { addReservation, removeReservation } = cartSlice.actions;
export default cartSlice.reducer;
