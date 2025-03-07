import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Coroatá Conecta",
  description: "Site que conecta todos os estabelecimentos da cidade em um só lugar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey="pk_live_Y2xlcmsuY29yb2F0YWNvbmVjdGEuY29tLmJyJA">
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} bg-[#f1f1f1] antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
