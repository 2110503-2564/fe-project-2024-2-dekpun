interface AppointmentItem {
    aid?: string;
    nameLastname: string;
    tel: string;
    birthday: string;
    gender: string;
    clinic: string;
    purpose: string;
    appointmentDate: string;
    bookStatus?: string;
}

interface AppointmentJson {
    success: boolean,
    numbers_of_booking: number,
    pagination: Object,
    data: AppointmentData[]
}

interface AppointmentData {
    booking_status: string,
    _id: string,
    user: UserJson,
    dentist: DentistJson,
    booking_date: string
}

interface UserJson {
    email: string,
    id: string,
    name: string,
    tel: string,
    _id: string
}

interface DentistJson {
    area_of_expertise: string,
    id: string,
    name: string, 
    year_of_experience: string,
    _id: string
}