import React from "react";
import { getSession, useSession } from "next-auth/react";
import ProfileLayout from "../../components/Layout/ProfileLayout";

const Profile = () => {
  const { data: session, status } = useSession();
  return (
    <ProfileLayout>
      <h1 className="text-3xl font-bold mb-3">{session.user.name}</h1>
      <p className="text-lg">
        <span className="font-bold">Blood : </span>
        <span className="text-red-500">{session.user.blood}</span>
      </p>

      <p className="text-lg">
        <span className="font-bold">Phone : </span>
        <span>{session.user.phone}</span>
      </p>

      <p className="text-lg">
        <span className="font-bold">District : </span>
        <span>{session.user.district}</span>
      </p>

      <p className="text-lg">
        <span className="font-bold">Area : </span>
        <span>{session.user.area}</span>
      </p>
    </ProfileLayout>
  );
};

Profile.requireAuth = true;
export default Profile;
