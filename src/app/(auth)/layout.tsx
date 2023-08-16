import "../globals.css";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { route } from "@/lib/constants/route";
import {BiChevronLeft} from "react-icons/bi";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <header className="mt-4 ml-4">
          <Link href={route.HOME}><BiChevronLeft size={48}/></Link>
        </header>
        {children}
      </body>
    </html>
  );
}
