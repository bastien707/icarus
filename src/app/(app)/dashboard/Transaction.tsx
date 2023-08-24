'use client';

import type { Transaction } from '@/app/types/Transaction';
import { CustomSession } from '@/app/types/Sessions';
import { fetchTransaction } from '@/app/services/transactionService';
import { useEffect, useState } from 'react';
import { isKnownWallet } from '@/lib/utils';
import { offset } from '@/lib/constants';

interface Props {
  session: CustomSession | null;
}

export function Transaction({ session }: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [lastpage, setLastPage] = useState(0);
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
        <button
          disabled={loader}
          className={`px-4 py-2 ${loader ? 'cursor-not-allowed' : ''}`}
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          -
        </button>
        <p>{page}</p>
        <button
          disabled={loader || transactions.length < offset.TRANSACTIONS}
          className={`px-4 py-2 ${loader || transactions.length < offset.TRANSACTIONS ? 'cursor-not-allowed' : ''}`}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          +
        </button>
      </div>

      <h2 className="text-2xl font-bold">Transactions</h2>
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
