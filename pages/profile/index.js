import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Page from "../../components/Page";
import cities from "../../data/cities";
import Link from "next/link";
import toast from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi";
import { getSession, useSession } from "next-auth/react";
import Container from "../../components/Container";
import ProfileLayout from "../../components/Layout/ProfileLayout";
import { useRouter } from "next/router";

const Profile = () => {
  const { data: session, status } = useSession();
  return (
    <ProfileLayout>
      <p>{session.user.name}</p>
    </ProfileLayout>
  );
};

Profile.requireAuth = true;
export default Profile;
