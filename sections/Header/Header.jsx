import React, { useState, useEffect } from "react";
import Container from "../../components/Layouts/Container";
import NavLink from "../../components/NavLink";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiMenu } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { GoPrimitiveDot } from "react-icons/go";

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
    <div className="h-16 items-center shadow-md fixed sm:static top-0 left-0 w-full flex bg-zinc-900 z-10">
      <Container className="flex items-center justify-center sm:justify-between">
        <Link href="/" passHref>
          <a>
            <div
              className={`text-xl font-semibold ${
                router.pathname == "/" && "underline decoration-red-500"
              }`}
            >
              <span className="dark:text-white">Rokto</span>
              <span className="text-red-500">o</span>
            </div>
          </a>
        </Link>

        <div className="hidden sm:flex items-center">
          <div className="flex gap-3">
            <NavLink
              href="/requirements"
              text={
                <p className="flex items-center gap-1">
                  <span>Need Blood</span>{" "}
                  <GoPrimitiveDot
                    className="text-red-500 animate-pulse
                "
                  />{" "}
                </p>
              }
            />

            <NavLink href="/search" text="Search" />
            {status !== "authenticated" && (
              <NavLink href="/register" text="Register" />
            )}

            {status === "authenticated" && (
              <NavLink href="/profile" text="Profile" />
            )}
          </div>

          {status === "authenticated" ? (
            <button
              onClick={signOut}
              className="px-5 py-2 bg-red-500 text-white font-semibold rounded-full ml-auto sm:ml-5"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <a className="px-5 py-2 bg-green-500 text-white font-semibold rounded-full ml-auto sm:ml-5">
                Login
              </a>
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Header;
