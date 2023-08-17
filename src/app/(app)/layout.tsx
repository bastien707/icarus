import "../globals.css";
import { Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Icarus',
  description: 'Icarus rise finance',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <Providers>
          <Navbar session={session}/>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
