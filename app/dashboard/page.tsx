"use client";
import Profile from "@/components/Profile";
import { authconfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import db from "@/db";

async function getWallet() {

  const session = await getServerSession(authconfig);
  console.log(session);
  
  const userWallet = await db.solWallet.findFirst({
    where: { userId: session?.user.uid },
    select: {
      publicKey: true,
    },
  });
  if (!userWallet) {
    return {
      error: "No wallet found",
    };
  }
  return { error: null, userWallet };
}
const page = async () => {
  const wallet = await getWallet();
  if (wallet.error || !wallet.userWallet?.publicKey) {
    return <>No solana wallet found</>;
  }
  return (
    <div>
      <Profile publicKey={wallet.userWallet.publicKey}></Profile>
    </div>
  );
};

export default page;
