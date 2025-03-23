//GET BOOKINGS
interface AppointmentJson {
    success: boolean,
    numbers_of_booking: number,
    pagination: Object,
    data: AppointmentData[]
}
interface AppointmentData {
    user: UserJson,
    dentist: DentistJson,
    booking_date: string,
    booking_status: string,
    _id: string,
}

interface UserJson {
    id: string,
    email: string,
    name: string,
    tel: string,
    gender: string,
    birthdate: Date,
    _id: string
}

interface DentistJson {
    id: string,
    name: string, 
    area_of_expertise: string,
    year_of_experience: number,
    clinic_branch: string,
    _id: string
}

//POST BOOKING (dentists/{:did}/bookings)
interface AppointmentItem {
    uid: string,
    booking_date: string,
    bookStatus?: string //No need
}


interface MyAppointmentProps {
    appointmentsJson: AppointmentJson | null;
    session: any;
}

interface DentistExistence {
    area_id: string,
    area_name: string, 
    area_existence: boolean
}


//temp 
interface DentistByRole {
    
}

interface UserJson {
    success: boolean,
    data: UserData
}

interface UserData {
    _id: string
    name: String,
    tel: String,
    gender: String,
    birthdate: Date,
    email: String,
    role: String,
    createdAt: Date,
    __v: string,
    bookings: Bookings[],
    id: string
}

interface Bookings {
    _id: string,
    user: string,
    dentist: string,
    booking_date: Date,
    booking_status: string
    __v: string
}