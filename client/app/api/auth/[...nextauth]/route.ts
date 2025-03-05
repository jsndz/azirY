import { authconfig } from "@/lib/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authconfig);

export { handler as GET, handler as POST };


console.log(process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET)
