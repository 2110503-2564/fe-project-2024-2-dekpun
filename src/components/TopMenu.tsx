import styles from './topmenu.module.css'
import Image from 'next/image'
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Link } from '@mui/material';

export default async function TopMenu() {

    const session = await getServerSession(authOptions)

    return(
        <div className="w-full h-[70px] bg-white fixed t-[0] l-[0] r-[0] z-30 border-t border-b border-gray-300 flex flex-row">
            <Link href="/" className="h-[100%] w-[172px]">
                <Image src={'/img/logo.png'} className="h-[100%] w-auto" alt='logo' width={0} height={0} sizes='100vh'/>
            </Link>
            <TopMenuItem title='Dentists' pageRef='/dentist'/> 
            <TopMenuItem title='Appointment' pageRef='/appointment'/>
            <TopMenuItem title='About Us' pageRef='/about'/>

            <div className='flex flex-row absolute right-5 h-full'>
                <TopMenuItem title='My Appointment' pageRef='/appointmentlist'/>
                {
                    session ? 
                    <Link href="/api/auth/signout">
                        <div className='flex items-center h-full px-2 text-cyan-600 text-sm ml-5'>
                            <Image src={'/img/profile_user.png'} className='h-[40px] w-[40px]' alt='user profile' width={0} height={0} sizes='auto'/>
                            {/* Sign-Out of {session.user?.name} */}
                        </div>
                    </Link>
                    : 
                    <Link href="/api/auth/signin">
                        <div className='flex items-center h-full px-2 text-cyan-600 text-sm ml-5'>
                            Sign-In
                        </div>
                    </Link>
                }
            </div>

        </div>
    );
}
