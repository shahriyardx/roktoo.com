import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Page from "../../components/Page";
import cities from "../../data/cities";
import Link from "next/link";
import toast from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi";
import { getSession } from "next-auth/react";
import Container from "../../components/Container";
import ProfileLayout from "../../components/Layout/ProfileLayout";
import { useRouter } from "next/router";

const Profile = ({ user }) => {
  const router = useRouter();
  return (
    <ProfileLayout>
      <p>Hello world</p>
    </ProfileLayout>
  );
};

export default Profile;

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  const user = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: req.headers.cookie,
    },
  }).then((data) => data.json());

  return {
    props: {
      user,
    },
  };
};
