import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RU Ready",
  description: "RU Ready is a platform that helps Rutgers students connect with each other for various activities and events. Whether you're looking to play sports, study in a group, or attend a hackathon, RU Ready makes it easy to find and join like-minded individuals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
