import { connection, getSupportedTokens } from "@/lib/constants";

import { NextRequest, NextResponse } from "next/server";
import { getAccount, getAssociatedTokenAddress } from "@solana/spl-token";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export async function GET(req: NextRequest) {
  console.log("GET /api/token");

  const { searchParams } = new URL(req.url);
  const address = searchParams.get("Address") as unknown as string;
  const supportedTokens = await getSupportedTokens();
  const balances = await Promise.all(
    supportedTokens.map((token) => getAccountBalance(token, address))
  );
  const tokens = supportedTokens.map((token, index) => ({
    ...token,
    balance: balances[index].toFixed(2),
    usdBalance: (balances[index] * Number(token.price)).toFixed(2),
  }));
  return NextResponse.json({
    tokens,
    totalBalance: tokens
      .reduce((acc, token) => {
        return acc + Number(token.usdBalance);
      }, 0)
      .toFixed(2),
  });
}

async function getAccountBalance(
  token: {
    name: string;
    mint: string;
    native: boolean;
    decimals: number;
  },
  address: string
) {
  if (token.native) {
    const balance = await connection.getBalance(new PublicKey(address));
    return balance / LAMPORTS_PER_SOL;
    //Solana uses lamports as the smallest unit (1 SOL = 1,000,000,000 lamports).
  }
  const ata = await getAssociatedTokenAddress(
    new PublicKey(token.mint),
    new PublicKey(address)
  );
  try {
    const account = await getAccount(connection, ata);
    return Number(account.amount) / 10 ** token.decimals;
  } catch (error) {
    return 0;
    //crash or user doent have an account
  }
}
