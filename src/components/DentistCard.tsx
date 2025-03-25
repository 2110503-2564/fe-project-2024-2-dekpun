'use client'

import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import { useRouter } from "next/navigation";

export default function DentistCard( { dentist, imgSrc, area_name, onCompare }: { dentist: DentistJson; imgSrc: string; area_name?: string, onCompare?: Function } ) {

    const router = useRouter();
    const makeApptWithDentHandler = () => {
        const queryString = new URLSearchParams({
            _id: dentist._id,
            name: dentist.name,
            area_of_expertise: dentist.area_of_expertise,
            year_of_experience: dentist.year_of_experience.toString(),
            clinic_branch: dentist.clinic_branch,
            id: dentist.id
        }).toString();   
        router.push(`../../../appointment?${queryString}`)
    }

    return (
        <InteractiveCard contentName={ dentist.name }>
            <div className="relative w-full h-[220px] rounded-t-lg overflow-hidden group"
              onClick={makeApptWithDentHandler}>
                {/* Image */}
                <Image
                    src={imgSrc}
                    alt={dentist.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg transition-transform duration-500 group-hover:scale-110 group-hover:opacity-40"
                />
                
                {/* Overlay Text */}
                <h1 className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-black/50">
                    Click to make an Appointment.
                </h1>
            </div>

            <div className="p-4 text-center bg-white/70 backdrop-blur-md rounded-b-lg">
                <h1 className="text-xl font-semibold text-gray-900"> {dentist.name} </h1>
                <p className="text-md text-gray-500">Year of Experience: {dentist.year_of_experience} </p>
                {
                    area_name ?
                        <p className="text-md text-gray-500">Expert in {area_name} </p>
                    :
                        <></>
                }
            </div>

            {
                onCompare ?
                    (
                        <button
                            className="w-full py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-b-lg transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                onCompare(dentist.name);
                            }}
                        >
                            Compare
                        </button>
                    )
                :
                    <></>
            }
        </InteractiveCard>
    );
}
