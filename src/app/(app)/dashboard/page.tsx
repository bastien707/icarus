import BigTitle from '@/components/ui/title/bigTitle';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { isKnownWallet, toEth } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { fetchBalance } from '@/app/services/balanceService';
import { fetchTransaction } from '@/app/services/transactionService';
import type { CustomSession } from '@/app/types/Sessions';
import type { Transaction } from '@/app/types/Transaction';

export default async function Dashboard() {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    const ethAddress: string | undefined = session?.ethAddress;
    const getBalance = fetchBalance(session);
    const getTransactions = fetchTransaction(session);
    const balanceData = await getBalance();
    const transactionsData = await getTransactions();
    const balance = balanceData.balance;
    const transactions = transactionsData.transactions;

    return (
      <main>
        <BigTitle title="Dashboard" />
        <p>Balance: {toEth(balance)} ETH</p>
        <p>Transactions:</p>
        <ul>
          {transactions.map((transaction: Transaction) => {
            return (
              <li className="border-b-2 border-black first:border-t-2" key={transaction.hash}>
                <a
                  className="font-medium hover:underline underline-offset-4 duration-300"
                  href={`https://etherscan.io/tx/${transaction.hash}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Value: {transaction.value} ETH
                </a>
                <p>
                  Gas paid: {transaction.totalGasCostEther} ETH the {transaction.dateTime}{' '}
                </p>
                {transaction.functionName && (
                  <p className="capitalize">
                    Method: {transaction.functionName ? transaction.functionName[1] : 'Unknown'}{' '}
                  </p>
                )}
                <p>From: {isKnownWallet(transaction.from)}</p>
                <p>To: {isKnownWallet(transaction.to)}</p>
                <p className={transaction.to === ethAddress ? 'text-green-600' : 'text-icarus-purple'}>
                  {transaction.to === ethAddress ? 'Received' : 'Sent'}
                </p>
              </li>
            );
          })}
        </ul>
      </main>
    );
  } catch (error) {
    console.error('Error getting session:', error);
    return <div>Error: Unable to fetch session data</div>;
  }
}
