import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import ProfileLayout from "../../../components/Layout/ProfileLayout";
import Post from "../../../components/Post";

const Posts = () => {
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

  console.log(renderPosts, condition);
  return (
    <ProfileLayout>
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => setCondition(null)}
          className={`px-3 py-2 rounded-md ${
            condition == null && "bg-red-500 text-white"
          }`}
        >
          All Posts
        </button>
        <button
          onClick={() => setCondition(true)}
          className={`px-3 py-2 rounded-md ${
            condition === true && "bg-red-500 text-white"
          }`}
        >
          Fulfilled
        </button>
        <button
          onClick={() => setCondition(false)}
          className={`px-3 py-2 rounded-md ${
            condition === false && "bg-red-500 text-white"
          }`}
        >
          Unfulfilled
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {renderPosts?.map((post) => {
          return <Post refetch={refetch} key={post._id} post={post} />;
        })}
      </div>
    </ProfileLayout>
  );
};

export default Posts;
