import Link from "next/link";
import React from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";

const Post = ({ post, expired, refetch, session }) => {
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
    <div className="p-4 rounded-md border-2 flex flex-col dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-500">
      <h1 className="text-xl font-bold mb-1">
        <span>{post.title}</span>
        {post.fulfilled ? (
          <span className="text-green-500 text-lg ml-1">(Fulfilled)</span>
        ) : expired ? (
          <span className="text-yellow-500 text-lg ml-1">(Expired)</span>
        ) : (
          ""
        )}
      </h1>
      <p className="mb-5">{post.details}</p>
      <p>
        <span className="font-bold">Blood : </span>
        <span className="font-bold text-red-500">{post.blood} </span>
      </p>
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

      <div className="flex gap-3 flex-wrap mt-auto pt-3 text-white">
        {session?.user?._id === post.user_id && (
          <>
            {!post.fulfilled && (
              <>
                <button
                  onClick={handleFulfilled}
                  className="px-5 py-2 font-semibold bg-green-500 text-white rounded-md"
                >
                  Fullfilled
                </button>
                <Link href={`/profile/posts/${post._id}`} passHref>
                  <a className="px-5 py-2 font-semibold bg-zinc-500 rounded-md">
                    Edit
                  </a>
                </Link>
              </>
            )}
            <button
              onClick={handleDelete}
              className="px-5 py-2 font-semibold bg-zinc-200 text-black rounded-md"
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
