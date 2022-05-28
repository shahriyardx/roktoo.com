import React from "react";
import Head from "next/head";

const SEO = ({ title, description, url }) => {
  const _title = title ? `${title} | Roktoo` : "Roktoo | Find and Donate blood";
  const _description =
    description ||
    "Roktoo.com is a blood donating and finding platform for bangladesh, where you can find blood donators in your area and also you can become a donor";
  const _url = url || "https://roktoo.com";
  return (
    <Head>
      <title>{_title}</title>
      <meta name="title" content={_title} />
      <meta name="description" content={_description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={_url} />
      <meta property="og:title" content={_title} />
      <meta property="og:description" content={_description} />
      <meta property="og:image" content="/images/roktoo.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={_url} />
      <meta property="twitter:title" content={_title} />
      <meta property="twitter:description" content={_description} />
      <meta property="twitter:image" content="/images/roktoo.png" />
    </Head>
  );
};

export default SEO;
