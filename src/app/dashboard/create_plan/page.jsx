"use client";
import React, { useEffect, useState } from "react";
import AuthComp from "../../../../components/AuthComp/AuthComp";
import DashboardLayout from "../../../../layouts/DashboardLayout";
import { useForm } from "react-hook-form";
import axios from "axios";
import Modal from "../../../../components/Modal/Modal";

const Create_plan = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios
      .get("https://gym-management-henna.vercel.app/fitness_classes/")
      .then((res) => setClasses(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCheckbox = (id, is_checked) => {
    if (is_checked) {
      setSelectedClasses((prev) => [...prev, id]);
    } else {
      setSelectedClasses((prev) => prev.filter((item) => item !== id));
    }
  };

  const onSubmit = (data) => {
    setLoading(true);
    setShowError(true);
    if (selectedClasses.length) {
      const token = localStorage.getItem("token");
      axios
        .post(
          "https://gym-management-henna.vercel.app/plans/",
          {
            ...data,
            price: parseInt(data.price),
            months: parseInt(data.months),
            fitness_classes: selectedClasses,
          },
          {
            headers: {
              Authorization: `JWT ${token}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            reset();
            setLoading(false);
            document.getElementById("my_modal_3").showModal();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <AuthComp>
      <DashboardLayout>
        <p className="text-3xl font-bold text-center mb-4">Create Plan</p>
        <div className="flex justify-center">
          <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Plan type :</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Type here"
                {...register("type", { required: true })}
              />
            </fieldset>
            {errors.type && <span>This field is required</span>}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Months : </legend>
              <input
                type="number"
                className="input w-full"
                placeholder="Type here"
                {...register("months", { required: true })}
              />
            </fieldset>
            {errors.months && <span>This field is required</span>}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Price : </legend>
              <input
                type="number"
                className="input w-full"
                placeholder="Type here"
                {...register("price", { required: true })}
              />
            </fieldset>
            {errors.price && <span>This field is required</span>}
            <legend className="fieldset-legend text-xs">
              Fitness Classes :{" "}
            </legend>
            <div className="dropdown mb-2 w-full">
              <div tabIndex={0} role="button" className="input w-full my-1">
                Select fitness classes
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-200 rounded-box z-1 w-full p-2 shadow-sm"
              >
                {classes.map((c) => (
                  <li key={c.id}>
                    <label className="label">
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={(e) => handleCheckbox(c.id, e.target.checked)}
                      />
                      {c.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            {/* errors will return when field validation fails  */}
            {selectedClasses.length == 0 && showError ? (
              <span>This field is required</span>
            ) : (
              ""
            )}
            <input
              className="btn btn-primary block text-black"
              type="submit"
              value={loading ? "Submitting..." : "Submit"}
            />
          </form>
        </div>
        <Modal text={"Plan Created Successfully."} />
      </DashboardLayout>
    </AuthComp>
  );
};

export default Create_plan;
