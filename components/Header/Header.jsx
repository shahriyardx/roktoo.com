import React, { useState, useEffect } from "react";
import Container from "../Container";
import NavLink from "./NavLink";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiMenu } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { error } = router.query;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="h-16 flex items-center shadow-md relative">
      <Container className="flex items-center">
        <Link href="/" passHref>
          <a>
            <div
              className={`text-xl font-semibold ${
                router.pathname == "/" && "underline decoration-red-500"
              }`}
            >
              <span>Rokto</span>
              <span className="text-red-500">o</span>
            </div>
          </a>
        </Link>

        <div className="p-3 ml-auto sm:hidden" onClick={() => setOpen(!open)}>
          <BiMenu className="text-2xl" />
        </div>
        <div
          className={`
          flex sm:gap-3 ml-auto absolute sm:static top-16 left-0 flex-col 
          sm:flex-row sm:w-auto bg-zinc-700 sm:bg-transparent text-white 
          sm:text-black w-full z-50 ${open || "hidden sm:flex"}`}
        >
          <NavLink href="/search" text="Search" />
          {status !== "authenticated" && (
            <>
              <NavLink href="/login" text="Login" />
              <NavLink href="/register" text="Register" />
            </>
          )}

          {status === "authenticated" && (
            <NavLink href="/profile" text="Profile" />
          )}
        </div>

        {status === "authenticated" && (
          <button
            onClick={signOut}
            className="px-5 py-2 bg-red-500 text-white font-semibold rounded-full ml-3 sm:ml-5"
          >
            Logout
          </button>
        )}
      </Container>
    </div>
  );
};

export default Header;
