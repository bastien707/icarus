'use client';

import Link from 'next/link';
import { route } from '@/lib/constants/route';
import { NavButton } from './ui/button/NavButton';
import { Session } from 'next-auth';

interface NavbarProps {
  session: Session | null;
  isHome?: boolean;
}

export const Navbar = ({ session, isHome }: NavbarProps) => {
  return (
    <div className={`flex h-fit items-center border-y-2 border-black justify-between`}>
      <Link className="font-bold p-4 border-black border-r-2" href={route.HOME}>
        Icarus
      </Link>
      <div>
        <p className="flex capitalize font-semibold">
          {session ? `Welcome, ${session.user?.name}` : 'Welcome on Icarus !'}
        </p>
      </div>
      <div className="flex">
        {isHome ? (
          session ? (
            <>
              <NavButton link={route.DASHBOARD}>Go to dashboard</NavButton>
              <NavButton type="logout" />
            </>
          ) : (
            <>
              <NavButton type="login" />
              <NavButton type="register" />
            </>
          )
        ) : (
          session && (
            <>
              <NavButton link={route.DASHBOARD}>Dashboard</NavButton>
              <NavButton link={route.TRANSACTIONS}>Transactions</NavButton>
              <NavButton link={route.TOKENS}>Tokens</NavButton>
            </>
          )
        )}
      </div>
    </div>
  );
};
