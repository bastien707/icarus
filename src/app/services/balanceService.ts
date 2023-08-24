import type { CustomSession } from '../types/Sessions';
import { url } from '@/lib/constants';

export async function fetchBalance(session: CustomSession | null): Promise<number> {
  try {
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
