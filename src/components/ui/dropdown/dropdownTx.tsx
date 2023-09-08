'use client';

import { useContext } from 'react';
import { TransactionContext } from '@/app/(app)/transactions/Transaction';
import { BiChevronDown } from 'react-icons/bi';

interface DropdownTxProps {
  list: { name: string }[];
}

export function DropdownTx({ list }: DropdownTxProps) {
  const { isDropdownOpen, setIsDropdownOpen, selected, setSelected, setPage } = useContext(TransactionContext);

  const handleClick = (name: string) => {
    setSelected(name);
    setPage(1);
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsDropdownOpen(!isDropdownOpen)}
      onMouseLeave={() => setIsDropdownOpen(!isDropdownOpen)}
    >
      <div className="flex font-bold">
        <button className="w-32 transition-transform duration-300 hover:transform">
          <span>{selected}</span>
        </button>
        <span className="py-2 px-4">
          <BiChevronDown
            size={32}
            className={`transition-transform duration-300 ${!isDropdownOpen ? 'rotate-180' : ''}`}
          />
        </span>
      </div>

      {isDropdownOpen && (
        <div className="absolute flex flex-col bg-icarus-white">
          {list.map((item, index) => {
            return (
              <button
                key={index}
                className={`p-2 w-32 hover:bg-icarus-yellow border-2 border-black first:border-b-0 hover:font-bold duration-300`}
                onClick={() => handleClick(item.name)}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
