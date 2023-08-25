'use client';

import { offset } from '@/lib/constants';
import { BiChevronLeft, BiChevronRight, BiChevronLeftSquare } from 'react-icons/bi';

interface PaginationProps {
  loader: boolean;
  page: number;
  setPage: (page: number) => void;
  txLength: number;
}

export function Pagination({ loader, page, setPage, txLength }: PaginationProps) {
  return (
    <div className="flex items-center">
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
