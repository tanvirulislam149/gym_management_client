"use client";
import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Button from "../Button/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import api_client from "@/api_client";
import { getUser } from "@/Redux/features/userSlice";
import Modal from "../Modal/Modal";

const UpdateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user?.user);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset({
      first_name: user.first_name,
      last_name: user.last_name,
      address: user.address,
      phone_number: user.phone_number,
    });
  }, []);

  const urlToFile = async (imageUrl, fileName = "image.jpg") => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const contentType = blob.type || "image/jpeg"; // fallback if type is missing
    return new File([blob], fileName, { type: contentType });
  };

  useEffect(() => {
    const fetchImageAsFile = async () => {
      const file = await urlToFile(user?.image, "existing-image.jpg");
      setImageFile(file);
    };

    fetchImageAsFile();
  }, [user?.image]);

  const onSubmit = (data) => {
    setIsLoading(true);
    const formData = new FormData();
    const image = data.image ? data?.image[0] : false;
    if (image) {
      formData.append("image", image);
    } else {
      formData.append("image", imageFile);
    }
    formData.append("password", user?.password);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("address", data.address);
    formData.append("phone_number", data.phone_number);

    api_client
      .put("/auth/users/me/", formData)
      .then((res) => {
        if (res.status === 200) {
          api_client
            .get("/auth/users/me/")
            .then((res) => {
              dispatch(getUser(res.data));
              setMsg("Updated successfully.");
              document.getElementById(`my_modal_3`).showModal();
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      })
      .catch((err) => console.log(err));
    //   document.getElementById(`my_modal_3`).showModal();
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    api_client
      .post("/auth/users/set_password/", {
        current_password: e.target.current_password.value,
        new_password: e.target.new_password.value,
      })
      .then((res) => {
        if (res.status === 204) {
          setMsg("Updated successfully.");
          document.getElementById(`my_modal_3`).showModal();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setPasswordLoading(false));
  };

  return (
    <dialog id="update_profile" className="modal">
      <div className="modal-box bg-white text-black w-11/12 max-w-5xl">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full mb-5">
            <p className="text-xl font-bold mb-5 text-center">Update Profile</p>
            <div className="lg:flex w-full">
              <div className="w-full mx-2">
                <label htmlFor="email">First Name: </label>
                <br />
                <input
                  type="text"
                  name="f_name"
                  placeholder="Enter your first name"
                  {...register("first_name", { required: true })}
                  className="input bg-white mt-1 mb-3 w-full text-black border border-black"
                />
              </div>
              <div className="w-full mx-2">
                <label htmlFor="email">Last Name: </label>
                <br />
                <input
                  type="text"
                  name="l_name"
                  placeholder="Enter your last name"
                  {...register("last_name", { required: true })}
                  className="input bg-white mt-1 mb-3 w-full text-black border border-black"
                />
              </div>
            </div>
            <div className="lg:flex w-full">
              <div className="w-full mx-2">
                <label htmlFor="email">Address: </label>
                <br />
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  {...register("address", { required: true })}
                  className="input bg-white mt-1 mb-3 w-full text-black border border-black"
                />
              </div>
              <div className="w-full mx-2">
                <label htmlFor="email">Phone number: </label>
                <br />
                <input
                  type="number"
                  name="number"
                  placeholder="Enter your number"
                  {...register("phone_number", { required: true })}
                  className="input bg-white mt-1 mb-3 w-full text-black border border-black"
                />
              </div>
            </div>
            <div className="lg:flex w-full">
              <div className="w-full mx-2">
                <label htmlFor="email">Image: </label>
                <br />
                <input
                  type="file"
                  name="image"
                  className="file-input w-full mt-1 bg-white text-black border border-black mb-2"
                  {...register("image")}
                />
              </div>
            </div>
            <input
              type="submit"
              className="text-base btn btn-primary text-black ml-2"
              disabled={isLoading ? true : ""}
              value={`${isLoading ? "Updating..." : "Update"}`}
            />
          </form>
          <form onSubmit={(e) => handleChangePassword(e)} className="mx-2 ml-4">
            <p className="text-center font-bold text-xl mb-2">
              Change Password
            </p>
            <div className="md:flex">
              <div className="w-full">
                <label htmlFor="password">Current Password</label>
                <br />
                <div className="flex mr-0 lg:mr-3 justify-center items-center relative">
                  <input
                    required
                    name="current_password"
                    placeholder="Enter your password"
                    className="input bg-white mb-3 w-full text-black border border-black"
                  />
                </div>
              </div>
              <div className="w-full">
                <label htmlFor="password">New Password</label>
                <br />
                <div className="flex mr-0 lg:mr-3 justify-center items-center relative">
                  <input
                    required
                    name="new_password"
                    placeholder="Enter your password"
                    className="input bg-white mb-3 w-full text-black border border-black"
                  />
                </div>
              </div>
            </div>
            <div>
              <input
                type="submit"
                className="text-base btn btn-primary text-black"
                disabled={passwordLoading ? true : ""}
                value={`${passwordLoading ? "Changing..." : "Change"}`}
              />
            </div>
          </form>
        </div>
        <Modal text={msg} />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default UpdateProfile;
