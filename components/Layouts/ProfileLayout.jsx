import React, { useState } from "react";
import Container from "./Container";
import Page from "./Page";
import ProfileNavLink from "../ProfileNavLink";
import { BiX, BiMenu } from "react-icons/bi";

const ProfileLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <Page>
      <Container className="grid grid-cols-1 sm:grid-cols-seachPage gap-5 mt-5">
        <div
          className={`fixed sm:static top-0 left-0 h-screen w-full z-50 transition-all ${
            open ? "left-0" : "-left-full"
          }`}
        >
          <div className="w-full h-full max-w-[300px] bg-zinc-800 dark:bg-zinc-700 sm:bg-transparent">
            <div className="h-16 flex items-center justify-between px-4 bg-zinc-80 sm:hidden bg-zinc-700 dark:bg-zinc-600">
              <div className="text-xl font-semibold">
                <span className="text-white">Rokto</span>
                <span className="text-red-500">o</span>
              </div>

              <BiX
                className="text-red-500 text-3xl"
                onClick={() => setOpen(!open)}
              />
            </div>

            <div className="flex flex-col p-4 sm:p-0">
              <ProfileNavLink href="/profile" text="My Profile" />
              <ProfileNavLink href="/profile/edit" text="Edit Profile" />
              <ProfileNavLink href="/profile/password" text="Change Password" />
              <ProfileNavLink href="/profile/posts" text="My Posts" />
              <ProfileNavLink href="/profile/posts/create" text="Create Post" />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="pb-4 sm:pb-0">
            <button
              className="py-2 rounded-md flex items-center gap-2 text-lg sm:hidden dark:text-white"
              onClick={() => setOpen(true)}
            >
              <BiMenu className="text-xl" />
              <span>Open Menu</span>
            </button>
          </div>
          <div>{children}</div>
        </div>
      </Container>
    </Page>
  );
};

export default ProfileLayout;
