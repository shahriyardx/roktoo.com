import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Container from "../components/Layouts/Container";
import Page from "../components/Layouts/Page";
import Post from "../components/Post";
import SEO from "../components/SEO";
import Loading from "../components/Loading";

const Requirements = () => {
  const [page, setPage] = useState(0);
  const {
    data: postsData,
    isLoading,
    refetch,
  } = useQuery("requirements", () =>
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/post?page=${page}`).then(
      (data) => data.json()
    )
  );

  const futurePosts = postsData
    ? postsData.posts.filter(
        (post) =>
          new Date(post.time).setHours(0, 0, 0, 0) >=
          new Date().setHours(0, 0, 0, 0)
      )
    : postsData;

  const postCount = postsData ? postsData.postCount : 0;
  const pages = Math.ceil(postCount / 20);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <Page>
      <SEO title="Need Blood" />
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5">
          {futurePosts?.map((post) => {
            return <Post key={post._id} post={post} />;
          })}
        </div>

        {isLoading ? (
          <Loading />
        ) : (
          futurePosts.length < 1 && (
            <h1 className="text-3xl font-bold text-red-500 text-center sm:mt-10">
              No blood requirements are found
            </h1>
          )
        )}

        <div className="flex items-center gap-3 flex-wrap mt-10">
          {pages > 1 &&
            [...Array(pages)].map((_, index) => {
              return (
                <span
                  onClick={() => setPage(index)}
                  className={`bg-red-400 text-white text-lg w-7 h-7 rounded-full flex justify-center items-center cursor-pointer ${
                    page === index && "bg-red-700"
                  }`}
                  key={index}
                >
                  {index + 1}
                </span>
              );
            })}
        </div>
      </Container>
    </Page>
  );
};

export default Requirements;
