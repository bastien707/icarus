import type { CustomSession } from '../types/Sessions';
import { url } from '@/lib/constants';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export async function fetchBalance(): Promise<number> {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    const res = await fetch(url.API_URL_BALANCE, {
      method: 'POST',
      body: JSON.stringify({ ethAddress: session?.ethAddress }),
    });

    if (!res.ok) {
      throw new Error('Failed to fetch balance');
    }

    const data = await res.json();
    return data.balance;
  } catch (error) {
    throw new Error("Couldn't fetch balance");
  }
}
