"use client";

import { Song } from "@/types/song";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";
import RecentSongCard from "./RecentSongCard";

interface SongListClientProps {
  initialSongs: Song[];
  recentSongs: Song[];
}

export default function SongListClient({ initialSongs, recentSongs }: SongListClientProps) {
  const [query, setQuery] = useState("");

  // Filtered songs based on query
  const filteredSongs = initialSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="max-w-5xl mx-auto">
      {/* Top search bar */}
      <div className="bg-teal-800 p-10">
        <div className="flex items-center mb-4">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="items-center mr-4"
          />
          <h1 className="font-medium text-2xl mb-5 text-white">
            Chords Radar Nepal
          </h1>
        </div>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {/* Recently Added Section */}
      <div className="p-4 bg-neutral-900">
        <h2 className="text-xl font-bold text-white mb-4">Recently Added</h2>
        <div className="flex space-x-4 overflow-x-hidden pb-4">
          {recentSongs.map((song) => (
            <RecentSongCard key={song.docId} song={song} />
          ))}
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