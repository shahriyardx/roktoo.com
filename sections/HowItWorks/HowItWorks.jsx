import React from "react";
import Container from "../../components/Layouts/Container";

const HowItWorks = () => {
  return (
    <div className="py-20">
      <Container>
        <h1 className="text-4xl font-semibold text-red-500 text-center">
          How it works?
        </h1>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 rounded-xl overflow-hidden">
          <div className="p-5 bg-red-400 text-white">
            <h1 className="text-xl font-semibold">
              Register and become a donor
            </h1>

            <div className="flex justify-end mt-10">
              <span className="text-5xl">01</span>
            </div>
          </div>

          <div className="p-5 bg-red-500 text-white">
            <h1 className="text-xl font-semibold">
              Donate blood when someone needs
            </h1>

            <div className="flex justify-end mt-10">
              <span className="text-5xl">02</span>
            </div>
          </div>

          <div className="p-5 bg-red-600 text-white sm:last:col-span-2 md:last:col-span-1">
            <h1 className="text-xl font-semibold">Find blood if you need</h1>

            <div className="flex justify-end mt-10">
              <span className="text-5xl">03</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HowItWorks;
