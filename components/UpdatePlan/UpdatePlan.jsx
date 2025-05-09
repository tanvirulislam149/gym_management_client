"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Modal from "../Modal/Modal";

const UpdatePlanModal = ({ id, fetchPlans }) => {
  const [classes, setClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updatePlan, setUpdatePlan] = useState({});

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
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (id) {
      setSelectedClasses([]);
      axios
        .get(`https://gym-management-henna.vercel.app/plans/${id}`)
        .then((res) => {
          setUpdatePlan(res.data);
          reset({
            type: res.data.type,
            months: res.data.months,
            price: res.data.price,
          });
          res.data.fitness_classes.forEach((c) => {
            setSelectedClasses((prev) => [...prev, c.id]);
          });
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

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
    console.log({
      ...data,
      price: parseInt(data.price),
      months: parseInt(data.months),
      fitness_classes: selectedClasses,
    });
    if (selectedClasses.length) {
      const token = localStorage.getItem("token");
      axios
        .put(
          `https://gym-management-henna.vercel.app/plans/${id}`,
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
          console.log(res);
          if (res.status === 200) {
            setLoading(false);
            fetchPlans();
            document.getElementById("update_modal").showModal();
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <dialog id="update_plan" className="modal">
      <div className="modal-box border border-white">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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
                      checked={selectedClasses.includes(c.id)}
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
      <dialog id="update_modal" className="modal">
        <div className="modal-box bg-white text-black">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Plan updated successfully</h3>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </dialog>
  );
};

export default UpdatePlanModal;
