import React from "react";
import Header from "../../sections/Header/Header";
import { Toaster } from "react-hot-toast";
import BottomNav from "../BottomNav";

const Page = ({ children }) => {
  return (
    <div>
      <Header />
      <BottomNav />
      <div className="min-h-[85vh] sm:min-h-[calc(100vh-65px)] py-20 sm:py-0">
        {children}
      </div>
      <Toaster />
    </div>
  );
};

export default Page;
