import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Page from "../components/Layouts/Page";
import Link from "next/link";
import { BiLoaderAlt } from "react-icons/bi";
import { signIn } from "next-auth/react";
import SEO from "../components/SEO";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const PHONE_REGEX = /^(?:\+88|88)?(01[3-9]\d{8})$/;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    const { phone, password } = data;
    const matchedPhone = phone.match(PHONE_REGEX)[1];

    setLoading(true);
    signIn("credentials", {
      phone: matchedPhone,
      password,
      callbackUrl: `${window.location.origin}/`,
    });
  };
  return (
    <Page>
      <SEO title="Login" />
      <div className="w-full max-w-[400px] px-5 mx-auto mt-5">
        <h1 className="text-4xl font-bold text-red-500 text-center mb-5">
          Login
        </h1>

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-lg">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone Number"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Please enter your phone number.",
                  },
                  pattern: {
                    value: PHONE_REGEX,
                    message: "Please enter a valid phone number",
                  },
                })}
              />
              <p className=" mt-1 text-sm text-red-500">
                {errors.phone?.message}
              </p>
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-lg">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Please enter your password.",
                  },
                  minLength: {
                    value: 8,
                    message: "Password is too short",
                  },
                })}
              />
              <p className=" mt-1 text-sm text-red-500">
                {errors.password?.message}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                disabled={loading}
                type="submit"
                className="px-10 py-3 rounded-md bg-green-500 text-white flex gap-2 justify-center items-center disabled:bg-green-800 disabled:cursor-not-allowed"
              >
                {loading && <BiLoaderAlt className="text-xl animate-spin" />}
                <span>Login</span>
              </button>

              <Link href="/register" passHref>
                <a className="px-10 py-3 rounded-md bg-zinc-700 text-white text-center">
                  Register
                </a>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Page>
  );
};

export default Login;
