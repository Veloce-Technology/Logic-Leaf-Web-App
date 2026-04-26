import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Logic Leaf — Modern 3D Digital Experience",
  description:
    "Logic Leaf is a cutting-edge digital studio crafting immersive 3D web experiences, creative technology, and next-generation interfaces.",
  keywords: ["3D web", "digital agency", "three.js", "GSAP", "modern website"],
  openGraph: {
    title: "Logic Leaf",
    description: "Building the Future, One Pixel at a Time",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
