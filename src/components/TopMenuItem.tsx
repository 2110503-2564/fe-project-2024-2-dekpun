import Link from 'next/link';

export default function TopMenuItem( { title, pageRef } : { title:string, pageRef:string } ) {
    return(
        <Link href={pageRef} className="w-[150px] text-center mt-auto mb-auto 
          font-verdana text-md text-[#01169C] font-bold">
            {title}
        </Link>
    );
};
