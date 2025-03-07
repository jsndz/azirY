"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { useTokens } from "@/app/api/hooks/useTokens";
import { TokenDetails } from "./TokenDetails";

const Profile = ({ publicKey }: { publicKey: string }) => {
  const session = useSession();
  const router = useRouter();

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
        <Assets publicKey={publicKey} />
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

function Assets({ publicKey }: { publicKey: string }) {
  const [copied, setCopied] = useState(false);
  const { loading, tokenBalance } = useTokens(publicKey);

  if (loading) {
    return <div className="text-center text-gray-400">Loading assets...</div>;
  }

  return (
    <div className="p-4 bg-gray-700 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-300">Public Key:</span>
        <div className="flex items-center space-x-2">
          <span className="text-green-400 text-xs break-all">{publicKey}</span>
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
