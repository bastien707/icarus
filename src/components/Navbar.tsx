import Link from "next/link";
import { LogoutButton } from "./ui/button/LogoutButton";
import { RegisterButton } from "./ui/button/RegisterButton";
import { LoginButton } from "./ui/button/LoginButton";
import { route } from "@/lib/constants/route";

interface NavbarProps {
  session?: any;
  home?: boolean;
}

export const Navbar = ({ session, home }: NavbarProps) => {
  return (
    <div
      className={`flex h-8 gap-16 m-2 items-center ${
        home && "justify-between"
      }`}
    >
      <Link className="text-xl font-bold" href={route.HOME}>
        Icarus
      </Link>
      {home ? (
        <div className="flex gap-10">
          {session ? (
            <>
              <Link href={route.DASHBOARD}>My dashboard</Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <RegisterButton />
              <LoginButton />
            </>
          )}
        </div>
      ) : (
        <div className="flex gap-10">
          {session && (
            <>
              <Link href={route.DASHBOARD}>overview</Link>
              <Link href={route.TRANSACTIONS}>transactions</Link>
              <Link href={route.TOKENS}>tokens</Link>
              <LogoutButton />
            </>
          )}
        </div>
      )}
    </div>
  );
};