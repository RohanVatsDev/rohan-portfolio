import type { Metadata } from "next";
import { Space_Mono, Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rohan Vats | Software Developer",
  description: "Software Developer | AI & Full-Stack Innovator",
  keywords: ["Software Developer", "Full Stack", "AI", "Python", "Java", "Django"],
  creator: "Rohan Vats",
  icons: {
    icon: "/rohan.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rohanvats.codifyu.com",
    title: "Rohan Vats | Software Developer",
    description: "Software Developer | AI & Full-Stack Innovator",
    siteName: "Rohan Vats Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohan Vats | Software Developer",
    description: "Software Developer | AI & Full-Stack Innovator",
    creator: "@rohanvats",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/rohan.png" />
      </head>
      <body>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
