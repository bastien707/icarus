"use client";

import { useSession } from "next-auth/react";

export const User = () => {
  const { data: session } = useSession();
  return (
    <div>
      <h1>User</h1>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
};
