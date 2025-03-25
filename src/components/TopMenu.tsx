'use client'

import Image from 'next/image'
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { Link } from '@mui/material';
import getUserProfile from '@/libs/getUserProfile';
import { useEffect, useState } from 'react';

export default function TopMenu( {session, token} : {session?: any, token?: string} ) {

    const [role, setRole] = useState("")

    useEffect(() => {
        if (token) {
            const fetchUserProfile = async () => {
                try {
                    const profileData = await getUserProfile(await token);
                    setRole(profileData.data.role);

                } catch (error) {
                    console.error("Failed to fetch user profile:", error);
                }
            };
            fetchUserProfile();
        }
    }, [token]);

    return(
        <div className="w-full h-[70px] bg-white fixed t-[0] l-[0] r-[0] z-30 border-t border-b border-gray-300 flex items-center flex-row">
            <Link href="/" className="h-[100%] w-[172px]">
                <Image src={'/img/logo.png'} className="h-[100%] w-auto" alt='logo' width={0} height={0} sizes='100vh'/>
            </Link>

            <TopMenuItem title='Dentists' pageRef='/dentist' subPage={ ["roles", "browse"] } /> 
            <TopMenuItem title='Appointment' pageRef='/appointment' />
            <TopMenuItem title='About Us' pageRef='/about' />

            <div className='flex flex-row absolute items-center right-5 h-full'>
                {
                    session ? (
                        <>
                            {
                                role === "admin" ? 
                                <TopMenuItem title='All Appointment' pageRef='/appointmentlist'/> :
                                <TopMenuItem title='My Appointment' pageRef='/appointmentlist'/>
                            }
                            <Link href="/api/auth/logout">
                                <div className='flex items-center h-full px-2 text-cyan-600 text-sm ml-5'>
                                    <Image src={'/img/profile_user.png'} className='h-[40px] w-[40px]' alt='user profile' width={0} height={0} sizes='auto'/>
                                </div>
                            </Link>
                        </>
                    ) : (
                        <Link href="/api/auth/signin" className='flex items-center'>
                            <div className='flex items-center h-[70%] px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition duration-200 ease-in-out cursor-pointer ml-5'>
                                <span className='text-sm font-medium'>Sign-In</span>
                            </div>    
                        </Link>
                    )
                }
            </div>

        </div>
    );
}