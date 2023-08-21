'use client';

import '../globals.css';
import { Space_Grotesk } from 'next/font/google';
import Link from 'next/link';
import { route } from '@/lib/constants/route';
import { BiChevronLeft } from 'react-icons/bi';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <div
          className="w-full h-full fixed top-0 left-0 bg-no-repeat bg-cover -z-50"
          style={{ backgroundImage: `url(${route.LOGINBACKGROUND})` }}
        ></div>
        <header className="mt-4 ml-4 w-fit">
          <Link href={route.HOME}>
            <BiChevronLeft size={48} />
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
