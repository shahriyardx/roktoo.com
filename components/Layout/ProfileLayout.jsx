import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Container from "../Container";
import Page from "../Page";
import ProfileNavLink from "../ProfileNavLink";

const ProfileLayout = ({ children }) => {
  const router = useRouter();

  return (
    <Page>
      <Container className="grid grid-cols-seachPage gap-5 mt-5">
        <div>
          <div className="flex flex-col">
            <ProfileNavLink href="/profile" text="My Profile" />
            <ProfileNavLink href="/profile/edit" text="Edit Profile" />
            <ProfileNavLink href="/profile/password" text="Change Password" />
          </div>
        </div>
        <div>{children}</div>
      </Container>
    </Page>
  );
};

export default ProfileLayout;
