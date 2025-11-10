import { Song } from "@/types/song";
import Link from "next/link";

interface RecentSongCardProps {
  song: Song;
}

export default function RecentSongCard({ song }: RecentSongCardProps) {
  return (
    <Link href={`/song/${song.docId}`} className="block">
      <div className="bg-neutral-800 hover:bg-neutral-700 transition-colors duration-200 p-4 rounded-lg w-48 flex-shrink-0">
        <h3 className="text-md font-semibold text-white truncate">{song.title}</h3>
        <p className="text-sm text-blue-400 truncate">{song.artist}</p>
      </div>
    </Link>
  );
}