import React from "react";
import { useQuery } from "react-query";
import Container from "../components/Container";
import Page from "../components/Page";
import Post from "../components/Post";
import SEO from "../components/SEO";
import Loading from "../components/Loading";

const Requirements = () => {
  const { data: posts, isLoading } = useQuery("requirements", () =>
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/post`).then((data) =>
      data.json()
    )
  );

  const futurePosts = posts
    ? posts.filter(
        (post) =>
          new Date(post.time).setHours(0, 0, 0, 0) >=
          new Date().setHours(0, 0, 0, 0)
      )
    : posts;

  return (
    <Page>
      <SEO title="Need Blood" />
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
          {futurePosts?.map((post) => {
            const postDate = new Date(post.time).setHours(0, 0, 0, 0);
            const currentDate = new Date().setHours(0, 0, 0, 0);

            if (postDate >= currentDate) {
              return <Post key={post._id} post={post} />;
            }
          })}
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          futurePosts.length < 1 && (
            <h1 className="text-3xl font-bold text-red-500 text-center mt-20">
              No blood requirements are found
            </h1>
          )
        )}
      </Container>
    </Page>
  );
};

export default Requirements;
