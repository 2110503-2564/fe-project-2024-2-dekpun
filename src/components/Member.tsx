import Image from "next/image";
export default function Member({img,sid,name}:{img:string,sid:string,name:string}){
    return(
        <div className="w-[360px] h-[440px] rounded-lg shadow-lg transition-transform duration-500 ease-in-out scale-100 hover:bg-gray-400 hover:text-white">
            <div className="rounded-lg overflow-hidden w-full h-[80%] relative">
                <Image src={img} alt="Member Picture" fill={true} objectFit='cover'/>
            </div>
            <div className="text-md font-verdana ">
                <div>SID : {sid}</div>
                <div>Name : {name}</div>
            </div>
        </div>
    );
}