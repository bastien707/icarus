'use client';

import Link from 'next/link';
import { route } from '@/lib/constants/route';
import { NavButton } from './ui/button/NavButton';

interface NavbarProps {
  session?: any;
  home?: boolean;
}

export const Navbar = ({ session, home }: NavbarProps) => {
  return (
    <div className={` flex h-fit items-center border-y-2 border-black justify-between`}>
      <Link className="font-bold p-4 border-black sm:border-r-2" href={route.HOME}>
        Icarus
      </Link>
      <div>
        <p className="flex capitalize font-semibold">
          {session ? `Welcome, ${session.user.name}` : 'Welcome on Icarus !'}
        </p>
      </div>
      {home ? (
        <div className="flex">
          {session ? (
            <>
              <NavButton link={route.DASHBOARD}>Go to dashboard</NavButton>
              <NavButton type="logout" />
            </>
          ) : (
            <>
              <NavButton type="login" />
              <NavButton type="register" />
            </>
          )}
        </div>
      ) : (
        <div className="flex">
          {session && (
            <>
              <NavButton link={route.DASHBOARD}>Dashboard</NavButton>
              <NavButton link={route.TRANSACTIONS}>Transactions</NavButton>
              <NavButton link={route.TOKENS}>Tokens</NavButton>
            </>
          )}
        </div>
      )}
    </div>
  );
};
