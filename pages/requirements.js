import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Container from "../components/Container";
import Page from "../components/Page";
import Post from "../components/Post";
import SEO from "../components/SEO";

const Requirements = () => {
  const { data: session } = useSession();

  const { data: posts } = useQuery("requirements", () =>
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/post`).then((data) =>
      data.json()
    )
  );
  return (
    <Page>
      <SEO title="Need Blood" />
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
          {posts?.map((post) => {
            const postDate = new Date(post.time).setHours(0, 0, 0, 0);
            const currentDate = new Date().setHours(0, 0, 0, 0);

            if (postDate >= currentDate) {
              return <Post key={post._id} post={post} />;
            }
          })}
        </div>
      </Container>
    </Page>
  );
};

export default Requirements;
