import React from "react";
import Header from "../../sections/Header/Header";
import { Toaster } from "react-hot-toast";
import BottomNav from "../BottomNav";

const Page = ({ children }) => {
  return (
    <div className="pb-20 sm:pb-0">
      <Header />
      <BottomNav />
      <div className="min-h-[calc(90vh-4rem)] pt-16 sm:pt-0">{children}</div>
      <Toaster />
    </div>
  );
};

export default Page;
