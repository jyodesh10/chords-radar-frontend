import Image from "next/image";

export default function LoadingState () {
    return (
        <div className="flex justify-center items-center bg-neutral-900 animate-pulse min-h-screen">
            <div className="justify-center items-center">
                <Image
                src="/images/logo.png"
                alt="Logo"
                width={80}
                height={80}
                className="items-center mb-3"
                />
                <h1 className="text-teal-800 font-bold text-[16px]">
                    Chords Radar
                </h1>
                <h1 className="text-[14px] font-medium text-blue-400">
                    Nepali Music Chords
                </h1>
            </div>
        </div>
    )
}