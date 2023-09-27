import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import { isValidEthAddress } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const { email, password, name, ethAddress } = (await req.json()) as {
      email: string;
      password: string;
      name: string;
      ethAddress: string;
    };
    const hashed_password = await hash(password, 12);
    const lowerCaseEthAddress = ethAddress.toLowerCase();

    if (!isValidEthAddress(lowerCaseEthAddress)) {
      return new NextResponse(
        JSON.stringify({
          status: 'error',
          message: 'Invalid ETH address',
        }),
        { status: 400 },
      );
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed_password,
        name,
        ethAddress: lowerCaseEthAddress,
      },
    });

    return NextResponse.json({
      status: 'success',
      message: 'User created',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        ethAddress: user.ethAddress,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message,
      }),
      { status: 500 },
    );
  }
}
