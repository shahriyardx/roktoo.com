import React from "react";
import Container from "../../components/Container";

const HowItWorks = () => {
  return (
    <div className="py-20">
      <Container>
        <h1 className="text-3xl font-semibold text-red-500 text-center">
          কিভাবে কাজ করে ?
        </h1>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div className="p-5 bg-red-400 text-white">
            <h1 className="text-lg font-semibold">
              রেজিস্ট্রেশন করে রক্ত দাতা হউন
            </h1>

            <div className="flex justify-end mt-10">
              <span className="text-5xl">০১</span>
            </div>
          </div>

          <div className="p-5 bg-red-500 text-white">
            <h1 className="text-lg font-semibold">
              কারও রক্ত দরকার হলে সময় মত দান করুন
            </h1>

            <div className="flex justify-end mt-10">
              <span className="text-5xl">০২</span>
            </div>
          </div>

          <div className="p-5 bg-red-600 text-white sm:last:col-span-2 md:last:col-span-1">
            <h1 className="text-lg font-semibold">
              রক্তের প্রয়োজন হলে খুজে বের করুন
            </h1>

            <div className="flex justify-end mt-10">
              <span className="text-5xl">০৩</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HowItWorks;
