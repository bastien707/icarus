import '../globals.css';
import { Space_Grotesk } from 'next/font/google';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Navbar } from '@/components/Navbar';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Icarus',
  description: 'Icarus rise finance',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <Navbar session={session} isHome />
        {children}
      </body>
    </html>
  );
}
