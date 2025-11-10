import SongListClient from "@/components/SongListClient";
import { db } from "@/lib/firebase";
import { Song } from "@/types/song";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

async function getSongs(): Promise<Song[]> {
  const querySnapshot = await getDocs(collection(db, "songs"));
  return querySnapshot.docs
    .map((doc) => {
      const data = doc.data();
      return {
        ...data,
        timeStamp: data.timeStamp.toMillis(),
      } as Song;
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

async function getRecentSongs(): Promise<Song[]> {
  const recentSongsQuery = query(collection(db, "songs"), orderBy("timeStamp", "desc"), limit(5));
  const querySnapshot = await getDocs(recentSongsQuery);
  return querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      timeStamp: data.timeStamp.toMillis(),
    } as Song;
  });
}

export default async function HomePage() {
  const songs = await getSongs();
  const recentSongs = await getRecentSongs();

  return <SongListClient initialSongs={songs} recentSongs={recentSongs} />;
}
