import BigTitle from '@/components/ui/title/BigTitle';
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
        <div className="sm:grid sm:grid-cols-2 text-center">
          <BigTitle>Dashboard</BigTitle>
          <p className="font-bold">Balance: {balance.toPrecision(4)} ETH</p>
        </div>
        <div className="grid sm:grid-cols-2">
          <div>
            <p>TODO</p>
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
