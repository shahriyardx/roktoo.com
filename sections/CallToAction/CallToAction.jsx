import React from "react";
import Container from "../../components/Container";
import Link from "next/link";

const CallToAction = () => {
  return (
    <div className="py-20">
      <Container>
        <div className="bg-red-600 p-5 rounded-xl py-16 flex flex-col gap-5 items-center">
          <h1 className="text-3xl font-bold text-white text-center">
            রক্তদানে আগ্রহী?
          </h1>

          <Link href="/register" passHref>
            <a className="px-5 py-3 bg-white rounded-md hover:bg-red-900 hover:text-white">
              রক্তদাতা হউন
            </a>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default CallToAction;
