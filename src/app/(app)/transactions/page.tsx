import { Transaction } from './Transaction';
import BigTitle from '@/components/ui/title/BigTitle';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { fetchBalance } from '@/app/services/balanceService';
import type { CustomSession } from '@/app/types/Sessions';

export default async function Transactions() {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    const balance = await fetchBalance();

    return (
      <main>
        <div className="text-center">
          <BigTitle>Transactions</BigTitle>
          <p className="font-bold border-b-2 border-black">Balance: {balance.toPrecision(4)} ETH</p>
        </div>
        <div>
          <div>
            <Transaction session={session} />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.log(error);
    if (error instanceof Error) return <p>{error.message}</p>;
    return <p>Something went wrong</p>;
  }
}
