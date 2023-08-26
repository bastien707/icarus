'use client';

import { Pagination } from './Pagination';
import type { Transaction } from '@/app/types/Transaction';
import { CustomSession } from '@/app/types/Sessions';
import { fetchTransaction } from '@/app/services/transactionService';
import { useEffect, useState } from 'react';
import { isKnownWallet } from '@/lib/utils';
import MidTitle from '@/components/ui/title/midTitle';

interface Props {
  session: CustomSession | null;
}

export function Transaction({ session }: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const ethAddress = session?.ethAddress;

  useEffect(() => {
    setLoader(true);
    if (session) {
      fetchTransaction(session, page)
        .then(transactions => {
          setTransactions(transactions);
          setLoader(false);
        })
        .catch(error => {
          console.error('Error fetching transactions:', error);
          setLoader(false);
        });
    }
  }, [session, page]);

  return (
    <>
      <div className="flex items-center">
        <MidTitle title="Your last transactions" />
        <Pagination loader={loader} page={page} setPage={setPage} txLength={transactions.length} />
      </div>
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
    </>
  );
}
