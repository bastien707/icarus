import BigTitle from '@/components/ui/title/bigTitle';
import { CustomSession, authOptions } from '@/app/api/auth/[...nextauth]/route';
import { toEth } from '@/lib/utils';
import { getServerSession } from 'next-auth';

export default async function Dashboard() {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);

    const getBalance = async () => {
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

    const balanceData = await getBalance();
    const balance = balanceData.balance;

    return (
      <main>
        <BigTitle title="Dashboard" />
        <p>Balance: {toEth(balance)} ETH</p>
      </main>
    );
  } catch (error) {
    console.error('Error getting session:', error);
    return <div>Error: Unable to fetch session data</div>;
  }
}
