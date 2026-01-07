"use client";

import { Song } from "@/types/song";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import SearchBar from "./SearchBar";
import RecentSongCard from "./RecentSongCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface SongListClientProps {
  initialSongs: Song[];
  recentSongs: Song[];
}

export default function SongListClient({ initialSongs, recentSongs }: SongListClientProps) {
  const [query, setQuery] = useState("");
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: 'smooth'})
  }

  // Filtered songs based on query
  const filteredSongs = initialSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="max-w-5xl mx-auto">
      {/* Top search bar */}
      <div className="bg-teal-800 lg:p-10 md:p-5 sm:p-5 p-4">
        <div className="flex inset-x-0 justify-between">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="items-center mr-4"
            />
            <h1 className="font-medium text-2xl text-white">
              Chords Radar Nepal
            </h1>
          </div>
          <a href="https://play.google.com/store/apps/details?id=com.zyodes.chord_radar_nepal&hl=en" target="_blank" rel="noopener noreferrer">
            <Image
              src="/images/playstore.png"
              alt="Logo"
              width={150}
              height={0}
              className="items-center mr-4"
            />
          </a>
        </div>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {/* Recently Added Section */}
      <div className="p-4 bg-neutral-900">
        <h2 className="text-xl font-bold text-white mb-4">Recently Added</h2>
        
        <div className="relative group"> 
          {/* right left scrol buttons */}
          <div className="absolute inset-x-0 flex top-8 justify-between px-2 pointer-events-none">
            <button 
              className="pointer-events-auto p-1 bg-white/80 hover:bg-white text-black rounded-full shadow-lg transition" 
              onClick={scrollLeft} 
              type="button"
            >
              <FaChevronLeft size={15} />
            </button>
            
            <button 
              className="pointer-events-auto p-1 bg-white/80 hover:bg-white text-black rounded-full shadow-lg transition" 
              onClick={scrollRight} 
              type="button"
            >
              <FaChevronRight size={15} />
            </button>
          </div>

          {/* 3. The Scrollable List */}
          <div 
            ref={scrollRef} 
            className="flex space-x-4 overflow-x-hidden scroll-smooth pb-4 px-14"
          >
            {recentSongs.map((song) => (
              <RecentSongCard key={song.docId} song={song} />
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-neutral-700 mx-4" />

      {/* Songs list */}
      <div>
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song) => (
            <Link key={song.docId} href={`/song/${song.docId}`}>
              <div className="p-3 w-full bg-neutral-900 hover:bg-neutral-700 transition-colors duration-200 cursor-pointer">
                <h1 className="text-[16px] font-medium text-gray-100">{song.title}</h1>
                <p className="text-[14px] font-medium text-blue-400">{song.artist}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="p-4 w-full text-gray-400">No songs found.</p>
        )}
      </div>
    </main>
  );
}