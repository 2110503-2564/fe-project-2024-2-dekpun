import Image from 'next/image'
import InteractiveCard from './InteractiveCard';

export default function RoleCard( {roleName, imgSrc, onCompare} : { roleName:string, imgSrc:string, onCompare?:Function }) {    

    return (
        <InteractiveCard contentName={roleName}>
            <div className="w-full h-[70%] relative rounded-t-lg">
                <Image src={imgSrc}
                alt='Role Picture'
                fill={true}
                className='object-cover rounded-t-lg'
                />
            </div>
            <div className="w-full h-[15%] p-[15px] text-lg">{roleName}</div>
            {
                onCompare ? <button className='block h-[10%] text-sm rounded-md bg-sky-600 hover:bg-indigo-600 mx-2 px-1 py-1 text-white shadow-sm'
                onClick={ (e)=>{ e.stopPropagation(); e.preventDefault(); onCompare(roleName) } }>
                    Compare
                </button> : ''
            }
        </InteractiveCard>
    );
}