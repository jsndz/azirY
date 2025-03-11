import { authconfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "@/db/index";
import { Connection, Keypair, VersionedTransaction } from "@solana/web3.js";
import { Solway } from "next/font/google";
export async function POST(req: NextRequest) {
  const data: {
    quoteResponse: any;
  } = await req.json();

  const session = await getServerSession(authconfig);
  const connection = new Connection("https://api.mainnet-beta.solana.com");
  if (!session?.user) {
    return NextResponse.json(
      {
        message: "Please Log iN",
      },
      { status: 401 }
    );
  }

  const solWallet = await db.solWallet.findFirst({
    where: {
      userId: session.user.uid,
    },
  });
  if (!solWallet) {
    return NextResponse.json(
      {
        message: "No solwallet found",
      },
      { status: 401 }
    );
  }
  const { swapTransaction } = await (
    await fetch("https://quote-api.jup.ag/v6/swap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // quoteResponse from /quote api
        quoteResponse: data.quoteResponse,
        // user public key to be used for the swap
        userPublicKey: solWallet.publicKey,
        // auto wrap and unwrap SOL. default is true
        wrapAndUnwrapSol: true,
        // Optional, use if you want to charge a fee.  feeBps must have been passed in /quote API.
        // feeAccount: "fee_account_public_key"
      }),
    })
  ).json();
  const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
  const uint8Array: Uint8Array = new Uint8Array(swapTransactionBuf);
  var transaction = VersionedTransaction.deserialize(uint8Array);
  const privateKey = await getPrivateKeyFromDB(solWallet.privateKey);
  // sign the transaction
  transaction.sign([privateKey]);

  // get the latest block hash
  const latestBlockHash = await connection.getLatestBlockhash();

  // Execute the transaction
  const rawTransaction = transaction.serialize();
  const txid = await connection.sendRawTransaction(rawTransaction, {
    skipPreflight: true,
    maxRetries: 2,
  });
  await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: txid,
  });
  console.log(`https://solscan.io/tx/${txid}`);
}

const getPrivateKeyFromDB = async (privateKey: string) => {
  const arr = privateKey.split(",").map((x) => Number(x));
  // the private key from db will be string : 1,2,3
  const uint8Array = new Uint8Array(arr);
  //convert into uint8array [1,2,3]
  const keypair = Keypair.fromSecretKey(uint8Array);
  return keypair;
};
