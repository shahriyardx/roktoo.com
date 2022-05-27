import React from "react";
import Footer from "./Footer";
import Header from "./Header/Header";
import { Toaster } from "react-hot-toast";

const Page = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="min-h-[calc(90vh-4rem)]">{children}</div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Page;
