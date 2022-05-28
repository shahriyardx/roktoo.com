import React from "react";
import Container from "../../components/Container";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="py-10">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center order-2 sm:order-1 text-center sm:text-left">
            <div className="flex flex-col">
              <div className="hidden sm:block">
                <Image
                  src="/images/drops.png"
                  width={80}
                  height={80}
                  alt="Blood drops"
                />
              </div>
              <h1 className="text-6xl font-black text-red-500">Roktoo</h1>

              <p className="text-2xl mt-5 dark:text-white">
                Your blood can save someone&apos;s life
              </p>

              <div className="flex flex-wrap gap-5 mt-3 justify-center sm:justify-start">
                <Link href="/register" passHref>
                  <a className="px-4 py-2 bg-red-600 text-white rounded-md">
                    Donate Blood
                  </a>
                </Link>

                <Link href="/search" passHref>
                  <a className="px-4 py-2 bg-zinc-600 text-white rounded-md">
                    Find Blood
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div className="order-1 sm:order-2 mt-10 sm:mt-0 px-10 sm:px-0">
            <Image
              src="/images/hero.png"
              width={500}
              height={500}
              layout="responsive"
              alt="Hands holding blood drop"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
