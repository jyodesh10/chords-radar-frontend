"use client";

import SearchBar from "@/components/SearchBar";
import { db } from "@/lib/firebase";
import { Song } from "@/types/song";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function HomePage() {
    const [loading, setLoading] = useState(false);
    const [songs, setSongs] = useState<Song[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
      fetchSongs();
    }, []);

    const fetchSongs = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "songs"));
      setSongs(querySnapshot.docs.map((doc) => doc.data() as Song).sort((a, b) => a.title.localeCompare(b.title)));
      setLoading(false);
    };

    // Filtered songs based on query
    const filteredSongs = songs.filter(
      (song) =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
    );

    return (
      <main className="max-w-3xl mx-auto">
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

        {/* Songs list */}
        <div>
          {loading ? (
            <p className="p-4 text-gray-400">Loading...</p>
          ) : filteredSongs.length > 0 ? (
            filteredSongs.map((song) => (
              <Link key={song.docId} href={`/song/${song.docId}`}>
                <div
                  className="p-3 w-full bg-neutral-900 hover:bg-neutral-700 transition-colors duration-200 cursor-pointer"
                >
                  <h1 className="text-[16px] font-medium text-gray-100">
                    {song.title}
                  </h1>
                  <p className="text-[14px] font-medium text-blue-400">
                    {song.artist}
                  </p>
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
