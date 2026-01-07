
import SongDetailComponent from "@/components/SongDetailComponent";
import { db } from "@/lib/firebase";
import { Song } from "@/types/song";
import { doc, getDoc } from "firebase/firestore";
import { Metadata } from "next";

interface SongPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: SongPageProps): Promise<Metadata> {
  const { slug } = await params;
  const docRef = doc(db, "songs", slug);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return { title: "Song Not Found" };
  }

  const song = docSnap.data();
  
  return {
    title: `${song.title} - ${song.artist}`, // Sets the tab title to "Song Name - Artist"
    description: `Chords For ${song.title} by ${song.artist}`,
    // Optional: Add OpenGraph for nice social media sharing cards
    // openGraph: {
    //   images: [song.coverImageUrl],
    // },
  };
}

export default async function SongDetailPage( {params} : SongPageProps ) {
  const {slug} = await params;
  const docRef = doc(db, "songs", slug);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return <div className="p-6 text-gray-400">Song not found.</div>;
  }

  const raw = docSnap.data();

  const song = {
    ...raw,
    timeStamp: raw.timeStamp.toMillis(),
  } as Song; 
  

  return (
    <SongDetailComponent song={song} />
    // <div className="max-w-3xl mx-auto bg-neutral-900">
    // </div>
  );
}