'use client';

import MidTitle from '@/components/ui/title/MidTitle';
import { DropdownTx } from '../../../components/ui/dropdown/DropdownTx';
import { Pagination } from './Pagination';
import { Search } from './Search';
import list from '@/components/ui/dropdown/dropdownOptions.json';

export function OptionBar() {
  return (
    <div className="flex lg:flex-row flex-col lg:h-24 items-center gap-3 border-b-2 border-black">
      <div className="flex items-center w-full justify-between">
        <MidTitle>Your last transactions</MidTitle>
        <Pagination />
      </div>
      <div className="flex items-center">
        <Search />
        <DropdownTx list={list} />
      </div>
    </div>
  );
}
