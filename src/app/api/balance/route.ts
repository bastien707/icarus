import { NextResponse } from 'next/server';
import { toEth } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const { ethAddress } = (await req.json()) as { ethAddress: string };
    const balance = await fetch(
      `${process.env.ETHERSCAN_BASE_URL}?module=account&action=balance&address=${ethAddress}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`,
    );

    const data = await balance.json();

    return NextResponse.json({
      status: 'success',
      message: 'Balance fetched',
      balance: toEth(data.result),
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: 'Something went wrong while fetching balance',
      }),
      { status: 400 },
    );
  }
}
