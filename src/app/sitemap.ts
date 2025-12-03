
import { db } from '@/lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { MetadataRoute } from 'next';
 
// Fetch all song slugs from Firestore
async function getAllSongs() {
  const songsCollection = collection(db, 'songs');
  const q = query(songsCollection);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    slug: doc.id,
    lastModified: doc.data().timeStamp.toDate(), // Assuming you have a timestamp
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://chords-radar-nepal.vercel.app'; // IMPORTANT: Change this to your actual domain

  const songs = await getAllSongs();
  const songUrls = songs.map((song) => ({
    url: `${baseUrl}/song/${song.slug}`,
    lastModified: song.lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.9, // Songs are high priority
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...songUrls,
  ];
}