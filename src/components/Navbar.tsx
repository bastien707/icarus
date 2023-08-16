import Link from 'next/link';

export const Navbar = () => {
  return (
    <div className="flex flex-wrap h-8 gap-16 m-2 items-center">
      <Link className="text-xl font-bold" href="/">
        Icarus
      </Link>
      <Link href="/dashboard/transactions">transactions</Link>
      <Link href="/dashboard/tokens">token tx</Link>
    </div>
  );
};
