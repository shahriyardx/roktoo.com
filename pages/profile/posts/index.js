import React from "react";
import ProfileLayout from "../../../components/Layout/ProfileLayout";
import Post from "../../../components/Post";

const Posts = () => {
  return (
    <ProfileLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </ProfileLayout>
  );
};

export default Posts;
