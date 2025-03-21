import Member from "@/components/Member";
export default function About() {
    return(
        <main>
            <div className="block text-center font-verdana text-[#01169C] font-bold my-[15px]">
                <div className="text-3xl">About Us</div>
                <div className="text-xl mt-[5px]">Powered By Dekpun</div>
                </div>
            <div className="m-5 flex flex-row justify-around space-x-5 rounded-lg overflow-hidden">
                <Member img={'/img/member/TJ.jpg'} sid={"6733037621"} name={"Jedsada Meesuk"}/>
                <Member img={'/img/member/Pun.jpg'} sid={"6733037621"} name={"Jedsada Meesuk"}/>
                <Member img={'/img/member/Boom.jpg'} sid={"6733037621"} name={"Jedsada Meesuk"}/>
            </div>

        </main>
    );
}