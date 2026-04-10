import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ApartmentsProvider } from "./context/ApartmentsContext";
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
  title: "Apartments Barcelona",
  description: "Encuentra tu apartamento ideal en Barcelona",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ background: "#ffffff" }}>
        <ApartmentsProvider>{children}</ApartmentsProvider>
      </body>
    </html>
  );
}
