"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { tokenwithBalance, useTokens } from "@/app/api/hooks/useTokens";
import { TokenDetails } from "./TokenDetails";
import { Swap } from "./Swap";

type Tab = "Assets" | "Swap";
const Tabs: { id: Tab; name: string }[] = [
  { id: "Assets", name: "Assets" },
  { id: "Swap", name: "Swap" },
];

const Profile = ({ publicKey }: { publicKey: string }) => {
  const session = useSession();
  const router = useRouter();
  const [tab, setTab] = useState("Assets");
  const { loading, tokenBalance } = useTokens(publicKey);

  if (session.status === "loading") {
    return <div className="text-center text-white">Loading...</div>;
  }
  if (!session.data?.user) {
    router.push("/");
    return null;
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl w-full bg-gray-800 p-6 rounded-lg shadow-lg text-white">
        <Greeting
          name={session.data.user.name ?? ""}
          image={session.data.user.image ?? ""}
        />
        {Tabs.map((tab) => {
          return (
            <button
              key={tab.id}
              className="px-6 py-3 ml-5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => {
                setTab(tab.id);
              }}
            >
              {tab.name}
            </button>
          );
        })}
        {tab == "Assets" ? (
          <Assets
            publicKey={publicKey}
            loading={loading}
            tokenBalance={tokenBalance}
          ></Assets>
        ) : tab == "Swap" ? (
          <Swap tokenBalance={tokenBalance} loading={loading}></Swap>
        ) : null}
      </div>
    </div>
  );
};

const Greeting = ({ name, image }: { name: string; image: string }) => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <image href={image} width={64} height={64} className="rounded-full" />
      <h4 className="text-xl font-semibold">Welcome Back, {name}!</h4>
    </div>
  );
};

function Assets({
  publicKey,
  loading,
  tokenBalance,
}: {
  publicKey: string;
  loading: boolean;
  tokenBalance: {
    totalBalance: number;
    tokens: tokenwithBalance[];
  } | null;
}) {
  const [copied, setCopied] = useState(false);

  if (loading) {
    return <div className="text-center text-gray-400">Loading assets...</div>;
  }

  return (
    <div className="p-4 bg-gray-700 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <PrimaryButton
            onClick={() => {
              navigator.clipboard.writeText(publicKey);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
          >
            {copied ? "Copied" : "Copy"}
          </PrimaryButton>
        </div>
      </div>

      <div className="text-green-400 text-lg font-semibold mb-2">
        Total Balance: {JSON.stringify(tokenBalance?.totalBalance)}
      </div>

      <TokenDetails tokens={tokenBalance?.tokens || []} />
    </div>
  );
}

export default Profile;
