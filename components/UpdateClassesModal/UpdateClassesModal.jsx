"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api_client from "@/api_client";
import Modal from "../Modal/Modal";
import axios from "axios";
import ErrorModal from "../ErrorModal/ErrorModal";

const UpdateClassesModal = ({ id, fetchClasses }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) {
      setFetchLoading(true);
      axios
        .get(`https://gym-management-0fmi.onrender.com/fitness_classes/${id}`)
        .then((res) => {
          reset({
            name: res.data.name,
            description: res.data.description,
          });
          setImageUrl(res.data.image);
        })
        .catch((err) => document.getElementById("errorModal").showModal())
        .finally(() => setFetchLoading(false));
    }
  }, [id]);

  const urlToFile = async (imageUrl, fileName = "image.jpg") => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const contentType = blob.type || "image/jpeg"; // fallback if type is missing
    return new File([blob], fileName, { type: contentType });
  };

  useEffect(() => {
    const fetchImageAsFile = async () => {
      const file = await urlToFile(imageUrl, "existing-image.jpg");
      setImageFile(file);
    };

    fetchImageAsFile();
  }, [imageUrl]);

  const onSubmit = (data) => {
    setLoading(true);
    const image = data.image ? data?.image[0] : false;
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    } else {
      formData.append("image", imageFile);
    }
    formData.append("name", data.name);
    formData.append("description", data.description);

    api_client.put(`/fitness_classes/${id}`, formData).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        fetchClasses();
        setImageFile(null);
        setImageUrl("");
        document.getElementById("update_done_modal").showModal();
      }
    });
  };
  return (
    <>
      <dialog id="UpdateClassesModal" className="modal">
        <div className="modal-box border border-white">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {fetchLoading ? (
            <div className="w-full h-30 flex justify-center items-center">
              <span className="loading loading-spinner loading-xl"></span>
            </div>
          ) : (
            <div className="flex justify-center">
              <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Name :</legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Type here"
                    {...register("name", { required: true })}
                  />
                </fieldset>
                {errors.type && <span>This field is required</span>}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Image : </legend>
                  <input
                    type="file"
                    className="file-input w-full"
                    placeholder="Type here"
                    {...register("image")}
                  />
                </fieldset>
                {errors.months && <span>This field is required</span>}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Description : </legend>
                  <textarea
                    className="input w-full h-24 mb-3"
                    placeholder="Type here"
                    {...register("description", { required: true })}
                  ></textarea>
                </fieldset>
                {errors.price && <span>This field is required</span>}
                <input
                  className="btn btn-primary block text-black"
                  type="submit"
                  value={loading ? "Submitting..." : "Submit"}
                />
              </form>
            </div>
          )}
        </div>
      </dialog>
      <dialog id="update_done_modal" className="modal">
        <div className="modal-box bg-white text-black">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Class updated successfully</h3>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <ErrorModal />
    </>
  );
};

export default UpdateClassesModal;
