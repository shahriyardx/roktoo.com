import React from "react";
import Container from "../../components/Container";
import Link from "next/link";

const CallToAction = () => {
  return (
    <div className="py-10 md:py-20">
      <Container>
        <div className="bg-red-600 p-5 rounded-xl py-16 flex flex-col gap-5 items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            Want to donate?
          </h1>

          <Link href="/register" passHref>
            <a className="text-lg px-5 py-3 bg-white dark:text-black rounded-md hover:bg-red-900 hover:text-white font-bold">
              Donate now
            </a>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default CallToAction;
