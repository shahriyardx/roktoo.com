import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import cities from "../../data/cities";
import Link from "next/link";
import toast from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi";
import ProfileLayout from "../../components/Layouts/ProfileLayout";
import SEO from "../../components/SEO";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";

const EditProfile = () => {
  const { data: user, isLoading } = useQuery("user", () =>
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}/user`).then((res) => res.json())
  );
  const [district, setDistrict] = useState(user?.district);
  const [area, setArea] = useState(user?.area);
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
    reset,
  } = useForm();

  const handleUpdate = async (data) => {
    const { phone, ...otherInfo } = data;
    const matchedPhone = phone.match(PHONE_REGEX)[1];
    const updateinfo = { ...otherInfo, phone: matchedPhone, district, area };

    district ? setDisError("") : setDisError("Please choose district");
    area ? setAreaError("") : setAreaError("Please choose area");

    if (!district || !area) return;

    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/user/update`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updateinfo),
      }
    ).then((data) => data.json());

    setLoading(false);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("User updated successfully");
    }
  };

  useEffect(() => {
    if (!district) {
      setArea("");
      setAreas([]);
    }
    if (district) {
      setDisError("");
      setAreas(cities[district] || []);
    }
  }, [district]);

  useEffect(() => {
    if (!area) {
      setArea("");
    }
    if (area) {
      setAreaError("");
    }
  }, [area]);

  useEffect(() => {
    if (!user) return;
    reset(user);
    setDistrict(user.district);
    setArea(user.area);
  }, [user, reset]);

  return (
    <ProfileLayout>
      <SEO title="Edit Profile" />
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(handleUpdate)} className="sm:pb-10">
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
                defaultValue={user?.name}
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
                value={district}
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

            <div className={`flex flex-col ${!district && "hidden"}`}>
              <label htmlFor="area">Area</label>
              <select
                name="area"
                id="area"
                onChange={(e) => setArea(e.target.value)}
                value={area}
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
                  id="available"
                  {...register("available")}
                />
                <label htmlFor="available">
                  <span>Available to donate blood</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-5">
            <button
              disabled={loading}
              type="submit"
              className="py-3 rounded-md bg-green-500 text-white flex gap-2 justify-center items-center disabled:bg-green-800 disabled:cursor-not-allowed"
            >
              {loading && <BiLoaderAlt className="text-xl animate-spin" />}
              <span>Save</span>
            </button>
            <Link href="/profile/password" passHref>
              <a className="py-3 bg-zinc-600 text-white rounded-md text-center">
                Change Password
              </a>
            </Link>
          </div>
        </form>
      )}
    </ProfileLayout>
  );
};

EditProfile.requireAuth = true;
export default EditProfile;
