'use client';

import { DropdownTx } from './../../../components/ui/dropdown/dropdownTx';
import { offset } from '@/lib/constants';
import { useContext } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { TransactionContext } from './Transaction';
import list from '@/components/ui/dropdown/dropdownOptions.json';

export function Pagination() {
  const { page, loader, setPage, transactions } = useContext(TransactionContext);

  const txLength = transactions.length;

  return (
    <div className="flex items-center gap-2">
      <button
        disabled={loader}
        className={`px-4 py-2 ${loader || page <= 1 ? 'cursor-not-allowed text-zinc-400' : ''}`}
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
      >
        <BiChevronLeft size={32} />
      </button>
      <p className="font-bold">{page}</p>
      <button
        disabled={loader || txLength < offset.TRANSACTIONS}
        className={`px-4 py-2 ${loader || txLength < offset.TRANSACTIONS ? 'cursor-not-allowed text-zinc-400' : ''}`}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        <BiChevronRight size={32} />
      </button>
    </div>
  );
}
