import React from "react";
import { BiLoaderAlt } from "react-icons/bi";

const Loading = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="flex items-center gap-2 dark:text-zinc-300">
        <BiLoaderAlt className="text-2xl animate-spin" />
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
