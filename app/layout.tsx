import type {Metadata} from "next";
import {Geist, Geist_Mono, Indie_Flower} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const indieFlowerSans = Indie_Flower({
  variable: "--font-indie-flower-sans",
  weight: "400"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Da li si ti Taša?",
  description: "Ovo je pravi test da se vidi da li si ti zapravo Taša",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${indieFlowerSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
