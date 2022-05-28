import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import ProfileLayout from "../../../components/Layout/ProfileLayout";
import Post from "../../../components/Post";

const Posts = () => {
  const { data: posts, refetch } = useQuery("posts", () =>
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/post/my`).then((res) =>
      res.json()
    )
  );

  return (
    <ProfileLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {posts?.map((post) => {
          return <Post refetch={refetch} key={post._id} post={post} />;
        })}
      </div>
    </ProfileLayout>
  );
};

export default Posts;
