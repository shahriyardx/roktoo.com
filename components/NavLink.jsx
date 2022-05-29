import Link from "next/link";
import { useRouter } from "next/router";

const NavLink = ({ href, text }) => {
  const router = useRouter();
  return (
    <Link href={href} passHref>
      <a
        className={`sm:hover:text-red-500 py-3 px-4 sm:px-0 sm:py-0 dark:text-white ${
          router.pathname == href &&
          "text-white bg-red-500 sm:bg-transparent sm:text-red-500 sm:font-semibold"
        }`}
      >
        {text}
      </a>
    </Link>
  );
};

export default NavLink;
