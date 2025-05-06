"use client";
import React, { useEffect, useState } from "react";
import AuthComp from "../../../../components/AuthComp/AuthComp";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import { useForm } from "react-hook-form";
import api_client from "@/api_client";
import Modal from "../../../../components/Modal/Modal";

const Create_classes = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("description", data.description);

    api_client.post("/fitness_classes/", formData).then((res) => {
      if (res.status === 201) {
        reset();
        setLoading(false);
        document.getElementById("my_modal_3").showModal();
      }
    });
  };
  return (
    <AuthComp>
      <DashboardLayout>
        <p className="text-3xl font-bold text-center mb-4">
          Create Classes Category
        </p>
        <div className="flex justify-center">
          <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
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
                {...register("image", { required: true })}
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
        <Modal text={"Class created."} />
      </DashboardLayout>
    </AuthComp>
  );
};

export default Create_classes;
