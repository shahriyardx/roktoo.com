import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const ProfileNavLink = ({ href, text }) => {
  const router = useRouter();
  return (
    <Link href={href} passHref>
      <a
        className={`px-4 py-3 rounded-md ${
          router.pathname == href
            ? "bg-red-500 text-white"
            : "text-black hover:bg-zinc-300"
        }`}
      >
        {text}
      </a>
    </Link>
  );
};

export default ProfileNavLink;
