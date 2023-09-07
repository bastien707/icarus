import { NextResponse } from 'next/server';
import type { Transaction } from '@/app/types/Transaction';
import { createCustomTransaction, generateTransactionApiUrl } from '@/lib/utils/api/transactions';

type RequestBody = {
  ethAddress: string;
  page: number;
  selected: string;
};

export async function POST(req: Request) {
  try {
    const { ethAddress, page, selected }: RequestBody = await req.json();
    const url = generateTransactionApiUrl(ethAddress, page, selected);
    const transactions = await fetch(url);
    const data = await transactions.json();

    const customTransaction: Transaction[] = createCustomTransaction(data);
    return NextResponse.json({
      status: 'success',
      message: 'Transactions fetched',
      transactions: customTransaction,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: 'Something went wrong while fetching transactions',
      }),
      { status: 500 },
    );
  }
}
