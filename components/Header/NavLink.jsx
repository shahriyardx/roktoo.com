import Link from "next/link";
import { useRouter } from "next/router";

const NavLink = ({ href, text }) => {
  const router = useRouter();
  return (
    <Link href={href} passHref>
      <a
        className={`hover:text-red-500 ${
          router.pathname == href && "text-red-500 font-semibold underline"
        }`}
      >
        {text}
      </a>
    </Link>
  );
};

export default NavLink;
