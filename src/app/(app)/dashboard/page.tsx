import { Transaction } from './Transaction';
import BigTitle from '@/components/ui/title/bigTitle';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { fetchBalance } from '@/app/services/balanceService';
import type { CustomSession } from '@/app/types/Sessions';

export default async function Dashboard() {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    const balance = await fetchBalance(session);

    return (
      <main>
        <BigTitle title="Dashboard" />
        <p>Balance: {balance} ETH</p>
        <Transaction session={session} />
      </main>
    );
  } catch (error) {
    console.log(error);
    if (error instanceof Error) return <p>{error.message}</p>;
    return <p>Something went wrong</p>;
  }
}
