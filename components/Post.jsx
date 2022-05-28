import Link from "next/link";
import React from "react";
import { format, compareAsc } from "date-fns";
import toast from "react-hot-toast";

const Post = ({ post, refetch, session }) => {
  const handleDelete = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/post/${post._id}`,
      {
        method: "DELETE",
      }
    ).then((res) => res.json());

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("Post deleted successfully");
    refetch();
  };

  const handleFulfilled = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/post/${post._id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ fulfilled: true }),
      }
    ).then((res) => res.json());

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("Post updated successfully");
    refetch();
  };
  return (
    <div
      className={`p-4 rounded-md shadow-lg border-2 border-red-200 flex flex-col ${
        post.fulfilled && "bg-green-300"
      }`}
    >
      <h1 className="text-xl font-bold mb-1">{post.title}</h1>
      <p className="mb-5">{post.details}</p>
      <p>
        <span className="font-bold">Location : </span>
        <span>{post.location} </span>
      </p>

      <p>
        <span className="font-bold">Date/Time : </span>
        <span>{format(new Date(post.time), "PP")} </span>
      </p>

      <p>
        <span className="font-bold">Phone : </span>
        <span>{post.phone} </span>
      </p>

      <div className="flex gap-3 flex-wrap mt-auto pt-3">
        {session?.user?._id === post.user_id && (
          <>
            {!post.fulfilled && (
              <>
                <Link href={`/profile/posts/${post._id}`} passHref>
                  <a className="px-5 py-2 font-semibold bg-yellow-500 rounded-md">
                    Edit
                  </a>
                </Link>
                <button
                  onClick={handleFulfilled}
                  className="px-5 py-2 font-semibold bg-green-500 text-white rounded-md"
                >
                  Fullfilled
                </button>
              </>
            )}
            <button
              onClick={handleDelete}
              className="px-5 py-2 font-semibold bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
