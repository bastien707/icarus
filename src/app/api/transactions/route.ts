import { timeStampToDateTime, toEth } from '@/lib/utils';
import { NextResponse } from 'next/server';
import type { Transaction } from '@/app/types/Transaction';
import { regex } from '@/lib/constants';

export async function POST(req: Request) {
  try {
    const { ethAddress } = (await req.json()) as { ethAddress: string };
    const transactions = await fetch(
      `${process.env.ETHERSCAN_BASE_URL}?module=account&action=txlist&address=${ethAddress}&startblock=0&endblock=99999999&page=1&offset=50&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}}`,
    );

    const data = await transactions.json();

    const customTransaction: Transaction[] = data.result.map((transaction: Transaction) => {
      const totalGasCostEther = toEth(transaction.gasUsed * parseInt(transaction.gasPrice, 10));

      let functionName: RegExpExecArray | null = null;
      if (typeof transaction.functionName === 'string') {
        functionName = regex.FIRSTWORD.exec(transaction.functionName);
      }
      const dateTime = timeStampToDateTime(transaction.timeStamp);

      const tx: Transaction = {
        hash: transaction.hash,
        value: toEth(transaction.value),
        timeStamp: transaction.timeStamp,
        from: transaction.from,
        to: transaction.to,
        functionName,
        gasUsed: transaction.gasUsed,
        gasPrice: transaction.gasPrice,
        totalGasCostEther,
        dateTime,
      };

      return tx;
    });

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
      { status: 400 },
    );
  }
}
