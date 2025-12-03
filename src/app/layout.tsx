import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Chords Radar Nepal",
    template: "%s | Chords Radar Nepal",
  },
  keywords: ["nepali chords", "nepali guitar chords", "chords radar nepal", "nepali songs", "nepali"  ],
  description: "Chords Radar Nepal: Nepali Chords is a user-friendly Nepali chords website that aims to simplify the process of learning and playing your favorite Nepali songs on the guitar. Whether you're a beginner or an experienced guitarist, Chords Radar provides a comprehensive set of features to enhance your musical journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
