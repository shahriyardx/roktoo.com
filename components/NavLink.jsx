import Link from "next/link";
import { useRouter } from "next/router";

const NavLink = ({ href, text }) => {
  const router = useRouter();
  return (
    <Link href={href} passHref>
      <a
        className={`hover:text-red-500 text-zinc-300 ${
          router.pathname == href && "!text-red-500 font-semibold"
        }`}
      >
        {text}
      </a>
    </Link>
  );
};

export default NavLink;
