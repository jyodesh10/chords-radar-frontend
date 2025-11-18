"use client";

import { Song } from "@/types/song";
import Slider from "@mui/material/Slider";
import { useEffect, useRef, useState } from "react";
import { PiMusicNotesFill } from "react-icons/pi";


export default function SongDetailComponent ({ song }: { song: Song }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (!playing) return;
        const interval = setInterval(() => {
        containerRef.current!.scrollTop += 1;
        }, 30);
        return () => clearInterval(interval);
    }, [playing]);

    return (
        <div className="relative">
            {playing ? (
                
                <div className="fixed flex p-3 w-3xl bottom-0 bg-teal-800">
                    <Slider 
                        className="mr-3" 
                        defaultValue={50} 
                        aria-label="Default" 
                        valueLabelDisplay="auto"
                        sx={{
                            color: "#1D4ED8",
                            "& .MuiSlider-thumb": {
                            backgroundColor: "#1D4ED8   ",
                            },
                            "& .MuiSlider-track": {
                            backgroundColor: "#1D4ED8",
                            },
                            "& .MuiSlider-rail": {
                            backgroundColor: "rgb(254 202 202)", // red-200
                            },
                        }}
                    />
                    <button className="py-1 px-3 bg-teal-800 rounded-xl border-blue-400 border-[1.5px] text-[14px] hover:bg-teal-700"
                        onClick={() => setPlaying(false)}
                    >
                        Cancel
                    </button>
                </div>
            ) :
            <div></div>
            }
            <div ref={containerRef}>
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
                {/* options */}
                <div className="flex mx-4 my-3 justify-end items-center">
                    <button className="py-1 px-3 mr-2 bg-teal-800 rounded-xl border-blue-400 border-[1.5px] text-[14px] hover:bg-teal-700"
                        onClick={ () => setPlaying(!playing)}
                    >
                        Auto scroll
                    </button>
                    <button className="py-1 px-3 mr-2 bg-teal-800 rounded-xl border-blue-400 border-[1.5px] text-[14px] hover:bg-teal-700">
                        Tutorials
                    </button>
                    <button className="py-1 px-3 bg-teal-800 rounded-xl border-blue-400 border-[1.5px] text-[14px] hover:bg-teal-700">
                        Share
                    </button>
                </div>
                <p className="whitespace-pre-wrap p-3 pb-40 text-[15px] font-medium">
                    {song?.content}
                </p>
            </div>

        </div>
    )
}