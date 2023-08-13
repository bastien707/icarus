"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main>
      <h1 className="text-2xl">Home</h1>
      <ConnectButton />
      {!isMounted && <p>Loading...</p>}
      {isMounted && isConnected && <p>Connected with address: {address}</p>}
    </main>
  );
}
