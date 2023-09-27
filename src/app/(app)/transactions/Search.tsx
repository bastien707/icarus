'use client';

import Input from '@/components/ui/form/Input';
import { ChangeEvent, useContext, useState } from 'react';
import MainButton from '@/components/ui/button/MainButton';
import { TransactionContext } from './Transaction';
import { isValidEthAddress } from '@/lib/utils';

export function Search() {
  const { search, setSearch, setResearch, setPage } = useContext(TransactionContext);
  const [invalidInput, setInvalidInput] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value === '') {
      setResearch('');
      setPage(1);
    }
  };

  const handleClick = () => {
    if (isValidEthAddress(search)) {
      setResearch(search);
      setInvalidInput(false);
    } else {
      setInvalidInput(true);
      setSearch('');
    }
  };

  return (
    <div className="flex items-center gap-2 m-2">
      <Input
        className="sm:w-80"
        type="text"
        name="search"
        value={search}
        placeholder="Token address"
        onChange={handleChange}
      />
      <MainButton onClick={handleClick} className="sm:p-[6px] sm:px-5 p-2 border-2 border-black">
        Search
      </MainButton>
      {invalidInput && <p className="text-red-500 text-sm py-2">Invalid Address</p>}
    </div>
  );
}
