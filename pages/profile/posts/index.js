import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import ProfileLayout from "../../../components/Layouts/ProfileLayout";
import Post from "../../../components/Post";
import SEO from "../../../components/SEO";

const Posts = () => {
  const { data: session } = useSession();
  const [condition, setCondition] = useState(null);
  const { data: posts, refetch } = useQuery("posts", () =>
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/post/my`).then((res) =>
      res.json()
    )
  );

  const renderPosts =
    condition === null
      ? posts
      : posts?.filter((post) => post.fulfilled === condition);

  return (
    <ProfileLayout>
      <SEO title="My Posts" />
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => setCondition(null)}
          className={`px-3 py-2 rounded-md dark:text-zinc-300 text-black ${
            condition == null && "bg-zinc-700 !text-white"
          }`}
        >
          All Posts
        </button>
        <button
          onClick={() => setCondition(true)}
          className={`px-3 py-2 rounded-md dark:text-zinc-300 ${
            condition === true && "bg-green-500 !text-white"
          }`}
        >
          Fulfilled
        </button>
        <button
          onClick={() => setCondition(false)}
          className={`px-3 py-2 rounded-md dark:text-zinc-300 ${
            condition === false && "bg-red-500 !text-white"
          }`}
        >
          Unfulfilled
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {renderPosts?.map((post) => {
          const postDate = new Date(post.time).setHours(0, 0, 0, 0);
          const currentDate = new Date().setHours(0, 0, 0, 0);
          return (
            <Post
              refetch={refetch}
              key={post._id}
              post={post}
              session={session}
              expired={postDate < currentDate}
            />
          );
        })}
      </div>
    </ProfileLayout>
  );
};

Posts.requireAuth = true;
export default Posts;
