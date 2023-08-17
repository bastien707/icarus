'use client';

import { signOut, signIn } from 'next-auth/react';
import { route } from '@/lib/constants/route';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type ButtonType = 'login' | 'logout' | 'register';

interface NavButtonProps {
  type?: ButtonType;
  text?: string;
  link?: string;
}

const defaultButtonClasses =
  'hover:bg-icarus-yellow font-semibold p-4 border-r-2 border-black last:border-r-0 first:border-l-2 hover:text-black';

export const NavButton = ({ type, text = 'Home', link }: NavButtonProps) => {
  const path = usePathname();
  const buttonClasses = defaultButtonClasses;
  const isCurrentPage = path === link;

  if (type === 'register') {
    return (
      <Link
        href={route.REGISTER}
        className={`bg-black text-icarus-white ${buttonClasses} ${isCurrentPage ? 'bg-icarus-yellow' : ''}`}
      >
        Register
      </Link>
    );
  }

  if (!type) {
    return (
      <Link
        href={link ? link : route.HOME}
        className={`${buttonClasses} 'text-icarus-white bg-icarus-purple' ${isCurrentPage ? 'bg-icarus-yellow' : ''}`}
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      className={`${buttonClasses} ${isCurrentPage ? 'bg-icarus-yellow' : ''}`}
      onClick={() => {
        if (type === 'login') {
          signIn();
        } else if (type === 'logout') {
          signOut({ callbackUrl: route.HOME });
        }
      }}
    >
      {type === 'login' && 'Login'}
      {type === 'logout' && 'Sign out'}
    </button>
  );
};
