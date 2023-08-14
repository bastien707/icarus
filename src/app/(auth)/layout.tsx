import "../globals.css";
import { Space_Grotesk } from "@next/font/google";
import type { Metadata } from "next";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Icarus",
  description: "Icarus rise finance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <h1>Icarus</h1>
        <h2>Icarus rise finance</h2>
        {children}
      </body>
    </html>
  );
}
