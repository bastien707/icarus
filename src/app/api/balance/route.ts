import { NextResponse } from 'next/server';
import { toEth } from '@/lib/utils';
import { generateBalanceApiUrl } from '@/lib/utils/api/balance';

export async function POST(req: Request) {
  try {
    const { ethAddress } = (await req.json()) as { ethAddress: string };
    const url = generateBalanceApiUrl(ethAddress);
    const balance = await fetch(url);
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
