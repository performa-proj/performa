import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Performa",
  description: "MIS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full bg-white  lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
      <body
        className={`${inter.className} antialiased h-full w-full`}
      >
        {children}
      </body>
    </html>
  );
}
