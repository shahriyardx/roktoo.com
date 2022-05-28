import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Page from "../../components/Page";
import Link from "next/link";
import { API_BASE } from "../../constrains";
import toast from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

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
    const response = await fetch(`${API_BASE}/user/password`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((data) => data.json());

    console.log(response);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Password updated successfully");
      router.push("/profile");
    }
  };

  return (
    <Page>
      <div className="w-full max-w-[400px] px-5 mx-auto mt-10">
        <h1 className="text-4xl font-bold text-red-500 text-center mb-5">
          Edit Profile
        </h1>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-lg">
                Old Password
              </label>
              <input
                type="password"
                name="name"
                id="name"
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
                name="name"
                id="name"
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
                name="name"
                id="name"
                placeholder="Confirm Password"
                {...register("confirm_password", {
                  required: {
                    value: true,
                    message: "Please enter new password again.",
                  },
                })}
              />
              <p className=" mt-1 text-sm text-red-500">
                {errors.old_password?.message}
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
      </div>
    </Page>
  );
};

export default Password;

export const getServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: {},
  };
};