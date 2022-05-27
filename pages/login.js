import React from "react";
import { useForm } from "react-hook-form";
import Page from "../components/Page";

const Login = () => {
  const PHONE_REGEX = /^(?:\+88|88)?(01[3-9]\d{8})$/;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    const { phone, password } = data;
    const matchedPhone = phone.match(PHONE_REGEX)[1];
    const loginInfo = { phone: matchedPhone, password };

    console.log(loginInfo);
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
                type="submit"
                className="px-10 py-3 rounded-md bg-green-500 text-white"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </Page>
  );
};

export default Login;
