import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { ethAddress } = (await req.json()) as { ethAddress: string };
    const balance = await fetch(
      `https://api.etherscan.io/api?module=account&action=balance&address=${ethAddress}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`,
    );

    const data = await balance.json();

    return NextResponse.json({
      status: 'success',
      message: 'Balance fetched',
      balance: data.result,
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
