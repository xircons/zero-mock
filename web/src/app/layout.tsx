import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./_components/layout/Navbar";

export const metadata: Metadata = {
  title: "Zero-Mock",
  description: "Zero-config CLI tool for dynamic REST APIs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased overflow-x-hidden">
      <body className="min-h-full flex flex-col relative selection:bg-accent selection:text-text-primary rounded-none overflow-x-hidden w-[100vw] max-w-[100vw]">
        <Navbar />
        <main className="flex-1 w-full mx-auto relative z-10 flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
