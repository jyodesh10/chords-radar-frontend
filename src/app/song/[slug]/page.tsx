
import SongDetailComponent from "@/components/song_detail_component";
import { db } from "@/lib/firebase";
import { Song } from "@/types/song";
import { doc, getDoc } from "firebase/firestore";

interface SongPageProps {
  params: {
    slug: string;
  };
}

export default async function SongDetailPage( {params} : SongPageProps ) {
  const docRef = doc(db, "songs", params.slug);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return <div className="p-6 text-gray-400">Song not found.</div>;
  }

  const song = docSnap.data() as Song;

  return (
    <div className="max-w-3xl mx-auto bg-neutral-900">
      {/* <SongDetailComponent song={song} /> */}
    </div>
  );
}