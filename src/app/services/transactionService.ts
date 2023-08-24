import { CustomSession } from '../types/Sessions';
import { Transaction } from '../types/Transaction';
import { url } from '@/lib/constants';

export async function fetchTransaction(session: CustomSession | null, page = 1): Promise<Transaction[]> {
  try {
    const res = await fetch(url.API_URL_TRANSACTIONS, {
      method: 'POST',
      body: JSON.stringify({ ethAddress: session?.ethAddress, page: page }),
    });

    if (!res.ok) {
      throw new Error('Failed to fetch transactions');
    }

    const data = await res.json();

    return data.transactions;
  } catch (error) {
    throw new Error("Couldn't fetch transactions");
  }
}
