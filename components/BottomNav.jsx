import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import {
  BiHomeHeart,
  BiSearch,
  BiUser,
  BiLogInCircle,
  BiDonateBlood,
} from "react-icons/bi";

const BottomNav = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div className="w-full h-16 px-4 fixed bottom-0 left-0 bg-zinc-900 text-zinc-200 flex items-center justify-evenly text-2xl sm:hidden">
      <div
        className={`p-2 rounded-full ${router.pathname == "/" && "bg-red-500"}`}
        onClick={() => router.push("/")}
      >
        <BiHomeHeart />
      </div>

      <div
        className={`p-2 rounded-full ${
          router.pathname == "/search" && "bg-red-500"
        }`}
        onClick={() => router.push("/search")}
      >
        <BiSearch />
      </div>

      <div
        className={`p-2 rounded-full ${
          router.pathname == "/requirements" && "bg-red-500"
        }`}
        onClick={() => router.push("/requirements")}
      >
        <BiDonateBlood />
      </div>

      <div
        className={`p-2 rounded-full ${
          router.pathname.startsWith("/profile") && "bg-red-500"
        }`}
        onClick={() => router.push("/profile")}
      >
        <BiUser />
      </div>

      {status === "authenticated" && (
        <div className="p-2" onClick={signOut}>
          <BiLogInCircle />
        </div>
      )}
    </div>
  );
};

export default BottomNav;
