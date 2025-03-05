"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PrimaryButton from "./PrimaryButton";

const Profile = ({ publicKey }: { publicKey: string }) => {
  const session =  useSession();
  const router = useRouter();

  if (session.status == "loading") {
   return ( <div>Loading</div>);
  }
  if (!session.data?.user) {
    router.push("/");
    return null;
  }
  return (
    <div className="flex justify-center">
      <div className="max-w-4xl  rounded">
        <Greeting
          name={session?.data?.user?.name ?? ""}
          image={session?.data?.user?.image ?? ""}
        ></Greeting>
        <Assets publicKey={publicKey}></Assets>
      </div>
    </div>
  );
};

const Greeting = ({ name, image }: { name: string; image: string }) => {
  return (
    <div className="">
      {" "}
      <img src={image} className="rounded-full w-16 h-16 mr-4" />
      <h4>Welcome Back , {name}!</h4>
    </div>
  );
};

function Assets({ publicKey }: { publicKey: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      {publicKey}
      <PrimaryButton
        onClick={() => {
          navigator.clipboard.writeText(publicKey);
          setCopied(true);
        }}
      >
        {copied ? "copied" : "copy"}
      </PrimaryButton>
    </div>
  );
}
export default Profile;
