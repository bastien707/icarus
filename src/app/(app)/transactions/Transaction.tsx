'use client';

import type { Transaction } from '@/app/types/Transaction';
import { CustomSession } from '@/app/types/Sessions';
import { fetchTransaction } from '@/app/services/transactionService';
import { useEffect, useState, createContext } from 'react';
import { isKnownWallet } from '@/lib/utils';
import { OptionBar } from './OptionsBar';

interface Props {
  session: CustomSession | null;
}

type TransactionContextType = {
  setPage: (page: number) => void;
  page: number;
  loader: boolean;
  transactions: Transaction[];
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isDropdownOpen: boolean) => void;
  selected: string;
  setSelected: (selected: string) => void;
};

export const TransactionContext = createContext<TransactionContextType>({
  setPage: () => {},
  page: 1,
  loader: false,
  transactions: [],
  isDropdownOpen: false,
  setIsDropdownOpen: () => {},
  selected: 'Normal',
  setSelected: () => {},
});

export function Transaction({ session }: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selected, setSelected] = useState('Normal');
  const ethAddress = session?.ethAddress;

  useEffect(() => {
    async function fetchTransactions() {
      setLoader(true);
      try {
        if (session) {
          const fetchedTransactions = await fetchTransaction(session, page, selected);
          setTransactions(fetchedTransactions);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoader(false);
      }
    }

    fetchTransactions();
  }, [session, page, selected]);

  return (
    <TransactionContext.Provider
      value={{ setPage, page, loader, transactions, isDropdownOpen, setIsDropdownOpen, selected, setSelected }}
    >
      <OptionBar />
      <ul>
        {transactions.map((transaction: Transaction) => {
          return (
            <li className="border-b-2 border-black" key={transaction.hash}>
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
    </TransactionContext.Provider>
  );
}
