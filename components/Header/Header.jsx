import Container from "../Container";
import NavLink from "./NavLink";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <div className="h-16 flex items-center shadow-md">
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

        <div className="flex gap-3 ml-auto">
          <NavLink href="/search" text="Search" />
          <NavLink href="/login" text="Login" />
          <NavLink href="/register" text="Register" />
        </div>
      </Container>
    </div>
  );
};

export default Header;
