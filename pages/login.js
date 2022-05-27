import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Page from "../components/Page";
import Link from "next/link";
import { BiLoaderAlt } from "react-icons/bi";
import { API_BASE } from "../constrains";
import toast from "react-hot-toast";

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
    const loginInfo = { phone: matchedPhone, password };

    const response = await fetch(`${API_BASE}/user/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    }).then((data) => data.json());

    console.log(response);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Login successfull");
    }
  };
  return (
    <Page>
      <div className="w-full max-w-[400px] px-5 mx-auto mt-20">
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

            <div>
              <button
                disabled={loading}
                type="submit"
                className="px-10 py-3 rounded-md bg-green-500 text-white flex gap-2 items-center disabled:bg-green-800 disabled:cursor-not-allowed"
              >
                {loading && <BiLoaderAlt className="text-xl animate-spin" />}
                <span>Login</span>
              </button>
            </div>
          </div>
        </form>

        <div className="mt-10">
          <Link href="/register" passHref>
            <a className="text-blue-500 font-semibold">
              💘 New to roktoo? Register here
            </a>
          </Link>
        </div>
      </div>
    </Page>
  );
};

export default Login;
