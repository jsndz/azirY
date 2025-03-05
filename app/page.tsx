"use client";

import PrimaryButton from "@/components/PrimaryButton";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import TradingVolume from "@/components/landing/TradingVolume";
import { useSession, signOut, signIn } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-primary">AzirY</h2>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            {session.data?.user ? (
              <PrimaryButton onClick={() => signOut()} className="">
                Logout
              </PrimaryButton>
            ) : (
              <PrimaryButton onClick={() => signIn("google")}>
                SignIn
              </PrimaryButton>
            )}
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <Hero />
        <Features />
        <TradingVolume />
      </main>
      <Footer />
    </div>
  );
}
