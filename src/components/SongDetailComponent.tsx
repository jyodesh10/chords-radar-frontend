"use client";

import { Song } from "@/types/song";
import Slider from "@mui/material/Slider";
import { useEffect, useRef, useState } from "react";
import { PiMusicNotesFill } from "react-icons/pi";
import Popup from "reactjs-popup";
import { usePathname } from 'next/navigation'
import {
  FacebookShareButton,
  PinterestShareButton,
  FacebookIcon,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  EmailShareButton,
  EmailIcon,

} from 'next-share'

export default function SongDetailComponent ({ song }: { song: Song }) {
    const containerRef = useRef<HTMLDivElement>(null); 
    
    const [playing, setPlaying] = useState(false);
    const [scrollSpeed, setScrollSpeed] = useState(600); // Default speed: 40ms interval
    const [url, setUrl] = useState('');
    const pathname = usePathname()

    const title = "Check out Chords Radar Nepal"
    // --- 2. Auto-Scroll Logic using useEffect and setInterval ---
    useEffect(() => {
        if (!playing) return;

        const container = containerRef.current;
        if (!container) return;

        // Set the scroll increment (e.g., 1 pixel per interval)
        const scrollIncrement = 1; 

        // Start the scroll interval
        const interval = setInterval(() => {
            // Check if we've reached the end
            const maxScroll = container.scrollHeight - container.clientHeight;

            if (container.scrollTop >= maxScroll) {
                // Stop scrolling when the bottom is reached
                clearInterval(interval);
                setPlaying(false);
                return;
            }

            // Increment scroll position
            container.scrollTop += scrollIncrement;
        }, scrollSpeed); // Use the adjustable scrollSpeed state
        setUrl("https://chords-radar-nepal.vercel.app" + pathname);
        // Cleanup function: important to stop the interval when the component unmounts or dependencies change
        return () => clearInterval(interval);
        
    }, [playing, scrollSpeed]); // Dependencies: Re-run when playing state or speed changes

    // --- Button Handler ---
    function handleAutoScrollToggle() {
        setPlaying((prevPlaying) => !prevPlaying);

        // Optional: Ensure scroll starts from the top when beginning the auto-scroll
        if (!playing && containerRef.current) {
             containerRef.current.scrollTop = 0;
        }
    }

    // Function to map slider value (e.g., 0-100) to scroll speed (e.g., 100-10ms)
    const handleSliderChange = (e: Event, value: number | number[]) => {
        // Map the MUI slider value (0 to 100) to the interval speed (100ms slow to 10ms fast)
        // 100 - value = inverse speed. Add a base value (e.g., 10ms)
        const sliderValue = Array.isArray(value) ? value[0] : value;
        const newSpeed = 110 - sliderValue; // 100 -> 10, 10 -> 100
        setScrollSpeed(newSpeed);
    }


    return (
        <div className="relative w-full">
            {playing ? (
                // Floating bottom control bar
                <div className="fixed flex p-3 w-full max-w-lg mx-auto left-0 right-0 bottom-0 bg-teal-800 z-50">
                    <Slider 
                        className="mr-3" 
                        defaultValue={20} // Corresponds to scrollSpeed of 40ms (110 - 70 = 40)
                        min={10} max={100} 
                        onChange={handleSliderChange} // Use the new speed handler
                        aria-label="Scroll Speed" 
                        valueLabelDisplay="auto"
                        sx={{
                            color: "#1D4ED8",
                            "& .MuiSlider-thumb": { backgroundColor: "#1D4ED8   " },
                            "& .MuiSlider-track": { backgroundColor: "#1D4ED8" },
                            "& .MuiSlider-rail": { backgroundColor: "rgb(254 202 202)" },
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
            
            {/* 3. SCROLLABLE CONTAINER: Added ref, fixed height, and overflow classes */}
            <div ref={containerRef} className="h-screen overflow-y-scroll no-scrollbar  lg:px-[20%]">
                {/* Header Section (Can be made sticky) */}
                <div className="bg-teal-800 p-10 sticky top-0 z-40">
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
                {/* options (Sticky top for easy access) */}
                <div className="flex px-4 py-3 justify-end items-center top-28 z-40  bg-neutral-900">
                    <button className="py-1 px-3 mr-2 bg-teal-800 rounded-xl border-blue-400 border-[1.5px] text-[14px] hover:bg-teal-700"
                        onClick={handleAutoScrollToggle}
                    >
                        {playing ? "Stop Scroll" : "Auto scroll"}
                    </button>
                    <button className="py-1 px-3 mr-2 bg-teal-800 rounded-xl border-blue-400 border-[1.5px] text-[14px] hover:bg-teal-700"
                    >
                        Tutorials
                    </button>
                    <Popup trigger={
                        <button className="py-1 px-3 bg-teal-800 rounded-xl border-blue-400 border-[1.5px] text-[14px] hover:bg-teal-700">
                            Share
                        </button>
                    } position="bottom right">
                        <div className="h-22 p-3 bg-white rounded-[6px]">
                            <h1 className="font-bold text-teal-800">
                                Share
                            </h1>
                            <div className="px-8 items-center gap-1.5 flex justify-center">
                                <FacebookShareButton
                                    url={url}
                                    quote={title}
                                    hashtag={'#nextshare'}
                                    >
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>
                                <PinterestShareButton
                                    url={url}
                                    media={title}
                                    >
                                    <PinterestIcon size={32} round />
                                </PinterestShareButton>
                                <RedditShareButton
                                    url={url}
                                    title={title}
                                    >
                                    <RedditIcon size={32} round />
                                </RedditShareButton>
                                <FacebookMessengerShareButton
                                    url={url}
                                    appId={''}
                                    >
                                    <FacebookMessengerIcon size={32} round />
                                </FacebookMessengerShareButton>
                                <EmailShareButton
                                    url={url}
                                    subject={title}
                                    body="body"
                                    >
                                    <EmailIcon size={32} round />
                                </EmailShareButton>
                                <WhatsappShareButton
                                    url={url}
                                    title={title}
                                    separator=":: "
                                    >
                                    <WhatsappIcon size={32} round />
                                </WhatsappShareButton>
                                <TwitterShareButton
                                    url={url}
                                    title={title}
                                    >
                                    <TwitterIcon size={32} round />
                                    </TwitterShareButton>
                                <TelegramShareButton
                                    url={url}
                                    title={title}
                                    >
                                    <TelegramIcon size={32} round />
                                </TelegramShareButton>
                            </div>
                        </div>
                    </Popup>
                </div>
                {/* Content Section */}
                <p className="whitespace-pre-wrap p-3 pb-40 text-[15px] font-medium  bg-neutral-900">
                    {song?.content}
                </p>
            </div>

        </div>
    )
}