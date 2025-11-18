
import SongDetailComponent from "@/components/SongDetailComponent";
import { db } from "@/lib/firebase";
import { Song } from "@/types/song";
import { doc, getDoc } from "firebase/firestore";

interface SongPageProps {
  params: Promise<{
    slug: string;
  }>;
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
    <div className="max-w-3xl mx-auto bg-neutral-900">
      <SongDetailComponent song={song} />
    </div>
  );
}