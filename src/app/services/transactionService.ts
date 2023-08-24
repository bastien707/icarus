import { CustomSession } from '../types/Sessions';

export function fetchTransaction(session: CustomSession | null) {
  return async () => {
    try {
      const res = await fetch(`${process.env.BASE_URL}api/transactions`, {
        method: 'POST',
        body: JSON.stringify({ ethAddress: session?.ethAddress }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return { transactions: [] };
    }
  };
}
