'use client'
import Image from "next/image";
export default function Member({img,sid,name}:{img:string,sid:string,name:string}){
    function onCardMouseAction(event: React.SyntheticEvent) {
            if(event.type == 'mouseover') {
                event.currentTarget.classList.remove('shadow-md', 'scale-100')
                event.currentTarget.classList.add('shadow-xl', 'scale-105')
            } else {
                event.currentTarget.classList.remove('shadow-xl', 'scale-105')
                event.currentTarget.classList.add('shadow-md', 'scale-100')
            }
        }
    return(
        <div className="w-[360px] h-[400px] rounded-lg bg-sky-50 shadow-md transition-transform duration-500 ease-in-out scale-100 hover:bg-sky-200 hover:text-[#01169C]"
        onMouseOver={(e)=>onCardMouseAction(e)}
        onMouseOut= {(e)=>onCardMouseAction(e)}>
            <div className="block h-[5%]"></div>
            <div className="rounded-lg overflow-hidden w-[90%] h-[70%] relative ml-[5%]">
                <Image src={img} alt="Member Picture" fill={true} objectFit='cover'/>
            </div>
            <div className="text-md font-verdana mt-4 font-bold ml-[8%]">
                <div>SID : {sid}</div>
                <div>Name : {name}</div>
            </div>
        </div>
    );
}
