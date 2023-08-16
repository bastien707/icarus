"use client";

import { signOut } from "next-auth/react";
import { route } from "@/lib/constants/route";

export const LogoutButton = () => {
  return <button onClick={() => signOut({callbackUrl: route.HOME})}>Sign out</button>;
};
