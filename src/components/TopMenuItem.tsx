"use client"
import Link from 'next/link';
import { useState } from 'react';

export default function TopMenuItem( { title, pageRef, subPage } : { title:string, pageRef:string, subPage?:string[] } ) {

    const [isHovered, setIsHovered] = useState(false);

    return(
        <div
            className="h-[80%] relative text-center flex px-5 rounded-md hover:bg-slate-200 transition duration-200 ease-in-out cursor-pointer "
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            {
                subPage ?
                    <div className="block mt-auto mb-auto font-verdana text-md text-[#01169C] font-bold">
                        { title }
                    </div>
                :
                    <Link href={pageRef} className="block mt-auto mb-auto font-verdana text-md text-[#01169C] font-bold">
                        { title }
                    </Link>
            }

            {
                subPage && isHovered ?
                    (
                        <div className="absolute left-0 top-full w-full bg-white shadow-lg border border-gray-300 rounded-md">
                            {
                                subPage.map((sub, index) => (
                                    <Link 
                                        key={index} 
                                        href={`${pageRef}/${sub}`} 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                                    >
                                        {sub}
                                    </Link>
                                ))
                            }
                        </div>
                    )
                :
                    <></>
            }
        </div>
    );
};
