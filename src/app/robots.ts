import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://chords-radar-nepal.vercel.app';

  return {
    rules: [
      {
        userAgent: 'Mediapartners-Google',
        allow: ['/app-ads.txt'],
      },
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}