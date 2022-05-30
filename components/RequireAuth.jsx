import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import Loading from "./Loading";

const RequireAuth = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-full h-screen flex justify-center items-center text-3xl">
        <Loading />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }
  return children;
};

export default RequireAuth;
