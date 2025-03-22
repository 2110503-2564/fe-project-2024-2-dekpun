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

interface AppointmentJson {
    success: boolean,
    numbers_of_booking: number,
    pagination: Object,
    data: AppointmentData[]
}

interface AppointmentItem {
    clinicBranch: string,
    purpose: string,
    appointmentDate: string,
    bookStatus?: string
}

interface AppointmentData {
    user: UserJson,
    dentist: DentistJson,
    booking_date: string
    booking_status: string,
    _id: string,
}
