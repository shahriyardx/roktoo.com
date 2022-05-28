import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ProfileLayout from "../../../components/Layout/ProfileLayout";
import { BiLoaderAlt } from "react-icons/bi";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createPost = async (data) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/post/create`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((data) => data.json());

    if (response.error) {
      return toast.error(response.error);
    }

    toast.success("Post has been created.");
    router.push("/profile/posts");
  };
  return (
    <ProfileLayout>
      <div>
        <form onSubmit={handleSubmit(createPost)}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="phone" className="text-lg">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                {...register("title", {
                  required: {
                    value: true,
                    message: "Please enter a meaningfull title.",
                  },
                })}
              />
              <p className=" mt-1 text-sm text-red-500">
                {errors.title?.message}
              </p>
            </div>

            <div className="flex flex-col">
              <label htmlFor="location" className="text-lg">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Location"
                {...register("location", {
                  required: {
                    value: true,
                    message: "Please enter location.",
                  },
                })}
              />
              <p className=" mt-1 text-sm text-red-500">
                {errors.location?.message}
              </p>
            </div>

            <div className="flex flex-col">
              <label htmlFor="time" className="text-lg">
                Date and Time
              </label>
              <input
                type="date"
                name="time"
                id="time"
                {...register("time", {
                  required: {
                    value: true,
                    message: "Please select date and time",
                  },
                })}
              />
              <p className=" mt-1 text-sm text-red-500">
                {errors.time?.message}
              </p>
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className="text-lg">
                Conatct Number
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Contact number"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Please enter a contact number",
                  },
                })}
              />
              <p className=" mt-1 text-sm text-red-500">
                {errors.phone?.message}
              </p>
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className="text-lg">
                Details
              </label>
              <textarea
                name="details"
                id="details"
                rows={10}
                placeholder="Details"
                {...register("details", {
                  required: {
                    value: true,
                    message: "Please write something why you need blood",
                  },
                })}
              />
              <p className=" mt-1 text-sm text-red-500">
                {errors.details?.message}
              </p>
            </div>

            <div>
              <button
                disabled={loading}
                type="submit"
                className="px-10 py-3 rounded-md bg-green-500 text-white flex gap-2 items-center disabled:bg-green-800 disabled:cursor-not-allowed"
              >
                {loading && <BiLoaderAlt className="text-xl animate-spin" />}
                <span>Create Post</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </ProfileLayout>
  );
};

export default CreatePost;