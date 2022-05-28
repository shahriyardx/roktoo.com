import Link from "next/link";
import React from "react";

const Post = () => {
  return (
    <div className="p-4 rounded-md shadow-lg border-2 border-red-200">
      <h1 className="text-xl font-bold mb-2">Urgent blood need</h1>
      <p className="mb-5">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
        accusantium nostrum vel corrupti aut,
      </p>
      <p>
        <span className="font-bold">Location : </span>
        <span>Rangpur Medical College </span>
      </p>

      <p>
        <span className="font-bold">Date/Time : </span>
        <span>24/12/2020 10:20 AM </span>
      </p>

      <div className="flex gap-3 flex-wrap mt-3">
        <Link href="/profile/posts/edit/wtf" passHref>
          <a className="px-5 py-2 font-semibold bg-yellow-500 rounded-md">
            Edit
          </a>
        </Link>

        <button className="px-5 py-2 font-semibold bg-red-500 text-white rounded-md">
          Delete
        </button>

        <button className="px-5 py-2 font-semibold bg-green-500 text-white rounded-md">
          Fullfilled
        </button>
      </div>
    </div>
  );
};

export default Post;
