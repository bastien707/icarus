'use client';

import { signOut, signIn } from 'next-auth/react';
import { route } from '@/lib/constants/route';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

type ButtonType = 'login' | 'logout' | 'register';

interface NavButtonProps {
  type?: ButtonType;
  link?: string;
}

const defaultButtonClasses =
  'hover:bg-icarus-yellow font-semibold p-4 border-r-2 border-black last:border-r-0 first:border-l-2 hover:text-black';

export const NavButton = ({ type, children, link }: PropsWithChildren<NavButtonProps>) => {
  const path = usePathname();
  const isCurrentPage = path === link;

  const handleLogin = (type: string) => {
    if (type === 'login') {
      signIn();
    } else if (type === 'logout') {
      signOut({ callbackUrl: route.HOME });
    }
  };

  if (type === 'register') {
    return (
      <Link
        href={route.REGISTER}
        className={`bg-black text-icarus-white ${defaultButtonClasses} ${isCurrentPage ? 'bg-icarus-yellow' : ''}`}
      >
        Register
      </Link>
    );
  }

  if (!type) {
    return (
      <Link
        href={link ? link : route.HOME}
        className={`${defaultButtonClasses} 'text-icarus-white bg-icarus-purple' ${
          isCurrentPage ? 'bg-icarus-yellow' : ''
        }`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={`${defaultButtonClasses} ${isCurrentPage ? 'bg-icarus-yellow' : ''}`}
      onClick={() => handleLogin(type)}
    >
      {type === 'login' && 'Login'}
      {type === 'logout' && 'Sign out'}
    </button>
  );
};
