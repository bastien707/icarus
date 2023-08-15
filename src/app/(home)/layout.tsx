import "../globals.css";
import { Space_Grotesk } from "@next/font/google";
import type { Metadata } from "next";
import Link from "next/link";
import { RegisterButton } from "@/components/ui/button/RegisterButton";
import { LogoutButton } from "@/components/ui/button/LogoutButton";
import { LoginButton } from "@/components/ui/button/LoginButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Icarus",
  description: "Icarus rise finance",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <header
          className="flex justify-between items-center"
          style={{ padding: "0 1rem" }}
        >
          <Link href="/">Icarus</Link>
          <nav>
            <ul className="flex space-x-4">
              <li>
                {session ? <LogoutButton /> : <LoginButton />}
                <RegisterButton />
              </li>
            </ul>
          </nav>
        </header>
        <h2>Icarus rise finance</h2>
        <pre>{JSON.stringify(session)}</pre>
        {children}
      </body>
    </html>
  );
}
