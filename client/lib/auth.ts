import { Keypair } from "@solana/web3.js";
import GoogleProvider from "next-auth/providers/google";

import db from "@/db";
import { Session } from "next-auth";

export interface session extends Session {
  user: {
    uid: string;
    name: string;
    image: string;
    email: string;
  };
}

export const authconfig = {
  secret: process.env.NEXTAUTH_SECRET || 'secr3t',

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID??"",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET??""
    }),
  ],
  callbacks: {
    session: ({ session, token }: any): session => {
      const newSession: session = session as session;
      if (newSession.user && token.id) {
        //@ts-ignore
        newSession.user.uid = token.uid ?? "";
      }
      return newSession;
    },
    async jwt({ token, account, profile }: any) {
      const user = await db.user.findFirst({
        where: {
          sub: account?.providerAccountId ?? "",
        },
      });
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async signIn({ user, account, profile, email, credentials }: any) {
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
};
