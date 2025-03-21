import Image from "next/image";
import InteractiveCard from "./InteractiveCard";

export default function RoleCard({ roleName, imgSrc, onCompare }: { roleName: string; imgSrc: string; onCompare?: Function }) {
    return (
        <InteractiveCard contentName={roleName}>
            <div className="relative w-full h-[220px] rounded-t-lg overflow-hidden">
                <Image
                    src={imgSrc}
                    alt={roleName}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg transition-transform duration-500 hover:scale-110"
                />
            </div>
            <div className="p-4 text-center text-xl font-semibold text-gray-900 bg-white/70 backdrop-blur-md rounded-b-lg">
                {roleName}
            </div>
            {onCompare && (
                <button
                    className="w-full py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-b-lg transition-all"
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onCompare(roleName);
                    }}
                >
                    Compare
                </button>
            )}
        </InteractiveCard>
    );
}
