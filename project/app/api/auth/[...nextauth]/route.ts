import NextAuth from "next-auth/next";
import { Keypair } from "@solana/web3.js";
import GoogleProvider from "next-auth/providers/google";

import db from "@/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        const email = user.email;
        if (!email) {
          return false;
        }
        const userDb = await db.user.findFirst({
          where: {
            username: email,
          },
        });
        if (userDb) {
          return true;
        }
        const keys = Keypair.generate();
        await db.user.create({
          data: {
            username: email,
            name: profile?.name,
            //@ts-ignore
            profilePic: profile?.picture,
            provider: "Google",
            SolWallet: {
              create: {
                publicKey: keys.publicKey.toBase58(),
                privateKey: keys.secretKey.toString(),
              },
            },
            INRWallet: {
              create: {
                balance: 0,
              },
            },
          },
        });
        return true;
      }
      return false;
    },
  },
});

export { handler as GET, handler as POST };
