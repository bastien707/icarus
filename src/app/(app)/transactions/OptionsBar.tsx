'use client';

import MidTitle from '@/components/ui/title/midTitle';
import { DropdownTx } from './../../../components/ui/dropdown/dropdownTx';
import { Pagination } from './Pagination';
import list from '@/components/ui/dropdown/dropdownOptions.json';

export function OptionBar() {
  return (
    <div className="flex sm:flex-row flex-col items-center gap-2">
      <MidTitle>Your last transactions</MidTitle>
      <Pagination />
      <DropdownTx list={list} />
    </div>
  );
}
