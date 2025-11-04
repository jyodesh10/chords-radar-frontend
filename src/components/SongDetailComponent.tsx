"use client";

import { Song } from "@/types/song";
import { PiMusicNotesFill } from "react-icons/pi";


export default function SongDetailComponent ({ song }: { song: Song }) {
    return (
        <div>
            <div className="bg-teal-800 p-10">
                <div className="flex items-center">
                    {/* logo */}
                    <div className="mr-4 text-blue-700 text-2xl p-3 bg-teal-100 rounded-xl">
                        <PiMusicNotesFill />
                    </div>
                    {/* name and artist */}
                    <div>
                        <h1 className="text-[16px] font-medium text-gray-100">
                        {song?.title}
                        </h1>
                        <p className="text-[14px] font-medium text-blue-400">
                        {song?.artist}
                        </p>
                    </div>
                </div>
            </div>
            <p className="whitespace-pre-wrap p-3 pb-40 text-[15px] font-medium">
                {song?.content}
            </p>
        </div>
    )
}