import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Page from "../components/Page";
import cities from "../data/cities";
import Link from "next/link";
import { API_BASE } from "../constrains";
import toast from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi";

const Register = () => {
  const [district, setDistrict] = useState();
  const [area, setArea] = useState();
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);

  // Errors
  const [disError, setDisError] = useState("");
  const [areaError, setAreaError] = useState("");

  const PHONE_REGEX = /^(?:\+88|88)?(01[3-9]\d{8})$/;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    const { phone, ...otherInfo } = data;
    const matchedPhone = phone.match(PHONE_REGEX)[1];
    const registerInfo = { ...otherInfo, phone: matchedPhone, district, area };

    district ? setDisError("") : setDisError("Please choose district");
    area ? setAreaError("") : setAreaError("Please choose area");

    if (!district || !area) return;

    setLoading(true);
    const response = await fetch(`${API_BASE}/user/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(registerInfo),
    }).then((data) => data.json());

    setLoading(false);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("Registration successfull");
    }
  };

  useEffect(() => {
    if (district) {
      setDisError("");
      setAreas(cities[district] || []);
    }
  }, [district]);

  useEffect(() => {
    if (area) {
      setAreaError("");
    }
  }, [area]);

  return (
    <Page>
      <div className="w-full max-w-[400px] px-5 mx-auto mt-20">
        <h1 className="text-4xl font-bold text-red-500 text-center mb-5">
          Register
        </h1>
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-lg">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Please enter your full name.",
                  },
                })}
              />
              <p className=" mt-1 text-sm text-red-500">
                {errors.name?.message}
              </p>
            </div>

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

            <div className="flex flex-col">
              <label htmlFor="blood">Blood Group</label>
              <select
                name="blood"
                id="blood"
                {...register("blood", {
                  required: true,
                })}
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="blood">District</label>
              <select
                name="district"
                id="district"
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option value="">Select District</option>
                {Object.keys(cities)
                  .sort()
                  .map((city) => {
                    return (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    );
                  })}
              </select>
              <p className=" mt-1 text-sm text-red-500">{disError}</p>
            </div>

            <div className="flex flex-col">
              <label htmlFor="area">Area</label>
              <select
                name="area"
                id="area"
                onChange={(e) => setArea(e.target.value)}
              >
                <option value="">Select Area</option>
                {areas.map((area) => {
                  return (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  );
                })}
              </select>
              <p className=" mt-1 text-sm text-red-500">{areaError}</p>
            </div>

            <div className="flex flex-col">
              <label htmlFor="address" className="text-lg">
                Full Address <span className="text-zinc-400">(optional)</span>
              </label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Full Address"
                {...register("address")}
              />
            </div>

            <div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="agree"
                  {...register("agree", {
                    required: {
                      value: true,
                      message: "You must agree to terms and conditions",
                    },
                  })}
                />
                <label htmlFor="agree">
                  <span>I agree to the</span>
                  <Link href="/terms" passHref>
                    <a className="text-blue-500 font-bold">
                      &nbsp;Terms and Conditions
                    </a>
                  </Link>
                </label>
              </div>
              <div>
                <p className="mt-1 text-sm text-red-500">
                  {errors.agree?.message}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <button
              disabled={loading}
              type="submit"
              className="px-10 py-3 rounded-md bg-green-500 text-white flex gap-2 items-center disabled:bg-green-800 disabled:cursor-not-allowed"
            >
              {loading && <BiLoaderAlt className="text-xl animate-spin" />}
              <span>Register</span>
            </button>
          </div>
        </form>
        <div className="mt-10">
          <Link href="/login" passHref>
            <a className="text-blue-500 font-semibold">
              💘 Already have an account? Login here
            </a>
          </Link>
        </div>
      </div>
    </Page>
  );
};

export default Register;
