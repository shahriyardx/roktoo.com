import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Page = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="min-h-[calc(90vh-4rem)]">{children}</div>
      <Footer />
    </div>
  );
};

export default Page;
