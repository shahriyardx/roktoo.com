import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import toast from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi";
import { useRouter } from "next/router";
import ProfileLayout from "../../components/Layouts/ProfileLayout";
import SEO from "../../components/SEO";

const Password = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdate = async (data) => {
    if (data.new_password !== data.confirm_password) {
      return toast.error("New and Confirm password is not same");
    }

    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/user/password`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((data) => data.json());

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Password updated successfully");
      router.push("/profile");
    }
  };

  return (
    <ProfileLayout>
      <SEO title="Change Password" />
      <form onSubmit={handleSubmit(handleUpdate)}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-lg">
              Old Password
            </label>
            <input
              type="password"
              name="old_password"
              id="old_password"
              placeholder="Old Password"
              {...register("old_password", {
                required: {
                  value: true,
                  message: "Please enter your old password.",
                },
              })}
            />
            <p className=" mt-1 text-sm text-red-500">
              {errors.old_password?.message}
            </p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="text-lg">
              New Password
            </label>
            <input
              type="password"
              name="new_password"
              id="new_password"
              placeholder="New Password"
              {...register("new_password", {
                required: {
                  value: true,
                  message: "Please enter a New Password.",
                },
              })}
            />
            <p className=" mt-1 text-sm text-red-500">
              {errors.new_password?.message}
            </p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="text-lg">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              placeholder="Confirm Password"
              {...register("confirm_password", {
                required: {
                  value: true,
                  message: "Please enter new password again.",
                },
              })}
            />
            <p className=" mt-1 text-sm text-red-500">
              {errors.confirm_password?.message}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-5">
          <button
            disabled={loading}
            type="submit"
            className="px-10 py-3 rounded-md bg-green-500 text-white flex justify-center gap-2 items-center disabled:bg-green-800 disabled:cursor-not-allowed"
          >
            {loading && <BiLoaderAlt className="text-xl animate-spin" />}
            <span>Save</span>
          </button>

          <Link href="/profile" passHref>
            <a className="py-3 bg-zinc-600 text-white rounded-md text-center">
              Go back
            </a>
          </Link>
        </div>
      </form>
    </ProfileLayout>
  );
};

Password.requireAuth = true;
export default Password;
