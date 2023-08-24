import type { CustomSession } from '../types/Sessions';

export function fetchBalance(session: CustomSession | null) {
  return async () => {
    try {
      const res = await fetch(`${process.env.BASE_URL}api/balance`, {
        method: 'POST',
        body: JSON.stringify({ ethAddress: session?.ethAddress }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch balance');
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching balance:', error);
      return { balance: 0 };
    }
  };
}
