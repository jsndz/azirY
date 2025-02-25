"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status == "loading") {
    <div>Loading</div>;
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
      </div>
    </div>
  );
};

const Greeting = ({ name, image }: { name: string; image: string }) => {
  return (
    <div className="">
      {" "}
      <Image
        src={image || ""}
        alt="user profile image"
        width={100}
        height={100}
      ></Image>
      <h4>Welcome Back , {name}!</h4>
    </div>
  );
};
export default page;
