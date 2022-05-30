import React, { useState } from "react";
import Container from "./Container";
import Page from "./Page";
import ProfileNavLink from "../ProfileNavLink";
import { BiX, BiMenu } from "react-icons/bi";

const ProfileLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    isLeftSwipe ? setOpen(false) : isRightSwipe ? setOpen(true) : null;
  };

  return (
    <Page>
      <Container
        className="grid grid-cols-1 sm:grid-cols-seachPage gap-5 mt-5 min-h-[calc(100vh-170px)]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="fixed top-5 left-4 z-20 text-2xl text-white sm:hidden"
          onClick={() => setOpen(true)}
        >
          <BiMenu />
        </div>
        <div
          className={`fixed sm:static top-0 left-0 h-screen w-full z-30 transition-all`}
          style={{ left: open ? "0px" : `${-300 + touchEnd}px` }}
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

        <div>{children}</div>
      </Container>
    </Page>
  );
};

export default ProfileLayout;
